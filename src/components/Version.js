import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";

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

const Version = ({ handleNetworkId, networkId, handleAlert }) => {
  const classes = useStyles();
  const [versionChainId, setVersionChainId] = useState(networkId);
  const { chainId } = useWeb3React();

  const handleChange = async (event) => {
    if (chainId !== undefined) {
      let sacredChainId = '0x' + parseInt(event.target.value).toString(16);
      await window.ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: sacredChainId }],
        })
        .then(res => console.log(res))
        .then(err => console.log(err));
    }
    setVersionChainId(event.target.value);
    handleNetworkId(event.target.value);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="network-select-label" style={{ color: "white" }}>
          Network
        </InputLabel>
        <Select
          labelId="network-select-label"
          value={versionChainId}
          onChange={handleChange}
          className={classes.input}
        >
          {/* <MenuItem value={1}>Ethereum Mainnet</MenuItem> */}
          <MenuItem value={42}>Kovan Testnet</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Version;
