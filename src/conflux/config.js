const deployments = {
  eth_deployments: {
    netId1: {
      eth: {
        instanceAddress: {
          '0.1': undefined,
          '1': undefined,
        },
        // TODO: Move abi to seprate file
        abi: [
          {
            "inputs": [
              {
                "internalType": "contract IVerifier",
                "name": "_verifier",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_denomination",
                "type": "uint256"
              },
              {
                "internalType": "uint32",
                "name": "_merkleTreeHeight",
                "type": "uint32"
              },
              {
                "internalType": "address",
                "name": "_lendingPoolAddressProvider",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_wETHGateway",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_wETHToken",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_operator",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "commitment",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "internalType": "uint32",
                "name": "leafIndex",
                "type": "uint32"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "name": "Deposit",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "bytes32",
                "name": "nullifierHash",
                "type": "bytes32"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "relayer",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
              }
            ],
            "name": "Withdrawal",
            "type": "event"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "FIELD_SIZE",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "ROOT_HISTORY_SIZE",
            "outputs": [
              {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "ZERO_VALUE",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "address",
                "name": "_newOperator",
                "type": "address"
              }
            ],
            "name": "changeOperator",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "name": "commitments",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "currentRootIndex",
            "outputs": [
              {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "denomination",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "_commitment",
                "type": "bytes32"
              }
            ],
            "name": "deposit",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "filledSubtrees",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getLastRoot",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "_left",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "_right",
                "type": "bytes32"
              }
            ],
            "name": "hashLeftRight",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "_root",
                "type": "bytes32"
              }
            ],
            "name": "isKnownRoot",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "_nullifierHash",
                "type": "bytes32"
              }
            ],
            "name": "isSpent",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32[]",
                "name": "_nullifierHashes",
                "type": "bytes32[]"
              }
            ],
            "name": "isSpentArray",
            "outputs": [
              {
                "internalType": "bool[]",
                "name": "spent",
                "type": "bool[]"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "lendingPoolAddressProvider",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "levels",
            "outputs": [
              {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "nextIndex",
            "outputs": [
              {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "name": "nullifierHashes",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "operator",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "roots",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "address",
                "name": "_newVerifier",
                "type": "address"
              }
            ],
            "name": "updateVerifier",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "verifier",
            "outputs": [
              {
                "internalType": "contract IVerifier",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "wETHGateway",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "wETHToken",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "bytes",
                "name": "_proof",
                "type": "bytes"
              },
              {
                "internalType": "bytes32",
                "name": "_root",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "_nullifierHash",
                "type": "bytes32"
              },
              {
                "internalType": "address payable",
                "name": "_recipient",
                "type": "address"
              },
              {
                "internalType": "address payable",
                "name": "_relayer",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_fee",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_refund",
                "type": "uint256"
              }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "zeros",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          }
        ],
        symbol: "ETH",
        decimals: 18
      },
    },
    netId42: {
      eth: {
        instanceAddress: {
          // '0.01' : '0xEAA6e7E61cE012d39bff27f611dde9F5d6491f96', // Testnet: 0xBb74D194AC3D29eB755CDFF0200262d4feCC0257
          '0.1': '0xa29018039fe1a22dD1a721cFC2216CaF31d7cb42', // Testnet: 0x17B21990Cf231aD2Ce277497ba22809008dbFe34
          '1': '0xb5648046c854Dd142BdEfCD5ac57B15356aF8654', // Testnet: 0x3CeE41353B6d1aF5DD51C9Fd0a1Cc4Fd0FFE3140
          '10': undefined,
          '100': undefined
        },
        abi: [
          {
            "inputs": [
              {
                "internalType": "contract IVerifier",
                "name": "_verifier",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_denomination",
                "type": "uint256"
              },
              {
                "internalType": "uint32",
                "name": "_merkleTreeHeight",
                "type": "uint32"
              },
              {
                "internalType": "address",
                "name": "_lendingPoolAddressProvider",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_wETHGateway",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_wETHToken",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_operator",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "commitment",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "internalType": "uint32",
                "name": "leafIndex",
                "type": "uint32"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "name": "Deposit",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "bytes32",
                "name": "nullifierHash",
                "type": "bytes32"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "relayer",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
              }
            ],
            "name": "Withdrawal",
            "type": "event"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "FIELD_SIZE",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "ROOT_HISTORY_SIZE",
            "outputs": [
              {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "ZERO_VALUE",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "address",
                "name": "_newOperator",
                "type": "address"
              }
            ],
            "name": "changeOperator",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "name": "commitments",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "currentRootIndex",
            "outputs": [
              {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "denomination",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "_commitment",
                "type": "bytes32"
              }
            ],
            "name": "deposit",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "filledSubtrees",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getLastRoot",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "_left",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "_right",
                "type": "bytes32"
              }
            ],
            "name": "hashLeftRight",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "_root",
                "type": "bytes32"
              }
            ],
            "name": "isKnownRoot",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "_nullifierHash",
                "type": "bytes32"
              }
            ],
            "name": "isSpent",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32[]",
                "name": "_nullifierHashes",
                "type": "bytes32[]"
              }
            ],
            "name": "isSpentArray",
            "outputs": [
              {
                "internalType": "bool[]",
                "name": "spent",
                "type": "bool[]"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "lendingPoolAddressProvider",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "levels",
            "outputs": [
              {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "nextIndex",
            "outputs": [
              {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "name": "nullifierHashes",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "operator",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "roots",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "address",
                "name": "_newVerifier",
                "type": "address"
              }
            ],
            "name": "updateVerifier",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "verifier",
            "outputs": [
              {
                "internalType": "contract IVerifier",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "wETHGateway",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "wETHToken",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "bytes",
                "name": "_proof",
                "type": "bytes"
              },
              {
                "internalType": "bytes32",
                "name": "_root",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "_nullifierHash",
                "type": "bytes32"
              },
              {
                "internalType": "address payable",
                "name": "_recipient",
                "type": "address"
              },
              {
                "internalType": "address payable",
                "name": "_relayer",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_fee",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_refund",
                "type": "uint256"
              }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "zeros",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          }
        ],
        symbol: "ETH",
        decimals: 18
      }
    }
  },
  cfx_deployments: {
    netId1: {
      cfx: {
        instanceAddress: {
          0.1: "CFXTEST:TYPE.CONTRACT:ACDRTV3BAGBU1NC9EDTFGJG159W851EJ8P5X5XY7FK",
          1: "CFXTEST:TYPE.CONTRACT:ACEHH675VWMEP9EDSPMD0RWRHDZBZ27Y8UF0HTRHD8",
          10: "CFXTEST:TYPE.CONTRACT:ACC5DMMJXGMZZCN410TEX3UAH25SV64D7A44A63PBJ",
          100: "CFXTEST:TYPE.CONTRACT:ACFWCW5XTTUZ5K629C339U034TSZ5B9GWEEH7ZPPX1",
        },
        abi: [
          {
            inputs: [
              {
                internalType: "contract IVerifier",
                name: "_verifier",
                type: "address",
              },
              {
                internalType: "contract IHasher",
                name: "_hasher",
                type: "address",
              },
              {
                internalType: "contract ISacredTrees",
                name: "_logger",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_denomination",
                type: "uint256",
              },
              {
                internalType: "uint32",
                name: "_merkleTreeHeight",
                type: "uint32",
              },
              { internalType: "address", name: "_operator", type: "address" },
            ],
            stateMutability: "payable",
            type: "constructor",
            payable: true,
            signature: "constructor",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "bytes32",
                name: "commitment",
                type: "bytes32",
              },
              {
                indexed: false,
                internalType: "uint32",
                name: "leafIndex",
                type: "uint32",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
              },
            ],
            name: "Deposit",
            type: "event",
            signature:
              "0xa945e51eec50ab98c161376f0db4cf2aeba3ec92755fe2fcd388bdbbb80ff196",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes",
                name: "encryptedNote",
                type: "bytes",
              },
            ],
            name: "EncryptedNote",
            type: "event",
            signature:
              "0xfa28df43db3553771f7209dcef046f3bdfea15870ab625dcda30ac58b82b4008",
          },
          {
            anonymous: false,
            inputs: [],
            name: "NotStaking",
            type: "event",
            signature:
              "0x890fec52248343eac2342cab42d184caa27f8397618ee32e642e9ca1fd66ae8e",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "nullifierHash",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "address",
                name: "relayer",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "fee",
                type: "uint256",
              },
            ],
            name: "Withdrawal",
            type: "event",
            signature:
              "0xe9e508bad6d4c3227e881ca19068f099da81b5164dd6d62b2eaf1e8bc6c34931",
          },
          {
            inputs: [],
            name: "FIELD_SIZE",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x414a37ba",
          },
          {
            inputs: [],
            name: "ROOT_HISTORY_SIZE",
            outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xcd87a3b4",
          },
          {
            inputs: [],
            name: "STAKING",
            outputs: [
              { internalType: "contract Staking", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x97610f30",
          },
          {
            inputs: [],
            name: "ZERO_VALUE",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xec732959",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_newOperator",
                type: "address",
              },
            ],
            name: "changeOperator",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
            signature: "0x06394c9b",
          },
          {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "commitmentHistory",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x9f2944c1",
          },
          {
            inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            name: "commitments",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x839df945",
          },
          {
            inputs: [],
            name: "currentRootIndex",
            outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x90eeb02b",
          },
          {
            inputs: [],
            name: "denomination",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x8bca6d16",
          },
          {
            inputs: [
              { internalType: "bytes32", name: "_commitment", type: "bytes32" },
            ],
            name: "deposit",
            outputs: [],
            stateMutability: "payable",
            type: "function",
            payable: true,
            signature: "0xb214faa5",
          },
          {
            inputs: [],
            name: "deposited_balance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x529db601",
          },
          {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "filledSubtrees",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xf178e47c",
          },
          {
            inputs: [
              { internalType: "uint256", name: "start", type: "uint256" },
              { internalType: "uint256", name: "end", type: "uint256" },
            ],
            name: "getCommitmentHistory",
            outputs: [
              { internalType: "bytes32[]", name: "", type: "bytes32[]" },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x04957e72",
          },
          {
            inputs: [],
            name: "getLastRoot",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xba70f757",
          },
          {
            inputs: [
              { internalType: "bytes32", name: "_left", type: "bytes32" },
              { internalType: "bytes32", name: "_right", type: "bytes32" },
            ],
            name: "hashLeftRight",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x38bf282e",
          },
          {
            inputs: [],
            name: "hasher",
            outputs: [
              { internalType: "contract IHasher", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xed33639f",
          },
          {
            inputs: [
              { internalType: "bytes32", name: "_root", type: "bytes32" },
            ],
            name: "isKnownRoot",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x6d9833e3",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "_nullifierHash",
                type: "bytes32",
              },
            ],
            name: "isSpent",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xe5285dcc",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "_nullifierHashes",
                type: "bytes32[]",
              },
            ],
            name: "isSpentArray",
            outputs: [
              { internalType: "bool[]", name: "spent", type: "bool[]" },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x9fa12d0b",
          },
          {
            inputs: [],
            name: "levels",
            outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x4ecf518b",
          },
          {
            inputs: [],
            name: "logger",
            outputs: [
              {
                internalType: "contract ISacredTrees",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xf24ccbfe",
          },
          {
            inputs: [],
            name: "nextIndex",
            outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xfc7e9c6f",
          },
          {
            inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            name: "nullifierHashes",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x17cc915c",
          },
          {
            inputs: [],
            name: "operator",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x570ca735",
          },
          {
            inputs: [
              { internalType: "bytes32", name: "_addr", type: "bytes32" },
            ],
            name: "resolve",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "pure",
            type: "function",
            constant: true,
            signature: "0x5c23bdf5",
          },
          {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "roots",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xc2b40ae4",
          },
          {
            inputs: [
              { internalType: "address", name: "_newLogger", type: "address" },
            ],
            name: "updateLogger",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
            signature: "0xec399cd5",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_newVerifier",
                type: "address",
              },
            ],
            name: "updateVerifier",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
            signature: "0x97fc007c",
          },
          {
            inputs: [],
            name: "verifier",
            outputs: [
              { internalType: "contract IVerifier", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x2b7ac3f3",
          },
          {
            inputs: [
              { internalType: "bytes", name: "_proof", type: "bytes" },
              { internalType: "bytes32", name: "_root", type: "bytes32" },
              {
                internalType: "bytes32",
                name: "_nullifierHash",
                type: "bytes32",
              },
              {
                internalType: "address payable",
                name: "_recipient",
                type: "address",
              },
              {
                internalType: "address payable",
                name: "_relayer",
                type: "address",
              },
              { internalType: "uint256", name: "_fee", type: "uint256" },
              { internalType: "uint256", name: "_refund", type: "uint256" },
            ],
            name: "withdraw",
            outputs: [],
            stateMutability: "payable",
            type: "function",
            payable: true,
            signature: "0x21a0adb6",
          },
          {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "zeros",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xe8295588",
          },
          {
            inputs: [
              { internalType: "address payable", name: "_to", type: "address" },
              { internalType: "uint256", name: "_balance", type: "uint256" },
            ],
            name: "withdraw_interest",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
            signature: "0xe2d1573a",
          },
          {
            inputs: [
              { internalType: "address payable", name: "_to", type: "address" },
            ],
            name: "withdraw_all_interest",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
            signature: "0xd804e5e0",
          },
        ],
        symbol: "CFX",
        decimals: 18,
      },
      dai: {
        instanceAddress: {
          0.1: "CFXTEST:TYPE.CONTRACT:ACGTYCXRG1B7JKGWKXXB22BH99Z9REZYF2UHVU1BWM",
        },
        tokenAddress:
          "CFXTEST:TYPE.CONTRACT:ACBA39P65HTM82Y90UJCA50YSKV5R7PDDP0Y1PKHRP",
        symbol: "DAI",
        decimals: 18,
      },
    },
    netId1029: {
      cfx: {
        instanceAddress: {
          10: "CFXTEST:TYPE.CONTRACT:ACDRTV3BAGBU1NC9EDTFGJG159W851EJ8P5X5XY7FK",
          100: "CFXTEST:TYPE.CONTRACT:ACEHH675VWMEP9EDSPMD0RWRHDZBZ27Y8UF0HTRHD8",
          1000: "CFXTEST:TYPE.CONTRACT:ACC5DMMJXGMZZCN410TEX3UAH25SV64D7A44A63PBJ",
          10000: "CFXTEST:TYPE.CONTRACT:ACFWCW5XTTUZ5K629C339U034TSZ5B9GWEEH7ZPPX1",
        },
        abi: [
          {
            inputs: [
              {
                internalType: "contract IVerifier",
                name: "_verifier",
                type: "address",
              },
              {
                internalType: "contract IHasher",
                name: "_hasher",
                type: "address",
              },
              {
                internalType: "contract ISacredTrees",
                name: "_logger",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_denomination",
                type: "uint256",
              },
              {
                internalType: "uint32",
                name: "_merkleTreeHeight",
                type: "uint32",
              },
              { internalType: "address", name: "_operator", type: "address" },
            ],
            stateMutability: "payable",
            type: "constructor",
            payable: true,
            signature: "constructor",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "bytes32",
                name: "commitment",
                type: "bytes32",
              },
              {
                indexed: false,
                internalType: "uint32",
                name: "leafIndex",
                type: "uint32",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
              },
            ],
            name: "Deposit",
            type: "event",
            signature:
              "0xa945e51eec50ab98c161376f0db4cf2aeba3ec92755fe2fcd388bdbbb80ff196",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes",
                name: "encryptedNote",
                type: "bytes",
              },
            ],
            name: "EncryptedNote",
            type: "event",
            signature:
              "0xfa28df43db3553771f7209dcef046f3bdfea15870ab625dcda30ac58b82b4008",
          },
          {
            anonymous: false,
            inputs: [],
            name: "NotStaking",
            type: "event",
            signature:
              "0x890fec52248343eac2342cab42d184caa27f8397618ee32e642e9ca1fd66ae8e",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "nullifierHash",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "address",
                name: "relayer",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "fee",
                type: "uint256",
              },
            ],
            name: "Withdrawal",
            type: "event",
            signature:
              "0xe9e508bad6d4c3227e881ca19068f099da81b5164dd6d62b2eaf1e8bc6c34931",
          },
          {
            inputs: [],
            name: "FIELD_SIZE",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x414a37ba",
          },
          {
            inputs: [],
            name: "ROOT_HISTORY_SIZE",
            outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xcd87a3b4",
          },
          {
            inputs: [],
            name: "STAKING",
            outputs: [
              { internalType: "contract Staking", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x97610f30",
          },
          {
            inputs: [],
            name: "ZERO_VALUE",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xec732959",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_newOperator",
                type: "address",
              },
            ],
            name: "changeOperator",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
            signature: "0x06394c9b",
          },
          {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "commitmentHistory",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x9f2944c1",
          },
          {
            inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            name: "commitments",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x839df945",
          },
          {
            inputs: [],
            name: "currentRootIndex",
            outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x90eeb02b",
          },
          {
            inputs: [],
            name: "denomination",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x8bca6d16",
          },
          {
            inputs: [
              { internalType: "bytes32", name: "_commitment", type: "bytes32" },
            ],
            name: "deposit",
            outputs: [],
            stateMutability: "payable",
            type: "function",
            payable: true,
            signature: "0xb214faa5",
          },
          {
            inputs: [],
            name: "deposited_balance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x529db601",
          },
          {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "filledSubtrees",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xf178e47c",
          },
          {
            inputs: [
              { internalType: "uint256", name: "start", type: "uint256" },
              { internalType: "uint256", name: "end", type: "uint256" },
            ],
            name: "getCommitmentHistory",
            outputs: [
              { internalType: "bytes32[]", name: "", type: "bytes32[]" },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x04957e72",
          },
          {
            inputs: [],
            name: "getLastRoot",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xba70f757",
          },
          {
            inputs: [
              { internalType: "bytes32", name: "_left", type: "bytes32" },
              { internalType: "bytes32", name: "_right", type: "bytes32" },
            ],
            name: "hashLeftRight",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x38bf282e",
          },
          {
            inputs: [],
            name: "hasher",
            outputs: [
              { internalType: "contract IHasher", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xed33639f",
          },
          {
            inputs: [
              { internalType: "bytes32", name: "_root", type: "bytes32" },
            ],
            name: "isKnownRoot",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x6d9833e3",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "_nullifierHash",
                type: "bytes32",
              },
            ],
            name: "isSpent",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xe5285dcc",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "_nullifierHashes",
                type: "bytes32[]",
              },
            ],
            name: "isSpentArray",
            outputs: [
              { internalType: "bool[]", name: "spent", type: "bool[]" },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x9fa12d0b",
          },
          {
            inputs: [],
            name: "levels",
            outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x4ecf518b",
          },
          {
            inputs: [],
            name: "logger",
            outputs: [
              {
                internalType: "contract ISacredTrees",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xf24ccbfe",
          },
          {
            inputs: [],
            name: "nextIndex",
            outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xfc7e9c6f",
          },
          {
            inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            name: "nullifierHashes",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x17cc915c",
          },
          {
            inputs: [],
            name: "operator",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x570ca735",
          },
          {
            inputs: [
              { internalType: "bytes32", name: "_addr", type: "bytes32" },
            ],
            name: "resolve",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "pure",
            type: "function",
            constant: true,
            signature: "0x5c23bdf5",
          },
          {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "roots",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xc2b40ae4",
          },
          {
            inputs: [
              { internalType: "address", name: "_newLogger", type: "address" },
            ],
            name: "updateLogger",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
            signature: "0xec399cd5",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_newVerifier",
                type: "address",
              },
            ],
            name: "updateVerifier",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
            signature: "0x97fc007c",
          },
          {
            inputs: [],
            name: "verifier",
            outputs: [
              { internalType: "contract IVerifier", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0x2b7ac3f3",
          },
          {
            inputs: [
              { internalType: "bytes", name: "_proof", type: "bytes" },
              { internalType: "bytes32", name: "_root", type: "bytes32" },
              {
                internalType: "bytes32",
                name: "_nullifierHash",
                type: "bytes32",
              },
              {
                internalType: "address payable",
                name: "_recipient",
                type: "address",
              },
              {
                internalType: "address payable",
                name: "_relayer",
                type: "address",
              },
              { internalType: "uint256", name: "_fee", type: "uint256" },
              { internalType: "uint256", name: "_refund", type: "uint256" },
            ],
            name: "withdraw",
            outputs: [],
            stateMutability: "payable",
            type: "function",
            payable: true,
            signature: "0x21a0adb6",
          },
          {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "zeros",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
            constant: true,
            signature: "0xe8295588",
          },
          {
            inputs: [
              { internalType: "address payable", name: "_to", type: "address" },
              { internalType: "uint256", name: "_balance", type: "uint256" },
            ],
            name: "withdraw_interest",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
            signature: "0xe2d1573a",
          },
          {
            inputs: [
              { internalType: "address payable", name: "_to", type: "address" },
            ],
            name: "withdraw_all_interest",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
            signature: "0xd804e5e0",
          },
        ],
        symbol: "CFX",
        decimals: 18,
      },
      dai: {
        instanceAddress: {
          0.1: "CFXTEST:TYPE.CONTRACT:ACGTYCXRG1B7JKGWKXXB22BH99Z9REZYF2UHVU1BWM",
        },
        tokenAddress:
          "CFXTEST:TYPE.CONTRACT:ACBA39P65HTM82Y90UJCA50YSKV5R7PDDP0Y1PKHRP",
        symbol: "DAI",
        decimals: 18,
      },
    },
  },
};

export { deployments };
