import merkleTree from '../lib/MerkleTree';
// import { address, abi } from './config';
// const { bigInt } = require('snarkjs');
// const { format } = require('js-conflux-sdk')
const snarkjs = require("snarkjs");
const crypto = require("crypto");
const circomlib = require("circomlib");
const { Conflux, Drip, format } = require("js-conflux-sdk");
const { toWei, fromWei, toBN, BN } = require('web3-utils')

//const buildGroth16 = require('websnark/src/groth16')
const websnarkUtils = require("websnark/src/utils");
// const MerkleTree = require("fixed-merkle-tree"); // Conflux

const assert = require("assert");
const { poseidonHash2, getExtWithdrawAssetArgsHash } = require("./utils2");

const Web3 = require("web3")
const web3 = window.web3 ? new Web3( window.web3.currentProvider) : null

// const confluxJS = new Conflux({
//   url: "https://test.confluxrpc.com",
//   networkId: 1,
// });

const bigInt = snarkjs.bigInt;

const newBN = bigInt;
const MERKLE_TREE_HEIGHT = 20;
let circuit,
  proving_key,
  groth16,
  erc20,
  senderAccount,
  chainId,
  networkId,
  sacred;

/** Generate random number of specified byte length */
const rbigint = (nbytes) => bigInt.leBuff2int(crypto.randomBytes(nbytes));

/** Compute pedersen hash */
const pedersenHash = (data) =>
  circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0];

/** BigNumber to hex string of specified length */
function toHex(number, length = 32) {
  const str =
    number instanceof Buffer
      ? number.toString("hex")
      : bigInt(number).toString(16);
  return "0x" + str.padStart(length * 2, "0");
}

/**
 * Create deposit object from secret and nullifier
 */
function createDeposit({ nullifier, secret }) {
  const deposit = { nullifier, secret };
  deposit.preimage = Buffer.concat([
    deposit.nullifier.leInt2Buff(31),
    deposit.secret.leInt2Buff(31),
  ]);
  deposit.commitment = pedersenHash(deposit.preimage);
  deposit.commitmentHex = toHex(deposit.commitment);
  deposit.nullifierHash = pedersenHash(deposit.nullifier.leInt2Buff(31));
  deposit.nullifierHex = toHex(deposit.nullifierHash);
  return deposit;
}

/**
 * Parses Sacred.cash note
 * @param noteString the note
 */
function parseNote(noteString) {
  const noteRegex = /sacred-(?<currency>\w+)-(?<amount>[\d.]+)-(?<netId>\d+)-0x(?<note>[0-9a-fA-F]{124})/g;
  const match = noteRegex.exec(noteString);
  if (!match) {
    throw new Error("The note has invalid format");
  }

  const buf = Buffer.from(match.groups.note, "hex");
  const nullifier = bigInt.leBuff2int(buf.slice(0, 31));
  const secret = bigInt.leBuff2int(buf.slice(31, 62));
  const deposit = createDeposit({ nullifier, secret });
  const netId = Number(match.groups.netId);

  return {
    currency: match.groups.currency,
    amount: match.groups.amount,
    netId,
    deposit,
  };
}

/**
 * Parses Sacred.cash note
 * @param deposit the note
 */

async function loadDepositData({ deposit }) {
  try {
    const eventWhenHappened = await sacred.getPastEvents('Deposit', {
      filter: {
        commitment: deposit.commitmentHex
      },
      fromBlock: 0,
      toBlock: 'latest'
    })
    if (eventWhenHappened.length === 0) {
      throw new Error('There is no related deposit, the note is invalid')
    }

    const { timestamp } = eventWhenHappened[0].returnValues
    const txHash = eventWhenHappened[0].transactionHash
    const isSpent = await sacred.methods.isSpent(deposit.nullifierHex).call()
    const receipt = await web3.eth.getTransactionReceipt(txHash)

    return { timestamp, txHash, isSpent, from: receipt.from, commitment: deposit.commitmentHex }
  } catch (e) {
    console.error('loadDepositData', e)
  }
  return {}
}

