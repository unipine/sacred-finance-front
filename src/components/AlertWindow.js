import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";

const AlertWindow = ({ openAlert, handleCloseAlert, alertText }) => {
  const getStr = (err) => {
    console.log(err);
    if (
      err.indexOf("UnsupportedChainIdError") >= 0 ||
      err.indexOf("Unsupported chain id") >= 0
    ) {
      return "Unsupported network selected. Please choose Kovan Test Network on Metamask.";
    } else if (
      err.indexOf("NoConfluxProviderError") >= 0 ||
      err.indexOf("No Conflux provider was found") >= 0
    ) {
      return "No Conflux provider detected. Please install or enable Conflux Portal.";
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
        <strong>Warning: </strong>
        {getStr(alertText)}
      </Alert>
    </Snackbar>
  );
};

export default AlertWindow;
