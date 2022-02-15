import React, { useEffect } from 'react';
import { useState } from 'react';
import { addUser, getUser } from '../../actions.js';
import { Alert, Stack } from '@mui/material';
import { CardContent, Card, makeStyles, TextField, Button, Snackbar, Container, Grid } from '@material-ui/core';
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

/* Método para validar el registro del usuario */
const validarUsuario = async(Usuario) => {
  var mensaje = 0;
  var result = null;
  try {
    result = await validarUsuarioExistente(Usuario);
  } catch(e) {
    console.log("Error al buscar el usuario: ", e);
  }
  if(result != null) {
    if(!result.usuarioExiste){
      try { 
        addUser('usuarios', Usuario).then((result) =>{    
          console.log("Usuario registrado exitosamente: ", result);
          if(result.statusResponse === true){
            crearAutenticacionUsuario(Usuario);
            limpiarForm();
          }
        });
      } catch(e) {
        console.log("Error al agregar el usuario: ", e);
      } 
    }else{   
      if(result.usuarioExisteById && result.usuarioExisteByEmail){
        mensaje = 2;
      }else if(result.usuarioExisteById){
        mensaje = 3;
      }else if(result.usuarioExisteByEmail){
        mensaje = 4;
      }else {
        mensaje = 0;
      }
    }
  }else{
    mensaje = 1;
  }
  return mensaje;
}

/* Método para validar si un usuario ya existe */
const validarUsuarioExistente = async(Usuario) => {
  var userQuery = null;
  try {
    userQuery = await getUser(Usuario.identification, Usuario.email);
  } catch(e) {
    console.log("Error al buscar el usuario: ", e);
  }
  if(userQuery.statusResponse === true){
    const usuarioExiste = (userQuery.userIdExiste || userQuery.userEmailExiste) ? true : false;
    const result = { usuarioExiste: usuarioExiste, usuarioExisteById: userQuery.userIdExiste, usuarioExisteByEmail: userQuery.userEmailExiste };
    return result;
  }
};

/* Método para crear la autenticación del usuario */
const crearAutenticacionUsuario = (Usuario) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, Usuario.email, Usuario.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Credencial: ",user);      
    })
    .catch((error) => {
      console.log(error);
    });
};

/* Método para limpiar formulario */
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

export default function Registry() {

  /* Guarda los estilos en la variable classes */
  const classes = useStyles();
  
  /* Variables para mostrar las alertas de: Error o Success al dar clic en guardar */
  const [alertError, setAlertError] = useState([{ estado:false, message:"" }]);
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

  /* Método para registrar usuario */
  const registrarUser = () => {
    if(errorMessageIdentification.length === 0 && errorMessageAge.length === 0
      && errorMessageFullName.length === 0 && errorMessageCellNumber.length === 0
      && errorMessageEmail.length === 0 && errorMessagePassword.length === 0
      && errorMessageConfcontraseña.length === 0){

      var mensaje = 0;
      const Usuario = {
        identification: document.getElementById("identificacion").value,
        fullName: document.getElementById("nombre").value,
        age: document.getElementById("edad").value,
        cellNumber: document.getElementById("celular").value,
        phoneNumber: "",
        address: "",
        email: document.getElementById("email").value.toLowerCase(),
        password: document.getElementById("contraseña").value,
        confcontraseña: document.getElementById("confirmarContraseña").value,
        rol: "usuario",
        estado:"Activo",
      };

      mensaje = validarCamposFormulario(Usuario);

      if (mensaje === 0) {
        validarUsuario(Usuario).then((result) => {
          mensaje = result;
          if(mensaje === 0){
            setAlertOK(true);
          }else if (mensaje === 1 ){
            setAlertError({ estado: true, message: "Ha ocurrido un error, comuniquese con el admnistrador"});
          }else if (mensaje === 2 ){
            setAlertError({ estado: true, message: "El usuario con la Identificación: "+Usuario.identification+" y el Correo Electrónico: "+Usuario.email+", ya se encuentra registrado en el sistema"});
          }else if (mensaje === 3 ){
            setAlertError({ estado: true, message: "El usuario con la Identificación: "+Usuario.identification+", ya se encuentra registrado en el sistema."});
          }else if (mensaje === 4 ){
            setAlertError({ estado: true, message: "El usuario con el Correo Electrónico: "+Usuario.email+", ya se encuentra registrado en el sistema"});
          }
        });
      }else{
        setAlertError({ estado: true, message: "Existen campos sin diligenciar correctamente"});
      }
    }else{
      setAlertError({ estado: true, message: "Existen campos sin diligenciar correctamente"});
    }
  };

  /* Método para validar los campos del formulario */
  const validarCamposFormulario = (Usuario) => {
    var mensaje = 0;
    if(Usuario.identification === null || Usuario.identification === undefined || Usuario.identification === ""){
      setErrorMessageIdentification(["Campo obligatorio"]);
      mensaje  = 1 ;
    }
    if (Usuario.fullName === null || Usuario.fullName  === undefined || Usuario.fullName === ""){
      setErrorMessageFullName(["Este campo es obligatorio"]);
      mensaje  = 1 ;
    }
    if (Usuario.age === null || Usuario.age  === undefined || Usuario.age === ""){
      setErrorMessageAge(["Este campo es obligatorio"]);
      mensaje  = 1 ;
    }
    if (Usuario.cellNumber === null || Usuario.cellNumber  === undefined || Usuario.cellNumber === ""){
      setErrorMessageCellNumber(["Este campo es obligatorio"]);
      mensaje  = 1 ;
    }
    if (Usuario.email === null || Usuario.email  === undefined || Usuario.email === ""){
      setErrorMessageEmail(["Este campo es obligatorio"]);
      mensaje  = 1 ;
    }
    if (Usuario.password === null || Usuario.password  === undefined || Usuario.password === ""){
      setErrorMessagePassword(["Este campo es obligatorio"]);
      mensaje  = 1 ;
    }
    if (Usuario.confcontraseña === null || Usuario.confcontraseña  === undefined || Usuario.confcontraseña === ""){
      setErrorMessageConfcontraseña(["Este campo es obligatorio"]);
      mensaje  = 1 ;
    }
    return mensaje;
  }

  /* Método para validar los campos del formulario con expresiones regulares */
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
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(target.value)) {
          setErrorMessageEmail(["Formato incorrecto. Ejemplo \"micorreo@email.com\" "]);
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

  /* Método Blur para llenar la variable target */
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

  /* Formulario de registro */
  return (
    <div>  
      <h3 style={{ textAlign: "center" }}>Registro de Usuario</h3>
      <Card>
        <CardContent>
        <div>
          <Container component="main" maxWidth="md">
            <form className={classes.form} noValidate>
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
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <center>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={registrarUser}
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
                  <Snackbar open={alertError.estado} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                      {alertError.message}
                    </Alert>
                  </Snackbar>
                </Stack>
                <Stack spacing={2} sx={{ width: '100%' }}>       
                  <Snackbar open={alertOK} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Usuario guardado corectamente
                    </Alert>
                  </Snackbar>
                </Stack>
                <div id="alert"></div>
            </form>
          </Container>
        </div>
      </CardContent>
    </Card>
  </div>
  );
}