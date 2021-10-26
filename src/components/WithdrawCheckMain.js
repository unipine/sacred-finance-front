import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import { deployments } from "../conflux/config";
import DepositInfo from "./DepositInfo";
import { useWeb3React } from "@web3-react/core";

const Web3 = require("web3");
const web3 = window.web3 ? new Web3(window.web3.currentProvider) : null;

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    minWidth: 600,
    width: "100%",
    "& .MuiInputBase-input": {
      marginLeft: "10px",
      marginBottom: "10px",
    },
  },
  input: {
    color: "#ffffff",
    fontSize: "23px",
    fontFamily: "Montserrat",
    borderRadius: "35px",
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#ffffff",
      borderBottomColor: "#ffffff",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ffffff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ffffff",
      },
      "&:hover fieldset": {
        borderColor: "#ffffff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffffff",
      },
    },
  },
})(TextField);

const WithdrawCheckMain = ({
  isSpent,
  claim,
  isExist,
  parsedNote,
  txLayers,
}) => {
  const classes = useStyles();
  const { chainId } = useWeb3React();

  let titleText = "";

  const [depositData, setDepositData] = useState();

  const getDepositData = async() => {
    let _deployment =
      deployments.eth_deployments[`netId${chainId}`][
      parsedNote.currency.toLowerCase()
      ];

    const deployment = {
      address: _deployment.instanceAddress[parsedNote.amount],
      abi: _deployment.abi,
      symbol: _deployment.symbol,
      amount: parsedNote.amount,
    };

    // Get all deposit events from smart contract and assemble merkle tree from them
    console.log('Getting current state from sacred contract')
    const deposit = parsedNote.deposit;

    const sacred = new web3.eth.Contract(deployment.abi, deployment.address)

    try {
      const eventWhenHappened = await sacred.getPastEvents('Deposit', {
        filter: {
          commitment: deposit.commitmentHex
        },
        fromBlock: 0,
        toBlock: 'latest'
      })

      console.log('eventWhenHappened', eventWhenHappened);

      if (eventWhenHappened.length === 0) {
        throw new Error('There is no related deposit, the note is invalid')
      }
  
      const { timestamp } = eventWhenHappened[0].returnValues
      const transactionHash = eventWhenHappened[0].transactionHash
      const receipt = await web3.eth.getTransactionReceipt(transactionHash)
  
      setDepositData({ timestamp, transactionHash, from: receipt.from });
    } catch (e) {
      console.error('loadDepositData', e)
    }
  }

  if (isSpent) {
    titleText = <h1>This Claim has been Withdrawn</h1>;
  } else if (!isExist) {
    titleText = <h1>This Claim does not exist in Sacred</h1>;
  } else {
    titleText = <h1>This Claim is in Sacred</h1>;
  }

  useEffect(() => {
    getDepositData();
  }, [])

  //TODO: grid elements code duplication. should have a component to reuse in Depositsuccess, a few withdraw pages and Inspect
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          {titleText}
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            className={classes.textField}
            InputProps={{
              className: classes.input,
              disableUnderline: true,
            }}
            value={claim}
            variant="filled"
            fullWidth
          />
        </Grid>

        {!((isSpent && isExist) || !isExist) && (
          <Grid item container xs={12} direction="row" spacing={2}>
            <Grid item xs={6}>
              <DepositInfo txReceipt={depositData} deposit={parsedNote.deposit} amount={parsedNote.amount + ' ' + parsedNote.currency.toUpperCase()}/>
            </Grid>

            <Grid item xs={6}>
              <Grid item container xs={12} direction="column" spacing={2}>
                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  // justify="space-between"
                  spacing={3}
                  alignItems="center"
                >
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      spacing={0}
                      alignItems="flex-start"
                    >
                      <Grid item>
                        <small>Your Claim's</small>
                      </Grid>
                      <Grid item className="blue-text">
                        Privacy Indicator
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      spacing={0}
                      direction="column"
                      alignItems="flex-start"
                    >
                      <Grid item className="blue-text">
                        <h2 style={{ fontSize: "250%", lineHeight: "0" }}>
                          {txLayers * 100 > 1000 ? "1000" : txLayers * 100}
                        </h2>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid
                    item
                    container
                    direction="row"
                    justify="flex-start"
                    spacing={2}
                    xs={5}
                  >
                    <small>
                      Not Private: <b>0-300</b>
                    </small>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    justify="flex-start"
                    spacing={2}
                    xs={7}
                  >
                    <small>
                      Securely Private: <b>400-1000</b>
                    </small>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  This claim has been layered further by&nbsp;
                  <b>{txLayers} transactions</b>
                </Grid>
                {/* 
                <Grid item xs={12}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item
                    container
                    direction="row"
                    justify="flex-end"
                    spacing={2}
                    xs={3}
                  >
                    <small>From</small>
                  </Grid>
                  <Grid item
                    container
                    direction="row"
                    justify="flex-start"
                    spacing={2}
                    xs={9}
                  >
                    <small>asdf</small>
                  </Grid>
                </Grid>
                <Grid item xs={12}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item
                    container
                    direction="row"
                    justify="flex-end"
                    spacing={2}
                    xs={3}
                  >
                    <small>Commitment</small>
                  </Grid>
                  <Grid item
                    container
                    direction="row"
                    justify="flex-start"
                    spacing={2}
                    xs={9}
                  >
                    <small>asdf</small>
                  </Grid>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default WithdrawCheckMain;