import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import { fromHexString, toHex, fromDecimals, waitForTxReceipt } from "../conflux/utils";
import { useWeb3React } from "@web3-react/core";
import { format } from "js-conflux-sdk";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState } from "react";

const Web3Utils = require("web3-utils");
const Web3 = require("web3");
const web3 = window.web3 ? new Web3(window.web3.currentProvider) : null;

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    42, // Kovan Testnetwork
  ],
});


const DepositConfirm = ({ deposit, handleTransaction, deployment }) => {
  const history = useHistory();
  const { activate, active, account } = useWeb3React();
  const [btnDisable, setBtnDisable] = useState(false);

  const handleClick = async () => {
    if (!active) {
      activate(injectedConnector);
      return;
    }

    setBtnDisable(true);

    // const contract = window.confluxJS.Contract({
    //   address: deployment.address,
    //   abi: deployment.abi
    // });
    const contract = new web3.eth.Contract(deployment.abi, deployment.address);

    const amount = deployment.amount;
    const value = fromDecimals({ amount, decimals: 18 });
    // const value = format.bigInt(Web3Utils.toWei(amount));

    try {
      const tx = await contract.methods
        .deposit(toHex(deposit.commitment))
        .send({ value, from: account })
        .on("transactionHash", function (hash) {
          console.log("transactionHash: ", hash);

          // Loading screen
          history.push("/depositWorking");
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

      history.push("/depositSuccess");

      // CONFLUX
      // //TODO: streamline the tx execution
      // const transactionHash = await pendingTransaction; // send and await endpoint return transaction hash
      // console.log('transaction: ', transactionHash);

      // // usually wait about 2 seconds
      // const packedTransaction = await pendingTransaction.get(); // await endpoint packed transaction
      // console.log('packed tx: ', packedTransaction); // `blockHash` might still be `null`

      // // usually wait about 5 seconds
      // const minedTransaction = await pendingTransaction.mined(); // await transaction mined
      // console.log('mined tx: ', minedTransaction); // already have `blockHash`

      // // usually wait about 10 seconds
      // const executedReceipt = await pendingTransaction.executed(); // await transaction executed
      // console.log('executed receipt: ', executedReceipt); // if `outcomeStatus` equal 0, return receipt, else throw error

      // // usually wait about 50 seconds
      // const confirmedReceipt = await pendingTransaction.confirmed(); // await transaction confirmed
      // console.log('confirmed receipt: ', confirmedReceipt); // usually same as executedReceipt, but transaction block risk is <= 1e-8
    } catch (error) {
      console.log("Caught error: ", error.message);
      setBtnDisable(false);
    }
  };

  const handleDepositRoute = () => {
    history.push("/deposit");
  };

  return (
    <div>
      <Paper>
        <Box p={2}>
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
                  onClick={handleDepositRoute}
                >
                  <b>Back</b>
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <br />
              <b>All set!</b>
            </Grid>
            <Grid item>
              <br />
              You are about to Deposit
              <br />
              <br />
              <span style={{ fontSize: "23px" }} className="blue-text">
                <b>{`${deployment.amount} ${deployment.symbol}`}</b>
              </span>
              <br />
              <br />
              into Sacred Box
            </Grid>
            <Grid item>
              <br />
              Ensure you have saved your Sacred Claim somewhere safe.{" "}
              <b>It is required to retrieve your funds.</b>
            </Grid>
            <Grid item>
              <br />
              <Button
                variant="contained"
                color="secondary"
                style={{ textTransform: "none", fontWeight: "bold" }}
                fullWidth
                onClick={handleClick}
                disabled={btnDisable}
              >
                Deposit
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

export default DepositConfirm;
