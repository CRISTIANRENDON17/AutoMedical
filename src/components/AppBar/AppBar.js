import React from 'react';
import AppBarMaterial from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LogoTipo from "../LogoTipo/LogoTipo.js";
import { Link, NavLink } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'

import "./AppBar.css";

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
        <AppBarMaterial position="static" color="transparent">
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
        <AppBarMaterial position="static" color="transparent">
          <Toolbar>
            <Link to="/LandingPage">
              <LogoTipo />
            </Link>
            <Typography variant="h2" className={classes.title}>
              <NavLink
                activeclassname="active"
                className={"styleButtonsNav"}
                exact
                to="/LandingPage"
              >              
              </NavLink>
            </Typography>

            <Button color="inherit">
              <Typography variant="h6" className={classes.login}>
                <NavLink
                  activeclassname="active"
                  className={"styleButtonsNav"}
                  exact
                  to="/SelfTriage"
                >
                Ingresar Síntomas
                </NavLink>
              </Typography>
            </Button>

            <Button color="inherit">
              <Typography variant="h6" className={classes.registry}>
                <NavLink
                  activeclassname="active"
                  className={"styleButtonsNav"}
                  exact
                  to="/"
                  onClick={() => {this.data = 0}}
                >
                  Cerrar Sesión
                </NavLink>
              </Typography>
            </Button>

            <Button color="inherit">
              <Typography variant="h6">
                <FontAwesomeIcon icon= {faUser} size='lg' className="iconNavBar"/>
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



