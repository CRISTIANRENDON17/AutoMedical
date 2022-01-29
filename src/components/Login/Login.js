import React from "react";
import LoginForm from "./LoginForm";
import { Button, Card, CardContent, Snackbar } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { Mensaje } from "./LoginForm.js";

const mensaje = () =>{
  if(Mensaje() === "Ingreso Exitoso"){
    return("Ingreso Exitoso");
  }else if(Mensaje()==="Ingreso Fallido"){
    return("Ingreso Fallido, correo o clave incorrecta");
  }

};

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const history = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if(mensaje()=== "Ingreso Exitoso"){
      history('/LandingPage')
    }
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
        autoHideDuration={2000}
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

