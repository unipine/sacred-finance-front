import React, { useState, useEffect } from "react";
import { Grid, InputLabel, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white',
    },

    textFont: {
        fontFamily: [
            'Montserrat',
        ]
    },
    textBalance: {
        color: '#8CBDE9',
        fontSize: '1.8rem',
        fontWeight: 700,
    },
    textPoints: {
        color: '#8CBDE9',
        fontSize: '1.3rem',
    },
    contentBorder: {
        border: '1px solid #FFFFFF',
        boderTopWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        paddingBottom: '1.25rem',
        paddingTop: '1rem',
    },
    sacredChain: {
        background: 'linear-gradient(52.13deg, #EF646D 42.38%, #92278F 97.85%, #2484C6 119.11%)',
        fontSize: '1rem',
        fontWeight: 700,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        WebkitTextSizeAdjust: 'auto',
        overflowWrap: "anywhere",
    },
    textsize14: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '0.875rem',
        fontWeight: 'bold'
    },
    textsize16: {
        fontSize: '1rem'
    },
    textsize18: {
        fontSize: '1.125rem',
        fontWeight: 'bold',
    },
    textsize20: {
        fontSize: '1.25rem',
    },
}));

const YieldWithdrawConfirm = () => {
    const classes = useStyles();

    return (
        <Grid
            item
            container
            direction="row"
            spacing={4}
            className={classes.root}
            style={{ textAlign: 'left' }}
        >
            <Grid
                item
                direction="column"
                xs={3}
            >
                <InputLabel className={[classes.textsize20, classes.textFont]} style={{color: 'white'}}>Yield Points balance</InputLabel>
                <InputLabel className={[classes.textBalance, classes.textFont]}>0</InputLabel>
                <InputLabel className={[classes.textPoints, classes.textFont]}>USDT Yield Points</InputLabel>
            </Grid>
            <Grid
                item
                direction="column"
                xs={3}
            >
                <Grid item className={classes.contentBorder}>
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-between"
                        style={{paddingBottom: '0.5rem'}}
                    >
                        <Grid item className={classes.textsize18}>Claim ID</Grid>
                        <Grid item className={classes.textsize18} style={{color: '#8CBDE9'}}>UnSpent</Grid>
                    </Grid>
                    <Grid item className={classes.sacredChain}>
                        sacred-cfx-10-1-0xf17a95b211923f6fc19d9b42a30176041971abeadfd00bbc484bz080d53c5ad1d116ca43126839515ce3e3e41395be997b869140da08513fe664bf8ecc8d
                    </Grid>
                </Grid>
                <Grid item className={classes.contentBorder}>
                    <Grid
                        item
                        xs={12}
                        container
                        direction="row"
                        style={{paddingBottom: '10px'}}
                    >
                        <Grid item className={classes.textsize14} xs={6}>Blocks</Grid>
                        <Grid item className={classes.textsize16} xs={6}>35523</Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        direction="row"
                        style={{paddingBottom: '10px'}}
                    >
                        <Grid item className={classes.textsize14} xs={6}>Pool Rate</Grid>
                        <Grid item className={classes.textsize16} xs={6}>10 AP/Block</Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        direction="row"
                        style={{paddingBottom: '10px'}}
                    >
                        <Grid item className={classes.textsize14} xs={6}>Network fee</Grid>
                        <Grid item className={classes.textsize16} xs={6}>0.06784 MATIC</Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        direction="row"
                        style={{paddingBottom: '10px'}}
                    >
                        <Grid item className={classes.textsize14} xs={6}>Gas Price</Grid>
                        <Grid item className={classes.textsize16} xs={6}>128 GWEI</Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                direction="column"
                xs={3}
            >
                <Grid item className={classes.contentBorder}>
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-between"
                        style={{paddingBottom: '0.5rem'}}
                    >
                        <Grid item className={classes.textsize18}>TX History</Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-between"
                        style={{paddingBottom: '10px'}}
                    >
                        <Grid item className={classes.textsize14}>Reward i</Grid>
                        <Grid item className={classes.textsize16} style={{color: 'rgba(255, 255, 255, 0.6)'}}>355230  IC</Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-between"
                        style={{paddingBottom: '10px'}}
                    >
                        <Grid item className={classes.textsize14}>Relayer Fee</Grid>
                        <Grid item className={classes.textsize16} style={{color: 'rgba(255, 255, 255, 0.6)'}}>-299152  IC</Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-between"
                        style={{paddingBottom: '10px'}}
                    >
                        <Grid item className={classes.textsize14}>Total</Grid>
                        <Grid item className={classes.textsize16} style={{color: '#8CBDE9', fontWeight: 'bold'}}>56078  IC</Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-between"
                        style={{paddingBottom: '10px'}}
                    >
                        <Grid item className={classes.textsize14}>Asset</Grid>
                        <Grid item className={classes.textsize16} style={{color: '#8CBDE9', fontWeight: 'bold'}}>USDT</Grid>
                    </Grid>
                    <Button variant="contained" style={{ textTransform: 'none', fontWeight: 'bold', backgroundColor: '#5B5A99', color: 'white' }} fullWidth >REDEEM YIELD POINTS</Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default YieldWithdrawConfirm;