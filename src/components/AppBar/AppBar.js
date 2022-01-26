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

export default function AppBar({data}) {
  const classes = useStyles();
  if (data === 0) {
    return (
      <div className={classes.root}>
        <AppBarMaterial position="static" color="">
          <Toolbar>
            <Link to="/">
              <LogoTipo />
            </Link>
            <Typography variant="h2" className={classes.title}>
              <NavLink
                activeclassname="active"
                className={"styleButtonsNav"}
                exact
                to="/"
              >
              </NavLink>
            </Typography>

            <Button color="inherit">
              <Typography variant="h6" className={classes.login}>
                <NavLink
                  activeclassname="active"
                  className={"styleButtonsNav"}
                  exact
                  to="/Login"
                >
                Ingresar
                </NavLink>
              </Typography>
            </Button>
          </Toolbar>
        </AppBarMaterial>
      </div>
  );
  } else if (data === 1) {
    return (
      <div className={classes.root}>
        <AppBarMaterial position="static" color="">
          <Toolbar>
            <Link to="/SelfTriage">
              <LogoTipo />
            </Link>
            <Typography variant="h2" className={classes.title}>
              <NavLink
                activeclassname="active"
                className={"styleButtonsNav"}
                exact
                to="/SelfTriage"
              >              
              </NavLink>
            </Typography>

            <Button color="inherit">
              <Typography variant="h5" className={classes.registry}>
                <NavLink
                  activeclassname="active"
                  className={"styleButtonsNav"}
                  exact
                  to="/"
                  onClick={() => {this.data = 0}}
                >
                  Salir
                </NavLink>
              </Typography>
            </Button>
          </Toolbar>
        </AppBarMaterial>
      </div>
    );
  }
}


AppBar.defaultProps = {
  props: 0,
 }



