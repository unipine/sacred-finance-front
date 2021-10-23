import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { parseNote } from "../conflux/utils";
import { useWeb3React } from "@web3-react/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import WaitingModal from "./WaitingModal";

const web3Utils = require("web3-utils");

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    "& .MuiInputBase-input": {
      marginLeft: "10px",
      marginBottom: "10px",
    },
  },
  headerBtn: {
    marginTop: "-10px",
    fontSize: "20px",
    fontFamily: "Montserrat",
    textTransform: "none",
    fontWeight: "bold",
  },
  inspect: {
    position: "relative",
    left: "-100%",
    cursor: "pointer",
  },
}));

const isLikeBase32Address = (addr) => {
  // this won't return false when there's net1029, net1
  return /^(cfx(test)?|net\d+):(type\.(null|user|contract|builtin):)?[0123456789abcdefghjkmnprstuvwxyz]{42}$/i.test(
    addr
  );
};

const Withdraw = ({ handleWithdraw, deployment, handleSetDeployment, handleRelayer, relayerOption }) => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const { account } = useWeb3React();

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
  }

  useEffect(() => {
    if (waiting) {
      sendWithdraw();
    }
  }, [waiting])

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
      className={location.pathname === "/inspect" ? classes.inspect : ""}
    >
      <Paper>
        <Box p={3}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              container
              direction="row"
              spacing={0}
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="text"
                  className={classes.headerBtn}
                  style={{ color: "#A7A9AC", marginLeft: "10px" }}
                  onClick={handleDepositRoute}
                >
                  Deposit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  className={classes.headerBtn}
                  style={{ marginRight: "10px" }}
                >
                  <b>Withdraw</b>
                </Button>
              </Grid>
            </Grid>
            <Grid item container direction="row" justify="flex-start">
              <Grid item container direction="column" alignItems="flex-start">
                <br />
                <span style={{ marginLeft: "10px" }}>Sacred Claim</span>
                <TextField
                  className={classes.textField}
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
            <Grid item container direction="row" justify="flex-start">
              <Grid item container direction="column" alignItems="flex-start">
                <span style={{ marginLeft: "10px" }}>Recipient Address</span>
                <TextField
                  className={classes.textField}
                  variant="filled"
                  size="small"
                  onChange={handleRecipient}
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                  value={recipient}
                />
                <Grid item container justify="flex-end">
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
            <Grid item container direction="row" justify="flex-start">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={relayerOption} onChange={handleRelayerOption} />}
                  label="Use Sacred Relayer"
                  disabled={true}
                />
              </FormGroup>
            </Grid>
            <Grid item>
              <br />
              <br />
              <Button
                variant="contained"
                color="secondary"
                style={{ textTransform: "none", fontWeight: "bold" }}
                fullWidth
                onClick={handleClick}
                disabled={btnDisabled}
              >
                Continue
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
      {waiting && <WaitingModal content="Transaction is progressing..."/>}
    </div>
  );
};

export default Withdraw;
