import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import { useLocation } from "react-router";
import { InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    body: {
        textAlign: "left",
        fontFamily: [
            'Montserrat'
        ],
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "100%",
    },
    input: {
        fontSize: '1.25rem',
        fontFamily: 'Montserrat',
        marginBottom: '10rem',
        "&.Mui-focused": {
            backgroundColor: "#EF646D",
            color: "#FFFFFF",
            fontWeight: 'bold'
        },

    },

    item: {
        fontFamily: 'Montserrat',
        "&.MuiMenuItem-root": {
            fontSize: '1.25rem',
            fontWeight: 'bold'
        },
        "&.Mui-selected": {
            color: '#EF646D',
            backgroundColor: 'white',
        },
    },

    headerBtn: {
        marginTop: "-10px",
        fontSize: "1.25rem",
        textTransform: "none",
        fontWeight: "bold",
        fontFamily: 'Montserrat'
    },
    textField: {
        marginTop: theme.spacing(1),
        paddingTop: '1rem',
        paddingBottom: '1.5rem',
        "& .MuiInputBase-input": {
            padding: '0.5rem',
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            lineHeight: '1.4rem',
            marginLeft: "10px",
            marginBottom: "10px",
        },
    },

    button: {
        textTransform: "none",
        fontWeight: "bold",
        marginRight: '0.5rem',
        marginLeft: '0.5rem',
        fontSize: '1.5rem',
        fontFamily: 'Montserrat',
        "&.MuiButton-outlinedSecondary": {
            borderWidth: '3px',
        }
    }
}));

const RelayerSettings = () => {
    const history = useHistory();
    const classes = useStyles();
    const location = useLocation();

    const [selectedRelayerI, setSelectedRelayerI] = useState(false);
    const [layer, setLayer] = useState('');

    const handleLayerChange = (event) => {
        setLayer(event.target.value);
    };

    const handleRelayerChange = () => {
        setSelectedRelayerI(false);
    }

    const handleWalletChange = () => {
        setSelectedRelayerI(true);
    }

    return (
        <div>
            <Paper>
                <Box p={3} className={classes.body}>
                    <Grid container direction="column" spacing={2}>
                        <Grid
                            item
                            container
                            direction="row"
                            spacing={0}
                            justify="space-around"
                            alignItems="center"
                        >
                            <Grid item>
                                <Button
                                    variant="text"
                                    className={classes.headerBtn}
                                    style={!selectedRelayerI ? { marginLeft: "10px" } : { color: "#A7A9AC", marginRight: "10px" }}
                                    onClick={handleRelayerChange}
                                >
                                    <b>Relayer i</b>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="text"
                                    className={classes.headerBtn}
                                    style={selectedRelayerI ? { marginLeft: "10px" } : { color: "#A7A9AC", marginRight: "10px" }}
                                    onClick={handleWalletChange}
                                >
                                    <b>Wallet i</b>
                                </Button>
                            </Grid>
                        </Grid>

                        {
                            selectedRelayerI ? (
                                <>
                                    <Grid item direction="column">
                                        <Grid item className={classes.balance} style={{ marginTop: '20px' }}>
                                            <TextField
                                                className={classes.textField}
                                                multiline
                                                variant="filled"
                                                size="small"
                                                value="Make sure that ETH used to pay for the gas fee is not linkable to ANY of your addresses. Otherwise, the anonymity of the withdrawal will be comprised. We recommend using a Relayer instead. "
                                                InputProps={{ disableUnderline: true }}
                                                fullWidth
                                                disabled
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item direction="column">
                                        <Grid item>
                                            <InputLabel style={{ fontFamily: 'Montserrat', margin: '8px' }}>Relayer</InputLabel>
                                        </Grid>
                                        <Grid item container>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <Select
                                                    value={layer}
                                                    onChange={handleLayerChange}
                                                    className={classes.input}
                                                >
                                                    <MenuItem className={classes.item} value={'mainnet.t-relay.matic'}>mainnet.t-relay.matic</MenuItem>
                                                    <MenuItem className={classes.item} value={'noder.t-relay.matic'}>noder.t-relay.matic</MenuItem>
                                                    <MenuItem className={classes.item} value={'relay2.t-relay.matic'}>relay2.t-relay.matic</MenuItem>
                                                    <MenuItem className={classes.item} value={'4 mainnet.t-relay.matic'}>4 mainnet.t-relay.matic</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </>
                            )
                        }
                        <Grid item container>
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.button}
                                fullWidth
                            >
                                Set as default
                            </Button>
                        </Grid>
                        <Grid item container>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                fullWidth
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </div>
    );
};

export default RelayerSettings;
