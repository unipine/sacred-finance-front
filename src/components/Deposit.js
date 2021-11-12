import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)`
  margin-top: -10px;
  font-size: 20px;
  font-family: Montserrat;
  texttransform: none;
  fontweight: bold;
`;

const CustomToggleButtonGroup = styled(ToggleButtonGroup)`
  min-width: 120px;
  margin: ${(props) => props.theme.spacing(1)};
  height: ${(props) => props.theme.spacing(8)};
`;

const CustomFormControl = styled(FormControl)`
  margin: ${(props) => props.theme.spacing(1)};
  minwidth: 120px;
  width: 95%;
`;

const CustomSelect = styled(Select)`
  padding-top: ${props => props.theme.spacing(0.5)};
  color: black;
  &.Mui-focused {
    background-color: #ef646d;
    color: #ffffff;
  }
  transition: all 0.5s;
`;

const Deposit = ({
  deployment,
  handleGenerateClaim,
  handleSetToken,
  handleSetAmount,
}) => {
  const history = useHistory();
  // const [token, setToken] = React.useState(deployment.symbol);
  // const [amount, setAmount] = React.useState(deployment.amount);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { t } = useTranslation();

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
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <CustomButton variant="text darkBlack" sx={{ ml: 0.5 }}>
                  <b>{t("Deposit")}</b>
                </CustomButton>
              </Grid>
              <Grid item>
                <CustomButton
                  variant="text darkBlack"
                  sx={{mr: 0.5 }}
                  onClick={handleWithdrawRoute}
                >
                  {t("Withdraw")}
                </CustomButton>
              </Grid>
            </Grid>
            <Grid item container direction="column" alignItems="flex-start">
              <br />
              <span style={{ ml: 0.5, color: "#A7A9AC", }}>{t("Token")}</span>

              <CustomFormControl variant="outlined">
                <CustomSelect
                  value={deployment.symbol}
                  onChange={handleChange}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                  }}
                >
                  <MenuItem value={"ETH"}>ETH</MenuItem>
                  {/* <MenuItem value={'cBTC'}>cBTC</MenuItem>
                  <MenuItem value={'cUSDT'}>cUSDT</MenuItem>
                  <MenuItem value={'cETH'}>cETH</MenuItem> */}
                </CustomSelect>
              </CustomFormControl>
            </Grid>
            <Grid item></Grid>
            <Grid item container direction="column" alignItems="flex-start">
              <span style={{ marginLeft: 0.5 }}>{t("Amount")}</span>

              <Grid item container direction="row" justifyContent="center">
                <Grid item>
                  <CustomToggleButtonGroup
                    value={deployment.amount}
                    exclusive
                    onChange={handleAmount}
                    aria-label="text amount"
                  >
                    <ToggleButton
                      sx={{
                        borderBottomLeftRadius: "25px",
                        borderTopLeftRadius: "25px",
                      }}
                      value={deployment.denominations[0]}
                      aria-label={deployment.denominations[0]}
                    >
                      <strong>{deployment.denominations[0]}</strong>&nbsp;
                      {deployment.symbol}
                    </ToggleButton>
                    <ToggleButton
                      value={deployment.denominations[1]}
                      aria-label={deployment.denominations[1]}
                      disabled={true}
                    >
                      <strong>{deployment.denominations[1]}</strong>&nbsp;
                      {deployment.symbol}
                    </ToggleButton>
                    <ToggleButton
                      value={deployment.denominations[2]}
                      aria-label={deployment.denominations[2]}
                      disabled={true}
                    >
                      <strong>{deployment.denominations[2]}</strong>&nbsp;
                      {deployment.symbol}
                    </ToggleButton>

                    <ToggleButton
                      sx={{
                        borderBottomRightRadius: "25px",
                        borderTopRightRadius: "25px",
                      }}
                      value={deployment.denominations[3]}
                      aria-label={deployment.denominations[3]}
                      disabled={true}
                    >
                      <strong>{deployment.denominations[3]}</strong>&nbsp;
                      {deployment.symbol}
                    </ToggleButton>
                  </CustomToggleButtonGroup>
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
    </div>
  );
};

export default Deposit;
