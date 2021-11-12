import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { parseNote } from "../conflux/utils";
import { useWeb3React } from "@web3-react/core";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import WaitingModal from "./WaitingModal";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

const web3Utils = require("web3-utils");

const CustomButton = styled(Button)`
  margin-top: -10px;
  font-size: 20px;
  font-family: Montserrat;
  texttransform: none;
  fontweight: bold;
`;

const CustomTextField = styled(TextField)`
  margin: ${(props) => props.theme.spacing(1)};
  & .MuiInputBase-input {
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;

const inspect = {
  position: "relative",
  left: "-100%",
  cursor: "pointer",
};

const isLikeBase32Address = (addr) => {
  // this won't return false when there's net1029, net1
  return /^(cfx(test)?|net\d+):(type\.(null|user|contract|builtin):)?[0123456789abcdefghjkmnprstuvwxyz]{42}$/i.test(
    addr
  );
};

const Withdraw = ({
  handleWithdraw,
  deployment,
  handleSetDeployment,
  handleRelayer,
  relayerOption,
}) => {
  const history = useHistory();
  const location = useLocation();
  const { account } = useWeb3React();
  const { t } = useTranslation();

  const [claim, setClaim] = useState("");
  const [recipient, setRecipient] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [waiting, setWaiting] = useState(false);

  async function sendWithdraw() {
    if (await handleWithdraw({ claim, recipient })) {
      history.push("/withdrawCheck");
    }
    setWaiting(false);
  }

  const handleClick = () => {
    setWaiting(true);
  };

  const handleClaim = (e) => {
    setClaim(e.target.value);
  };

  const handleRecipient = (e) => {
    setRecipient(e.target.value);
  };

  const handleDepositRoute = () => {
    history.push("/deposit");
  };

  const handleWithdrawRoute = () => {
    if (location.pathname === "/inspect") history.push("/withdraw");
  };

  const handleCurrentAddress = () => {
    setRecipient(account);
  };

  const handleRelayerOption = (event) => {
    handleRelayer(event.target.checked);
  };

  useEffect(() => {
    if (waiting) {
      sendWithdraw();
    }
  }, [waiting]);

  //TODO optimize this as there's time lag to parse the note
  useEffect(() => {
    if (claim.length > 0 && recipient.length > 0) {
      if (web3Utils.isAddress(recipient)) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }

      try {
        parseNote(claim);
      } catch (err) {
        console.log("The note has invalid format");
        setBtnDisabled(true);
      }
    } else {
      setBtnDisabled(true);
    }
  }, [claim, recipient]);

  return (
    <div
      onClick={handleWithdrawRoute}
      style={location.pathname === "/inspect" ? {position: "relative",
      left: "-100%",
      cursor: "pointer"} : {}}
    >
      <Paper>
        <Box p={3}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              container
              direction="row"
              spacing={0}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <CustomButton
                  variant="text darkBlack"
                  sx={{ color: "#A7A9AC", ml: 0.5 }}
                  onClick={handleDepositRoute}
                >
                  {t("Deposit")}
                </CustomButton>
              </Grid>
              <Grid item>
                <CustomButton
                  variant="text darkBlack"
                  sx={{ mr: 0.5, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  <b>{t("Withdraw")}</b>
                </CustomButton>
              </Grid>
            </Grid>
            <Grid item container direction="row" justifyContent="flex-start">
              <Grid item container direction="column" alignItems="flex-start">
                <br />
                <span style={{ marginLeft: 0.5 }}>{t("Sacred Claim")}</span>
                <CustomTextField
                  variant="filled"
                  size="small"
                  onChange={handleClaim}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container direction="row" justifyContent="flex-start">
              <Grid item container direction="column" alignItems="flex-start">
                <span style={{ marginLeft: 0.5 }}>{t("Recipient Address")}</span>
                <CustomTextField
                  variant="filled"
                  size="small"
                  onChange={handleRecipient}
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                  value={recipient}
                />
                <Grid item container justifyContent="flex-end">
                  <span
                    className="blue-text"
                    onClick={handleCurrentAddress}
                    style={{ cursor: "pointer" }}
                  >
                    <small>
                      <b>Use current address</b>
                    </small>
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <br />
              <br />
              <Button
                variant="contained"
                color="secondary"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                fullWidth
                onClick={handleClick}
                disabled={btnDisabled}
              >
                {t("Continue")}
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
      {waiting && <WaitingModal content="Verifying claim..." />}
    </div>
  );
};

export default Withdraw;
