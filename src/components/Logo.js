import logo from "../images/sacred_logo.svg";
import logoS from "../images/sacred_s.svg";
import logoA from "../images/sacred_a.svg";
import logoC from "../images/sacred_c.svg";
import logoR from "../images/sacred_r.svg";
import logoE from "../images/sacred_e.svg";
import logoD from "../images/sacred_d.svg";
import Grid from "@mui/material/Grid";
import makeStyles from '@mui/styles/makeStyles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logo: {
    cursor: "pointer",
  },
}));

const Logo = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  //TODO use text with correct font instead of images?
  return (
    <Grid item xs={3} className={classes.logo} onClick={handleClick}>
      <Grid
        item
        xs
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <img src={logo} alt="logo" />
        </Grid>
        <Grid item>
          <img src={logoS} alt="logo" />
          <img src={logoA} alt="logo" />
          <img src={logoC} alt="logo" />
          <img src={logoR} alt="logo" />
          <img src={logoE} alt="logo" />
          <img src={logoD} alt="logo" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Logo;
