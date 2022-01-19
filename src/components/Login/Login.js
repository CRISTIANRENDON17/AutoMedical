import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect} from "react";
import LoginForm from "./LoginForm";
import { Snackbar } from "@material-ui/core";
import {Mensaje} from "./LoginForm.js"; 
import getCollection from "../../actions";

const mensaje = () =>{
  if(Mensaje() === "Ingreso Exitoso"){
    return("Ingreso Exitoso");
  }else if(Mensaje()==="Ingreso Fallido")
  {
    return("Ingreso Fallido, correo o clave incorrecta");
  }

};


export default function Login() {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {    
    const obtenerUsuarios = async() => {                
      const datos = await getCollection('usuarios');
      datos.data.docs.map( (user) => console.log(user.data()) );    
    }    
    obtenerUsuarios();
  }, []);  

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
    return (
    <div>
      <h2 style={{ textAlign: "center" }}>Bienvenido!</h2>
      <Card>
        <CardContent>
          <LoginForm onLogin={handleClick} />
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={mensaje()}
        action={
          <Button color="secondary" size="small" onClick={handleClose}>
            Cerrar
          </Button>
        }
      />
    </div>
  );
  
}
