import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const VersionSelect = styled(Select)`
  &.Mui-focused {
    background-color: #ef646d;
    color: #ffffff;

    fieldset {
      border-color: #ef646d !important;
    }
  }
  transition: all 0.5s;
`;

const VersionLabel = styled(InputLabel)`
  &.Mui-focused {
    color: #ffffff;
  }
  color: #ffffff;
`;

const CustomMenuItem = styled(MenuItem)`
  &.Mui-selected,
  &.Mui-selected:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const Version = ({ handleNetworkId, networkId, handleAlert }) => {
  const [versionChainId, setVersionChainId] = useState(networkId);
  const { chainId } = useWeb3React();
  const { t } = useTranslation();

  const handleChange = async (event) => {
    if (chainId !== undefined) {
      let sacredChainId = "0x" + parseInt(event.target.value).toString(16);
      await window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: sacredChainId }],
        })
        .then((res) => console.log(res))
        .then((err) => console.log(err));
    }
    setVersionChainId(event.target.value);
    handleNetworkId(event.target.value);
  };

  return (
      <div>
        <FormControl variant="outlined">
          <VersionLabel id="network-select-label">Network</VersionLabel>
          <VersionSelect
            labelId="network-select-label"
            value={versionChainId}
            onChange={handleChange}
            MenuProps={{
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              getContentAnchorEl: null,
            }}
          >
            <CustomMenuItem value={1}>{t('version.ethereum')}</CustomMenuItem>
            <CustomMenuItem value={42}>{t('version.kovan')}</CustomMenuItem>
          </VersionSelect>
        </FormControl>
      </div>
  );
};

export default Version;
