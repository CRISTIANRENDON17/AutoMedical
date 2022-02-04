import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import {getCollection} from "../../actions";

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

/**
         
 */


const getData = async() =>{
    const data2 = await getCollection("usuarios");
    //console.log(data2);
    const array = data2.data.map(
        data => [
            {
                id:data.identification,
                name:data.fullName,
                age:data.age,
                email:data.email,
                cellNumber:data.cellNumber,
                phoneNumber:data.phoneNumber,
                address:data.address,
                rol:data.rol,
            }]);
    console.log(array);
    //console.log(array.map(data => data[0]));
    return (array.map(data => data[0]));
}

export default function ListUser() {
/*
   const { data } = useDemoData({
            //dataSet: 'Commodity',
            dataSet: 'Employee',
            rowLength: 10,
           maxColumns: 20
            
        })
     console.log(data);
*/
   const row = getData();
   console.log(row);//me muestra la promesa
   
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
       // {...data}
        components={{
          Toolbar: Herramientas,
        }}
       //rows={[{id:1,name:"cristian"},{id:2, name:"darbey"}]}
      rows={row}
        //columns={data.columns}
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