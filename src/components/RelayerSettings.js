import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TextField from "@mui/material/TextField";
import { useLocation } from "react-router";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";

const BodyBox = styled(Box)`
  text-align: left;
  font-family: Montserrat;
`;

const HeaderButton = styled(Button)`
  text-transform: none;
  font-weight: bold;
  margin-right: 0.5rem;
  margin-eft: 0.5rem;
  font-size: 1.25rem;
  &.MuiButton-outlinedSecondary {
    border: 3px;
  }
`;

const GasText = styled(TextField)`
  margin-top: ${(props) => props.theme.spacing(1)};
  padding-top: 1rem;
  padding-bottom: 1.5rem;

  & textarea.MuiInputBase-input {
    padding: 0.5rem;
    font-weight: bold;
    font-size: 1.1rem;
    line-height: 1.4rem;
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;

const CustomFormControl = styled(FormControl)`
  margin: ${(props) => props.theme.spacing(1)};
  min-width: 120px;
  width: 100%;
`;

const RelayerSelect = styled(Select)`
  font-size: 1.25rem;
  margin-bottom: 10rem;
  &.Mui-focused {
    background-color: #ef646d;
    color: #ffffff;
    font-weight: bold;
  }
`;

const RelayerItem = styled(MenuItem)`
  font-family: Montserrat;
  &.MuiMenuItem-root {
    font-size: 1.25rem;
    font-weight: bold;
  }
  &.Mui-selected {
    color: #ef646d;
    background-color: white;
  }
`;

const CustomButton = styled(Button)`
  text-transform: none;
  font-weight: bold;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  font-size: 1.5rem;
  &.MuiButton-outlinedSecondary {
    border-width: 3px;
  }
`;

const RelayerSettings = () => {
  const history = useHistory();
  const location = useLocation();

  const [selectedRelayerI, setSelectedRelayerI] = useState(false);
  const [layer, setLayer] = useState("");
  const { t } = useTranslation();

  const handleLayerChange = (event) => {
    setLayer(event.target.value);
  };

  const handleRelayerChange = () => {
    setSelectedRelayerI(false);
  };

  const handleWalletChange = () => {
    setSelectedRelayerI(true);
  };

  return (
    <div>
      <Paper>
        <BodyBox p={3}>
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
                    !selectedRelayerI
                      ? { marginLeft: "10px" }
                      : { color: "#A7A9AC", marginRight: "10px" }
                  }
                  onClick={handleRelayerChange}
                >
                  <b>{t('relayer.i')} i</b>
                </HeaderButton>
              </Grid>
              <Grid item>
                <HeaderButton
                  variant="text darkBlack"
                  sx={
                    selectedRelayerI
                      ? { marginLeft: "10px" }
                      : { color: "#A7A9AC", marginRight: "10px" }
                  }
                  onClick={handleWalletChange}
                >
                  <b>{t('wallet.i')} i</b>
                </HeaderButton>
              </Grid>
            </Grid>

            {selectedRelayerI ? (
              <>
                <Grid item direction="column">
                  <Grid item sx={{ marginTop: "20px" }}>
                    <GasText
                      multiline
                      variant="filled"
                      size="small"
                      value={t('relayer.ether_fee')}
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      disabled
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid item direction="column">
                  <Grid item>
                    <InputLabel
                      sx={{ fontFamily: "Montserrat", margin: "8px" }}
                    >
                      {t('relayer.i')}
                    </InputLabel>
                  </Grid>
                  <Grid item container>
                    <CustomFormControl variant="outlined">
                      <RelayerSelect
                        value={layer}
                        onChange={handleLayerChange}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "top",
                            horizontal: "center",
                          },
                        }}
                      >
                        <RelayerItem value={"mainnet.t-relay.matic"}>
                          {t('relayer.mainnet')}
                        </RelayerItem>
                        <RelayerItem value={"noder.t-relay.matic"}>
                          {t('relayer.noder')}
                        </RelayerItem>
                        <RelayerItem value={"relay2.t-relay.matic"}>
                        {t('relayer.relay2')}
                        </RelayerItem>
                        <RelayerItem value={"4 mainnet.t-relay.matic"}>
                          {t('relayer.4mainnet')}
                        </RelayerItem>
                      </RelayerSelect>
                    </CustomFormControl>
                  </Grid>
                </Grid>
              </>
            )}
            <Grid item container>
              <CustomButton variant="outlined" color="secondary" fullWidth>
                {t('set_default')}
              </CustomButton>
            </Grid>
            <Grid item container>
              <CustomButton variant="contained" color="secondary" fullWidth>
                {t('Save')}
              </CustomButton>
            </Grid>
          </Grid>
        </BodyBox>
      </Paper>
    </div>
  );
};

export default RelayerSettings;
