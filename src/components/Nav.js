import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

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
        <Button className={classes.button} onClick={() => handleRoute('inspect')}>Inspect</Button>
        <Button className={classes.button} target="_blank" href="https://sacred.gitbook.io/sacred-finance/tokeneconomics/scrd-token-supply-and-distribution">Token</Button>
        <Button className={classes.button} target="_blank" href="https://sacred.gitbook.io/sacred-finance/other-important-information/faq">FAQ</Button>
      </ButtonGroup>
    </Grid>
  )
}

export default Nav