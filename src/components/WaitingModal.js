import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import logo from "../images/logo.svg";
import logoS from "../images/sacred_s.svg";
import logoA from "../images/sacred_a.svg";
import logoC from "../images/sacred_c.svg";
import logoR from "../images/sacred_r.svg";
import logoE from "../images/sacred_e.svg";
import logoD from "../images/sacred_d.svg";

const WaitingModal = (prop) => {
    const mainStyle = {
        position: 'fixed',
        zIndex: 1300,
        inset: '0px',
    }

    const bodyStyle = {
        zIndex: -1,
        position: 'fixed',
        inset: '0px',
        bgcolor: 'rgba(20, 20, 20, 0.85)',
    }

    const style = {
        position: 'absolute',
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        bgcolor: 'transparent',
        width: '100%',
        border: 'none',
    };

    const letterStyle = {
        width: '50%',
    }

    return (
        <Box sx={mainStyle}>
            <Box sx={bodyStyle}>
            </Box>
            <Box sx={style}>
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {prop.content}
                </Typography>
            </Box>
        </Box>
    );
}

export default WaitingModal;