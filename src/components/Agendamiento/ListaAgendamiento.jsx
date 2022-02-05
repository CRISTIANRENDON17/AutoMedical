import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Agendamiento.css';
import { Button, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { updateStateScheduleById } from '../../actions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4054b4",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
  
function ListarAgendamientos(props) {  
      
  const agendas = props.ListaAgendas; 

  const eliminarAgenda = (idAgenda) => {
    updateStateScheduleById(idAgenda); 
    props.updateDataTable();
    
    console.log("Se ejecuta RefreshData");
  }
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Número documento</StyledTableCell>
            <StyledTableCell align="right">Fecha cita</StyledTableCell>
            <StyledTableCell align="right">Lugar de atención</StyledTableCell>
            <StyledTableCell align="right">Síntomas</StyledTableCell>
            <StyledTableCell align="right">Médico</StyledTableCell>
            <StyledTableCell align="right">Estado</StyledTableCell>
            <StyledTableCell align="right">Acción</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { agendas.length > 0 ? ( agendas.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="right" scope='row'>{row.idUsuario}</StyledTableCell>
              <StyledTableCell align="right">{row.fechaCita}</StyledTableCell>
              <StyledTableCell align="right">{row.lugarAtencion}</StyledTableCell>
              <StyledTableCell align="right">{row.sintomas}</StyledTableCell>
              <StyledTableCell align="right">{row.nombreMedico}</StyledTableCell>
              <StyledTableCell align="right">{row.estadoAgenda}</StyledTableCell> 
              <StyledTableCell align="right">
                {
                  row.estadoAgenda === 'Activa' ? (
                  <Button variant="outlined" startIcon={<DeleteIcon />} size="small" sx={{background : "#4054b4", color : "white"}} onClick={() => { eliminarAgenda(row.id)}}>
                    Cancelar
                  </Button>
                  )
                  :
                  "-"
                }
              </StyledTableCell>
            </StyledTableRow>
            )) ) :   
              agendas !== false ?
              <StyledTableRow>
                <StyledTableCell align="center">              
                  <Box sx={{ width: 100 }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">              
                  <Box sx={{ width: 100 }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">              
                  <Box sx={{ width: 100 }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">              
                  <Box sx={{ width: 100 }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">              
                  <Box sx={{ width: 100 }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">              
                  <Box sx={{ width: 100 }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">              
                  <Box sx={{ width: 100 }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>    
              :
              <StyledTableRow>
                <StyledTableCell align="right"></StyledTableCell> 
                <StyledTableCell align="right"></StyledTableCell> 
                <StyledTableCell align="right"></StyledTableCell> 
                <StyledTableCell align="right">Aún no tienes citas médicas agendadas.</StyledTableCell> 
                <StyledTableCell align="right"></StyledTableCell> 
                <StyledTableCell align="right"></StyledTableCell> 
                <StyledTableCell align="right"></StyledTableCell> 
              </StyledTableRow>       
          }
        </TableBody>
      </Table>    
    </TableContainer>
  );
}
export default ListarAgendamientos