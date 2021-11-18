import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import WaitingModal from "./WaitingModal";

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
  const [waiting, setWaiting] = useState(false);

  const handleChange = (event) => {
    setWaiting(true);
    if (chainId !== undefined) {
      let sacredChainId = "0x" + parseInt(event.target.value).toString(16);
      window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: sacredChainId }],
        })
        .then((result) => {
          setWaiting(false);
          setVersionChainId(event.target.value);
          handleNetworkId(event.target.value);
        })
        .catch((e) => {
          console.log(e);
          setWaiting(false);
          if (e.code === 4092)
            alert(
              `App network(${sacredChainId}) doesn't match to network selected in your wallet.`
            );
          else 
           alert(e.message);
          setWaiting(true);
          window.ethereum
            .request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x" + parseInt(chainId).toString(16) }],
            })
            .then(() => {
              setWaiting(false);
            });
        })
        .finally(() => {
          setWaiting(false);
        });
    }
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
          }}
        >
          <CustomMenuItem value={1}>{t("version.ethereum")}</CustomMenuItem>
          <CustomMenuItem value={42}>{t("version.kovan")}</CustomMenuItem>
        </VersionSelect>
      </FormControl>
      {waiting && <WaitingModal content={t("alert.switching_net")} />}
    </div>
  );
};

export default Version;
