import React from "react";
import LoginForm from "./LoginForm";
import { Card, CardContent, Snackbar } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { IngresoExitoso } from "./LoginForm.js";
import { Stack } from '@mui/material';

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const history = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if(IngresoExitoso()){
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
      <Stack spacing={2} sx={{ width: '100%' }}>   
        <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
          
        </Snackbar>
      </Stack>
    </div>
  );
}

