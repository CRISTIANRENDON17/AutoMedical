import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Stack } from '@mui/material';
import { Card, CardContent, TextField, Button, makeStyles, Container, Grid, Snackbar} from '@material-ui/core';
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
 * Método para obtener los datos a guardar y actualziar la información
 */
const guardarPerfil = async () => {
    const Usuario = {
        identification: document.getElementById("identificacion").value,
        fullName: document.getElementById("nombre").value,
        age: document.getElementById("edad").value,
        cellNumber: document.getElementById("celular").value,
        phoneNumber: document.getElementById("telefono").value,
        address: document.getElementById("direccion").value
    };
    await updateUserById(Usuario);
}

export default function ProfileUser() {
    const classes = useStyles();
    const [logueado, setLogueado] = useState(false);
    const [user, setUser] = useState([]);
    const [usuarioRetornado, setUsuarioRetornado] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const history = useNavigate();

    /* Variables para mostrar las alertas de: Error o Success al dar clic en guardar */
    const [alertError, setAlertError] = useState(false);
    const [alertOK, setAlertOK] = useState(false);

    /* Variables para mostrar los mensajes de error de los campos */
    const [target, setTarget] = useState([{ id:"", value:"" }]);
    const [touched, setTouched] = useState(false);
    const [errorMessageAge, setErrorMessageAge] = useState([]);
    const [errorMessageCellphone, setErrorMessageCellphone] = useState([]);
    const [errorMessagePhoneNumber, setErrorMessagePhoneNumber] = useState([]);
    const [errorMessageFullName, setErrorMessageFullName] = useState([]);
    const [errorMessageAddress, setErrorMessageAddress] = useState([]);

    /* Método para validar los campos del formulario con expresiones regulares */
    useEffect(() => {
        if(target.id === 'edad'){
            if(target.value) {
                if (!/^(([1-9]{1})([0-9]{1})?)$/.test(target.value)) {
                    setErrorMessageAge(["Solo valores numéricos entre 1 y 99"]);
                } else {
                    setErrorMessageAge([]);
                }
            }else{
                setErrorMessageAge(["Este campo es obligatorio"]);
            }
        }else if(target.id === 'celular'){
            if(target.value){
                if (!/^(([3]{1})([0-9]{9}))$/.test(target.value)) {
                    setErrorMessageCellphone(["Solo 10 números, iniciar con 3"]);
                }else{
                    setErrorMessageCellphone([]);
                }
            }else{
                setErrorMessageCellphone(["Este campo es obligatorio"]);
            }
        }else if(target.id === 'telefono'){
            if(target.value){
                if (!/^\d{7}$/.test(target.value)) {
                    setErrorMessagePhoneNumber(["Debe tener solo 7 números"]);
                }else{
                    setErrorMessagePhoneNumber([]);
                }
            }else{
                setErrorMessagePhoneNumber(["Este campo es obligatorio"]);
            }
        }else if(target.id === 'nombre'){
            if(target.value){
                if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(target.value)) {
                    setErrorMessageFullName(["Solo valores alfabéticos"]);
                }else if(!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{2,70}$/.test(target.value)) {
                    setErrorMessageFullName(["Cantidad máxima de dígitos (70), mínima (2)"]);
                }
                else{
                    setErrorMessageFullName([]);
                }
            }else{
                setErrorMessageFullName(["Este campo es obligatorio"]);
            }
        }else if(target.id === 'direccion'){
            if(target.value){
                if (!/^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\-\#\,\;\:\.\s]+$/.test(target.value)) {
                    setErrorMessageAddress(["Solo valores alfabéticos"]);
                }else if(!/^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\-\#\,\;\:\.\s]{5,200}$/.test(target.value)) {
                    setErrorMessageAddress(["Cantidad máxima de dígitos (200), mínima (5)"]);
                }
                else{
                    setErrorMessageAddress([]);
                }
            }else{
                setErrorMessageAddress(["Este campo es obligatorio"]);
            }
        }
    }, [target]);

    /* Método para capturar el campo y guardarlo en variable */
    const handleChange = (event) => {
        setTarget({id:event.target.id, value: event.target.value});
    };

    /* Método para validar si se da clic en el campo */
    const handleTouch = () => {
        setTouched(true);
    };

    /* Método para cerrar la alerta en pantalla */
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertError(false);
        setAlertOK(false);
    };

    /**
     * Método para obtener el Correo Electrónico por medio de la autenticación del Usuario logeado
     * Y posteriormente obtener la información completa del Usuario
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
                    /* Si el usuario NO está logeado lo redirige al Login*/
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

    /* Se ejecuta con el Submit y valida si guardar modificaciones o no; sacando alertas*/
    const formSubmitHandler = (event) => {
        event.preventDefault();
        if(errorMessageAge.length === 0 && errorMessageCellphone.length === 0
            && errorMessagePhoneNumber.length === 0 && errorMessageFullName.length === 0
            && errorMessageAddress.length === 0){
            guardarPerfil();
            setAlertOK(true);
        }else{
            setAlertError(true);
        }
    };

    /**
     * Método para actualizar la variable isEdit, para visualizar la interfaz de actualización del perfil
     */
    const editarPerfil = (isEdit, e) => {
        setIsEdit(isEdit);
        if(alertOK){
            window.location.reload(true);
        }else{
            setErrorMessageAge([]);
            setErrorMessageCellphone([]);
            setErrorMessagePhoneNumber([]);
            setErrorMessageFullName([]);
            setErrorMessageAddress([]);
        }
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
                                <form onSubmit={formSubmitHandler} className={classes.form} noValidate>
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
                                                        label="Edad"
                                                        fullWidth
                                                        required
                                                        id="edad"
                                                        variant="outlined"
                                                        type="number"
                                                        defaultValue={user != null ? user.age : ""}
                                                        className={classes.textField}
                                                        size="small"

                                                        error={touched && Boolean(errorMessageAge.length)}
                                                        helperText={touched && errorMessageAge[0]}
                                                        onChange={handleChange}
                                                        onFocus={handleTouch}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                                    <TextField
                                                        label="Celular"
                                                        fullWidth
                                                        required
                                                        id="celular"
                                                        variant="outlined"
                                                        type="number"
                                                        defaultValue={user != null ? user.cellNumber : ""}
                                                        className={classes.textField}
                                                        size="small"

                                                        error={touched && Boolean(errorMessageCellphone.length)}
                                                        helperText={touched && errorMessageCellphone[0]}
                                                        onChange={handleChange}
                                                        onFocus={handleTouch}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                                    <TextField
                                                        label="Teléfono"
                                                        fullWidth
                                                        required
                                                        id="telefono"
                                                        variant="outlined"
                                                        type="number"
                                                        defaultValue={user != null ? user.phoneNumber : ""}
                                                        className={classes.textField}
                                                        size="small"

                                                        error={touched && Boolean(errorMessagePhoneNumber.length)}
                                                        helperText={touched && errorMessagePhoneNumber[0]}
                                                        onChange={handleChange}
                                                        onFocus={handleTouch}
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
                                                        fullWidth
                                                        required
                                                        id="nombre"
                                                        variant="outlined"
                                                        type="text"
                                                        defaultValue={user != null ? user.fullName : ""}
                                                        className={classes.textField}
                                                        size="small"

                                                        error={touched && Boolean(errorMessageFullName.length)}
                                                        helperText={touched && errorMessageFullName[0]}
                                                        onChange={handleChange}
                                                        onFocus={handleTouch}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <TextField
                                                        label="Dirección"
                                                        fullWidth
                                                        required
                                                        id="direccion"
                                                        variant="outlined"
                                                        type="text"
                                                        defaultValue={user != null ? user.address : ""}
                                                        className={classes.textField}
                                                        size="small"

                                                        error={touched && Boolean(errorMessageAddress.length)}
                                                        helperText={touched && errorMessageAddress[0]}
                                                        onChange={handleChange}
                                                        onFocus={handleTouch}
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
                                                        type="submit"
                                                    >Guardar Perfil
                                                    </Button>
                                                </center>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Stack spacing={2} sx={{ width: '100%' }}>       
                                        <Snackbar open={alertError} autoHideDuration={3000} onClose={handleClose}>
                                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                                Existen campos sin corregir
                                            </Alert>
                                        </Snackbar>
                                    </Stack>
                                    <Stack spacing={2} sx={{ width: '100%' }}>       
                                        <Snackbar open={alertOK} autoHideDuration={2000} onClose={handleClose}>
                                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                                Perfil guardado
                                            </Alert>
                                        </Snackbar>
                                    </Stack>
                                </form>
                            </Container>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}