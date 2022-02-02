import React, {useEffect} from 'react';
import {KeyboardDateTimePicker} from '@material-ui/pickers';
import { useState } from 'react';
import { ConfirmacionAgenda } from "./ConfirmacionAgenda";
import ListaAgendamiento from "./ListaAgendamiento"
import { getUser, registrarAgendamiento, getSchedulesByUser } from '../../actions';
import { getAuth } from "firebase/auth";

export default function Agendamiento() {

    const [fechaSeleccionada, cambiarFechaSeleccionada] = useState(new Date());
    const [page, setPage] = useState("");
    const [agendas, setAgendas] = useState([]); 
    const [agendaRegistrada, setAgendaRegistrada] = useState(false);

    useEffect(() => {
      (async => {
        console.log("Carga agendamiento.");
        const auth = getAuth(); 
        setTimeout(function (){ 
          const email = auth.currentUser.email;
          getAgendas(email);
        }, 1000); 

        const getAgendas = async(email) => {
          const ageData = await getSchedulesByUser(email);
          console.log("Agendas1: ", ageData.data);
          console.log("Estado de la consulta: ", ageData.statusResponse);
          setAgendas(ageData.data);
        }

        console.log("Este es el valor de agendaRegistrada: ", agendaRegistrada);
      })()
    }, [agendaRegistrada]);

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
    <div className='container'>
        <div className='row'>
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
  );
}