function fromDecimals({ amount, decimals }) {
  amount = amount.toString()
  let ether = amount.toString()
  const base = new BN('10').pow(new BN(decimals))
  const baseLength = base.toString(10).length - 1 || 1

  const negative = ether.substring(0, 1) === '-'
  if (negative) {
    ether = ether.substring(1)
  }

  if (ether === '.') {
    throw new Error('[ethjs-unit] while converting number ' + amount + ' to wei, invalid value')
  }

  // Split it into a whole and fractional part
  const comps = ether.split('.')
  if (comps.length > 2) {
    throw new Error(
      '[ethjs-unit] while converting number ' + amount + ' to wei,  too many decimal points'
    )
  }

  let whole = comps[0]
  let fraction = comps[1]

  if (!whole) {
    whole = '0'
  }
  if (!fraction) {
    fraction = '0'
  }
  if (fraction.length > baseLength) {
    throw new Error(
      '[ethjs-unit] while converting number ' + amount + ' to wei, too many decimal places'
    )
  }

  while (fraction.length < baseLength) {
    fraction += '0'
  }

  whole = new BN(whole)
  fraction = new BN(fraction)
  let wei = whole.mul(base).add(fraction)

  if (negative) {
    wei = wei.mul(negative)
  }

  return new BN(wei.toString(10), 10)
}

// /**
//  * Generate merkle tree for a deposit.
//  * Download deposit events from the sacred, reconstructs merkle tree, finds our deposit leaf
//  * in it and generates merkle proof
//  * @param deposit Deposit object
//  */
// async function generateMerkleProof(deposit) {
//   // Get all deposit events from smart contract and assemble merkle tree from them
//   console.log("Getting current state from sacred contract");

//   // const events = await sacred.Deposit(null, null, null).getLogs({
//   //   fromEpoch: 1,
//   //   toEpoch: "latest_state", // change to latest
//   //   // limit: 100,
//   // });
//   // const leaves = events
//   //   .sort((a, b) => Number(a.arguments.leafIndex) - Number(b.arguments.leafIndex)) // Sort events in chronological order
//   //   .map(e => e.arguments.commitment)

//   const leaves = (await sacred.getCommitmentHistory(0, 500)).map((e) =>
//     format.hex(e)
//   );

//   const tree = new MerkleTree(MERKLE_TREE_HEIGHT, leaves, {
//     hashFunction: poseidonHash2,
//     zeroElement:
//       "18057714445064126197463363025270544038935021370379666668119966501302555028628",
//   });

//   // Find current commitment in the tree
//   const leafIndex = leaves.findIndex((e) => e === toHex(deposit.commitment));
//   assert(leafIndex >= 0, "The deposit is not found in the tree");

//   // Validate that our data is correct
//   const root = tree.root();
//   const { pathElements, pathIndices } = tree.path(format.uInt(leafIndex));

//   const isValidRoot = await sacred
//     .isKnownRoot(Buffer.from(toHex(root).substr(2), "hex"))
//     .call();
//   const isSpent = await sacred
//     .isSpent(Buffer.from(toHex(deposit.nullifierHash).substr(2), "hex"))
//     .call();
//   assert(isValidRoot === true, "Merkle tree is corrupted");
//   assert(isSpent === false, "The note is already spent");

//   // Compute merkle proof of our commitment
//   return { root, pathElements, pathIndices };
// }

// /**
//  * Generate SNARK proof for withdrawal
//  * @param deposit Deposit object
//  * @param recipient Funds recipient
//  * @param relayer Relayer address
//  * @param fee Relayer fee
//  * @param refund Receive ether for exchanged tokens
//  */
// async function generateProof({
//   deposit,
//   recipient,
//   relayerAddress = null,
//   fee = 0,
//   refund = 0,
// }) {
//   // Compute merkle proof of our commitment
//   recipient = format.hexAddress(recipient);
//   relayerAddress =
//     relayerAddress === null ? 0 : format.hexAddress(relayerAddress);
//   const { root, pathElements, pathIndices } = await generateMerkleProof(
//     deposit
//   );

//   const extData = { recipient, relayer: relayerAddress, fee, refund };
//   const extDataHash = getExtWithdrawAssetArgsHash(extData);
//   // Prepare circuit input
//   const input = {
//     // Public snark inputs
//     root: root,
//     nullifierHash: deposit.nullifierHash,
//     extDataHash,

//     // Private snark inputs
//     nullifier: deposit.nullifier,
//     secret: deposit.secret,
//     pathElements,
//     pathIndices,
//   };

//   console.log("Generating SNARK proof");
//   console.time("Proof time");
//   const proofData = await window.genZKSnarkProofAndWitness(
//     input,
//     circuit,
//     proving_key
//   );
//   const { proof } = websnarkUtils.toSolidityInput(proofData);
//   console.timeEnd("Proof time");
//   // console.log('proof ', proof)

//   const args = [
//     toHex(input.root),
//     toHex(input.nullifierHash),
//     toHex(recipient, 20),
//     toHex(relayerAddress, 20),
//     toHex(fee),
//     toHex(refund),
//   ];

//   // console.log('args ', args)

//   return { proof: proof, args };
// }

/**
 * Generate merkle tree for a deposit.
 * Download deposit events from the sacred, reconstructs merkle tree, finds our deposit leaf
 * in it and generates merkle proof
 * @param deposit Deposit object
 */
