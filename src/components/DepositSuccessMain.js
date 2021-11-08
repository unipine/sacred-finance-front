import React from "react";
import TextField from "@mui/material/TextField";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import DepositInfo from "./DepositInfo";
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
  }
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

const DepositSuccessMain = ({ deposit, txReceipt, deployment }) => {
  const history = useHistory();
  const classes = useStyles();

  const { t } = useTranslation();

  const handleClick = () => {
    history.push("/withdraw");
  };

  //TODO: grid elements code duplication. should have a component to reuse in Depositsuccess, a few withdraw pages and Inspect
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <h1>{t("This deposit is now in Sacred!")}</h1>
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            className={classes.textField}
            InputProps={{
              className: classes.input,
              disableUnderline: true,
            }}
            required
            id="claim"
            value={deposit.note}
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item container xs={12} direction="row" spacing={2}>
          <Grid item xs={6}>
            <DepositInfo txReceipt={txReceipt} deposit={deposit} amount={deployment.amount + ' ' + deployment.symbol}/>
          </Grid>

          <Grid item xs={6}>
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
                      <h2 style={{ fontSize: "250%", lineHeight: "0" }}>0</h2>
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
                    Not Private: <b>0-300</b>
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
                    Securely Private: <b>400-1000</b>
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
                This claim has been layered further by&nbsp;
                <b>0 transactions</b>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    textTransform: "none",
                    fontWeight: "bold",
                    marginRight: "50px",
                    width: "90%",
                  }}
                  fullWidth
                  onClick={handleClick}
                >
                  {t("Withdraw Claim")}
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
      </Grid>
    </div>
  );
};

export default DepositSuccessMain;
