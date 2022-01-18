import AppBarMaterial from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LogoTipo from "../LogoTipo/LogoTipo.js";
import "./AppBar.css";
import { Link, NavLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBarMaterial position="static">
        <Toolbar>
          <Link to="/">
            <LogoTipo />
          </Link>
          <Typography variant="h2" className={classes.title}>
            <NavLink activeclassname="active" 
            className={"QuitarEstilo"} 
            exact to="/">
              AutoMedical
            </NavLink>
          </Typography>

          <Button color="inherit">
            <Typography variant="h5" className={classes.login}>
            <NavLink activeclassname="active" 
            className={"QuitarEstilo"} 
            exact to="/Login">
              Ingresar
              </NavLink>
            </Typography>
          </Button>
          <Button color="inherit">
            <Typography variant="h5" className={classes.registry}>
            <NavLink activeclassname="active" 
            className={"QuitarEstilo"} 
            
            exact to="/Registry">
              Registrar
              </NavLink>
            </Typography>
          </Button>
        </Toolbar>
      </AppBarMaterial>
    </div>
  );
}