async function generateMerkleProof(deposit) {
  // Get all deposit events from smart contract and assemble merkle tree from them
  console.log('Getting current state from sacred contract')
  const events = await sacred.getPastEvents('Deposit', { fromBlock: 0, toBlock: 'latest' })
  const leaves = events
    .sort((a, b) => a.returnValues.leafIndex - b.returnValues.leafIndex).map(e => e.returnValues.commitment);
  const tree = new merkleTree(MERKLE_TREE_HEIGHT, leaves);

  // Find current commitment in the tree
  const depositEvent = events.find(e => e.returnValues.commitment === toHex(deposit.commitment));
  const leafIndex = depositEvent ? depositEvent.returnValues.leafIndex : -1;

  // Validate that our data is correct
  const root = await tree.root()
  const isValidRoot = await sacred.methods.isKnownRoot(toHex(root)).call()
  const isSpent = await sacred.methods.isSpent(toHex(deposit.nullifierHash)).call()
  assert(isValidRoot === true, 'Merkle tree is corrupted')
  assert(isSpent === false, 'The note is already spent')
  assert(leafIndex >= 0, 'The deposit is not found in the tree')

  // Compute merkle proof of our commitment
  return tree.path(leafIndex)
}

/**
 * Generate SNARK proof for withdrawal
 * @param deposit Deposit object
 * @param recipient Funds recipient
 * @param relayer Relayer address
 * @param fee Relayer fee
 * @param refund Receive ether for exchanged tokens
 */
async function generateProof({ deposit, recipient, relayerAddress = 0, fee = 0, refund = 0 }) {
  // Compute merkle proof of our commitment
  const { root, path_elements, path_index } = await generateMerkleProof(deposit)

  // Prepare circuit input
  const input = {
    // Public snark inputs
    root: root,
    nullifierHash: deposit.nullifierHash,
    recipient: bigInt(recipient),
    relayer: bigInt(relayerAddress),
    fee: bigInt(fee),
    refund: bigInt(refund),

    // Private snark inputs
    nullifier: deposit.nullifier,
    secret: deposit.secret,
    pathElements: path_elements,
    pathIndices: path_index,
  }

  console.log('Generating SNARK proof')
  console.time("Proof time");
  const proofData = await window.genZKSnarkProofAndWitness(
    input,
    circuit,
    proving_key
  );
  const { proof } = websnarkUtils.toSolidityInput(proofData);
  console.timeEnd("Proof time");

  const args = [
    toHex(input.root),
    toHex(input.nullifierHash),
    toHex(input.recipient, 20),
    toHex(input.relayer, 20),
    toHex(input.fee),
    toHex(input.refund)
  ]

  return { proof, args }
}

function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

async function init(deployment) {
  circuit = require("./circuits/withdraw.json");

  const proving_key_response = await fetch("./withdraw_proving_key.bin");
  proving_key = await proving_key_response.arrayBuffer();

  //groth16 = await buildGroth16()

  // sacred = confluxJS.Contract({
  //   address: deployment.address,
  //   abi: deployment.abi,
  // });
  sacred = new web3.eth.Contract(deployment.abi, deployment.address)

}

/**
 * Generating a note
 */
const generateClaim = (currency, amount, networkId) => {
  const deposit = createDeposit({
    nullifier: rbigint(31),
    secret: rbigint(31),
  });
  const note = toHex(deposit.preimage, 62);
  const noteString = `sacred-${currency}-${amount}-${networkId}-${note}`;
  console.log(`Your note: ${noteString}`);

  deposit.note = noteString;

  return deposit;
};

/**
 * Convertion for Conflux Portal bytes parameter
 */
const fromHexString = (hexString) =>
  new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

/**
 * Waits for transaction to be mined
 * @param txHash Hash of transaction
 * @param attempts
 * @param delay
 */
function waitForTxReceipt({ txHash, attempts = 60, delay = 1000 }) {
  return new Promise((resolve, reject) => {
    const checkForTx = async (txHash, retryAttempt = 0) => {
      const result = await web3.eth.getTransactionReceipt(txHash);
      if (!result || !result.blockNumber) {
        if (retryAttempt <= attempts) {
          setTimeout(() => checkForTx(txHash, retryAttempt + 1), delay);
        } else {
          reject(new Error("tx was not mined"));
        }
      } else {
        resolve(result);
      }
    };
    checkForTx(txHash);
  });
}

export {
  createDeposit,
  rbigint,
  toHex,
  fromDecimals,
  parseNote,
  loadDepositData,
  generateProof,
  init,
  fromHexString,
  generateClaim,
  waitForTxReceipt,
};
