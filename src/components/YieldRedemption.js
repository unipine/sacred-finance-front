import React, { useState, useEffect } from "react";
import { Grid, Button, LinearProgress } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const CustomGrid = styled(Grid)`
  padding-top: 80px;
  padding-bottom: 80px;
  font-family: "Montserrat";
  color: #ffffff;
`;

const Title = styled("div")`
  color: inherit;
  font-size: 51px;
`;

const YieldTitle = styled("div")`
  background: linear-gradient(#92278f, #ef646d);
  font-size: 60px;
  font-weight: 700;
  padding-bottom: 18px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Content = styled("div")`
  color: inherit;
  font-size: 18px;
  padding-bottom: 32px;
`;

const CustomButton = styled(Button)`
  font-weight: bold;
  font-size: 24px;
  width: 20%;
`;

const YieldRedemption = () => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();

  const handleClick = () => {
    history.push("/yieldSetup");
  };

  return (
    <CustomGrid
      item
      direction="column"
      alignItems="center"
      container
      justifyContent="center"
    >
      <Title>{t('yield.sacred_finance')}</Title>
      <YieldTitle>{t('yield.redemption')}</YieldTitle>
      <Content>
        {t('yield.text1')}
        <br /> {t('yield.text2')}
      </Content>
      <CustomButton
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        {t('yield.get_started')}
      </CustomButton>
    </CustomGrid>
  );
};

export default YieldRedemption;
