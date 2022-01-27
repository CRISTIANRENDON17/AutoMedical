import { Link } from "react-router-dom";
import { useState } from 'react';
import { Avatar, Alert, Stack } from '@mui/material';
import { makeStyles, Checkbox, TextField, FormControlLabel, Button, Container, Snackbar, Grid} from '@material-ui/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Covid from './Covid.png';

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
var isLoginOK = 0;

const LoginButton = () => {
  const email = document.getElementById("Email").value;
  const password = document.getElementById("contraseña").value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {    
    //const user = userCredential.user;
    mensaje = "Ingreso Exitoso";     
    isLoginOK = 1;    
  })
  .catch((error) => {
    mensaje = "Ingreso Fallido";
    console.log("Error al autenticar el usuario: ", error.code);
  });
  return null;
};

export default function LoginForm(props) {
  /*Guarda los estilos en la variable classes*/
  const classes = useStyles(); 

  const [errorEmail, setErrorEmail] = useState(false);   
  const [errorPassword, setErrorPassword] = useState(false); 

  const formSubmitHandler = (event) => {
    /*No se reinicia el form al darle al button*/
    event.preventDefault();
    /*Validar campos formulario*/
    validarEmail();
    validarConstraseña();
    /*Propiedades de padre a hijo*/
    props.onLogin(); 
  };

  /*Método para validar que el correo electrónico no esté vacío y cumpla con el estandar*/
  const validarEmail = () => {  
    var email = document.getElementById("Email");
    if(email.value ===  undefined || email.value === '' ||
      (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email.value))){
      setErrorEmail(true);
    }else{
      setErrorEmail(false);
    }
  };

  /*Método para validar que la contraseña no esté vacía y cumpla con el estandar*/
  const validarConstraseña = () => {  
    var password = document.getElementById("contraseña");
    if (password.value ===  undefined || password.value === '' ||
       (!/^.{4,12}$/.test(password.value))){
      setErrorPassword(true);
    }else{
      setErrorPassword(false);
    }
  };

  /*Método para cerrar la alerta de información*/
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorEmail(false);
    setErrorPassword(false);
  };

  /*Método con el formulario del Login*/
  const Login = () => {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <form onSubmit={formSubmitHandler} className={classes.form} noValidate>
            <TextField
              fullWidth
              required
              autoFocus
              id="Email"
              label="Correo Electrónico"
              variant="outlined"
              type="email"
              error={errorEmail}
              onBlur={validarEmail}
              className={classes.textField}
            />
            <TextField
              fullWidth
              required
              id="contraseña"
              label="Contraseña"
              variant="outlined"
              type="password"
              error={errorPassword}
              onBlur={validarConstraseña}
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
        <Stack spacing={2} sx={{ width: '100%' }}>       
           <Snackbar open={errorEmail} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                El formato del Correo Electrónico es "micorreo@email.com".
            </Alert>
           </Snackbar>
           <Snackbar open={errorPassword} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                La Contraseña debe ser minímo de 4 caracteres y máximo 12 caracteres.
            </Alert>
           </Snackbar>
        </Stack>
      </div>
    );
  };

  /*Método cuando inicia sesión correctamente*/
  const LoginOK = () => {
    return (
      <div>
        <Avatar 
          alt="Remy Sharp" 
          src={Covid}  
          sx={{height:"45%", width:"45%"}} 
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
              type="submit">Registrar Síntomas
              </Button>
            </Link>
          }
        >
        A ingresado con exito a la plataforma
        </Alert>
      </div>
    );
  };

  /*Método para validar si se inicio correctamente la sesión o no; 1: Sesión OK, 0: Lo contrario*/
  if (isLoginOK === 1) {
    return LoginOK();
  } else {
    return Login();
  }
}
