import React, { useEffect } from 'react';
import { useState } from 'react';
import { addUser, getUser } from '../../actions.js';
import { Alert, Stack } from '@mui/material';
import { makeStyles, TextField, Button, Snackbar, Container, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    "flex-direction":
      "column",
  },
  textField: {
    "margin-bottom":
      "0.5rem",
  },
  link:{
    "font-size": "0.85rem",
    "text-decoration-line": "underline",
  },
}));

export const Mensaje = () => {
  return mensaje;
};

var mensaje = "";
const registrarUsuario = async() => {
  const Usuario = {
    identification: document.getElementById("identificacion").value,
    fullName: document.getElementById("nombre").value,
    age: document.getElementById("edad").value,
    cellNumber: document.getElementById("celular").value,
    phoneNumber: "",
    address: "",
    email: document.getElementById("email").value,
    password: document.getElementById("contraseña").value,
    confcontraseña: document.getElementById("confirmarContraseña").value,
    rol: "usuario",
  };

  mensaje = "<di><l1>Error</li></div>";

  if(!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{2,70}$/.test(Usuario.fullName)) {
    mensaje =
      mensaje +
      "<div><li>Nombre solo acepta valores alfabéticos, minimo 2 dígitos máximo 70<br></li></div>";
  }
  if (!/^(([1-9]{1})([0-9]{1})?)$/.test(Usuario.age)) {
    mensaje =
      mensaje +
      `<div><li>Edad solo acepta valores numéricos entre 1 y 99<br></li></div>`;
  }
  if (!/^(([3]{1})([0-9]{9}))$/.test(Usuario.cellNumber)) {
    mensaje =
      mensaje +
      `<div><li>Celular solo acepta 10 valores numéricos empezando con 3<br></li></div>`;
  }
  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(Usuario.email)) {
    mensaje =
      mensaje +
      `<div><li>Correo no puede estar vacío, debe detener caracteres antes y despues del @ con una dirección <br></li></div>`;
  }
  if (!/^.{4,12}$/.test(Usuario.password)) {
    mensaje =
      mensaje +
      `<div><li>Contraseña no puede estar vacía y tiene de 4 a 12 caracteres<br></li></div>`;
  }
  if (!/^.{4,12}$/.test(Usuario.confcontraseña)) {
    mensaje =
      mensaje +
      `<div><li>Confirmar Contraseña no puede estar vacía y tiene de 4 a 12 caracteres<br></li></div>`;
  }
  if (Usuario.password !== Usuario.confcontraseña) {
    mensaje = mensaje + `<div><li>Las contraseñas no conciden<br></li></div>`;
  }

  if (mensaje === "<di><l1>Error</li></div>") {
    const result = await validarUsuario(Usuario);
    if(!result.usuarioExiste) {    
      guardarUsuario(Usuario); 
      crearUsuarioAutenticacion(Usuario);
      limpiarForm();
      mensaje = "";
    }else{        
      mensaje = mensaje + ((result.usuarioExisteById && result.usuarioExisteByEmail) ?     
      `<div><li>El usuario con identificación: <b>` + Usuario.identification + `</b> y correo: <b>` + Usuario.email+ `</b> ya se encuentra registrado en el sistema.<br></li></div>` : 
      result.usuarioExisteById ? 
      `<div><li>El usuario con identificación: <b>` + Usuario.identification + `</b> ya se encuentra registrado en el sistema.<br></li></div>` :
      result.usuarioExisteByEmail ? 
      `<div><li>El usuario con correo: <b>` + Usuario.email + `</b> ya se encuentra registrado en el sistema.<br></li></div>` : "");
    }
  }
  document.getElementById("alert").innerHTML = mensaje;
}

const validarUsuario = async(Usuario) => {  
  const userQuery = await getUser(Usuario.identification, Usuario.email);
  const usuarioExiste = (userQuery.userIdExiste || userQuery.userEmailExiste) ? true : false;
  const result = { usuarioExiste: usuarioExiste, usuarioExisteById: userQuery.userIdExiste, usuarioExisteByEmail: userQuery.userEmailExiste };
  return result;
};

const guardarUsuario = async(newUser) => {
  const result = await addUser('usuarios', newUser);
  console.log("Usuario registrado exitosamente: ", result.data);
  mensaje ="";
};

const crearUsuarioAutenticacion = (Usuario) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, Usuario.email, Usuario.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Credencial: ",user);      
    })
    .catch((error) => {
      console.log(error);
    });
}

