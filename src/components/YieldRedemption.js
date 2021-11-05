import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button, LinearProgress } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    body: {
        paddingTop: '80px',
        paddingBottom: '80px',
        fontFamily: [
            'Montserrat'
        ],
    },

    title1: {
        color: '#ffffff',
        fontSize: '51px',
    },

    title2: {
        background: 'linear-gradient(#92278F, #EF646D)',
        fontSize: '60px',
        fontWeight: 700,
        paddingBottom: '18px',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },

    content: {
        color: "#ffffff",
        fontSize: "18px",
        paddingBottom: '32px',
    },

    button: {
        textTransform: "none",
        fontWeight: "bold",
        fontSize: '24px',
        width: '20%'
    }
}));

const YieldRedemption = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const handleClick = () => {
        history.push("/yieldSetup");
    };

    return (
        <Grid item direction="column" alignItems="center" justifyContent="center" className={classes.body}>
            <div className={classes.title1}>Sacred.Finance</div>
            <div className={classes.title2}>Yield Redemption</div>
            <div className={classes.content}>Create a Shielded Account and calculate your<br /> Yield Points to privately redeem your Yield</div>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleClick}
                disabled={true}
            >
                Coming Soon!
            </Button>
        </Grid>
    );
};

export default YieldRedemption;