import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Guardar } from "../database/BaseDatos.js";
import { GetArray } from "../database/BaseDatos.js";

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
const variable = () => {
  const Usuario = {
    id: document.getElementById("identificacion").value,
    name: document.getElementById("Nombre").value,
    age: document.getElementById("Edad").value,
    phone: document.getElementById("Celular").value,
    phone2: document.getElementById("Telefono").value,
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
  mensaje = "";

  if (!/^\d{7,14}$/.test(Usuario.id)) {
    mensaje =
      mensaje +
      "<div><li>Identificacion tiene que estar entre 7 a 14 numeros <br></li></div>";
  }
  if (!/^[a-zA-ZÀ-ÿ\s]{2,40}$/.test(Usuario.name)) {
    mensaje =
      mensaje +
      "<div><li>Nombre solo acepta valores alfabeticos y minimo 2 digitos <br></li></div>";
  }
  if (!/^\d{1,2}$/.test(Usuario.age)) {
    mensaje =
      mensaje +
      `<div><li>Edad solo acepta valores numericos entre 0 y 99<br></li></div>`;
  }
  if (!/^\d{10}$/.test(Usuario.phone)) {
    mensaje =
      mensaje +
      `<div><li>Celular solo acepta 10 valores numericos<br></li></div>`;
  }
  if (!/^\d{7}$/.test(Usuario.phone2)) {
    mensaje =
      mensaje +
      `<div><li>Telefono solo acepta 7 valores numericos<br></li></div>`;
  }
  if (!/^[^]+$/.test(Usuario.address)) {
    mensaje =
      mensaje + `<div><li>Direccion no puede estar vacia<br></li></div>`;
  }
  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(Usuario.email)) {
    mensaje =
      mensaje +
      `<div><li>Correo no puede estar vacio, debe detener caracteres antes y despues del @ con una direccion <br></li></div>`;
  }
  if (!/^.{4,12}$/.test(Usuario.password)) {
    mensaje =
      mensaje +
      `<div><li>Contraseña no puede estar vacia y tiene de 4 a 12 caracteres<br></li></div>`;
  }
  if (!/^.{4,12}$/.test(Usuario.confcontraseña)) {
    mensaje =
      mensaje +
      `<div><li>Confirmar Contraseña no puede estar vacia y tiene de 4 a 12 caracteres<br></li></div>`;
  }
  if (Usuario.password !== Usuario.confcontraseña) {
    mensaje = mensaje + `<div><li>Contraseña no conciden<br></li></div>`;
  }

  if (mensaje === "") {
    let array = GetArray();
    /*  console.log(typeof array.find((data) => data.email));
  console.log(typeof  Email); */
    let aux2;
      aux2 = array.find(
        ({ email}) => (email === document.getElementById('email').value )
      );
    if (aux2 === undefined) {
      Limpiar_form();
      Guardar(Usuario);
      console.log("Registro Guardado con extio");
    } else if(aux2.email === Usuario.email){
      console.log("Email Repetido");
      mensaje = 'Email Repetido';
    }
  }
  document.getElementById("Alert").innerHTML = mensaje;

};

export default function RegistryForm(props) {
  //props es el objeto que por defecto todos los componentes de react tienen acceso, alli se encuentran por ejemplo las propiedades que le envia el padre al componente hijo
  const classes = useStyles(); /*guardar los estilos en la variable classes*/

  const formSubmitHandler = (event) => {
    //el "event" es una propiedad que por defecto se tiene acceso cuando se aplica un Evento en un elemento de HTML, alli se puede encontrar por ejemplo las propiedades del elemento el cual inicio el evento.

    event.preventDefault(); /*No se reinicia el form al darle al button*/
    props.onRegistry(); /*Propiedades de padre a hijo*/
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      id="forrmulario"
      className={classes.form}
    >
      {" "}
      {/*cuando se le de submit envia el formulario a la funcion formSubmitHandler y aparte llama a la clase del form qu elo hace flex y lo agrupa todo en columna */}
      <TextField
        id="identificacion"
        label="Identificacion"
        variant="outlined"
        type="number"
        className={classes.textField}
      />
      <TextField
        id="Nombre"
        label="Nombre Completo"
        variant="outlined"
        type="text"
        className={classes.textField}
      />
      <TextField
        id="Edad"
        label="Edad"
        variant="outlined"
        type="number"
        className={classes.textField}
      />
      <TextField
        id="Celular"
        label="Celular"
        variant="outlined"
        type="number"
        className={classes.textField}
      />
      <TextField
        id="Telefono"
        label="Telefono"
        variant="outlined"
        type="number"
        className={classes.textField}
      />
      <TextField
        id="Direccion"
        label="Direccion"
        variant="outlined"
        type="text"
        className={classes.textField}
      />
      <TextField /*propio del '@material-ui/core/TextField'; si fuera html este seria nuestro input */
        id="email"
        label="Correo"
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
      <TextField
        id="confirmed_contraseña"
        label="Confirmar Contraseña"
        variant="outlined"
        type="password"
        className={classes.textField}
        pattern="[A-Za-z0-9!?-]{8,12}"
      />
      <div id="Alert"></div>
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
      <br></br>
      <br></br>
      <br></br>
    </form>
  );
}
