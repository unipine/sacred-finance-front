import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { useRef, useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useHistory } from "react-router-dom";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: "95%",
    "& .MuiInputBase-input": {
      marginLeft: "10px",
      marginBottom: "10px",
    },
  },
}));

const DepositClaim = ({ deposit, deployment }) => {
  const history = useHistory();

  const classes = useStyles();

  const { t } = useTranslation();

  const [copySuccess, setCopySuccess] = useState();
  const textAreaRef = useRef(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(deposit.note);
    setCopySuccess("Copied!");
  };

  // Download file
  function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  const downloadClaim = () => {
    let fileName = deposit.note.substr(0, 30);
    download(deposit.note, `${fileName}.txt`, "text/plain");
  };

  const handleClick = () => {
    history.push("/depositConfirm");
  };

  const handleDepositRoute = () => {
    history.push("/deposit");
  };

  return (
    <div>
      <Paper>
        <Box p={2}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              container
              direction="row"
              spacing={0}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="text"
                  startIcon={<ArrowBackIosIcon />}
                  onClick={handleDepositRoute}
                >
                  <b>{t("Back")}</b>
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <b>{t("Before you Deposit")}</b>
            </Grid>
            <Grid item>
              {t("In order to withdraw your deposit, you will have to enter this Claim:")}
            </Grid>
            <Grid item>
              <TextField
                className={classes.textField}
                multiline
                ref={textAreaRef}
                value={deposit.note}
                variant="filled"
                disabled
                size="small"
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
            </Grid>
            <Grid item container direction="row" spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  startIcon={<FileCopyOutlinedIcon />}
                  color="secondary"
                  style={{ textTransform: "none", fontWeight: "bold" }}
                  fullWidth
                  onClick={copyToClipboard}
                >
                  {copySuccess ? copySuccess : "Copy Claim"}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  startIcon={<SaveOutlinedIcon />}
                  color="secondary"
                  style={{ textTransform: "none", fontWeight: "bold" }}
                  fullWidth
                  onClick={downloadClaim}
                >
                  Save Claim
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <b>{t("Important:")} </b>{t("Store this Claim somewhere safe before continuing.")}
            </Grid>
            <Grid item>
              <br />
              <Button
                variant="contained"
                color="secondary"
                style={{ textTransform: "none", fontWeight: "bold" }}
                fullWidth
                onClick={handleClick}
              >
                {t("I saved the Claim")}
              </Button>
            </Grid>
            <Grid item>
              <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace(
                ".",
                ""
              )}.sacred.eth`}</small>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default DepositClaim;
