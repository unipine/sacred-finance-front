import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    textAlignStyle: {
        paddingTop: '4px',
        textAlign: 'left',
        overflowWrap: "anywhere"
    }
}));

const DepositInfo = ({ txReceipt, deposit, amount }) => {
    const classes = useStyles();
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
                {
                    txReceipt && txReceipt.timestamp && (
                        <small className={classes.textAlignStyle}>
                            {new Date(txReceipt.timestamp * 1000).toUTCString()}
                        </small>
                    )
                }
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
                {
                    txReceipt && txReceipt.transactionHash && (
                        <small className={classes.textAlignStyle}>
                            {txReceipt.transactionHash}
                        </small>
                    )
                }
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
                {
                    txReceipt && txReceipt.from && (
                        <small className={classes.textAlignStyle}>
                            {txReceipt.from.toLowerCase()}
                        </small>
                    )
                }
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
                {
                    deposit && deposit.commitmentHex && (
                        <small className={classes.textAlignStyle}>
                            {deposit.commitmentHex}
                        </small>
                    )
                }
            </Grid>
        </Grid>
    );
};

export default DepositInfo;
