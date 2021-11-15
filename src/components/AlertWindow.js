import { Alert } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import { useTranslation } from "react-i18next";

const AlertWindow = ({ openAlert, handleCloseAlert, alertText }) => {
  const { t } = useTranslation();

  const getStr = (err) => {
    console.log(err);
    if (
      err.indexOf("UnsupportedChainIdError") >= 0 ||
      err.indexOf("Unsupported chain id") >= 0
    ) {
      return t('alert.unsupported_network');
    } else if (
      err.indexOf("NoConfluxProviderError") >= 0 ||
      err.indexOf("No Conflux provider was found") >= 0
    ) {
      return t('alert.no_conflux_provider');
    } else {
      return err;
    }
  };

  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={6000}
      onClose={handleCloseAlert}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert onClose={handleCloseAlert} severity="warning">
        <strong>{t('common.warning')}: </strong>
        {getStr(alertText)}
      </Alert>
    </Snackbar>
  );
};

export default AlertWindow;
