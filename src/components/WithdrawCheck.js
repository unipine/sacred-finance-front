import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { GoToContract } from "./Deposit";

const HeaderButton = styled(Button)`
  margin-top: -10px;
  font-size: 20px;
  font-family: Montserrat;
  texttransform: none;
  fontweight: bold;
`;

const CustomTextField = styled(TextField)`
  margin: ${(props) => props.theme.spacing(1)};
  min-width: 120px;
  width: 95%;
  & .MuiInputBase-input {
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;

const WithdrawCheck = ({
  claim,
  recipient,
  isSpent,
  isExist,
  deployment,
  relayerOption,
}) => {
  const history = useHistory();
  const { t } = useTranslation();

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
              <HeaderButton
                variant="text"
                startIcon={<ArrowBackIosIcon />}
                sx={{ color: "#A7A9AC" }}
                onClick={handleWithdrawRoute}
              >
                <b>{t("Back")}</b>
              </HeaderButton>
            </Grid>
            <Grid item container direction="row" justifyContent="flex-start">
              <Grid item container direction="column" alignItems="flex-start">
                <br />
                <span style={{ marginLeft: "10px" }}>{t("Sacred Claim")}</span>
                <CustomTextField
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
                <span style={{ marginLeft: "10px" }}>
                  {t("Recipient Address")}
                </span>
                <CustomTextField
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
                sx={{ textTransform: "none", fontWeight: "bold" }}
                fullWidth
                disabled={(isSpent && isExist) || !isExist}
                onClick={handleClick}
              >
                {t("Withdraw")}
              </Button>
            </Grid>
            <Grid item>
              <GoToContract
                href={`https://kovan.etherscan.io/address/${deployment.address}`}
                className="blue-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace(
                  ".",
                  ""
                )}.sacred.eth`}</small>
              </GoToContract>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default WithdrawCheck;
