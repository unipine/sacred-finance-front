import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DepositInfo from "./DepositInfo";
import Grid from "@material-ui/core/Grid";
import arrow from "../images/arrow_right.svg";

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

const WithdrawSuccessMain = ({ claim, parsedNote, txReceipt }) => {
  const classes = useStyles();

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
          <h1>This Claim is Withdrawn!</h1>
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
          />
        </Grid>

        <Grid item container xs={12} direction="row" spacing={2}>
          <Grid item xs={5}>
            <DepositInfo txReceipt={txReceipt} deposit={parsedNote.deposit} amount={parsedNote.amount + ' ' + parsedNote.currency.toUpperCase()}/>
          </Grid>
          <Grid item xs={1} container justify="center" alignItems="center">
            <img src={arrow} alt="arrow" />
          </Grid>
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
                      <small>Withdrawal</small>
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
                  justify="flex-end"
                  spacing={2}
                  xs={3}
                >
                  <small>Date</small>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  justify="flex-start"
                  spacing={2}
                  xs={9}
                >
                  <small>
                    {new Date(txReceipt.timestamp * 1000).toUTCString()}
                  </small>
                </Grid>
              </Grid>

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
                  <small>Transaction</small>
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
                    {txReceipt.transactionHash}
                  </small>
                </Grid>
              </Grid>

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
                  alignItems="flex-start"
                  spacing={2}
                  xs={3}
                >
                  <small>From</small>
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
                    {txReceipt.from.toLowerCase()}
                  </small>
                </Grid>
              </Grid>

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
        </Grid>
      </Grid>
    </div>
  );
};

export default WithdrawSuccessMain;
