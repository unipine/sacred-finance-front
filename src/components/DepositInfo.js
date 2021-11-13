import React from "react";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

export const CustomSmall = styled("small")`
  padding-top: 4px;
  text-align: left;
  overflow-wrap: anywhere;
`;

const DepositInfo = ({ txReceipt, deposit, amount }) => {
  const { t } = useTranslation();

  return (
    <Grid item container xs={12} direction="column" spacing={2}>
      <Grid
        item
        xs={12}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Grid
            item
            container
            direction="column"
            spacing={0}
            alignItems="flex-start"
          >
            <Grid item>
              <small>{t("Deposit")}</small>
            </Grid>
            <Grid item className="blue-text">
              {t("Verified")}
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="blue-text">
          <h2>{amount}</h2>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <small>{t("Date")}</small>
        {txReceipt && txReceipt.timestamp && (
          <CustomSmall>
            {new Date(txReceipt.timestamp * 1000).toUTCString()}
          </CustomSmall>
        )}
      </Grid>

      <Grid
        item
        xs={12}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <small>{t("Transaction")}</small>
        {txReceipt && txReceipt.transactionHash && (
          <CustomSmall>
            {txReceipt.transactionHash}
          </CustomSmall>
        )}
      </Grid>

      <Grid
        item
        xs={12}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <small>{t("From")}</small>
        {txReceipt && txReceipt.from && (
          <CustomSmall>
            {txReceipt.from.toLowerCase()}
          </CustomSmall>
        )}
      </Grid>

      <Grid
        item
        xs={12}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <small>{t("Commitment")}</small>
        {deposit && deposit.commitmentHex && (
          <CustomSmall>
            {deposit.commitmentHex}
          </CustomSmall>
        )}
      </Grid>
    </Grid>
  );
};

export default DepositInfo;
