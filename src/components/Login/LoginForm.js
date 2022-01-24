import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Covid from './Covid.png';
import Avatar from '@mui/material/Avatar';
import React, {useEffect} from 'react';
import Alert from '@mui/material/Alert';
import {getCollection} from "../../actions";
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    "flex-direction": "column",
  },
  textField: {
    "margin-bottom": "1rem",
  },
  link:{
    "font-size": "0.85rem",
    "text-decoration-line": "underline"
  },
}));
export const Mensaje = () => {
  return mensaje;
};

var mensaje = "";
var aux = 0;

const LoginButton = () => {
  let aux2;
  if (aux === 0) {
    aux2 = array.find(
      ({ email }) => email === document.getElementById("Email").value
    );
  }
  if (aux2 === undefined) {
    aux = 0;
    mensaje = "Ingreso Fallido";
  } else if (aux2.password === document.getElementById("contraseña").value) {
    mensaje = "Ingreso Exitoso";
    aux = 1;
  }else{
    aux = 0;
    mensaje = "Ingreso Fallido";
  }
  return null;
};

var array = [];

export default function LoginForm(props) {
  useEffect(() => {    
    const obtenerUsuarios = async() => {                
      const datos = await getCollection('usuarios');
        datos.data.docs.map( (user) => {
          array.push(user.data());
      });
    };   
    obtenerUsuarios();
  }, []);  
  const classes = useStyles(); /*guardar los estilos en la variable classes*/

  const formSubmitHandler = (event) => {
    event.preventDefault(); /*No se reinicia el form al darle al button*/
    props.onLogin(); /*Propiedades de padre a hijo*/
  };
  const funcion1 = () => {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <form onSubmit={formSubmitHandler} className={classes.form} noValidate>
            <TextField
              fullWidth
              required
              autoFocus
              id="Email"
              label="Email"
              variant="outlined"
              type="email"
              className={classes.textField}
            />
            <TextField
              fullWidth
              required
              id="contraseña"
              label="Contraseña"
              variant="outlined"
              type="password"
              className={classes.textField}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  value="remember"
                  color="primary"
                />
              }
              label="Recordar Contraseña"
            />
            <Button
              fullWidth
              onClick={LoginButton}
              variant="contained"
              color="primary"
              type="submit">Entrar 
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/Recover" className={classes.link}>
                  Recuperar contraseña
                </Link>
              </Grid>
              <Grid item>
                <Link to="/Registry" className={classes.link}>
                  ¿No tienes cuenta?, ¡Regístrate!
                </Link>
              </Grid>
            </Grid>
            </form>
        </Container>
      </div>
    );
  };
  const funtion2 = () => {
    return (
      <div>
        <Avatar 
          alt="Remy Sharp" 
          src={Covid}  
          sx={{height:"100%",width:"100%",margin:"10px"}} 
          variant="rounded" 
        />    
        <Alert 
          severity="info"
          action={
            <Link to="/SelfTriage">
              <Button
              onClick={LoginButton}
              variant="contained"
              color="primary"
              type="submit">Entrar
              </Button>
            </Link>
          }
        >
          A ingresado con exito a la plataforma pulse para continuar →
        </Alert>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  };
  if (aux === 1) {
    return funtion2();
  } else {
    return funcion1();
  }
}
