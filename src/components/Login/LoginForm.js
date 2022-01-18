import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { GetArray } from "../database/BaseDatos.js";
import { Link } from "react-router-dom";
import Covid from './Covid.png';
import Avatar from '@mui/material/Avatar';

import * as React from 'react';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    "flex-direction": "column",
  },
  textField: {
    "margin-bottom": "1rem",
  },
}));

var aux = 0;
const LoginButton = () => {
  let array = GetArray();
  /*  console.log(typeof array.find((data) => data.email));
  console.log(typeof  Email); */
  let aux2;
  if (aux === 0) {
    aux2 = array.find(
      ({ email }) => email === document.getElementById("Email").value
    );
  }

  if (aux2 === undefined) {
    aux = 0;
    console.log("Fallido");
  } else if (aux2.password === document.getElementById("contraseña").value) {
    console.log("exito");
    aux = 1;
  }

  return null;
};

export default function LoginForm(props) {
  const classes = useStyles(); /*guardar los estilos en la variable classes*/

  const formSubmitHandler = (event) => {
    event.preventDefault(); /*No se reinicia el form al darle al button*/
    props.onLogin(); /*Propiedades de padre a hijo*/
  };
  const funcion1 = () => {
    return (
      <div>
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <TextField
            id="Email"
            label="Email"
            variant="outlined"
            type="email"
            className={classes.textField}
          />
          <TextField
            id="contraseña"
            label="Contraseña"
            variant="outlined"
            type="password"
            className={classes.textField}
          />

          <Button
            onClick={LoginButton}
            variant="contained"
            color="primary"
            type="submit"
          >
            Entrar
          </Button>
        </form>
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
                type="submit"
              >
                Entrar
              </Button>
            </Link>
            }
          >
            A ingresado con exito a la plataforma pulse para continuar →
          </Alert>
        
      </div>
    );
  };
  if (aux === 1) {
    return funtion2();
  } else {
    return funcion1();
  }
}
