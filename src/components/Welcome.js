import Box from "@mui/material/Box";
import logo from "../images/sacred_logo_colour.svg";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import React from "react";
import { useHistory } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect } from "react";
import Terms from "./Terms";
import { useTranslation } from "react-i18next";

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Ethereum Mainnet
    42, // Kovan Testnet
  ],
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: "10%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    height: "100%",
    overflowY: "scroll",
  },
}));

const Welcome = ({ handleAgree, handleAlert }) => {
  const classes = useStyles();
  const { activate, active } = useWeb3React();
  const history = useHistory();

  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onConnectClick = () => {
    if (!active) {
      activate(injectedConnector, (err) => {
        handleAlert(err);
      });
    } else {
      history.push("/deposit");
    }
  };

  useEffect(() => {
    if (active) {
      handleAgree();
      history.push("/deposit");
    }
  }, [active, history, handleAgree]);

  return (
    <>
      <Paper>
        <Box p={5}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <h3>{t("welcome_to_sacred")}</h3>
            </Grid>
            <Grid item>
              {t("Send private transactions using the Ethereum network.")}
            </Grid>
            <Grid item>
              <img src={logo} alt="logo" />
            </Grid>
            <Grid item>
              {t("By clicking “Agree & Connect” you agree to our ")}
              <Button
                variant="text"
                color="secondary"
                style={{ textTransform: "none", fontWeight: "bold" }}
                onClick={handleOpen}
              >
                {t("Terms")}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                style={{ textTransform: "none", fontWeight: "bold" }}
                onClick={onConnectClick}
                fullWidth
              >
                {t("Agree & Connect")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Terms />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Welcome;
