import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { parseNote, toHex } from "../conflux/utils";
import { useState } from "react";
import { deployments } from "../conflux/config";
import arrowReturn from "../images/arrow_return.svg";
import { useHistory } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
const { format } = require("js-conflux-sdk");
const Web3 = require("web3");
const web3 = window.web3 ? new Web3( window.web3.currentProvider) : null;

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
  },
  inspect: {
    position: "relative",
    left: "-20%",
  },
  return: {
    position: "absolute",
    right: "100%",
    fontSize: "23px",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);

const InspectMain = () => {
  const classes = useStyles();
  const history = useHistory();
  const { chainId } = useWeb3React();

  const [status, setStatus] = useState();
  const [displayDepositInfo, setDisplayDepositInfo] = useState(false);
  const [parsedNote, setParsedNote] = useState();
  const [txLayers, setTxLayers] = useState();

  const handleWithdrawRoute = () => {
    history.push("/walletmanagement");
  };

  //TODO code duplication in this function
  const handleInspect = async (e) => {
    let claim = e.target.value;

    let parsedNote;

    try {
      parsedNote = parseNote(claim);
    } catch (err) {
      console.log("The note has invalid format");
      setStatus("This Claim is invalid");
      setDisplayDepositInfo(false);

      return false;
    }

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
    const events = await sacred.getPastEvents('Deposit', { fromBlock: 0, toBlock: 'latest' })
    const leaves = events
      .sort((a, b) => a.returnValues.leafIndex - b.returnValues.leafIndex) // Sort events in chronological order
      .map(e => e.returnValues.commitment)
    
    // Find current commitment in the tree
    const depositEvent = events.find(e => e.returnValues.commitment === toHex(deposit.commitment))
    const leafIndex = depositEvent ? depositEvent.returnValues.leafIndex : -1

    // Validate that our data is correct
    const isSpent = await sacred.methods.isSpent(toHex(deposit.nullifierHash)).call()

    if (isSpent) {
      setStatus("This Claim has been Withdrawn");
      setDisplayDepositInfo(false);
      return;
    }

    if (leafIndex >= 0) {
      setStatus("This Claim is in Sacred");
      setParsedNote(parsedNote);
      setTxLayers(leaves.length - leafIndex - 1);
      setDisplayDepositInfo(true);
    } else {
      setStatus("This Claim does not exist in Sacred");
      setDisplayDepositInfo(false);
    }

  };

  //TODO: grid elements code duplication. should have a component to reuse in Depositsuccess, a few withdraw pages and Inspect
  return (
    <div className={classes.inspect}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <h1>Inspect Claim</h1>
        </Grid>
        <div className={classes.return} onClick={handleWithdrawRoute}>
          <img src={arrowReturn} alt="return" />
          <br></br>return
        </div>

        <Grid item xs={12}>
          <CssTextField
            className={classes.textField}
            InputProps={{
              className: classes.input,
              disableUnderline: true,
            }}
            placeholder="Paste your Sacred Claim to check status..."
            variant="filled"
            onChange={handleInspect}
          />
        </Grid>

        <Grid item xs={12}>
          <h3 className="blue-text">
            {status ? status : <span>&nbsp;&nbsp;</span>}
          </h3>
        </Grid>

        {displayDepositInfo && (
          <Grid item container xs={12} direction="row" spacing={0}>
            <Grid item xs={5}>
              <Grid item container xs={12} direction="column" spacing={4}>
                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justify="space-between"
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
                        <small>Deposit</small>
                      </Grid>
                      <Grid item className="blue-text">
                        Verified
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className="blue-text">
                    <h2>
                      {parsedNote.amount} {parsedNote.currency.toUpperCase()}
                    </h2>
                  </Grid>
                </Grid>

                {/* <Grid item xs={12}
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
                    <small>Date</small>
                  </Grid>
                  <Grid item
                    container
                    direction="row"
                    justify="flex-start"
                    spacing={2}
                    xs={9}
                  >
                    <small>Jan 20, 2021, 4:03 PM EST</small>
                  </Grid>
                </Grid> */}

                {/* <Grid item xs={12}
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
                    <small>Transaction</small>
                  </Grid>
                  <Grid item
                    container
                    direction="row"
                    justify="flex-start"
                    spacing={2}
                    xs={9}
                  >
                    <small>0x23g45g59fm30vm40504l34m942j</small>
                  </Grid>
                </Grid> */}

                {/* <Grid item xs={12}
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
                    <small>0x23g45g59fm30vm40504l34m942j</small>
                  </Grid>
                </Grid> */}

                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <Grid
                    item
                    container
                    direction="row"
                    justify="flex-end"
                    spacing={2}
                    xs={3}
                  >
                    <small>Commitment</small>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    justify="flex-start"
                    spacing={2}
                    xs={9}
                  >
                    <small style={{ overflowWrap: "anywhere" }}>
                      {parsedNote.deposit.commitmentHex}
                    </small>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={5}>
              <Grid item container xs={12} direction="column" spacing={4}>
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

export default InspectMain;
