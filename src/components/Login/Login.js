import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { CardContent, Card, makeStyles, Checkbox, TextField, FormControlLabel, Button, Container, Snackbar, Grid } from '@material-ui/core';
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { Alert, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  form:{
    display: "flex",
    "flex-direction": "column",
  },
  textField:{
    "margin-bottom": "1rem",
  },
  link:{
    "font-size": "0.85rem",
    "text-decoration-line": "underline"
  },
  iconButton:{
    "color" : "#3F51B5",
  },
  helperTextContainer:{
    "margin-left" : "14px",
    "margin-right" : "14px",
  },
  helperTextPassword:{
    "color" : "#f44336",
    "font-size" : "0.75rem",
    "margin-top" : "-10px",
    "font-family" : "\"Roboto\", \"Helvetica\", \"Arial\", \"sans-serif\" ",
  }
}));

export default function Login() {

  /* Variable para la ruta de navegación */
  const history = useNavigate();

  /* Guarda los estilos en la variable classes */
  const classes = useStyles(); 

  /* Variables para mostrar las alertas de: Error o Success al dar clic en guardar */
  const [alertError, setAlertError] = useState(false);
  const [alertWarning, setAlertWarning] = useState(false);
  
  /* Variables para mostrar los mensajes de error de los campos */
  const [target, setTarget] = useState([{ id:"", value:"" }]);
  const [touched, setTouched] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState([]);
  const [errorMessagePassword, setErrorMessagePassword] = useState([]);
  
  /* Variable para el campo contraseña */
  const [values, setValues] = useState({password: '', showPassword: false,});

  /* Método que valida la autenticación del usuario */
  const autenticarUsuario = () => {
    if(errorMessageEmail.length === 0 && errorMessagePassword.length === 0){
      const email = document.getElementById("email").value;
      const password = document.getElementById("contraseña").value;
      const auth = getAuth();

      setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {    
          console.log("Ingreso exitoso al iniciar sesión");
          history('/LandingPage', {replace : true});
        })
        .catch((error) => {
          setAlertWarning(true);
          console.log("Error al autenticar el usuario: ", error.code);
        });
      })
      .catch((error) => {
        setAlertWarning(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error al autenticar el usuario: ", errorCode, " ", errorMessage);
      })
    } else{
      setAlertError(true);
    }
  }

  /* Método para validar los campos Email y Contraseña con expresiones regulares */
  useEffect(() => {
    if(target.id === 'email'){
      if(target.value) {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(target.value)) {
          setErrorMessageEmail(["Formato incorrecto. Ejemplo \"micorreo@email.com\" "]);
        }else{
          setErrorMessageEmail([]);
        }
      }else{
        setErrorMessageEmail(["Este campo es obligatorio"]);
      }
    }else if(target.id === 'contraseña'){
      if(target.value){
        if (!/^.{4,12}$/.test(target.value)) {
          setErrorMessagePassword(["Mínimo 4 caracteres, Máximo 12"]);
        }else{
          setErrorMessagePassword([]);
        }
      }else{
        setErrorMessagePassword(["Este campo es obligatorio"]);
      }
    }
  }, [target]);

  /* Método para capturar el campo y guardarlo en variable */
   const handleChangeTarget = (event) => {
    setTarget({id:event.target.id, value: event.target.value});
  };

  /* Método para validar si se da clic en el campo */
  const handleTouch = () => {
    setTouched(true);
  };
  
  /* Método para cerrar la alerta de información */
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertError(false);
    setAlertWarning(false);
  };

  /* Métodos para el campo contraseña */
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setTarget({id:event.target.id, value: event.target.value});
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

  /* Método con el formulario del Login */
  const Login = () => {
    return (
      <div>
      <h3 style={{ textAlign: "center" }}>Iniciar Sesión</h3>
      <Card>
        <CardContent>
      <div>
        <Container component="main" maxWidth="xs">
          <form className={classes.form} noValidate>
            <TextField
              fullWidth
              required
              autoFocus
              id="email"
              label="Correo Electrónico"
              placeholder="micorreo@email.com"
              variant="outlined"
              type="email"
              className={classes.textField}
              FormHelperTextProps={{
                className: classes.helperText
              }}
              
              error={touched && Boolean(errorMessageEmail.length)}
              helperText={touched && errorMessageEmail[0]}
              onChange={handleChangeTarget}
              onFocus={handleTouch}
            />
            <FormControl>
              <InputLabel 
                htmlFor="password" 
                required
                error={touched && Boolean(errorMessagePassword.length)}
                >Contraseña
              </InputLabel>
              <OutlinedInput
                fullWidth
                id="contraseña"
                variant="outlined"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                className={classes.textField}
                onChange={handleChange('password')}
                label="Contraseña *"

                error={touched && Boolean(errorMessagePassword.length)}
                onFocus={handleTouch}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? 
                      <VisibilityOff
                        className={classes.iconButton}
                      /> : 
                      <Visibility 
                        className={classes.iconButton}
                      />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <div className={classes.helperTextContainer}>
                <div className={classes.helperTextPassword}>
                  {errorMessagePassword[0]}
                </div>
              </div>
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
              variant="contained"
              color="primary"
              onClick={autenticarUsuario}
              >Entrar 
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
          <Snackbar open={alertError} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Existen campos sin corregir
            </Alert>
          </Snackbar>
        </Stack>
        <Stack spacing={2} sx={{ width: '100%' }}>       
          <Snackbar open={alertWarning} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
              La combinación de Correo Electrónico y Contraseña no coinciden. Intente de nuevo
            </Alert>
          </Snackbar>
        </Stack>
      </div>
      </CardContent>
        </Card>
        </div>
    );
  };
  return Login();
}