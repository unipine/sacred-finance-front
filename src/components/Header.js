import Logo from "./Logo";
import Nav from "./Nav";
import Grid from "@mui/material/Grid";
import Connect from "./Connect";
import Version from "./Version";
import LanguageSelect from "./LanguageSelect";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#bdbdbd",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "35px",
          minWidth: "300px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "35px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "25px",
          color: "#ffffff",
        },
      },
    },
  },
});

const Header = ({ handleAlert, handleNetworkId, networkId }) => {
  return (
    <ThemeProvider theme={theme}>
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
          <Connect handleAlert={handleAlert} networkId={networkId} />
          <LanguageSelect />
          <Nav />
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Header;
