import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector
} from '@mui/x-data-grid';
import {getCollection, getIdUser, updateFieldUser} from "../../actions";
import { useEffect } from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';

function Herramientas() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function ListUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const arrayUsers = [];  
    (async () => {
      var DataUsers = await getCollection("usuarios");
      const data = DataUsers.data.docs;
      data.map(user => arrayUsers.push({
        id: user.data().identification, 
        fullName: user.data().fullName, 
        age : user.data().age, 
        email : user.data().email, 
        cellNumber : user.data().cellNumber, 
        phoneNumber : user.data().phoneNumber, 
        address : user.data().address, 
        rol : user.data().rol    
        }))

      setUsers(arrayUsers);      
    })()
  }, []); 

  const handleEditRowsModelChange = React.useCallback((model) => {
    console.log("Modelo entrada: ", model);
    if(JSON.stringify(model) !== JSON.stringify({})){
        //Se organiza la data para que llegue limpia a la función del action
        console.log("Modelo actua: ", model);
        const arrayDato = JSON.stringify(model).split(":",5);
        arrayDato.toString().replace('{','');
        const id = arrayDato[0].toString().replace('{','').replace('"','').replace('"','');
        const dataFieldName = arrayDato[1].replace('{"','').replace('"','');
        const dataValue = arrayDato[3].replace('"','').replace('"}}}','')?.replace('","error"','');
        const dataError = arrayDato[4] !== undefined && arrayDato[4].replace('"','').replace('"}}}','')?.replace('}}}','');
        // Se obtiene el id encriptado del documento según la identificación del usuario
        // Se actualiza el campo modificado en la tabla
        (async() =>  {
          const idUserData = await getIdUser(id); 
          const data = { identificacion: idUserData.data[0], fieldName: dataFieldName, value: dataValue, error: dataError };
          console.log("Data a actualizar: ", data);
          const statusUpdate = data.error !== 'true' && await updateFieldUser(data);
          console.log("Estado actualización: ",statusUpdate);
        })();
    }
  }, []);
   
  return (
    <Box style={{ height: 500, width: "100%" }}      
    sx={{
      height: 400,
      width: 1,
      '& .MuiDataGrid-cell--editing': {
        bgcolor: 'rgb(255,215,115, 0.19)',
        color: '#1a3e72',
        '& .MuiInputBase-root': {
          height: '100%',
        },
      },
      '& .Mui-error': {
        bgcolor: (theme) =>
          `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
        color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
      },
    }}>
      <DataGrid
        components={{
          Toolbar: Herramientas,
        }}
        rows={users}        
        columns={columns}     
        onEditRowsModelChange={handleEditRowsModelChange}   
      />
    </Box>
  );
}

const columns = [
  {
      "field": "id",
      "headerName": "id",
      "dataGeneratorUniquenessEnabled": true,
      "filterable": true
  },
  {
      "field": "fullName",
      "headerName": "Nombre",
      "width": 180,
      "editable": true
  },
  {
      "field": "age",
      "headerName": "Edad",
      "width": 60,
      "editable": true
  },
  {
      "field": "email",
      "headerName": "Email",
      "width": 210,
      "editable": true,
      preProcessEditCellProps: (params) => {
        const isValid = validateEmail(params.props.value);
        return { ...params.props, error: !isValid };
      },
  },
  {
      "field": "cellNumber",
      "headerName": "Celular",
      "width": 100,
      "editable": true
  },
  {
      "field": "phoneNumber",
      "headerName": "Telefono",
      "width": 100,
      "editable": true
  },
  {
      "field": "address",
      "headerName": "Direccion",
      "dataGeneratorUniquenessEnabled": true,
      "width": 200,
      "editable": true
  },
  {
      "field": "rol",
      "headerName": "Rol",
      "dataGeneratorUniquenessEnabled": true,
      "width": 70,
      "editable": true
  },
]