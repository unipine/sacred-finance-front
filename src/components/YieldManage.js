import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import { useLocation } from "react-router";
import { InputLabel } from "@mui/material";
import arrow_down from "../images/arrow_down.svg";
import settingImg from "../images/setting.svg";
import { styled } from "@mui/material/styles";

const BalanceGrid = styled(Grid)`
  border: 1px solid #757575;
  border-radius: 1.25rem;
  padding: 1rem;
  margin-top: 20px;
`;

const CalculateButton = styled(Button)`
  margin-top: 80px;
  font-size: 1.25rem;
`;

const HeaderButton = styled(Button)`
  margin-top: -10px;
  font-size: 1.25rem;
  font-family: Montserrat;
  text-transform: none;
  font-weight: bold;
`;

const CustomTextField = styled(TextField)`
  margin: ${(props) => props.theme.spacing(1)};
  padding-top: ${(props) => props.theme.spacing(1)};
  padding-bottom: ${(props) => props.theme.spacing(1)};
  border-radius: 22px;
  background-color: rgba(0, 0, 0, 0.09);
  $:hover {
    background-color: rgba(0, 0, 0, 0.23);
  }
  &.MuiInputBase-input {
    padding-top: 0;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  & fieldset {
    border: none;
  }
`;

const BlackInputLabel = styled(InputLabel)`
  color: black;
  font-weight: 700;
`;

const FlexDiv = styled("div")`
  display: flex;
  align-items: center;

  & div {
    padding: 0.25rem;
    margin-right: 0.5rem;
    border: 1px solid #747474;
    background-color: #8c8c8c;
    border-radius: 6px;
    color: white;
    font-size: 0.85rem;
  }
`;

const SettingDiv = styled("div")`
  margin-top: 1.25rem;
  border: 4px solid #8cbde9;
  borderradius: 0.5rem;
  backgroundcolor: rgba(140, 189, 233, 0.3);
  padding: 0.5rem;
  width: 1.5rem;
`;

const YieldManage = () => {
  const history = useHistory();
  const location = useLocation();

  const [selectedWithdraw, setSelectedWithdraw] = useState(false);
  const [coinType, setCoinType] = useState(0);

  const handleCoinType = (e) => {
    setCoinType(e.target.value);
  };

  const handleWithdrawClick = () => {
    history.push("/yieldWithdraw");
    setSelectedWithdraw(true);
  };

  const handleRedeemClick = () => {
    history.push("/yieldRedeem");
    setSelectedWithdraw(false);
  };

  const handleCalculatePoints = () => {
    history.push("/yieldRedeemConfirm");
  };

  const handleWithrawYield = () => {
    history.push("/yieldWithdrawConfirm");
  };

  const handleClickRelayerSetting = () => {
    history.push("/relayerSettings");
  };

  return (
    <div>
      <Paper>
        <Box p={3} sx={{ textAlign: "left", fontFamily: ["Montserrat"] }}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              container
              direction="row"
              spacing={0}
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid item>
                <HeaderButton
                  variant="text darkBlack"
                  sx={
                    !selectedWithdraw
                      ? { marginLeft: "10px" }
                      : { color: "#A7A9AC", marginRight: "10px" }
                  }
                  onClick={handleRedeemClick}
                >
                  <b>Redeem</b>
                </HeaderButton>
              </Grid>
              <Grid item>
                <HeaderButton
                  variant="text darkBlack"
                  sx={
                    selectedWithdraw
                      ? { marginLeft: "10px" }
                      : { color: "#A7A9AC", marginRight: "10px" }
                  }
                  onClick={handleWithdrawClick}
                >
                  <b>Withdraw</b>
                </HeaderButton>
              </Grid>
            </Grid>

            {selectedWithdraw ? (
              <>
                <Grid item direction="column">
                  <BalanceGrid item>
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <BlackInputLabel>From</BlackInputLabel>
                      <BlackInputLabel>Balance: 56078</BlackInputLabel>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ paddingTop: "10px" }}
                    >
                      <InputLabel sx={{ fontSize: "20px" }}>0.0</InputLabel>
                      <FlexDiv>
                        <div>MAX</div>
                        <select
                          labelId="network-select-label"
                          value={coinType}
                          onChange={handleCoinType}
                          className="select"
                        >
                          <option value={0}>USDT YP</option>
                          <option value={1}>BNB</option>
                        </select>
                      </FlexDiv>
                    </Grid>
                  </BalanceGrid>
                  <Grid item sx={{ textAlign: "center", padding: "20px" }}>
                    <img src={arrow_down} />
                  </Grid>
                  <BalanceGrid item>
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="space-between"
                      sx={{ paddingBottom: "10px" }}
                    >
                      <BlackInputLabel>To</BlackInputLabel>
                      <BlackInputLabel>Balance: 0.000000</BlackInputLabel>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <InputLabel sx={{ fontSize: "20px" }}>0.0</InputLabel>
                      <InputLabel sx={{ fontSize: "20px" }}>USDT</InputLabel>
                    </Grid>
                  </BalanceGrid>
                  <Grid item container>
                    <CalculateButton
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={handleWithrawYield}
                    >
                      Withdraw Yield
                    </CalculateButton>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid item direction="column" justifyContent="space-between">
                  <Grid item>
                    <InputLabel>Sacred Claim</InputLabel>
                    <CustomTextField
                      multiline
                      variant="outlined"
                      size="small"
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <CalculateButton
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{ marginTop: "280px" }}
                      onClick={handleCalculatePoints}
                    >
                      Calculate Points
                    </CalculateButton>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Paper>
      {!selectedWithdraw && (
        <SettingDiv onClick={handleClickRelayerSetting}>
          <img src={settingImg}></img>
        </SettingDiv>
      )}
    </div>
  );
};

export default YieldManage;
