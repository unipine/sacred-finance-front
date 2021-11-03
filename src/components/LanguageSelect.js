import React from "react";
import i18next from "i18next";

import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        // minWidth: 120,
        // width: "95%",
    },
    input: {
        "&.Mui-focused": {
            backgroundColor: "#EF646D",
            color: "#FFFFFF",
            // fontWeight: "bold",
        },
        color: "#FFFFFF",
        borderColor: "white",
        labelStyle: {
            color: "#FFFFFF",
        },
    },
}));

const languageMap = {
    en: {
        label: "English",
        active: true
    },
    ch: {
        label: "中文",
        active: false
    }
};

const LanguageSelect = () => {
    const classes = useStyles();

    const [language, setLanguage] = useState("en");

    const handleChange = (e) => {
        setLanguage(e.target.value);
    }

    useEffect(() => {
        i18next.changeLanguage(language);
    }, [language]);

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <Select
                labelId="network-select-label"
                value={language}
                onChange={handleChange}
                className={classes.input}
            >
                <MenuItem button value="en">{languageMap.en.label}</MenuItem>
                <MenuItem button value="ch">{languageMap.ch.label}</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguageSelect;
