import Logo from "./Logo";
import Nav from "./Nav";
import Grid from "@mui/material/Grid";
import Connect from "./Connect";
import Version from "./Version";
import LanguageSelect from "./LanguageSelect";

const Header = ({ handleAlert, handleNetworkId, networkId }) => {
  return (
    <div className="header">
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Logo />
        <Version
          handleNetworkId={handleNetworkId}
          networkId={networkId}
          handleAlert={handleAlert}
        />
        <Connect handleAlert={handleAlert} networkId={networkId}/>
        <LanguageSelect />
        <Nav />
      </Grid>
    </div>
  );
};

export default Header;
