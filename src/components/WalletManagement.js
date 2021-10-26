import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import { parseNote } from "../conflux/utils";
import { useWeb3React } from "@web3-react/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import WaitingModal from "./WaitingModal";
import { useLocation } from "react-router";

const web3Utils = require("web3-utils");

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "95%",
    },
    input: {
        "&.Mui-focused": {
            backgroundColor: "#EF646D",
            color: "#FFFFFF",
            fontWeight: "bold",
        },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    toggleButtonGroup: {
        minWidth: 120,
        margin: theme.spacing(1),
        height: theme.spacing(8),
        //width: '95%'
    },
    toggleButtonLeft: {
        borderBottomLeftRadius: "25px",
        borderTopLeftRadius: "25px",
    },
    toggleButtonRight: {
        borderBottomRightRadius: "25px",
        borderTopRightRadius: "25px",
    },
    buttonColor: {
        "&.Mui-selected": {
            backgroundColor: "#EF646D",
            color: "#FFFFFF",
        },
    },
    headerBtn: {
        marginTop: "-10px",
        fontSize: "20px",
        fontFamily: "Montserrat",
        textTransform: "none",
        fontWeight: "bold",
    },
    textField: {
        margin: theme.spacing(1),
        "& .MuiInputBase-input": {
            marginLeft: "10px",
            marginBottom: "10px",
        },
    },
    inspect: {
        position: "relative",
        left: "-100%",
        cursor: "pointer",
    },
}));

const isLikeBase32Address = (addr) => {
    // this won't return false when there's net1029, net1
    return /^(cfx(test)?|net\d+):(type\.(null|user|contract|builtin):)?[0123456789abcdefghjkmnprstuvwxyz]{42}$/i.test(
        addr
    );
};


