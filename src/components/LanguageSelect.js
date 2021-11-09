import React from "react";
import i18next from "i18next";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

const CustomSelect = styled(Select)`
  &.Mui-focused {
    background-color: #ef646d;
    color: #ffffff;
  }
  transition: all 0.5s;
`;

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

    const [language, setLanguage] = useState("en");

    const handleChange = (e) => {
        setLanguage(e.target.value);
    }

    useEffect(() => {
        i18next.changeLanguage(language);
    }, [language]);

    return (
        <FormControl variant="outlined">
            <CustomSelect
                labelId="network-select-label"
                value={language}
                onChange={handleChange}
            >
                <MenuItem button value="en">{languageMap.en.label}</MenuItem>
                <MenuItem button value="ch">{languageMap.ch.label}</MenuItem>
            </CustomSelect>
        </FormControl>
    );
};

export default LanguageSelect;
