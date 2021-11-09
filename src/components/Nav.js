import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e0e0e0",
      dark: "#bdbdbd"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "35px",
          textTransform: 'none',
          fontWeight: 'bold'
        },
      },
    },
  }
})

const Nav = () => {

  const history = useHistory();

  const handleRoute = (path) => {
    history.push(`/${path}`);
  }


  return (
    <ThemeProvider theme={theme}>
    <Grid item xs={5}>
      <ButtonGroup variant="contained" >
        <Button onClick={() => handleRoute('')}>Sacred App</Button>
        <Button sx={{borderRadius: 'initial'}} target="_blank" href="https://sacred.gitbook.io/sacred-finance/">About</Button>
        <Button sx={{borderRadius: 'initial'}} onClick={() => handleRoute('yield')}>Yield</Button>
        <Button sx={{borderRadius: 'initial'}} onClick={() => handleRoute('inspect')}>Inspect</Button>
        <Button sx={{borderRadius: 'initial'}} target="_blank" href="https://sacred.gitbook.io/sacred-finance/tokeneconomics/scrd-token-supply-and-distribution">Token</Button>
        <Button target="_blank" href="https://sacred.gitbook.io/sacred-finance/other-important-information/faq">FAQ</Button>
      </ButtonGroup>
    </Grid>
    </ThemeProvider>
  )
}

export default Nav