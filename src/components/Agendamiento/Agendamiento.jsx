import React, { useEffect} from 'react';
import {KeyboardDateTimePicker} from '@material-ui/pickers';
import { useState } from 'react';
import { ConfirmacionAgenda } from "./ConfirmacionAgenda";
import ListaAgendamiento from "./ListaAgendamiento"
import { getUser, registrarAgendamiento, getSchedulesByUser } from '../../actions';
import { getAuth } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, DialogActions, DialogContentText } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle, Skeleton, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Agendamiento() {

    const [fechaSeleccionada, cambiarFechaSeleccionada] = useState(new Date());
    const [page, setPage] = useState("");
    const [agendas, setAgendas] = useState(false); 
    const [agendaRegistrada, setAgendaRegistrada] = useState(false);
    const [logueado, setLogueado] = useState(false);
    const [scheduleActive, setScheduleActive] = useState(false);    
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
      console.log("Agendas a validar: ",agendasUser);
      agendasUser.data.map( agenda => 
          agenda.estadoAgenda === 'Activa' && (agendaActiva = true)
      );
      setScheduleActive(agendaActiva);
      console.log("estado scheculeActive: ", scheduleActive);
    }

    const actualizarFecha = (date) => {
      cambiarFechaSeleccionada(date);
      if(stateParams.state !== undefined){
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
          console.log("Sintomas a registrar: ",sintomasData);
          console.log("valor undefined: ", stateParams.state);
          if(stateParams.state !== undefined){
            var datos = { fechaCita : date.toLocaleString(), lugarAtencion : "IPS presencial", sintomas: sintomasData, nombreMedico : "Mauricio Gomez", 
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
      setAgendaRegistrada(!agendaRegistrada);
    }

    
    const handleClose = () => {
      setOpen(false);
      navigate('/SelfTriage', {replace : true});
    };

    const handJustClose = () => {
        setOpen(false);
    }    

  return ( 
    <div>
      {
        <div className='container'>
          {                      
            ((agendas && agendas !== []) || logueado) ? 
              <div className='container'>
                <div className='row' style={{display : scheduleActive ? 'none' : 'block'}}>
                  <h3>Agendar cita</h3>
                  <label>Cita médica para la fecha:</label> 
                  <br></br>
                  <KeyboardDateTimePicker 
                    format="dd/MM/yyyy hh:mm a"
                    value={fechaSeleccionada} 
                    onChange={actualizarFecha} 
                    disablePast="true" 
                    id='fechaCita'
                    />
                  {page === "agendaConfirmada" && <ConfirmacionAgenda fecha={fechaSeleccionada.toLocaleString()}/>}    
                </div>
                <br />
                <div className='row'>
                  <ListaAgendamiento ListaAgendas={agendas} updateDataTable={refreshData}/>
                </div>
              </div>
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
              <Button onClick={handJustClose}>Cancelar</Button>
              <Button onClick={handleClose}>Aceptar</Button>
            </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