const WalletManagement = ({
    deployment,
    handleGenerateClaim,
    handleSetToken,
    handleSetAmount,
    handleWithdraw,
    handleSetDeployment,
    handleRelayer,
    relayerOption
}) => {
    const history = useHistory();
    const classes = useStyles();
    // const [token, setToken] = React.useState(deployment.symbol);
    // const [amount, setAmount] = React.useState(deployment.amount);
    const [withdrawbtnDisabled, setWithdrawBtnDisabled] = useState(true);
    const [depositbtnDisabled, setDepositbtnDisabled] = useState(true);

    const location = useLocation();
    const { account } = useWeb3React();

    const [claim, setClaim] = useState("");
    const [recipient, setRecipient] = useState("");
    const [waiting, setWaiting] = useState(false);

    const [selectedWithdraw, setSelectedWithdraw] = useState(false);

    const handleAmount = async (event, newAmount) => {
        if (!newAmount) return;
        // setAmount(newAmount);
        await handleSetAmount(newAmount);
    };

    const handleChange = (event) => {
        // setToken(event.target.value);
        handleSetToken(event.target.value);
    };

    const handleWithdrawClick = () => {
        setSelectedWithdraw(true);
    };

    const handleDepositClick = () => {
        setSelectedWithdraw(false);
    }

    useEffect(() => {
        if (deployment.symbol === null || deployment.amount === null) {
            setDepositbtnDisabled(true);
        } else {
            setDepositbtnDisabled(false);
        }
    }, [deployment.symbol, deployment.amount]);

    async function sendWithdraw() {
        if (await handleWithdraw({ claim, recipient })) {
            history.push("/withdrawCheck");
        }
        setWaiting(false);
    }

    const withdrawContinueClick = () => {
        setWaiting(true);
    };

    const depositContinueClick = () => {
        handleGenerateClaim();
        history.push("/depositClaim");
    }

    const handleWithdrawRoute = () => {
        if (location.pathname === "/inspect") history.push("/walletmanagement");
    };

    const handleClaim = (e) => {
        setClaim(e.target.value);
    };

    const handleRecipient = (e) => {
        setRecipient(e.target.value);
    };

    const handleCurrentAddress = () => {
        setRecipient(account);
    };

    const handleRelayerOption = (event) => {
        handleRelayer(event.target.checked);
    }

    useEffect(() => {
        if (waiting) {
            sendWithdraw();
        }
    }, [waiting])

    //TODO optimize this as there's time lag to parse the note
    useEffect(() => {
        if (claim.length > 0 && recipient.length > 0) {
            if (web3Utils.isAddress(recipient)) {
                setWithdrawBtnDisabled(false);
            } else {
                setWithdrawBtnDisabled(true);
            }

            try {
                parseNote(claim);
            } catch (err) {
                console.log("The note has invalid format");
                setWithdrawBtnDisabled(true);
            }
        } else {
            setWithdrawBtnDisabled(true);
        }
    }, [claim, recipient]);

    return (
        <div
            onClick={handleWithdrawRoute}
            className={location.pathname === "/inspect" ? classes.inspect : ""}
        >
            <Paper>
                <Box p={3}>
                    <Grid container direction="column" spacing={2}>
                        <Grid
                            item
                            container
                            direction="row"
                            spacing={0}
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Button
                                    variant="text"
                                    className={classes.headerBtn}
                                    style={!selectedWithdraw ? { marginLeft: "10px" } : { color: "#A7A9AC", marginRight: "10px" }}
                                    onClick={handleDepositClick}
                                >
                                    <b>Deposit</b>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="text"
                                    className={classes.headerBtn}
                                    style={selectedWithdraw ? { marginLeft: "10px" } : { color: "#A7A9AC", marginRight: "10px" }}
                                    onClick={handleWithdrawClick}
                                >
                                    Withdraw
                                </Button>
                            </Grid>
                        </Grid>

                        {
                            selectedWithdraw ? (
                                <>
                                    <Grid item container direction="row" justify="flex-start">
                                        <Grid item container direction="column" alignItems="flex-start">
                                            <br />
                                            <span style={{ marginLeft: "10px" }}>Sacred Claim</span>
                                            <TextField
                                                className={classes.textField}
                                                variant="filled"
                                                size="small"
                                                onChange={handleClaim}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="row" justify="flex-start">
                                        <Grid item container direction="column" alignItems="flex-start">
                                            <span style={{ marginLeft: "10px" }}>Recipient Address</span>
                                            <TextField
                                                className={classes.textField}
                                                variant="filled"
                                                size="small"
                                                onChange={handleRecipient}
                                                InputProps={{ disableUnderline: true }}
                                                fullWidth
                                                value={recipient}
                                            />
                                            <Grid item container justify="flex-end">
                                                <span
                                                    className="blue-text"
                                                    onClick={handleCurrentAddress}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <small>
                                                        <b>Use current address</b>
                                                    </small>
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="row" justify="flex-start">
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox checked={relayerOption} onChange={handleRelayerOption} />}
                                                label="Use Sacred Relayer"
                                                disabled={true}
                                            />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item>
                                        <br />
                                        <br />
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={{ textTransform: "none", fontWeight: "bold" }}
                                            fullWidth
                                            onClick={withdrawContinueClick}
                                            disabled={withdrawbtnDisabled}
                                        >
                                            Continue
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace(
                                            ".",
                                            ""
                                        )}.sacred.eth`}</small>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item container direction="column" alignItems="flex-start">
                                        <br />
                                        <span style={{ marginLeft: "10px" }}>Token</span>

                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <Select
                                                value={deployment.symbol}
                                                onChange={handleChange}
                                                className={classes.input}
                                            >
                                                <MenuItem value={"ETH"}>ETH</MenuItem>
                                                {/* <MenuItem value={'cBTC'}>cBTC</MenuItem>
                                        <MenuItem value={'cUSDT'}>cUSDT</MenuItem>
                                        <MenuItem value={'cETH'}>cETH</MenuItem> */}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item></Grid>
                                    <Grid item container direction="column" alignItems="flex-start">
                                        <span style={{ marginLeft: "10px" }}>Amount</span>

                                        <Grid item container direction="row" justify="center">
                                            <Grid item>
                                                <ToggleButtonGroup
                                                    className={classes.toggleButtonGroup}
                                                    value={deployment.amount}
                                                    exclusive
                                                    onChange={handleAmount}
                                                    aria-label="text amount"
                                                >
                                                    <ToggleButton
                                                        className={`${classes.toggleButtonLeft} ${classes.buttonColor}`}
                                                        value={deployment.denominations[0]}
                                                        aria-label={deployment.denominations[0]}
                                                    >
                                                        <strong>{deployment.denominations[0]}</strong>&nbsp;
                                                        {deployment.symbol}
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        className={classes.buttonColor}
                                                        value={deployment.denominations[1]}
                                                        aria-label={deployment.denominations[1]}
                                                        disabled={true}
                                                    >
                                                        <strong>{deployment.denominations[1]}</strong>&nbsp;
                                                        {deployment.symbol}
                                                    </ToggleButton>
                                                    <ToggleButton
                                                        className={classes.buttonColor}
                                                        value={deployment.denominations[2]}
                                                        aria-label={deployment.denominations[2]}
                                                        disabled={true}
                                                    >
                                                        <strong>{deployment.denominations[2]}</strong>&nbsp;
                                                        {deployment.symbol}
                                                    </ToggleButton>

                                                    <ToggleButton
                                                        className={`${classes.toggleButtonRight} ${classes.buttonColor}`}
                                                        value={deployment.denominations[3]}
                                                        aria-label={deployment.denominations[3]}
                                                        disabled={true}
                                                    >
                                                        <strong>{deployment.denominations[3]}</strong>&nbsp;
                                                        {deployment.symbol}
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <br />
                                        <br />

                                        <br />
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={{ textTransform: "none", fontWeight: "bold" }}
                                            fullWidth
                                            onClick={depositContinueClick}
                                            disabled={depositbtnDisabled}
                                        >
                                            Continue
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace(
                                            ".",
                                            ""
                                        )}.sacred.eth`}</small>
                                    </Grid>
                                </>
                            )
                        }
                    </Grid>
                </Box>
            </Paper>
            {waiting && <WaitingModal content="Transaction is progressing..." />}
        </div>
    );
};

export default WalletManagement;
