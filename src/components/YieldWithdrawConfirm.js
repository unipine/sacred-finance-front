import React, { useState, useEffect } from "react";
import { Grid, InputLabel, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const Container = styled(Grid)`
  color: white;
  text-align: left;
  font-family: Montserrat;
`;

const TextBalance = styled(InputLabel)`
  &.MuiInputLabel-root {
    color: #8cbde9;
    font-size: 1.8rem;
    font-weight: 700;
  }
`;

const TextPoints = styled(InputLabel)`
  &.MuiInputLabel-root {
    color: #8cbde9;
    font-size: 1.3rem;
  }
`;

const ContentGrid = styled(Grid)`
  border: 1px solid #ffffff;
  boder-top: ${(props) => props.theme.spacing(1)};
  border-right: 0;
  border-left: 0;
  border-bottom: 0;
  padding-bottom: 1.25rem;
  padding-top: 1rem;
`;

const SacredChainGrid = styled(Grid)`
  background: linear-gradient(
    52.13deg,
    #ef646d 42.38%,
    #92278f 97.85%,
    #2484c6 119.11%
  );
  font-size: 1rem;
  font-weight: 700;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-size-adjust: auto;
  overflow-wrap: anywhere;
`;

const GridItem14 = styled(Grid)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  font-weight: bold;
`;

const GridItem18 = styled(Grid)`
  font-size: 1.125rem;
  font-weight: bold;
`;

const RedeemButton = styled(Button)`
  text-transform: none;
  font-weight: bold;
  background-color: #5b5a99;
  color: white;
`;

const YieldWithdrawConfirm = () => {
  const { t } = useTranslation();
  
  return (
    <Container item container direction="row" spacing={4}>
      <Grid item direction="column" xs={3}>
        <InputLabel sx={{ fontSize: "1.25rem", color: "white" }}>
          {t('yield.points_balance')}
        </InputLabel>
        <TextBalance>0</TextBalance>
        <TextPoints>{t('yield.usdt_points')}</TextPoints>
      </Grid>
      <Grid item direction="column" xs={3}>
        <ContentGrid item>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            style={{ paddingBottom: "0.5rem" }}
          >
            <GridItem18 item>{t('yield.claim_id')}</GridItem18>
            <GridItem18 item style={{ color: "#8CBDE9" }}>
            {t('yield.upspent')}
            </GridItem18>
          </Grid>
          <SacredChainGrid>
            sacred-cfx-10-1-0xf17a95b211923f6fc19d9b42a30176041971abeadfd00bbc484bz080d53c5ad1d116ca43126839515ce3e3e41395be997b869140da08513fe664bf8ecc8d
          </SacredChainGrid>
        </ContentGrid>
        <ContentGrid item>
          <Grid
            item
            xs={12}
            container
            direction="row"
            style={{ paddingBottom: "10px" }}
          >
            <GridItem14 item xs={6}>
            {t('yield.blocks')}
            </GridItem14>
            <Grid item sx={{ fontSize: "1rem" }} xs={6}>
              35523
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            style={{ paddingBottom: "10px" }}
          >
            <GridItem14 item xs={6}>
            {t('yield.pool_rate')}
            </GridItem14>
            <Grid item sx={{ fontSize: "1rem" }} xs={6}>
              10 {t('yield.ap_block')}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            style={{ paddingBottom: "10px" }}
          >
            <GridItem14 item xs={6}>
            {t('yield.network_fee')}
            </GridItem14>
            <Grid item sx={{ fontSize: "1rem" }} xs={6}>
              0.06784 {t('yield.matic')}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            style={{ paddingBottom: "10px" }}
          >
            <GridItem14 item xs={6}>
            {t('yield.get_price')}
            </GridItem14>
            <Grid item sx={{ fontSize: "1rem" }} xs={6}>
              128 {t('yield.GWEI')}
            </Grid>
          </Grid>
        </ContentGrid>
      </Grid>
      <Grid item direction="column" xs={3}>
        <ContentGrid item>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            style={{ paddingBottom: "0.5rem" }}
          >
            <GridItem18 item>{t('yield.tx')} {t('yield.history')}</GridItem18>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            style={{ paddingBottom: "10px" }}
          >
            <GridItem14 item>{t('yield.reward')} i</GridItem14>
            <Grid item sx={{ fontSize: "1rem" }} style={{ opacity: "0.6" }}>
              355230 {t('yield.IC')}
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            style={{ paddingBottom: "10px" }}
          >
            <GridItem14 item>{t('yield.relayer_fee')}</GridItem14>
            <Grid item sx={{ fontSize: "1rem" }} style={{ opacity: "0.6" }}>
              -299152 {t('yield.IC')}
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            style={{ paddingBottom: "10px" }}
          >
            <GridItem14 item>{t('yield.total')}</GridItem14>
            <Grid
              item
              sx={{ fontSize: "1rem" }}
              style={{ color: "#8CBDE9", fontWeight: "bold" }}
            >
              56078 {t('yield.IC')}
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            style={{ paddingBottom: "10px" }}
          >
            <GridItem14 item>{t('yield.asset')}</GridItem14>
            <Grid
              item
              sx={{ fontSize: "1rem" }}
              style={{ color: "#8CBDE9", fontWeight: "bold" }}
            >
              {t('yield.usdt')}
            </Grid>
          </Grid>
          <RedeemButton variant="contained" fullWidth>
            {t('yield.redeem_points')}
          </RedeemButton>
        </ContentGrid>
      </Grid>
    </Container>
  );
};

export default YieldWithdrawConfirm;
