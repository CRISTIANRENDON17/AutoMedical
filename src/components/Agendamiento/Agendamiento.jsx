import React, {useEffect} from 'react';
import {KeyboardDateTimePicker} from '@material-ui/pickers';
import { useState } from 'react';
import { ConfirmacionAgenda } from "./ConfirmacionAgenda";
import ListaAgendamiento from "./ListaAgendamiento"
import { getUser, registrarAgendamiento, getSchedulesByUser } from '../../actions';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { Skeleton } from '@mui/material';

export default function Agendamiento() {

    const [fechaSeleccionada, cambiarFechaSeleccionada] = useState(new Date());
    const [page, setPage] = useState("");
    const [agendas, setAgendas] = useState(false); 
    const [agendaRegistrada, setAgendaRegistrada] = useState(false);
    const history = useNavigate();

    useEffect(() => {
      (async => {
        const auth = getAuth(); 
        setTimeout(function (){ 
          const email = auth.currentUser?.email;  
          if(email !== undefined){
            getAgendas(email);
          } 
          else {
            setAgendas(false);
            history('/Login', {replace : true});            
          }       
        }, 1000); 

        const getAgendas = async(email) => {
          const ageData = await getSchedulesByUser(email);
          console.log("Agendas: ", ageData.data);
          setAgendas(ageData.data);
        }
      })()
    }, [agendaRegistrada, history]);

    const actualizarFecha = (date) => {
      cambiarFechaSeleccionada(date);
      setPage("agendaConfirmada");                      
      getAuth();  
      setTimeout(() => {  
        var userEmail = getAuth()?.currentUser?.email; 
        manejadorRegistroAgendamiento(date, userEmail);
        }, 1000
      );  
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
          var datos = { fechaCita : date.toLocaleString(), lugarAtencion : "IPS presencial", nombreMedico : "Mauricio Gomez", estadoAgenda : "Activa", 
                        correoUsuario : email, nombreUsuario : dataUser.fullName, idUsuario : dataUser.identification };
          registrarAgendamiento(datos);
          setAgendaRegistrada(true);
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

    const refreshData = () => {
      console.log("Tabla Agendamientos actualizada");
      setAgendaRegistrada(false);
    }

  return ( 
    <div>
      {
        <div className='container'>
          {                      
            (agendas && agendas !== []) ? 
              <div className='container'>
                <div className='row'>
                  <h3>Agendar cita {console.log("Valor de agendas en el return: ", agendas)}</h3>
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
    </div>
  );
}
