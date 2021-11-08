import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useHistory } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    fontWeight: 'bold'
  },
}));

const Nav = () => {

  const history = useHistory();
  const classes = useStyles();

  const handleRoute = (path) => {
    history.push(`/${path}`);
  }


  return (
    <Grid item xs={5}>
      <ButtonGroup variant="contained" >
        <Button className={classes.button} onClick={() => handleRoute('')}>Sacred App</Button>
        <Button className={classes.button} target="_blank" href="https://sacred.gitbook.io/sacred-finance/">About</Button>
        <Button className={classes.button} onClick={() => handleRoute('yield')}>Yield</Button>
        <Button className={classes.button} onClick={() => handleRoute('inspect')}>Inspect</Button>
        <Button className={classes.button} target="_blank" href="https://sacred.gitbook.io/sacred-finance/tokeneconomics/scrd-token-supply-and-distribution">Token</Button>
        <Button className={classes.button} target="_blank" href="https://sacred.gitbook.io/sacred-finance/other-important-information/faq">FAQ</Button>
      </ButtonGroup>
    </Grid>
  )
}

export default Nav