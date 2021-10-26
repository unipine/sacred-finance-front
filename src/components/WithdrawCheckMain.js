import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useWeb3React } from "@web3-react/core";

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

  text: {
    paddingBottom: "4px",
  }
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

  const { account } = useWeb3React();

  let titleText = "";

  const getDateTimeString = () => {
    const today = new Date();
    const monthFullname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let [month, day, year] = [today.getMonth(), today.getDate(), today.getFullYear()];
    let [hours, minutes] = [today.getHours(), today.getMinutes()];
    const timzeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');

    let todayString = monthFullname[Number(month) - 1] + ' ' + day + ', ' + year + ', ' + hours + ':' + minutes + ' ' + ampm + ' EST';

    return todayString;
  }

  if (isSpent) {
    titleText = <h1>This Claim has been Withdrawn</h1>;
  } else if (!isExist) {
    titleText = <h1>This Claim does not exist in Sacred</h1>;
  } else {
    titleText = <h1>This Claim is in Sacred</h1>;
  }

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

        {/* {!((isSpent && isExist) || !isExist) && ( */}
        <Grid item container xs={12} direction="row" justify="center" spacing={3}>
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
                      <small>Deposit</small>
                    </Grid>
                    <Grid item className="blue-text">
                      <h3 style={{ margin: 'inherit' }}>Verified</h3>
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
                direction="column"
                alignItems="flex-start"
                spacing={0}
              >
                <small className={classes.text}>Date</small>
                <small>{getDateTimeString()}</small>
              </Grid>

              <Grid
                item
                xs={12}
                container
                direction="column"
                alignItems="flex-start"
                spacing={0}
              >
                <small className={classes.text}>Transaction</small>
                <small style={{ overflowWrap: "anywhere", textAlign: "left" }}>{parsedNote?.deposit?.nullifierHex}</small>
              </Grid>

              <Grid
                item
                xs={12}
                container
                direction="column"
                alignItems="flex-start"
                spacing={0}
              >
                <small className={classes.text}>From</small>
                <small>{account}</small>
              </Grid>

              <Grid
                item
                xs={12}
                container
                direction="column"
                alignItems="flex-start"
                spacing={0}
              >
                <small className={classes.text}>Commitment</small>
                <small style={{ overflowWrap: "anywhere", textAlign: "left" }}>
                  {parsedNote.deposit.commitmentHex}
                </small>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5}>
            {/* <Grid item container xs={12} direction="column" spacing={4}>
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
                </Grid>
            </Grid> */}
          </Grid>
        </Grid>
        {/* )} */}
      </Grid>
    </div>
  );
};

export default WithdrawCheckMain;
