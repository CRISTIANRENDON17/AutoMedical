import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import  {GetArray} from "../database/BaseDatos.js";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    "flex-direction": "column",
  },
  textField: {
    "margin-bottom": "1rem",
  },
}));

export const Correcto = () =>{
  let aux = document.getElementById("Ruta");
  aux.innerHTML = '<Link to="/SelfTriage"/>';
};
export const Incorrecto = () =>{
  return("Usuario o clave incorrecta");
};

const LoginButton = () =>{
  let array = GetArray();
  let aux = 0;
  array.filter(function(data){
    if(data.email === document.getElementById("Email").value)
    {  
        if(data.password === document.getElementById("contraseña").value)
        {
          console.log("correcto todo");
          return(aux = 1);
        }
  }
  });
  if(aux === 1)
  {
    Correcto();
  }else if (aux === 0)
  {
    Incorrecto();
  }
};

export default function LoginForm(props) {
  const classes = useStyles(); /*guardar los estilos en la variable classes*/

  const formSubmitHandler = (event) => {
    event.preventDefault(); /*No se reinicia el form al darle al button*/
    props.onLogin(); /*Propiedades de padre a hijo*/
  };
     return (
       <div id="Ruta">
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
      <Button onClick={LoginButton} variant="contained" color="primary" type="submit">
        Entrar
      </Button>
      </form>
      </div>
    
  );

}
