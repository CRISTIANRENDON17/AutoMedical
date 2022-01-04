import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from "@material-ui/core/Snackbar";
import React from "react";
import LoginForm from "./LoginForm";

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
        message="Login Clicked"
        action={
          <Button color="secondary" size="small" onClick={handleClose}>
            Cerrar
          </Button>
        }
      />
    </div>
  );
}
