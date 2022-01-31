import * as React from 'react';
import {KeyboardDateTimePicker} from '@material-ui/pickers';
import { useState } from 'react';
import { ConfirmacionAgenda } from "./ConfirmacionAgenda";
import ListaAgendamiento from "./ListaAgendamiento"
//import { useCallback } from 'react';



export default function Agendamiento() {
    const [fechaSeleccionada, cambiarFechaSeleccionada] = useState(new Date());
    const [page, setPage] = useState("");

    const actualizarFecha = (date) => {
        cambiarFechaSeleccionada(date);
        console.log(date);
        setPage("agendaConfirmada");
    };

  return (
    <div className='container'>
        <div className='row'>
          <h3>Agendar cita</h3>
          <label>Cita médica para la fecha:</label>
          <br></br>
          <KeyboardDateTimePicker value={fechaSeleccionada} onChange={actualizarFecha} disablePast="true"/>
          {page === "agendaConfirmada" && <ConfirmacionAgenda fecha={fechaSeleccionada.toLocaleString()}/>}    
        </div>
        <br />
        <div className='row'>
          <ListaAgendamiento/>
        </div>
    </div>
  );
}
