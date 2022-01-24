import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import LoginForm from "./LoginForm";
import { Snackbar } from "@material-ui/core";
import {Mensaje} from "./LoginForm.js"; 

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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
 
    return (
    <div>
      <h3 style={{ textAlign: "center" }}>Iniciar Sesión</h3>
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

