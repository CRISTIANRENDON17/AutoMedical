import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles, Checkbox, TextField, FormControlLabel, Button, Container, Snackbar, Grid } from '@material-ui/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Alert, Stack } from '@mui/material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

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

const LoginButton = () => {
  const email = document.getElementById("Email").value;
  const password = document.getElementById("contraseña").value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {    
    //const user = userCredential.user;
    mensaje = "Ingreso Exitoso";
  })
  .catch((error) => {
    mensaje = "Ingreso Fallido";
    console.log("Error al autenticar el usuario: ", error.code);
  });
  return null;
};

export default function LoginForm(props) {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

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

  /*Métodos para el campo contraseña*/
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
              placeholder="micorreo@email.com"
              variant="outlined"
              type="email"
              error={errorEmail}
              className={classes.textField}
            />
            <FormControl>
              <InputLabel 
                htmlFor="password" 
                required
                error={errorPassword}>Contraseña
              </InputLabel>
              <OutlinedInput
                fullWidth
                id="contraseña"
                variant="outlined"
                type={values.showPassword ? 'text' : 'password'}
                error={errorPassword}
                value={values.password}
                className={classes.textField}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña *"
              />
            </FormControl>
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
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                El formato del Correo Electrónico es "micorreo@email.com".
            </Alert>
           </Snackbar>
           <Snackbar open={errorPassword} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                La Contraseña debe ser minímo de 4 caracteres y máximo 12 caracteres.
            </Alert>
           </Snackbar>
        </Stack>
      </div>
    );
  };

  return Login();
}
