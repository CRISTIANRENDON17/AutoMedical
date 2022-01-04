import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    "flex-direction": "column",
  },
  textField: {
    "margin-bottom": "1rem",
  },
}));

export default function LoginForm(props) {
  const classes = useStyles(); /*guardar los estilos en la variable classes*/

  const formSubmitHandler = (event) => {
    event.preventDefault(); /*No se reinicia el form al darle al button*/
    props.onLogin(); /*Propiedades de padre a hijo*/
  };

  return (
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
      <Button variant="contained" color="primary" type="submit">
        Entrar
      </Button>
    </form>
  );
}
