import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import {getCollection} from "../../actions";
import { useEffect } from 'react';
import { useState } from 'react';

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

export default function ListUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const arrayUsers = [];  
    (async () => {
      var DataUsers = await getCollection("usuarios");
      const data = DataUsers.data.docs;
      data.map(user => arrayUsers.push({
        id: user.data().identification, 
        name: user.data().fullName, 
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
   
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        components={{
          Toolbar: Herramientas,
        }}
        rows={users}
        
       columns={[
            {
                "field": "id",
                "headerName": "id",
                "dataGeneratorUniquenessEnabled": true,
                "filterable": true
            },
            {
                "field": "name",
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
                "editable": true
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
        ]}        
      />
    </div>
  );
}