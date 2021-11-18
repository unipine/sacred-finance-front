import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { parseNote, toHex, loadDepositData } from "../conflux/utils";
import { useState } from "react";
import { deployments } from "../conflux/config";
import arrowReturn from "../images/arrow_return.svg";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import DepositInfo from "./DepositInfo";
import { styled } from "@mui/material/styles";

const { format } = require("js-conflux-sdk");
const Web3 = require("web3");
const web3 = window.web3 ? new Web3(window.web3.currentProvider) : null;

const ReturnIcon = styled(Grid)`
  position: absolute;
  right: 100%;
  font-size: 23px;
  fontweight: bold;
  cursor: pointer;
`;

export const CustomTextField = styled(TextField)`
  margin: ${(props) => props.theme.spacing(1)};
  min-width: 600px;
  width: 100%;
  & .MuiInputBase-input {
    margin-left: 10px;
    margin-bottom: 10px;
    color: #ffffff;
    font-size: 23px;
    font-family: Montserrat;
  }
  & label.Mui-focused {
    color: white;
  }
  &.MuiInput-underline:after {
    border-bottom-color: white;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: white;
    }
    &:hover fieldset {
      border-color: white;
    }
    &.Mui-focused fieldset {
      bordercolor: white;
    }
  }
`;

const InspectMain = ({
  handleSetDeployment,
  handleSetParsedNote,
  handleSetClaim,
  handleTransaction,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation();
  const { chainId } = useWeb3React();

  const [status, setStatus] = useState();
  const [displayDepositInfo, setDisplayDepositInfo] = useState(false);
  const [depositData, setDepositData] = useState();
  const [parsedNote, setParsedNote] = useState();
  const [txLayers, setTxLayers] = useState();

  const handleWithdrawRoute = () => {
    history.push("/withdraw");
  };

  //TODO code duplication in this function
  const handleInspect = async (e) => {
    if (chainId === undefined) return;

    let claim = e.target.value;
    let parsedNote;

    try {
      parsedNote = parseNote(claim);
    } catch (err) {
      console.log("The note has invalid format");
      setStatus(t('claim.invalid'));
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
    console.log("Getting current state from sacred contract");
    const deposit = parsedNote.deposit;

    const sacred = new web3.eth.Contract(deployment.abi, deployment.address);
    const eventWhenHappened = await sacred.getPastEvents("Deposit", {
      filter: {
        commitment: deposit.commitmentHex,
      },
      fromBlock: 0,
      toBlock: "latest",
    });

    const allevents = await sacred.getPastEvents("Deposit", {
      fromBlock: 0,
      toBlock: "latest",
    });

    if (eventWhenHappened.length === 0) {
      console.log("There is no related deposit, the note is invalid");
      setStatus(t('There is no related deposit, the note is invalid'));
      return;
    }

    const leaves = allevents
      .sort((a, b) => a.returnValues.leafIndex - b.returnValues.leafIndex) // Sort events in chronological order
      .map((e) => e.returnValues.commitment);

    // Find current commitment in the tree

    const depositEvent = eventWhenHappened[0];

    console.log("eventWhenHappened", eventWhenHappened);

    const leafIndex = depositEvent ? depositEvent.returnValues.leafIndex : -1;

    const { timestamp } = depositEvent.returnValues;
    const transactionHash = depositEvent.transactionHash;
    const receipt = await web3.eth.getTransactionReceipt(transactionHash);

    const recipient = receipt.from;

    // Validate that our data is correct
    const isSpent = await sacred.methods
      .isSpent(toHex(deposit.nullifierHash))
      .call();

    if (isSpent) {
      setStatus(t('claim.withdrawn'));
      handleSetParsedNote(parsedNote);
      handleSetClaim(claim);

      const events = await sacred.getPastEvents("Withdrawal", {
        fromBlock: 0,
        toBlock: "latest",
      });

      const withdrawEvent = events.filter((event) => {
        return event.returnValues.nullifierHash === deposit.nullifierHex;
      })[0];

      const blockInfo = await web3.eth.getBlock(withdrawEvent.blockNumber);
      
      receipt.timestamp = timestamp;
      receipt.withdrawTimestamp = blockInfo.timestamp;
      receipt.withdrawTransactionHash = withdrawEvent.transactionHash;
      receipt.returnValues = withdrawEvent.returnValues;

      handleTransaction(receipt);
      history.push("/inspectSuccess");
      setDisplayDepositInfo(false);
      return;
    } else {
      if (leafIndex >= 0) {
        setStatus(t('claim.sacred'));
        setParsedNote(parsedNote);
        setTxLayers(leaves.length - leafIndex - 1);
        setDepositData({ timestamp, transactionHash, from: receipt.from });
        setDisplayDepositInfo(true);
      } else {
        setStatus(t('claim.not_exist'));
        setDisplayDepositInfo(false);
      }
    }
  };

  const handleWithdrawClick = () => {
    history.push("/inspectWithdraw");
  };

  //TODO: grid elements code duplication. should have a component to reuse in Depositsuccess, a few withdraw pages and Inspect
  return (
    <div
      style={
        location.pathname === "/inspect"
          ? { position: "relative", left: "-20%" }
          : {}
      }
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <h1>{t("Inspect Claim")}</h1>
        </Grid>
        <ReturnIcon onClick={handleWithdrawRoute}>
          <img src={arrowReturn} alt="return" />
          <br></br>return
        </ReturnIcon>

        <Grid item xs={12}>
          <CustomTextField
            InputProps={{
              disableUnderline: true,
            }}
            placeholder={t('claim.prompt')}
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
          <Grid item container xs={12} direction="row" spacing={4}>
            <Grid item xs={6}>
              <DepositInfo
                txReceipt={depositData}
                deposit={parsedNote.deposit}
                amount={
                  parsedNote.amount + " " + parsedNote.currency.toUpperCase()
                }
              />
            </Grid>

            <Grid item xs={6}>
              <Grid item container xs={12} direction="column" spacing={4}>
                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
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
                        <small>{t('claim.your_claim')}</small>
                      </Grid>
                      <Grid item className="blue-text">
                        {t('claim.indicator')}
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
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid
                    item
                    container
                    direction="row"
                    justifyContent="flex-start"
                    spacing={2}
                    xs={5}
                  >
                    <small>
                      {t('claim.not_private')}: <b>0-300</b>
                    </small>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    justifyContent="flex-start"
                    spacing={2}
                    xs={7}
                  >
                    <small>
                      {t('claim.scure_private')}: <b>400-1000</b>
                    </small>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  {t('claim.layerd_further')}&nbsp;
                  <b>{txLayers} {t('claim.transations')}</b>
                </Grid>
                <Grid
                  item
                  xs={6}
                  container
                  direction="row"
                  justifyContent="flex-start"
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleWithdrawClick}
                  >
                    {t('claim.withdraw')}
                  </Button>
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
