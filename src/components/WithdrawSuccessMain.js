import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DepositInfo from "./DepositInfo";
import Grid from "@material-ui/core/Grid";
import arrow from "../images/arrow_right.svg";
import { useTranslation } from "react-i18next";

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
  textAlignStyle: {
    paddingTop: '4px',
    textAlign: 'left',
    overflowWrap: "anywhere"
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
  const { t } = useTranslation();

  console.log('txReceipt', txReceipt);

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
          <h1>{t("This Claim is Withdrawn!")}</h1>
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
            <DepositInfo txReceipt={txReceipt} deposit={parsedNote.deposit} amount={parsedNote.amount + ' ' + parsedNote.currency.toUpperCase()} />
          </Grid>
          <Grid item xs={1} container justify="center" alignItems="center">
            <img src={arrow} alt="arrow" />
          </Grid>
          <Grid item xs={5}>
            <Grid item container xs={12} direction="column" spacing={2}>
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
                      <small>{t("Withdrawal")}</small>
                    </Grid>
                    <Grid item className="blue-text">
                      {t("Verified")}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="blue-text">
                  <h2>
                    - {txReceipt?.events?.Withdrawal?.returnValues?.fee} {parsedNote.currency.toUpperCase()}
                  </h2>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
              >
                <small>{t("Date")}</small>
                <small className={classes.textAlignStyle}>
                  {new Date(txReceipt.timestamp * 1000).toUTCString()}
                </small>
              </Grid>

              <Grid
                item
                xs={12}
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
              >
                <small>{t("Transaction")}</small>
                <small className={classes.textAlignStyle}>
                  {txReceipt.transactionHash}
                </small>
              </Grid>

              <Grid
                item
                xs={12}
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
              >
                <small>{t("To")}</small>
                <small className={classes.textAlignStyle}>
                  {txReceipt.to.toLowerCase()}
                </small>
              </Grid>

              <Grid
                item
                xs={12}
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
              >
                <small>{t("Nullifier Hash")}</small>
                <small className={classes.textAlignStyle}>
                  {txReceipt?.events?.Withdrawal?.returnValues?.nullifierHash}
                </small>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default WithdrawSuccessMain;
