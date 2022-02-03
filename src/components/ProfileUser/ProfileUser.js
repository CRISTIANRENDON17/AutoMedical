import React, {useEffect} from 'react';
import { useState } from 'react';
import { Card, CardContent, TextField, Button, makeStyles, Container, Grid} from '@material-ui/core';
import { getAuth } from "firebase/auth";
import { getUser } from '../../actions';

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        "flex-direction":
          "column",
      },
    textField: {
        "margin-bottom":
          "0.5rem",
      },
  }));

export default function ProfileUser() {
    const classes = useStyles();

    const [user, setUser] = useState([]); 
    const [usuarioRetornado, setUsuarioRetornado] = useState(false);


    useEffect(() => {
        (async => {
        const auth = getAuth(); 
        setTimeout(function (){ 
            const emailUserAuth = auth.currentUser.email;
            if(emailUserAuth !== undefined){
                getObjectUser(emailUserAuth);
            }else{
                setUser(null);
            }
        }, 1000);  

        const getObjectUser = async(emailUserAuth) => {
            const Usuario = await getUser("", emailUserAuth);
            if(Usuario !== null && Usuario !== undefined){
                setUser(Usuario.data);
            }
        }
        })()
    }, [usuarioRetornado]);
 
    const editarProfile = () => {
        //Prueba
        setUsuarioRetornado(false);
    }

    return (
        <div>   
            <h3 style={{ textAlign: "center" }}>Perfil de Usuario</h3>
            <Card>
                <CardContent>
                    <div>
                        <Container component="main" maxWidth="md">
                            <form id="formulario" className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6} md={3} lg={3}>  
                                                Identificación:
                                                <TextField
                                                    disabled
                                                    fullWidth
                                                    id="outlined-size-small"
                                                    variant="standard"   
                                                    type="number"
                                                    value={user != null ? user.identification : ""}                                  
                                                    className={classes.textField}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                                Edad
                                                <TextField
                                                    disabled
                                                    fullWidth
                                                    required
                                                    id="edad"
                                                    variant="standard"
                                                    type="number"
                                                    value={user != null ? user.age : ""}
                                                    className={classes.textField}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                                Celular
                                                <TextField
                                                    disabled
                                                    fullWidth
                                                    required
                                                    id="celular"
                                                    variant="standard"
                                                    type="number"
                                                    value={user != null ? user.cellNumber : ""}
                                                    className={classes.textField}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                                Teléfono
                                                <TextField
                                                    disabled
                                                    fullWidth
                                                    required
                                                    id="telefono"
                                                    variant="standard"
                                                    type="number"
                                                    value={user != null ? user.phoneNumber : ""}
                                                    className={classes.textField}
                                                    size="small"
                                                />
                                            </Grid> 
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                            Correo Electrónico 
                                                <TextField
                                                    disabled
                                                    fullWidth 
                                                    id="email"
                                                    variant="standard"
                                                    value={user != null ? user.email : ""}
                                                    type="email"
                                                    className={classes.textField}
                                                    size="small"
                                                /> 
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                                Nombre Completo
                                                <TextField
                                                    disabled
                                                    fullWidth
                                                    id="nombre"
                                                    variant="standard"
                                                    type="text"
                                                    value={user != null ? user.fullName : ""}
                                                    className={classes.textField}
                                                    size="small" 
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                Dirección
                                                <TextField
                                                    disabled
                                                    fullWidth
                                                    required
                                                    id="direccion"
                                                    variant="standard"
                                                    type="text"
                                                    value={user != null ? user.address : ""}
                                                    className={classes.textField}
                                                    size="small"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid> {/* Fin Grid Item 12 */}
                                    <Grid container spacing={5}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <center><Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                onClick={editarProfile}
                                            >Editar Perfil
                                            </Button></center>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Container>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}