import Logo from "./Logo";
import Nav from "./Nav";
import Grid from "@material-ui/core/Grid";
import Connect from "./Connect";
import Version from "./Version";

const Header = ({ handleAlert, handleNetworkId, networkId }) => {
  return (
    <div className="header">
      <Grid
        container
        spacing={0}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Logo />
        <Version
          handleNetworkId={handleNetworkId}
          networkId={networkId}
          handleAlert={handleAlert}
        />
        <Connect handleAlert={handleAlert} networkId={networkId}/>
        <Nav />
      </Grid>
    </div>
  );
};

export default Header;
