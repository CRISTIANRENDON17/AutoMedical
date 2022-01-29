import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container, Snackbar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useState } from 'react';
import { Alert, Stack } from '@mui/material';
import { sendEmailResetPassword } from '../../actions';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/Cancel';


const useStyles = makeStyles((theme) => ({
    form: {
      display: "flex",
      "flex-direction": "column",
    },
    textFieldEmail: {
      "marginBottom" : "5px !important",
    },
    link:{
      "font-size": "0.85rem",
      "text-decoration-line": "underline"
    },
    containerMain:{
        "marginTop" : "2em"
    },
    containerElements:{
        "height" : "20em",
        "display": "flex",
        "flexDirection" : "column",
        "justifyContent" : "flex-end",
        "background" : "#d7d3d354",
        "padding" : "2em",
        "borderRadius" : "5px"
    },
    titleRecovery:{
        "marginBottom" : "20px"
    },
    statusIcon:{
        "marginBottom" : "3em",
        "text-align" : "center"
    }
  }));

  

export default function RecuperarPasword() {

    const classes = useStyles();

    const [errorEmail, setErrorEmail] = useState(false);   
    const [emailSend, setEmailSend] = useState(false); 

    const formSubmitHandler = async(event) => { 
        var resultReset = null;  
        event.preventDefault();
        setErrorEmail(false);
        var email = document.getElementById("Email");
        (email.value ===  undefined || email.value === '') ? setErrorEmail(true) : resultReset = await sendEmailResetPassword(email.value);   
        
        if(resultReset.statusResponse)
        {
            console.log("Correo de recuperación enviado");            
            setEmailSend(true);
        }
        else
        {
            console.log("Error al enviar correo de recuperación");
            setEmailSend(true);
            setErrorEmail(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        document.getElementById("passwordRecoveryForm").reset();
        setEmailSend(false);
        setErrorEmail(false);
      };

    return (
        <div>
            <Container component="main" maxWidth="xs" className={classes.containerMain}>
                <form onSubmit={formSubmitHandler} className={classes.form} id="passwordRecoveryForm" noValidate>
                    <div className={classes.containerElements}>
                        <div className={classes.titleRecovery}>
                            <p>Recuperar contraseña</p>
                        </div>
                        <div className={classes.statusIcon} >
                            <CancelIcon color = "error" fontSize='large' sx={{ fontSize: errorEmail ? '45px' : '0.5px' }}/>
                            <CheckCircleRoundedIcon  color = "success" fontSize='large' sx={{ fontSize: emailSend ? '45px' : '0.5px' }}/>
                        </div>
                        <TextField
                            fullWidth
                            required
                            autoFocus
                            id="Email"
                            label="Correo electrónico"
                            variant="outlined"
                            type="email"
                            className={classes.textFieldEmail}
                            error={errorEmail}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large">Enviar correo                             
                        </Button>
                    </div>                                                   
                </form>
                <br />
            </Container>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={emailSend} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={ !errorEmail ? "success" : "error" } sx={{ width: '100%' }}>
                        { !errorEmail ? " Se ha enviado el correco exitosamente!" : " Se presentó un error en el envío de correo" }
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    );
}

