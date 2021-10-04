import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "95%",
  },
  input: {
    "&.Mui-focused": {
      backgroundColor: "#EF646D",
      color: "#FFFFFF",
      fontWeight: "bold",
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  toggleButtonGroup: {
    minWidth: 120,
    margin: theme.spacing(1),
    height: theme.spacing(8),
    //width: '95%'
  },
  toggleButtonLeft: {
    borderBottomLeftRadius: "25px",
    borderTopLeftRadius: "25px",
  },
  toggleButtonRight: {
    borderBottomRightRadius: "25px",
    borderTopRightRadius: "25px",
  },
  buttonColor: {
    "&.Mui-selected": {
      backgroundColor: "#EF646D",
      color: "#FFFFFF",
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

const Deposit = ({
  deployment,
  handleGenerateClaim,
  handleSetToken,
  handleSetAmount,
}) => {
  const history = useHistory();
  const classes = useStyles();
  // const [token, setToken] = React.useState(deployment.symbol);
  // const [amount, setAmount] = React.useState(deployment.amount);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleAmount = async (event, newAmount) => {
    if (!newAmount) return;
    // setAmount(newAmount);
    await handleSetAmount(newAmount);
  };

  const handleChange = (event) => {
    // setToken(event.target.value);
    handleSetToken(event.target.value);
  };

  const handleClick = () => {
    handleGenerateClaim();
    history.push("/depositClaim");
  };

  const handleWithdrawRoute = () => {
    history.push("/withdraw");
  };

  useEffect(() => {
    if (deployment.symbol === null || deployment.amount === null) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [deployment.symbol, deployment.amount]);

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
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="text"
                  className={classes.headerBtn}
                  style={{ marginLeft: "10px" }}
                >
                  <b>Deposit</b>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  className={classes.headerBtn}
                  style={{ color: "#A7A9AC", marginRight: "10px" }}
                  onClick={handleWithdrawRoute}
                >
                  Withdraw
                </Button>
              </Grid>
            </Grid>
            <Grid item container direction="column" alignItems="flex-start">
              <br />
              <span style={{ marginLeft: "10px" }}>Token</span>

              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  value={deployment.symbol}
                  onChange={handleChange}
                  className={classes.input}
                >
                  <MenuItem value={"ETH"}>ETH</MenuItem>
                  {/* <MenuItem value={'cBTC'}>cBTC</MenuItem>
                  <MenuItem value={'cUSDT'}>cUSDT</MenuItem>
                  <MenuItem value={'cETH'}>cETH</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item></Grid>
            <Grid item container direction="column" alignItems="flex-start">
              <span style={{ marginLeft: "10px" }}>Amount</span>

              <Grid item container direction="row" justify="center">
                <Grid item>
                  <ToggleButtonGroup
                    className={classes.toggleButtonGroup}
                    value={deployment.amount}
                    exclusive
                    onChange={handleAmount}
                    aria-label="text amount"
                  >
                    <ToggleButton
                      className={`${classes.toggleButtonLeft} ${classes.buttonColor}`}
                      value={deployment.denominations[0]}
                      aria-label={deployment.denominations[0]}
                    >
                      <strong>{deployment.denominations[0]}</strong>&nbsp;
                      {deployment.symbol}
                    </ToggleButton>
                    <ToggleButton
                      className={classes.buttonColor}
                      value={deployment.denominations[1]}
                      aria-label={deployment.denominations[1]}
                      disabled={true}
                    >
                      <strong>{deployment.denominations[1]}</strong>&nbsp;
                      {deployment.symbol}
                    </ToggleButton>
                    <ToggleButton
                      className={classes.buttonColor}
                      value={deployment.denominations[2]}
                      aria-label={deployment.denominations[2]}
                      disabled={true}
                    >
                      <strong>{deployment.denominations[2]}</strong>&nbsp;
                      {deployment.symbol}
                    </ToggleButton>

                    <ToggleButton
                      className={`${classes.toggleButtonRight} ${classes.buttonColor}`}
                      value={deployment.denominations[3]}
                      aria-label={deployment.denominations[3]}
                      disabled={true}
                    >
                      <strong>{deployment.denominations[3]}</strong>&nbsp;
                      {deployment.symbol}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <br />
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
              )}.sacred.cfx`}</small>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default Deposit;
