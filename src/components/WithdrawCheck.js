import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useHistory } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "95%",
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
}));

const WithdrawCheck = ({ claim, recipient, isSpent, isExist, deployment, relayerOption }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();

  const handleClick = () => {
    history.push("/withdrawConfirm");
  };

  const handleWithdrawRoute = () => {
    history.push("/withdraw");
  };

  return (
    <div>
      <Paper>
        <Box p={3}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              container
              direction="row"
              spacing={0}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Button
                variant="text"
                startIcon={<ArrowBackIosIcon />}
                className={classes.headerBtn}
                style={{ color: "#A7A9AC" }}
                onClick={handleWithdrawRoute}
              >
                <b>{t("Back")}</b>
              </Button>
            </Grid>
            <Grid item container direction="row" justifyContent="flex-start">
              <Grid item container direction="column" alignItems="flex-start">
                <br />
                <span style={{ marginLeft: "10px" }}>{t("Sacred Claim")}</span>
                <TextField
                  className={classes.textField}
                  value={claim}
                  variant="filled"
                  size="small"
                  disabled
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container direction="row" justifyContent="flex-start">
              <Grid item container direction="column" alignItems="flex-start">
                <span style={{ marginLeft: "10px" }}>{t("Recipient Address")}</span>
                <TextField
                  className={classes.textField}
                  value={recipient}
                  variant="filled"
                  size="small"
                  disabled
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item>
              <br />
              <br />
              <br />
              <br />
              <Button
                variant="contained"
                color="secondary"
                style={{ textTransform: "none", fontWeight: "bold" }}
                fullWidth
                disabled={(isSpent && isExist) || !isExist}
                onClick={handleClick}
              >
                {t("Withdraw")}
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

export default WithdrawCheck;