const limpiarForm = () => {
  document.getElementById("identificacion").value = "";
  document.getElementById("identificacion").focus();
  document.getElementById("nombre").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contraseña").value = "";
  document.getElementById("confirmarContraseña").value = "";
};

export default function RegistryForm(props) {
  const classes = useStyles();
  
  /* Variables para mostrar las alertas de: Error o Success al dar clic en guardar */
  const [alertError, setAlertError] = useState(false);
  const [alertOK, setAlertOK] = useState(false);

  /* Variables para mostrar los mensajes de error de los campos */
  const [target, setTarget] = useState([{ id:"", value:"" }]);
  const [touched, setTouched] = useState(false);
  const [errorMessageIdentification, setErrorMessageIdentification] = useState([]);
  const [errorMessageAge, setErrorMessageAge] = useState([]);
  const [errorMessageFullName, setErrorMessageFullName] = useState([]);
  const [errorMessageCellNumber, setErrorMessageCellNumber] = useState([]);
  const [errorMessageEmail, setErrorMessageEmail] = useState([]);
  const [errorMessagePassword, setErrorMessagePassword] = useState([]);
  const [errorMessageConfcontraseña, setErrorMessageConfcontraseña] = useState([]);

  useEffect(() => {
    if(target.id === 'identificacion'){
      if(target.value) {
        if (!/^\d{7,14}$/.test(target.value)) {
          setErrorMessageIdentification(["Mínimo 7 Números"]);
        }else{
          setErrorMessageIdentification([]);
        }
      }else{
        setErrorMessageIdentification(["Campo obligatorio"]);
      }
    }else if(target.id === 'edad'){
      if(target.value) {
        if (!/^(([1-9]{1})([0-9]{1})?)$/.test(target.value)) {
          setErrorMessageAge(["Solo valores numéricos entre 1 y 99"]);
        }else{
          setErrorMessageAge([]);
        }
      }else{
          setErrorMessageAge(["Este campo es obligatorio"]);
      }
    }else if(target.id === 'celular'){
      if(target.value){
        if (!/^(([3]{1})([0-9]{9}))$/.test(target.value)) {
          setErrorMessageCellNumber(["Solo 10 números, iniciar con 3"]);
        } else{
          setErrorMessageCellNumber([]);
        }
      }else{
        setErrorMessageCellNumber(["Este campo es obligatorio"]);
      }
    }else if(target.id === 'email'){
      if(target.value){
        if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(target.value)) {
          setErrorMessageEmail(["Caracteres antes y después del @ con una dirección"]);
        } else{
          setErrorMessageEmail([]);
        }
      }else{
        setErrorMessageEmail(["Este campo es obligatorio"]);
      }
    }else if(target.id === 'nombre'){
      if(target.value){
        if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(target.value)) {
          setErrorMessageFullName(["Solo valores alfabéticos"]);
        }else if(!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{2,70}$/.test(target.value)) {
          setErrorMessageFullName(["Cantidad máxima de dígitos (70), mínima (2)"]);
        }else{
          setErrorMessageFullName([]);
        }
      }else{
          setErrorMessageFullName(["Este campo es obligatorio"]);
      }
    }else if(target.id === 'contraseña'){
      const confirmarContraseña = document.getElementById("confirmarContraseña").value;
      if(target.value){
        if (!/^.{4,12}$/.test(target.value)) {
          setErrorMessagePassword(["Mínimo 4 caracteres, Máximo 12"]);
        }else if(target.value !== confirmarContraseña){
          setErrorMessagePassword(["Las contraseñas no coinciden"]);
        }else{
          setErrorMessagePassword([]);
          setErrorMessageConfcontraseña([]);
        }
      }else{
        setErrorMessagePassword(["Este campo es obligatorio"]);
      }
    }else if(target.id === 'confirmarContraseña'){
      const contraseña = document.getElementById("contraseña").value;
      if(target.value){
        if (!/^.{4,12}$/.test(target.value)) {
          setErrorMessageConfcontraseña(["Mínimo 4 caracteres, Máximo 12"]);
        }else if(target.value !== contraseña){
          setErrorMessageConfcontraseña(["Las contraseñas no coinciden"]);
        }else{
          setErrorMessageConfcontraseña([]);
          setErrorMessagePassword([]);
        }
      }else{
        setErrorMessageConfcontraseña(["Este campo es obligatorio"]);
      }
    }
  }, [target]);

  const handleOnBlur = (event) => {
    setTarget({id:event.target.id, value: event.target.value});
  };

  /* Método para validar si se da clic en el campo */
  const handleTouch = () => {
    setTouched(true);
  };
  
  /* Método para cerrar la alerta en pantalla */
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertError(false);
    setAlertOK(false);
  };

  /* Se ejecuta con el Submit y valida si crear el usuario o no; sacando alertas */
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if(errorMessageIdentification.length === 0 && errorMessageAge.length === 0
      && errorMessageFullName.length === 0 && errorMessageCellNumber.length === 0
      && errorMessageEmail.length === 0 && errorMessagePassword.length === 0
      && errorMessageConfcontraseña.length === 0){
        registrarUsuario();
    }else{
      setAlertError(true);
    }
    props.onRegistry();
  };

  return (
    <div>
      <Container component="main" maxWidth="md">
        <form onSubmit={formSubmitHandler} id="forrmulario" className={classes.form} noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2} lg={2}>  
                    <TextField
                      fullWidth
                      required
                      autoFocus
                      id="identificacion"
                      label="Identificación"
                      variant="outlined"
                      type="number"
                      className={classes.textField}
                      size="small"

                      error={touched && Boolean(errorMessageIdentification.length)}
                      helperText={touched && errorMessageIdentification[0]}
                      onBlur={handleOnBlur}
                      onFocus={handleTouch}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                      fullWidth
                      required
                      id="nombre"
                      label="Nombre Completo"
                      variant="outlined"
                      type="text"
                      className={classes.textField}
                      size="small"

                      error={touched && Boolean(errorMessageFullName.length)}
                      helperText={touched && errorMessageFullName[0]}
                      onBlur={handleOnBlur}
                      onFocus={handleTouch}          
                    />
                    
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>  
                    <TextField
                      fullWidth
                      required
                      id="edad"
                      label="Edad"
                      variant="outlined"
                      type="number"
                      className={classes.textField}
                      size="small"

                      error={touched && Boolean(errorMessageAge.length)}
                      helperText={touched && errorMessageAge[0]}
                      onBlur={handleOnBlur}
                      onFocus={handleTouch}
                    /> 
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>  
                    <TextField
                      fullWidth
                      required
                      id="celular"
                      label="Celular"
                      variant="outlined"
                      type="number"
                      className={classes.textField}
                      size="small"

                      error={touched && Boolean(errorMessageCellNumber.length)}
                      helperText={touched && errorMessageCellNumber[0]}
                      onBlur={handleOnBlur}
                      onFocus={handleTouch}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      fullWidth
                      required 
                      id="email"
                      label="Correo Electrónico"
                      variant="outlined"
                      type="email"
                      className={classes.textField}
                      size="small"

                      error={touched && Boolean(errorMessageEmail.length)}
                      helperText={touched && errorMessageEmail[0]}
                      onBlur={handleOnBlur}
                      onFocus={handleTouch}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                      fullWidth
                      required
                      id="contraseña"
                      label="Contraseña"
                      variant="outlined"
                      type="password"
                      className={classes.textField}
                      size="small"

                      error={touched && Boolean(errorMessagePassword.length)}
                      helperText={touched && errorMessagePassword[0]}
                      onBlur={handleOnBlur}
                      onFocus={handleTouch}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                      fullWidth
                      required
                      id="confirmarContraseña"
                      label="Confirmar Contraseña"
                      variant="outlined"
                      type="password"
                      className={classes.textField}
                      pattern="[A-Za-z0-9!?-]{8,12}"
                      size="small"

                      error={touched && Boolean(errorMessageConfcontraseña.length)}
                      helperText={touched && errorMessageConfcontraseña[0]}
                      onBlur={handleOnBlur}
                      onFocus={handleTouch}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <center>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >Registrar
                  </Button>
                </center>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/Login" className={classes.link}>
                  ¿Ya tienes cuenta?, ¡Ingresa!
                </Link>
              </Grid>
            </Grid>
            <Stack spacing={2} sx={{ width: '100%' }}>       
              <Snackbar open={alertError} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  Existen campos sin diligenciar correctamente
                </Alert>
              </Snackbar>
            </Stack>
            <Stack spacing={2} sx={{ width: '100%' }}>       
              <Snackbar open={alertOK} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Usuario guardado corectamente
                </Alert>
              </Snackbar>
            </Stack>
            <div id="alert"></div>
        </form>
      </Container>
    </div>
  );
}