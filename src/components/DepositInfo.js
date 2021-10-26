import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    textAlignStyle: {
        paddingTop: '4px',
        textAlign: 'left',
        overflowWrap: "anywhere"
    }
}));

const DepositInfo = ({ txReceipt, deposit, amount }) => {
    const classes = useStyles();
    return (
        <Grid item container xs={12} direction="column" spacing={2}>
            <Grid
                item
                xs={12}
                container
                direction="row"
                justify="space-between"
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
                            <small>Deposit</small>
                        </Grid>
                        <Grid item className="blue-text">
                            Verified
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
                justify="space-between"
                alignItems="flex-start"
            >
                <small>Date</small>
                <small className={classes.textAlignStyle}>
                    {new Date(txReceipt.timestamp * 1000).toUTCString()}
                </small>
            </Grid>

            <Grid
                item
                xs={12}
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
            >
                <small>Transaction</small>
                <small className={classes.textAlignStyle}>
                    {txReceipt.transactionHash}
                </small>
            </Grid>

            <Grid
                item
                xs={12}
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
            >
                <small>From</small>
                <small className={classes.textAlignStyle}>
                    {txReceipt.from.toLowerCase()}
                </small>
            </Grid>

            <Grid
                item
                xs={12}
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
            >
                <small>Commitment</small>
                <small className={classes.textAlignStyle}>
                    {deposit.commitmentHex}
                </small>
            </Grid>
        </Grid>
    );
};

export default DepositInfo;
