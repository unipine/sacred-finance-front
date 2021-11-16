import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import WaitingModal from "./WaitingModal";
import { Radio, RadioGroup, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const CustomButton = styled(Button)`
  margin: 20px;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 24px;
`;

const CustomTextField = styled(TextField)`
  margin: ${(props) => props.theme.spacing(1)};
  border-radius: 22px;
  &.MuiInputBase-input {
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;

const YieldRedemptionSetup = () => {
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSetupClick = () => {
    history.push("/yieldManage");
  };

  return (
    <Paper sx={{ textAlign: "left" }}>
      <Box p={3}>
        <Grid container direction="column">
          <Grid item>
            <InputLabel
              sx={{
                color: "#EF646D",
                fontWeight: "bold",
                paddingBottom: "20px",
              }}
            >
              {t('yield.account_setup')}
            </InputLabel>
          </Grid>
          <Grid item>
            <InputLabel
              sx={{
                fontStyle: "italic",
                paddingBottom: "20px",
                whiteSpace: "pre-wrap",
              }}
            >
              {t('yield.text3')}
              <br />
              <b>{t('yield.text4')}</b>
            </InputLabel>
          </Grid>
          <Grid item container direction="row" justifyContent="space-between">
            <InputLabel>{t('yield.recover_key')}</InputLabel>
            <InputLabel sx={{ color: "#EF646D", textDecoration: "underline" }}>
              <u>{t('yield.copy')}</u>
            </InputLabel>
          </Grid>
          <Grid item>
            <CustomTextField
              multiline
              variant="filled"
              size="small"
              InputProps={{ disableUnderline: true }}
              disabled
              fullWidth
            />
            <CustomTextField
              multiline
              variant="filled"
              size="small"
              InputProps={{ disableUnderline: true }}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item>
            <FormControl>
              <RadioGroup
                aria-label="setting"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio color="secondary" />}
                  label="I backed up the recovery key"
                  color="secondary"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio color="secondary" />}
                  label="Create Additional on-chain backup of your recovery key with your wallet"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item container direction="column" justifyContent="center">
            <CustomButton
              variant="contained"
              color="secondary"
              onClick={handleSetupClick}
            >
              {t('yield.setup')}
            </CustomButton>
            <CustomButton variant="outlined" color="secondary">
              {t('yield.cancel')}
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default YieldRedemptionSetup;
