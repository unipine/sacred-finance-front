import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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

  const classes = useStyles();

  const handleClick = () => {
    history.push("/withdrawConfirm");
  };

  const handleWithdrawRoute = () => {
    history.push("/walletmanagement");
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
              justify="flex-start"
              alignItems="center"
            >
              <Button
                variant="text"
                startIcon={<ArrowBackIosIcon />}
                className={classes.headerBtn}
                style={{ color: "#A7A9AC" }}
                onClick={handleWithdrawRoute}
              >
                <b>Back</b>
              </Button>
            </Grid>
            <Grid item container direction="row" justify="flex-start">
              <Grid item container direction="column" alignItems="flex-start">
                <br />
                <span style={{ marginLeft: "10px" }}>Sacred Claim</span>
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
            <Grid item container direction="row" justify="flex-start">
              <Grid item container direction="column" alignItems="flex-start">
                <span style={{ marginLeft: "10px" }}>Recipient Address</span>
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
            <Grid item container direction="row" justify="flex-start">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={relayerOption} />}
                  label="Use Sacred Relayer"
                  disabled={true}
                />
              </FormGroup>
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
                Withdraw
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
