import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const history = useHistory();

  const handleRoute = (path) => {
    history.push(`/${path}`);
  }


  return (
    <ThemeProvider theme={theme}>
    <Grid item xs={5}>
      <ButtonGroup variant="contained" >
        <Button onClick={() => handleRoute('')}>{t('header.app')}</Button>
        <Button sx={{borderRadius: 'initial'}} target="_blank" href="https://sacred.gitbook.io/sacred-finance/">{t('header.about')}</Button>
        <Button sx={{borderRadius: 'initial'}} onClick={() => handleRoute('yield')}>{t('header.yield')}</Button>
        <Button sx={{borderRadius: 'initial'}} onClick={() => handleRoute('inspect')}>{t('header.inspect')}</Button>
        <Button sx={{borderRadius: 'initial'}} target="_blank" href="https://sacred.gitbook.io/sacred-finance/tokeneconomics/scrd-token-supply-and-distribution">{t('header.token')}</Button>
        <Button target="_blank" href="https://sacred.gitbook.io/sacred-finance/other-important-information/faq">{t('header.faq')}</Button>
      </ButtonGroup>
    </Grid>
    </ThemeProvider>
  )
}

export default Nav