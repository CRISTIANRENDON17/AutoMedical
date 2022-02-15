import React, { useEffect} from 'react';
import {KeyboardDateTimePicker} from '@material-ui/pickers';
import { useState } from 'react';
import { ConfirmacionAgenda } from "./ConfirmacionAgenda";
import ListaAgendamiento from "./ListaAgendamiento"
import { getUser, registrarAgendamiento, getSchedulesByUser } from '../../actions';
import { getAuth } from "firebase/auth";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Box, Button, DialogActions, DialogContentText } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle, Grid, Skeleton, Slide } from '@mui/material';
import ListaDoctores from './ListaDoctores';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Agendamiento() {

    const [doctor, setDoctor] = useState('');
    const [fechaSeleccionada, cambiarFechaSeleccionada] = useState(new Date());
    const [page, setPage] = useState("");
    const [agendas, setAgendas] = useState(false); 
    const [agendaRegistrada, setAgendaRegistrada] = useState(false);
    const [logueado, setLogueado] = useState(false);
    const [scheduleActive, setScheduleActive] = useState(false);    
    const [dataSintomas, setdataSintomas] = useState(false);    
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const stateParams = useLocation();
    console.log("Sintomas desde el agendamiento: ",stateParams);
    
    
    useEffect(() => {
      (async => {
        const auth = getAuth(); 
        setTimeout(function (){ 
          const email = auth.currentUser?.email;  
          if(email !== undefined){
            getAgendas(email);
            setLogueado(true)
          } 
          else {
            setAgendas(false);
            navigate('/Login', {replace : true});            
          }       
        }, 1000);  

        const getAgendas = async(email) => {
          const ageData = await getSchedulesByUser(email);
          console.log("Agendas: ", ageData.data);
          setAgendas(ageData.data);
          validateScheduleActive(ageData)
        }
        
      })()
    }, [agendaRegistrada, navigate]);

    const validateScheduleActive = (agendasUser) => {
      var agendaActiva = false;
      
      agendasUser.statusResponse && agendasUser.data.map( agenda => 
        agenda.estadoAgenda === 'Activa' && (agendaActiva = true)
      );
      console.log("Estado de la agenda antes: ", agendaActiva);        
      setScheduleActive(agendaActiva);
      
      //(scheduleActive === false && (stateParams.state === undefined || stateParams.state === null)) && setdataSintomas(!dataSintomas);
      if(!agendaActiva && (stateParams.state === undefined || stateParams.state === null))
      {
        console.log("Estado del registrar sintomas: ", dataSintomas);
        console.log("Agenda activa aquí? Here: ", scheduleActive);
        setdataSintomas(true);
        setScheduleActive(true);
      }
      else
      {
        console.log("Hay agenda activa o no hay sintomas");
      }
    }

    const actualizarFecha = (date) => {
      cambiarFechaSeleccionada(date);
      if(stateParams.state !== undefined || stateParams.state !== null){
        setPage("agendaConfirmada");                      
        getAuth();  
        setTimeout(() => {  
          var userEmail = getAuth()?.currentUser?.email; 
          manejadorRegistroAgendamiento(date, userEmail);
          }, 1000
        );  
      }
      else{
        setOpen(true);
      }
    };

    const manejadorRegistroAgendamiento = async(date, userEmail) => {
      const email = userEmail; 
      if(email !== null && email !== undefined)
      {
        const result = await getUser("",email);
        const dataUser = result.data;
        console.log(result);
        console.log("Datos usuario: ", dataUser);
        if(result.statusResponse)
        {
          const paramsLocation = stateParams?.state?.arraySintomas[0];
          const sintomasData = paramsLocation?.categoria + ": " + paramsLocation?.subcategoria;
          const priority = paramsLocation?.prioridad;
          var placeAtention = "";
          if(priority === 1){
            placeAtention = "IPS Presencial - Prioritaria";
          }else if (priority === 2){
            placeAtention = "IPS Presencial - General";
          }else if (priority === 3){
            placeAtention = "Sugerencia Telefónica";
          }
          console.log("Sintomas a registrar: ",sintomasData);
          console.log("valor undefined: ", stateParams.state);
          if(stateParams.state !== undefined){
            var datos = { fechaCita : date.toLocaleString(), lugarAtencion : placeAtention, sintomas: sintomasData, nombreMedico : doctor, 
                        estadoAgenda : "Activa", correoUsuario : email, nombreUsuario : dataUser.fullName, idUsuario : dataUser.identification };
            console.log("Datos de la agenda a registrar: ", datos);
            console.log("Props en registrar: ",paramsLocation);                       
            registrarAgendamiento(datos);
            RemoveStateUseLocation();
            setAgendaRegistrada(!agendaRegistrada);
          }
          else{
              console.log("El state está limpio", stateParams); 
          }
        }
        else
        {
          console.log("No se pudieron obtener los datos del usuario.");
        }
      } 
      else
      {
        console.log("No se pudo registrar la agenda, porque no se pudo obtener el email.");
      }    
    }

    const RemoveStateUseLocation =() => {
      stateParams.state = undefined;
      setLogueado(false);
      console.log("Se limpia el state", stateParams);
    }

    const refreshData = () => {
      console.log("Tabla Agendamientos actualizada");
      setScheduleActive(false);
      setdataSintomas(false);
      setAgendaRegistrada(!agendaRegistrada);
    }
    
    const handleClose = () => {
      setOpen(false);
      navigate('/SelfTriage', {replace : true});
    };

    const handJustClose = () => {
        setOpen(false);
    }    

    const handleChangeDoctor = (event) => {
      setDoctor(event.doctorName);
      console.log("Data doctor capturado: ", event.doctorName);
    }

  return ( 
    <div>
      {
        <div className='container'>
          {                      
            ((agendas && agendas !== []) || logueado) ? 
              
              <Box sx={{ flexGrow: 1 }}>
                <Grid style={{display : scheduleActive ? 'none' : 'block'}}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4}>
                        <h3>Agendar cita</h3>
                        <label>Cita médica para la fecha:</label>
                      </Grid>
                      <Grid item xs={12} sm={4} md={4} sx={{ display: "flex", alignItems: "flex-end" }}>
                        <ListaDoctores setDoctor={(event) => handleChangeDoctor(event)} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} sx={{ display: !doctor ? "none" : "flex", alignItems: "flex-end" }}>
                        <KeyboardDateTimePicker 
                                format="dd/MM/yyyy hh:mm a"
                                value={fechaSeleccionada} 
                                onChange={actualizarFecha} 
                                disablePast="true" 
                                id='fechaCita'
                                />
                        {page === "agendaConfirmada" && <ConfirmacionAgenda fecha={fechaSeleccionada.toLocaleString()}/>}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <div className='row' style={{display : dataSintomas ? 'block' : 'none'}}>
                  <Link to="/SelfTriage">                
                    <Button variant="contained" style={{backgroundColor : "#4054b4", color: "white", marginTop : "1em"}}>Registrar síntomas</Button>
                  </Link>
                </div>
                <br />
                <div className='row'>
                  <ListaAgendamiento ListaAgendas={agendas} updateDataTable={refreshData}/>
                </div>
              </Box>
              :
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
              }
        </div>
      }
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Información"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Para agendar una nueva cita médica, debes ingresar tus síntomas.
                <br></br>
                <br></br>
                <strong>¿Deseas registrar tus síntomas?</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              variant="outlined"
              color="primary"
              onClick={handJustClose}
            >Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
            >Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
