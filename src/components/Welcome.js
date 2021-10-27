import Box from "@material-ui/core/Box";
import logo from "../images/sacred_logo_colour.svg";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect } from "react";
import Terms from "./Terms";

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
      history.push("/walletmanagement");
    }
  };

  useEffect(() => {
    if (active) {
      handleAgree();
      history.push("/walletmanagement");
    }
  }, [active, history, handleAgree]);

  return (
    <>
      <Paper>
        <Box p={5}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <h3>Welcome to Sacred</h3>
            </Grid>
            <Grid item>
              Send private transactions using the Ethereum network.
            </Grid>
            <Grid item>
              <img src={logo} alt="logo" />
            </Grid>
            <Grid item>
              By clicking "Agree & Connect" you agree to our
              <Button
                variant="text"
                color="secondary"
                style={{ textTransform: "none", fontWeight: "bold" }}
                onClick={handleOpen}
              >
                Terms.
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
                Agree & Connect
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
