import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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

  const variable = () => {
    
    let identificacion = document.getElementById("identificacion").value;
    let Nombre = document.getElementById("Nombre").value;
    let Edad = document.getElementById("Edad").value;
    let Celular = document.getElementById("Celular").value;
    let Telefono = document.getElementById("Telefono").value;
    let Direccion = document.getElementById("Direccion").value;
    let  correo = document.getElementById("email").value;
    let contraseña = document.getElementById("contraseña").value;
    let confirmed_contraseña = document.getElementById("confirmed_contraseña").value;
   
     const Usuario ={
      id: identificacion,
      name: Nombre,
      age: Edad,
      phone: Celular,
      phone2: Telefono,
      address: Direccion,
      email: correo,
      password: contraseña,
      confcontraseña: confirmed_contraseña
    };
    console.log(Usuario);
    
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
    <form onSubmit={formSubmitHandler} id="forrmulario" className={classes.form}>
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
      />
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
    </form>
  );
}
