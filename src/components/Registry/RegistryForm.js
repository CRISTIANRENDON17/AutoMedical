import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { addUser, getUser } from "../../actions.js";
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
//import { GetArray } from "../database/BaseDatos.js";

const useStyles = makeStyles((theme) => ({
  /*estilos del formulario y del texto*/
  form: {
    display: "flex",
    "flex-direction":
      "column" /*atributo para que apile todo el contenido en columna uno despues de otro*/,
  },
  textField: {
    "margin-bottom":
      "1rem" /*Propiedad para añadir margen en la parte inferior de los input del formulario;*/,
  },
  link:{
    "font-size": "0.85rem",
    "text-decoration-line": "underline"
    /*Propiedades para el link que lo lleva a registrar usuario*/,
  },
}));

export const Mensaje = () => {
  return mensaje;
};

const Limpiar_form = () => {
  document.getElementById("identificacion").value = "";
  document.getElementById("Nombre").value = "";
  document.getElementById("Edad").value = "";
  document.getElementById("Celular").value = "";
  document.getElementById("Telefono").value = "";
  document.getElementById("Direccion").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contraseña").value = "";
  document.getElementById("confirmed_contraseña").value = "";
};
var mensaje = "";
const variable = async() => {
  const Usuario = {
    identification: document.getElementById("identificacion").value,
    fullName: document.getElementById("Nombre").value,
    age: document.getElementById("Edad").value,
    cellNumber: document.getElementById("Celular").value,
    phoneNumber: document.getElementById("Telefono").value,
    address: document.getElementById("Direccion").value,
    email: document.getElementById("email").value,
    password: document.getElementById("contraseña").value,
    confcontraseña: document.getElementById("confirmed_contraseña").value,
    doctor: "no",
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
  if (!/^\d{7}$/.test(Usuario.phoneNumber)) {
    mensaje =
      mensaje +
      `<div><li>Teléfono solo acepta 7 valores numéricos<br></li></div>`;
  }
  if (!/^[^]+$/.test(Usuario.address)) {
    mensaje =
      mensaje + `<div><li>Dirección no puede estar vacía<br></li></div>`;
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
        Limpiar_form();
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

export default function RegistryForm(props) {
  //props es el objeto que por defecto todos los componentes de react tienen acceso, alli se encuentran por ejemplo las propiedades que le envia el padre al componente hijo
  const classes = useStyles(); /*guardar los estilos en la variable classes*/

  const formSubmitHandler = (event) => {
    //el "event" es una propiedad que por defecto se tiene acceso cuando se aplica un Evento en un elemento de HTML, alli se puede encontrar por ejemplo las propiedades del elemento el cual inicio el evento.

    event.preventDefault(); /*No se reinicia el form al darle al button*/
    props.onRegistry(); /*Propiedades de padre a hijo*/
  };

  return (
    <div>
      {/*<Container component="main" maxWidth="xs">*/}
        <form onSubmit={formSubmitHandler} id="forrmulario" className={classes.form} noValidate>
          {" "}
          {/*cuando se le de submit envia el formulario a la funcion formSubmitHandler y aparte llama a la clase del form qu elo hace flex y lo agrupa todo en columna */}
          
          {/* Contenedor formulario */}
          <Grid container spacing={2}>
            {/* Primer columna */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container spacing={2}>
                <Grid item xs={4}>  
                  <TextField
                    fullWidth
                    required
                    autoFocus
                    id="identificacion"
                    label="Identificacion"
                    variant="outlined"
                    type="number"
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    required
                    id="Nombre"
                    label="Nombre Completo"
                    variant="outlined"
                    type="text"
                    className={classes.textField}
                  /> 
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs>  
                  <TextField
                    fullWidth
                    required
                    id="Edad"
                    label="Edad"
                    variant="outlined"
                    type="number"
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs>  
                  <TextField
                    fullWidth
                    required
                    id="Celular"
                    label="Celular"
                    variant="outlined"
                    type="number"
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs> 
                  <TextField
                    fullWidth
                    required
                    id="Telefono"
                    label="Teléfono"
                    variant="outlined"
                    type="number"
                    className={classes.textField}
                  />
                </Grid> 
              </Grid>
              <Grid container spacing={2} >
                <Grid item xs>
                  <TextField
                    fullWidth
                    required
                    id="Direccion"
                    label="Dirección"
                    variant="outlined"
                    type="text"
                    className={classes.textField}
                  />
                </Grid>
              </Grid>
            </Grid> {/* Fin Grid Item 6 */}

            {/* Segunda columna */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField /*propio del '@material-ui/core/TextField'; si fuera html este seria nuestro input */
                    fullWidth
                    required 
                    id="email"
                    label="Correo"
                    variant="outlined"
                    type="email"
                    className={classes.textField}
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
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    required
                    id="confirmed_contraseña"
                    label="Confirmar Contraseña"
                    variant="outlined"
                    type="password"
                    className={classes.textField}
                    pattern="[A-Za-z0-9!?-]{8,12}"
                  />
                </Grid>
              </Grid>  
            
            </Grid> {/* Fin Grid Item 6 */}
          </Grid> {/* Fin Grid container */}
          
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={variable}
          >
            {" "}
            {/*Boton propio de import Button from '@material-ui/core/Button'; */}
            Registrar
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/Login" className={classes.link}>
                ¿Ya tienes cuenta?, ¡Ingresa!
              </Link>
            </Grid>
          </Grid>
          <div id="Alert"></div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </form>
      {/*</Container>*/}
    </div>
  );
}
