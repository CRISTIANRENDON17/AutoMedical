import React, { useEffect } from 'react';
import { useState } from 'react';
import { Card, CardContent, TextField, Button, makeStyles, Container, Grid } from '@material-ui/core';
import { getAuth } from "firebase/auth";
import { getUser, updateUserById } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { Box, Skeleton } from '@mui/material';

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


/**
 * Método para validar las modificaciones realizadas por el Usuario
 */
const validarGuardarPerfil = async () => {
    const Usuario = {
        identification: document.getElementById("identificacion").value,
        fullName: document.getElementById("nombre").value,
        age: document.getElementById("edad").value,
        cellNumber: document.getElementById("celular").value,
        phoneNumber: document.getElementById("telefono").value,
        address: document.getElementById("direccion").value
    };
    actualizarUsuario(Usuario);
}


/**
 * Método para guardar las modificaciones realizadas por el Usuario
 */
const actualizarUsuario = async (userUpdate) => {
    const result = await updateUserById(userUpdate.identification, userUpdate);
    console.log("Usuario actualizado exitosamente: ", result.statusResponse);
};

export default function ProfileUser() {
    const classes = useStyles();
    const [logueado, setLogueado] = useState(false);
    const [user, setUser] = useState([]);
    const [usuarioRetornado, setUsuarioRetornado] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const history = useNavigate();

    /**
     * Método para obtener el Correo Electrónico por medio de la autenticación del Usuario logeado
     */
    useEffect(() => {
        (async => {
            const auth = getAuth();
            setTimeout(function () {
                const emailUserAuth = auth.currentUser?.email;
                if (emailUserAuth !== undefined) {
                    getObjectUser(emailUserAuth);
                    setLogueado(true);
                } else {
                    setUsuarioRetornado(false);
                    setUser(null);
                    history('/Login', { replace: true });
                }
            }, 1000);

            /**
             * Método para obtener el Usuario por medio del Correo Electrónico
             */
            const getObjectUser = async (emailUserAuth) => {
                const Usuario = await getUser("", emailUserAuth);
                if (Usuario !== null && Usuario !== undefined) {
                    setUser(Usuario.data);
                }
            }
        })()
    }, [usuarioRetornado, logueado, history]);

    /**
     * Método para actualizar la variable isEdit, para visualizar la actualización del perfil
     */
    const editarPerfil = (isEdit, e) => {
        setIsEdit(isEdit);
    }

    /**
     * Funcionalidad de retorno a mostrar en pantalla, si no está logeado se redirige al Login
     */
    if (!logueado) {
        return (
            <div>
                <div className='container'>
                    <br />
                    <div className='row'>
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton variant="rectangular" width="100%" height={118} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </div>
                </div>
            </div>
        );
    } else if (!isEdit) {
        return (
            <div>
                <h3 style={{ textAlign: "center" }}>Perfil de Usuario</h3>
                <Card>
                    <CardContent>
                        <div>
                            <Container component="main" maxWidth="md">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                                Identificación:
                                                <TextField
                                                    disabled
                                                    fullWidth
                                                    id="identificacion"
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
                                                    required
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
                                    </Grid>
                                    <Grid container spacing={5}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <center>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={(e) => editarPerfil(true, e)}
                                                >Editar Perfil
                                                </Button>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    } else {
        return (
            <div>
                <h3 style={{ textAlign: "center" }}>Editar Perfil</h3>
                <Card>
                    <CardContent>
                        <div>
                            <Container component="main" maxWidth="md">
                                <form id="formulario" className={classes.form} noValidate>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                                    <TextField
                                                        label="Identificación"
                                                        disabled
                                                        fullWidth
                                                        id="identificacion"
                                                        variant="outlined"
                                                        type="number"
                                                        value={user != null ? user.identification : ""}
                                                        className={classes.textField}
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                                    
                                                    <TextField
                                                        //disabled
                                                        label="Edad"
                                                        fullWidth
                                                        required
                                                        id="edad"
                                                        variant="outlined"
                                                        type="number"
                                                        //value={user != null ? user.age : ""}
                                                        defaultValue={user != null ? user.age : ""}
                                                        className={classes.textField}
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                                    
                                                    <TextField
                                                        label="Celular"
                                                        //disabled
                                                        fullWidth
                                                        required
                                                        id="celular"
                                                        variant="outlined"
                                                        type="number"
                                                        value={user != null ? user.cellNumber : ""}
                                                        className={classes.textField}
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                                    
                                                    <TextField
                                                        label="Teléfono"
                                                        //disabled
                                                        fullWidth
                                                        required
                                                        id="telefono"
                                                        variant="outlined"
                                                        type="number"
                                                        value={user != null ? user.phoneNumber : ""}
                                                        className={classes.textField}
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                                    
                                                    <TextField
                                                        label="Correo Electrónico"
                                                        disabled
                                                        fullWidth
                                                        id="email"
                                                        variant="outlined"
                                                        value={user != null ? user.email : ""}
                                                        type="email"
                                                        className={classes.textField}
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                                    
                                                    <TextField
                                                        label="Nombre Completo"
                                                        //disabled
                                                        fullWidth
                                                        required
                                                        id="nombre"
                                                        variant="outlined"
                                                        type="text"
                                                        value={user != null ? user.fullName : ""}
                                                        className={classes.textField}
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    
                                                    <TextField
                                                        label="Dirección"
                                                        //disabled
                                                        fullWidth
                                                        required
                                                        id="direccion"
                                                        variant="outlined"
                                                        type="text"
                                                        value={user != null ? user.address : ""}
                                                        className={classes.textField}
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <center>
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={(e) => editarPerfil(false, e)}
                                                    >Cancelar
                                                    </Button>    
                                                </center>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <center>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={validarGuardarPerfil}
                                                    >Guardar Perfil
                                                    </Button>
                                                </center>
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
}