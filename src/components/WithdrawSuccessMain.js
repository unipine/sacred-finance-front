import React from "react";
import DepositInfo from "./DepositInfo";
import Grid from "@mui/material/Grid";
import arrow from "../images/arrow_right.svg";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { CustomTextField } from "./InspectMain";
import { CustomSmall } from "./DepositInfo";
import { Receipt } from "@mui/icons-material";

const WithdrawSuccessMain = ({ claim, parsedNote, txReceipt, depReceipt, recipient }) => {
  const { t } = useTranslation();
  const location = useLocation();

  //TODO: grid elements code duplication. should have a component to reuse in Depositsuccess, a few withdraw pages and Inspect
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <h1>{t("This Claim is Withdrawn!")}</h1>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            InputProps={{
              disableUnderline: true,
            }}
            value={claim}
            variant="filled"
          />
        </Grid>

        <Grid item container xs={12} direction="row" spacing={2}>
          <Grid item xs={5}>
            {location.pathname === "/inspectSuccess" ? (
              <DepositInfo
                txReceipt={txReceipt}
                deposit={parsedNote.deposit}
                amount={
                  parsedNote.amount + " " + parsedNote.currency.toUpperCase()
                }
              />
            ) : (
              <DepositInfo
                txReceipt={depReceipt}
                deposit={parsedNote.deposit}
                amount={
                  parsedNote.amount + " " + parsedNote.currency.toUpperCase()
                }
              />
            )}
          </Grid>
          <Grid
            item
            xs={1}
            container
            justifyContent="center"
            alignItems="center"
          >
            <img src={arrow} alt="arrow" />
          </Grid>
          <Grid item xs={5}>
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
                      <small>{t("Withdrawal")}</small>
                    </Grid>
                    <Grid item className="blue-text">
                      {t("Verified")}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="blue-text">
                  <h2>
                    -{" "}
                    {location.pathname === "/inspectSuccess"
                      ? txReceipt?.returnValues?.fee
                      : txReceipt?.events?.Withdrawal?.returnValues?.fee}{" "}
                    {parsedNote.currency.toUpperCase()}
                  </h2>
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
                <CustomSmall>
                  {location.pathname === "/inspectSuccess"
                    ? new Date(txReceipt.withdrawTimestamp * 1000).toUTCString()
                    : new Date(txReceipt.timestamp * 1000).toUTCString()}
                </CustomSmall>
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
                <CustomSmall>
                  {location.pathname === "/inspectSuccess"
                    ? txReceipt.withdrawTransactionHash
                    : txReceipt.transactionHash}
                </CustomSmall>
              </Grid>

              <Grid
                item
                xs={12}
                container
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <small>{t("To")}</small>
                <CustomSmall>
                  {recipient && recipient.toLowerCase()}
                </CustomSmall>
              </Grid>

              <Grid
                item
                xs={12}
                container
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <small>{t("Nullifier Hash")}</small>
                <CustomSmall>
                  {parsedNote?.deposit?.nullifierHex}
                </CustomSmall>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default WithdrawSuccessMain;
