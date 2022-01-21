import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from "@material-ui/core/Snackbar";
import React from "react";
import RegistryForm,{ Mensaje } from "./RegistryForm.js"; //importar form del registro


export default function Registry() {
  const [open, setOpen] = React.useState(false); //Los Hooks son una nueva incorporación en React 16.8. Te permiten usar estado y otras características de React sin escribir una clase.

  //vector de dos posiciones
  //posicion 0, el valor y en la posicion 1 el actualizador

  const handleClick = () => {
    //funcion cuando le de click el actualizador cambiara a valor y pasara a sera verdadero
    setOpen(true);
  };

  const handleClose = () => {
    //Esta funcion lo que hace es cambiar el estado del componente "open" a true, lo que activa el SnackBar
    setOpen(false);
  };
  const mensaje = () =>{
    if(Mensaje() === ""){
      return("Registro exitoso");
    }
    else{
      return("Registro Fallido");
    }
  };

  return (
    <div>
      {" "}
      {/*se usa el div porque se tiene que retornar un objeto entero*/}    
      <h2 style={{ textAlign: "center" }}>Registro de Operario</h2>{" "}
      {/*un h2 que agranda la letra, con un stylo de centrado */}
      <Card>
        {/*card es propio de '@material-ui/core/Card'*/}
        <CardContent>
          {/*contenedor propio tambien de  '@material-ui/core/Card'*/}
          <RegistryForm onRegistry={handleClick} />
          {/*onRegistry es una propiedad de RegistryForm creada para responder a un evento del elemento */}
        </CardContent>
      </Card>
      <Snackbar /*Proporciona un mensaje corto propio de import Snackbar from '@material-ui/core/Snackbar';*/
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open} //abirr el mensaje
        autoHideDuration={3000} //Duracion del mensaje
        onClose={handleClose} //lo cierra validandolo desde una funcion que retorna false
        message={mensaje()} //mensaje
        action={
          //accion
          <Button color="secondary" size="small" onClick={handleClose}>
            {/*boton que es de tamaño pequeño, color secundario propio del Snackbar y una funcion que retorna false*/}
            Cerrar
          </Button>
        }
      />
    </div>
  );
}
