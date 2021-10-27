import React from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const Web3 = require("web3");
const web3 = window.web3 ? new Web3(window.web3.currentProvider) : null;

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
      color: "white",
    },
  },
  input: {
    color: "#ffffff",
    fontFamily: "Montserrat",
  },
}));

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    42, // Kovan Testnet
  ],
});

const Connect = ({ handleAlert, networkId }) => {
  const classes = useStyles();

  const { active, account, activate } = useWeb3React();

  const changeNetworkId = async () => {
    let sacredChainId = '0x' + parseInt(networkId).toString(16);
    await window.ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: sacredChainId }],
      })
      .then(res => console.log(res))
      .then(err => console.log(err));
  }

  const onConnectClick = async () => {
    activate(injectedConnector, (err) => {
      handleAlert(err);

      if(web3) 
        changeNetworkId();
    });
  };

  return (
    <div>
      {active ? (
        <CssTextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          className={classes.root}
          InputProps={{
            className: classes.input,
          }}
          value={account.substring(0, 22) + "..."}
        />
      ) : (
        <Button
          variant="outlined"
          style={{
            textTransform: "none",
            backgroundColor: "transparent",
            borderColor: "#fff",
            color: "#fff",
            width: "200px",
          }}
          onClick={onConnectClick}
          fullWidth
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default Connect;
