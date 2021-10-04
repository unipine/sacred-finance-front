import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core/styles";
import { init, generateProof } from "../conflux/utils";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import {
  fromHexString,
  toHex,
  fromDecimals,
  waitForTxReceipt,
} from "../conflux/utils";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState } from "react";
const Web3 = require("web3");
const web3 = new Web3(window.web3.currentProvider);

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    42, // Kovan Testnetwork
  ],
});

const useStyles = makeStyles((theme) => ({
  headerBtn: {
    marginTop: "-10px",
    fontSize: "20px",
    fontFamily: "Montserrat",
    textTransform: "none",
    fontWeight: "bold",
  },
}));

const WithdrawConfirm = ({
  parsedNote,
  recipient,
  handleTransaction,
  deployment,
  handleAlert,
  relayerOption
}) => {
  const { activate, active, account } = useWeb3React();
  const history = useHistory();

  const [btnDisable, setBtnDisable] = useState(false);

  const classes = useStyles();

  const handleClick = async () => {
    if (!active) {
      activate(injectedConnector);
      return;
    }

    // Begin zk proof
    setBtnDisable(true);

    let deposit = parsedNote.deposit;
    let refund = "0"; // No refund for ETH
    await init(deployment);
    const { proof, args } = await generateProof({ deposit, recipient, refund });

    const contract = new web3.eth.Contract(deployment.abi, deployment.address);

    // const _fee = parseInt(args[4], 16);
    // const _refund = parseInt(args[5], 16);

    try {
      const tx = await contract.methods
        .withdraw(proof, ...args)
        .send({ from: account, value: refund.toString() })
        .on("transactionHash", function (hash) {
          console.log("Submitting withdraw transaction");
          // Loading screen
          history.push("/withdrawWorking");
          console.log("transactionHash: ", hash);
        })
        // .on("confirmation", function (confirmationNumber, receipt) {
        //   console.log("confirmationNumber: ", confirmationNumber);
        // })
        .on("receipt", function (receipt) {
          console.log("receipt: ", receipt);
        });

      const receipt = await waitForTxReceipt({ txHash: tx.transactionHash });

      const blockInfo = await web3.eth.getBlock(receipt.blockNumber);
      receipt.timestamp = blockInfo.timestamp;

      handleTransaction(receipt);

      history.push("/withdrawSuccess");


        // CONFLUX
      // //TODO streamline the transaction execution
      // const transactionHash = await pendingTransaction; // send and await endpoint return transaction hash
      // console.log("transaction: ", transactionHash);

      // // Loading screen
      // history.push("/withdrawWorking");

      // // usually wait about 2 seconds
      // const packedTransaction = await pendingTransaction.get(); // await endpoint packed transaction
      // console.log("packed tx: ", packedTransaction); // `blockHash` might still be `null`

      // // usually wait about 5 seconds
      // const minedTransaction = await pendingTransaction.mined(); // await transaction mined
      // console.log("mined tx: ", minedTransaction); // already have `blockHash`

      // // usually wait about 10 seconds
      // const executedReceipt = await pendingTransaction.executed(); // await transaction executed
      // console.log("executed receipt: ", executedReceipt); // if `outcomeStatus` equal 0, return receipt, else throw error

      // // usually wait about 50 seconds
      // const confirmedReceipt = await pendingTransaction.confirmed(); // await transaction confirmed
      // console.log("confirmed receipt: ", confirmedReceipt); // usually same as executedReceipt, but transaction block risk is <= 1e-8

      // const blockInfo = await window.confluxJS.getBlockByEpochNumber(
      //   confirmedReceipt.epochNumber
      // );

      // confirmedReceipt.timestamp = blockInfo.timestamp;

      // handleTransaction(confirmedReceipt);

      // history.push("/withdrawSuccess");
    } catch (error) {
      console.log("Caught error: ", error.message);
      setBtnDisable(false);

      if (error.message.indexOf("Transaction has been reverted by the EVM") >= 0){
        handleAlert("Error: Transaction has been reverted by the EVM")
        history.push("/withdrawCheck")
      }

    }
  };

  const handleWithdrawRoute = () => {
    history.push("/withdraw");
  };

  return (
    <div>
      <Paper>
        <Box p={3}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              container
              direction="row"
              spacing={0}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="text"
                  startIcon={<ArrowBackIosIcon />}
                  className={classes.headerBtn}
                  style={{ color: "#A7A9AC" }}
                  onClick={handleWithdrawRoute}
                >
                  <b>Back</b>
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <br />
              <br />
              <br />
              <br />
              <b>You are about to...</b>
            </Grid>
            <Grid item>Withdraw</Grid>
            <Grid item>
              <span style={{ fontSize: "23px" }} className="blue-text">
                <b>{`${deployment.amount} ${deployment.symbol}`}</b>
              </span>
            </Grid>
            <Grid item>
              <br />
              <br />
              <br />
              <br />
              <br />
              <Button
                variant="contained"
                color="secondary"
                style={{ textTransform: "none", fontWeight: "bold" }}
                fullWidth
                onClick={handleClick}
                disabled={btnDisable}
              >
                Confirm Withdraw
              </Button>
            </Grid>
            <Grid item>
              <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace(
                ".",
                ""
              )}.sacred.eth`}</small>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default WithdrawConfirm;
