import Box from "@mui/material/Box";
import logo from "../images/sacred_logo_colour.svg";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import React from "react";
import { useHistory } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect } from "react";
import Terms from "./Terms";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Ethereum Mainnet
    42, // Kovan Testnet
  ],
});

const TermsModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10%;
`;

const TermsContent = styled("div")`
  background-color: ${(props) => props.theme.palette.background.paper};
  padding-top: ${(props) => props.theme.spacing(2)};
  padding-left: ${(props) => props.theme.spacing(4)};
  padding-right: ${(props) => props.theme.spacing(4)};
  padding-bottom: ${(props) => props.theme.spacing(3)};
  overflow-y: scroll;
  z-index: 1301;
  height: 60vh;
`;

const TermsButton = styled(Button)`
  transform: none;
  font-weight: bold:
`

const Welcome = ({ handleAgree, handleAlert }) => {
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
              <TermsButton
                variant="text"
                color="secondary"
                onClick={handleOpen}
              >
                {t("Terms")}
              </TermsButton>
            </Grid>
            <Grid item>
              <TermsButton
                variant="contained"
                color="secondary"
                onClick={onConnectClick}
                fullWidth
              >
                {t("Agree & Connect")}
              </TermsButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <TermsModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <TermsContent>
            <Terms />
          </TermsContent>
        </Fade>
      </TermsModal>
    </>
  );
};

export default Welcome;
