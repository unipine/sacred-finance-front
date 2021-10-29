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
import { InputLabel } from "@material-ui/core";
import arrow_down from "../images/arrow_down.svg";
import settingImg from "../images/setting.svg";

const useStyles = makeStyles((theme) => ({
    body: {
        textAlign: "left",
        fontFamily: [
            'Montserrat'
        ],
    },
    formControl: {
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    headerBtn: {
        marginTop: "-10px",
        fontSize: "1.25rem",
        fontFamily: "Montserrat",
        textTransform: "none",
        fontWeight: "bold",
    },
    textField: {
        marginTop: theme.spacing(1),
        "& .MuiInputBase-input": {
            marginLeft: "10px",
            marginBottom: "10px",
        },
    },
    balance: {
        border: "1px solid #757575",
        borderRadius: '1.25rem',
        padding: '1rem',
    },
    max: {
        padding: '0.25rem',
        marginRight: '0.5rem',
        border: "1px solid #747474",
        backgroundColor: "#8C8C8C",
        borderRadius: "6px",
        color: 'white',
        fontSize: '0.85rem',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        marginTop: '80px',
        fontSize: '1.25rem',
    },
    textBlack: {
        color: 'black',
        fontWeight: 700,
    },
    setting: {
        marginTop: '1.25rem',
        border: '4px solid #8CBDE9',
        borderRadius: '0.5rem',
        backgroundColor: 'rgba(140, 189, 233, 0.3)',
        padding: '0.5rem',
        width: '1.5rem'
    }
}));

const YieldManage = () => {
    const history = useHistory();
    const classes = useStyles();
    const location = useLocation();

    const [selectedWithdraw, setSelectedWithdraw] = useState(false);
    const [coinType, setCoinType] = useState(0);

    const handleCoinType = (e) => {
        setCoinType(e.target.value);
    }

    const handleWithdrawClick = () => {
        history.push("/yieldWithdraw");
        setSelectedWithdraw(true);
    };

    const handleRedeemClick = () => {
        history.push("/yieldRedeem");
        setSelectedWithdraw(false);
    }

    const handleCalculatePoints = () => {
        history.push("/yieldRedeemConfirm");
    }

    const handleWithrawYield = () => {
        history.push("/yieldWithdrawConfirm");
    }

    const handleClickRelayerSetting = () => {
        history.push("/relayerSettings");
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
                                    style={!selectedWithdraw ? { marginLeft: "10px" } : { color: "#A7A9AC", marginRight: "10px" }}
                                    onClick={handleRedeemClick}
                                >
                                    <b>Redeem</b>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="text"
                                    className={classes.headerBtn}
                                    style={selectedWithdraw ? { marginLeft: "10px" } : { color: "#A7A9AC", marginRight: "10px" }}
                                    onClick={handleWithdrawClick}
                                >
                                    <b>Withdraw</b>
                                </Button>
                            </Grid>
                        </Grid>

                        {
                            selectedWithdraw ? (
                                <>
                                    <Grid item direction="column">
                                        <Grid item className={classes.balance} style={{ marginTop: '20px' }}>
                                            <Grid item container direction="row" justifyContent="space-between">
                                                <InputLabel className={classes.textBlack}>From</InputLabel>
                                                <InputLabel className={classes.textBlack}>Balance: 56078</InputLabel>
                                            </Grid>
                                            <Grid item container direction="row" justifyContent="space-between" alignItems="center" style={{ paddingTop: '10px' }}>
                                                <InputLabel style={{ fontSize: '20px' }}>0.0</InputLabel>
                                                <div className={classes.flex}>
                                                    <div className={classes.max}>MAX</div>
                                                    <select
                                                        labelId="network-select-label"
                                                        value={coinType}
                                                        onChange={handleCoinType}
                                                        className="select"
                                                    >
                                                        <option value={0}>USDT YP</option>
                                                        <option value={1}>BNB</option>
                                                    </select>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item style={{ textAlign: 'center', padding: '20px' }}>
                                            <img src={arrow_down} />
                                        </Grid>
                                        <Grid item className={classes.balance}>
                                            <Grid item container direction="row" justifyContent="space-between" style={{ paddingBottom: '10px' }}>
                                                <InputLabel className={classes.textBlack}>To</InputLabel>
                                                <InputLabel className={classes.textBlack}>Balance: 0.000000</InputLabel>
                                            </Grid>
                                            <Grid item container direction="row" justifyContent="space-between">
                                                <InputLabel style={{ fontSize: '20px' }}>0.0</InputLabel>
                                                <InputLabel style={{ fontSize: '20px' }}>USDT</InputLabel>
                                            </Grid>
                                        </Grid>
                                        <Grid item container>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                fullWidth
                                                onClick={handleWithrawYield}
                                            >
                                                Withdraw Yield
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item direction="column" justifyContent="space-between">
                                        <Grid item>
                                            <InputLabel>Sacred Claim</InputLabel>
                                            <TextField
                                                className={classes.textField}
                                                multiline
                                                variant="filled"
                                                size="small"
                                                InputProps={{ disableUnderline: true }}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                fullWidth
                                                style={{ marginTop: '280px', }}
                                                onClick={handleCalculatePoints}
                                            >
                                                Calculate Points
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </>
                            )
                        }
                    </Grid>
                </Box>
            </Paper>
            {
                !selectedWithdraw && (
                    <div className={classes.setting} onClick={handleClickRelayerSetting}>
                        <img src={settingImg}></img>
                    </div>
                )
            }
        </div>
    );
};

export default YieldManage;
