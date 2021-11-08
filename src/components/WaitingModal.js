import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import video from "../images/sacred_animated_white";

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
    video: {
        width: '250px',
        height: '250px',
        borderRadius: '100%',
    },
    content: {
        paddingTop: '1.25rem',
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
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <img src={video} className={classes.video}></img>
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