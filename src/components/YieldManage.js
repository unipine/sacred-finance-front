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

const YieldManage = () => {
    const history = useHistory();
    const classes = useStyles();
    const location = useLocation();

    return (
        <div>
            
        </div>
    );
};

export default YieldManage;
