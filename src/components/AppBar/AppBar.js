import React from 'react';
import LogoTipo from "../LogoTipo/LogoTipo.js";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser, faQuestionCircle, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import AppBarMaterial from "@material-ui/core/AppBar";
import { Button, Toolbar, Typography, makeStyles } from "@material-ui/core";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./AppBar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppBar({data}) {
  
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

            <Button color="inherit" onClick={handleClick}>
              <Typography variant="h6">
                <FontAwesomeIcon icon= {faUserCircle} size='lg' className="iconNavBar"/>
              </Typography>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
            <MenuItem onClick={handleClose}>
              <NavLink
                activeclassname="active"
                className={"styleButtonsNav"}
                exact
                to="/ProfileUser"
              >
                <FontAwesomeIcon icon= {faUser} size='md' className="iconNavBar"/>
                &nbsp;Perfil
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <NavLink
                activeclassname="active"
                className={"styleButtonsNav"}
                exact
                to="/HelpPage"
              >
                <FontAwesomeIcon icon= {faQuestionCircle} size='md' className="iconNavBar"/>
                &nbsp;Ayuda
              </NavLink>
            </MenuItem>
              <hr></hr>
            <MenuItem onClick={handleClose}>
              <NavLink
                activeclassname="active"
                className={"styleButtonsNav"}
                exact
                to="/"
                onClick={() => {this.data = 0}}
              >
                <FontAwesomeIcon icon= {faSignOutAlt} size='md' className="iconNavBar"/>
                &nbsp;Cerrar Sesión
              </NavLink>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBarMaterial>
      </div>
    );
  }
}

AppBar.defaultProps = {
  props: 0,
 }
