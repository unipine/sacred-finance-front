import React from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import TextField from "@mui/material/TextField";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const Web3 = require("web3");
const web3 = window.web3 ? new Web3(window.web3.currentProvider) : null;

export const CustomTextField = styled(TextField)`
  margin: ${(props) => props.theme.spacing(1)};
  min-width: 200px;
  color: white;
  & .MuiInputBase-input {
    color: #ffffff;
    font-family: Montserrat;
  }
  & label.Mui-focused {
    color: white;
  }
  &.MuiInput-underline:after {
    border-bottom-color: white;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: white;
    }
    &:hover fieldset {
      border-color: white;
    }
    &.Mui-focused fieldset {
      bordercolor: white;
    }
  }
`;

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    42, // Kovan Testnet
  ],
});

const Connect = ({ handleAlert, networkId }) => {
  // const classes = useStyles();

  const { active, account, activate, chainId } = useWeb3React();

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
    if (!web3) {
      activate(injectedConnector, (err) => {});
    }
    else {
      if (chainId === undefined || (chainId !== undefined && networkId !== chainId)){
        changeNetworkId();
        activate(injectedConnector, (err) => {});
      }
    }
  };

  return (
    <div>
      {active ? (
        <CustomTextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={account.substring(0, 22) + "..."}
        />
      ) : (
        <Button
          variant="outlined"
          sx={{
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
