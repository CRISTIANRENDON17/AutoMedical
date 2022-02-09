import { addUser, getUser } from "../../actions.js";
import { Alert, Stack } from '@mui/material';
import { makeStyles, TextField, Button, Snackbar, Container, Grid} from '@material-ui/core';
import { Link } from "react-router-dom";
import React from "react";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    "flex-direction":
      "column",
  },
  textField: {
    "margin-bottom":
      "1rem",
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
const variable = async() => {
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
  /*
  console.log(typeof Usuario.id,typeof Usuario.name,typeof Usuario.age,typeof Usuario.phone,typeof Usuario.phone2,typeof Usuario.address,typeof Usuario.email,typeof Usuario.password,typeof Usuario.confcontraseña,typeof Usuario.doctor);
  console.log(Usuario.id,Usuario.name,Usuario.age,Usuario.phone,Usuario.phone2,Usuario.address,Usuario.email,Usuario.password,Usuario.confcontraseña,Usuario.doctor);
  */
  mensaje = "<di><l1>Error</li></div>";

  if (!/^\d{7,14}$/.test(Usuario.identification)) {
    mensaje =
      mensaje +
      "<div><li>Identificación tiene que estar entre 7 a 14 números <br></li></div>";
  }
  if (!/^[a-zA-ZÀ-ÿ\s]{2,40}$/.test(Usuario.fullName)) {
    mensaje =
      mensaje +
      "<div><li>Nombre solo acepta valores alfabéticos y mínimo 2 digitos <br></li></div>";
  }
  if (!/^\d{1,2}$/.test(Usuario.age)) {
    mensaje =
      mensaje +
      `<div><li>Edad solo acepta valores numéricos entre 0 y 99<br></li></div>`;
  }
  if (!/^\d{10}$/.test(Usuario.cellNumber)) {
    mensaje =
      mensaje +
      `<div><li>Celular solo acepta 10 valores numéricos<br></li></div>`;
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
      const result = await ValidarUsuario(Usuario);
      
      if(!result.usuarioExiste) {       
        GuardarUsuario(Usuario); 
        CrearUsuarioAutenticacion(Usuario);
        LimpiarForm();
        mensaje = "";
      }
      else{        
        mensaje = mensaje + ((result.usuarioExisteById && result.usuarioExisteByEmail) ?     
        `<div><li>El usuario con identificación: ` + Usuario.identification + ` y correo: ` + Usuario.email+ ` ya se encuentra registrado en el sistema.<br></li></div>` : 
        result.usuarioExisteById ? 
        `<div><li>El usuario con identificación: ` + Usuario.identification + ` ya se encuentra registrado en el sistema.<br></li></div>` :
        result.usuarioExisteByEmail ? 
        `<div><li>El usuario con correo: ` + Usuario.email + ` ya se encuentra registrado en el sistema.<br></li></div>` : "");
      }
       
  }
  document.getElementById("Alert").innerHTML = mensaje;

};

const ValidarUsuario = async(Usuario) => {  
  const userQuery = await getUser(Usuario.identification, Usuario.email);
  const usuarioExiste = (userQuery.userIdExiste || userQuery.userEmailExiste) ? true : false;
  const result = { usuarioExiste: usuarioExiste, usuarioExisteById: userQuery.userIdExiste, usuarioExisteByEmail: userQuery.userEmailExiste };
  return result;
};

const GuardarUsuario = async(newUser) => {
  const result = await addUser('usuarios', newUser);
  console.log("Usuario registrado exitosamente: ", result.data);
  mensaje ="";
};

const CrearUsuarioAutenticacion = (Usuario) => {
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

const LimpiarForm = () => {
  document.getElementById("identificacion").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contraseña").value = "";
  document.getElementById("confirmarContraseña").value = "";
};

export default function RegistryForm(props) {
  const [errors, setErrors] = React.useState(false);
  
  const classes = useStyles();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    validarFormulario();
    props.onRegistry();
  };

  const validarFormulario = ()=> {
    var identificacion = document.getElementById("identificacion");
    if(identificacion.value ===  undefined || identificacion.value === '' || 
      (!/^\d{7,14}$/.test(identificacion.value))){
      setErrors(true);
    }else{
      setErrors(false);
    }
  }

  /*Método para cerrar la alerta de información*/
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrors(false);
  };

  return (
    <div>
      <Container component="main" maxWidth="md">
        <form onSubmit={formSubmitHandler} id="forrmulario" className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>  
                    <TextField
                      fullWidth
                      required
                      autoFocus
                      id="identificacion"
                      label="Identificación"
                      variant="outlined"
                      type="number"
                      error={errors}
                      className={classes.textField}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      required
                      id="nombre"
                      label="Nombre Completo"
                      variant="outlined"
                      type="text"
                      className={classes.textField}
                      size="small"
                    /> 
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs>  
                    <TextField
                      fullWidth
                      required
                      id="edad"
                      label="Edad"
                      variant="outlined"
                      type="number"
                      className={classes.textField}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs>  
                    <TextField
                      fullWidth
                      required
                      id="celular"
                      label="Celular"
                      variant="outlined"
                      type="number"
                      className={classes.textField}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      required 
                      id="email"
                      label="Correo Electrónico"
                      variant="outlined"
                      type="email"
                      className={classes.textField}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      required
                      id="contraseña"
                      label="Contraseña"
                      variant="outlined"
                      type="password"
                      className={classes.textField}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs>
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
                    onClick={variable}
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
            <Snackbar open={errors} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Los campos con (*) son obligatorios.
              </Alert>
            </Snackbar>
            </Stack>
            <div id="Alert"></div>
        </form>
      </Container>
    </div>
  );
}