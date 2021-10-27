import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import WaitingModal from "./WaitingModal";
import { Radio, RadioGroup, FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    body: {
        textAlign: 'left',
    },
    fontItalic: {
        fontStyle: 'italic',
    },
    copy: {
        color: '#EF646D',
        textDecoration: 'underline',
    },
    textField: {
        margin: theme.spacing(1),
        borderRadius: "22px",
        "& .MuiInputBase-input": {
            marginLeft: "10px",
            marginBottom: "10px",
        },
    },
    button: {
        margin: '20px',
        marginBottom: '0px',
        fontWeight: "bold",
        fontSize: '24px',
    }
}));

const YieldRedemptionSetup = () => {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = React.useState(0);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    const handleSetupClick = () => {
        history.push("/yieldManage");
    }

    return (
        <Paper className={classes.body}>
            <Box p={3}>
                <Grid container direction="column" >
                    <Grid item>
                        <InputLabel style={{ color: '#EF646D', fontWeight: 'bold', paddingBottom: '20px' }}>Account Setup</InputLabel>
                    </Grid>
                    <Grid item>
                        <InputLabel style={{ fontStyle: 'italic', paddingBottom: '20px' }}>
                            This key is only used to store your incognito points for the mining protocol.<br />
                            <b>Please back it up and never share it with anyone.</b>
                        </InputLabel>
                    </Grid>
                    <Grid item container direction="row" justifyContent="space-between">
                        <InputLabel>Recovery Key</InputLabel>
                        <InputLabel className={classes.copy}><u>Copy</u></InputLabel>
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.textField}
                            multiline
                            variant="filled"
                            size="small"
                            InputProps={{ disableUnderline: true }}
                            disabled
                            fullWidth
                        />
                        <TextField
                            className={classes.textField}
                            multiline
                            variant="filled"
                            size="small"
                            InputProps={{ disableUnderline: true }}
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <RadioGroup
                                aria-label="setting"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="I backed up the recovery key" />
                                <FormControlLabel value="1" control={<Radio />} label="Create Additional on-chain backup of your recovery key with your wallet" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item container direction="column" justifyContent="center">
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={handleSetupClick}
                        >
                            Setup
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.button}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default YieldRedemptionSetup;
