import React from 'react';
import { Grid, Typography, Box, makeStyles } from '@material-ui/core';
import logo from "../images/logo.svg";
import logoS from "../images/sacred_s.svg";
import logoA from "../images/sacred_a.svg";
import logoC from "../images/sacred_c.svg";
import logoR from "../images/sacred_r.svg";
import logoE from "../images/sacred_e.svg";
import logoD from "../images/sacred_d.svg";

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        zIndex: 1300,
        inset: '0px',
    },
    body: {
        zIndex: -1,
        position: 'fixed',
        inset: '0px',
        backgroundColor: 'rgba(20, 20, 20, 0.85)',
    },
    style: {
        position: 'absolute',
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        bgcolor: 'transparent',
        width: '100%',
        border: 'none',
    },
    content: {
        color: 'white',
        fontSize: 18,
        fontFamily: [
            'Montserrat'
        ]
    }
})

const WaitingModal = (prop) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.body} />
            <Box className={classes.style}>
                <Grid item xs={12}>
                    <Grid
                        item
                        xs
                        container
                        spacing={2}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <img src={logo} alt="logo" />
                        </Grid>
                        <Grid item>
                            <img src={logoS} alt="logo" />
                            <img src={logoA} alt="logo" />
                            <img src={logoC} alt="logo" />
                            <img src={logoR} alt="logo" />
                            <img src={logoE} alt="logo" />
                            <img src={logoD} alt="logo" />
                        </Grid>
                    </Grid>
                </Grid>
                <Typography className={classes.content}>
                    {prop.content}
                </Typography>
            </Box>
        </Box>
    );
}

export default WaitingModal;