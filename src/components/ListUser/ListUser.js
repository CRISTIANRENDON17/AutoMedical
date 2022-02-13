import * as React from "react";
import {
  GridCellValue,
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { getCollection, getIdUser, updateFieldUser } from "../../actions";
import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { addSeconds } from "date-fns/esm";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faPlus } from '@fortawesome/free-solid-svg-icons';


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

const UserActualRol = "admin";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function ListUser() {
  const [users, setUsers] = useState([]);

  /* Método para agregar un nuevo usuario */
  const handleAddRow = () => {
    const numeroRows = users.length;
    //setUsers(users.push(data));
    console.log("Número de filas", numeroRows);
    console.log("Abre desde el Agregar Usuario", columnsAdmin);
  };

  useEffect(() => {
    const arrayUsers = [];
    (async () => {
      var DataUsers = await getCollection("usuarios");
      const data = DataUsers.data.docs;
      data.map((user) => {
        if (user.data().rol !== UserActualRol & UserActualRol === "admin") {
          //list del admin
          arrayUsers.push({
            id: user.data().identification,
            fullName: user.data().fullName,
            age: user.data().age,
            email: user.data().email,
            cellNumber: user.data().cellNumber,
            phoneNumber: user.data().phoneNumber,
            address: user.data().address,
            rol: user.data().rol,
            password: user.data().password,
            estado: user.data().estado,
          });
        } else if (user.data().rol !== UserActualRol & UserActualRol === "doctor" & user.data().rol !== "admin") {
          //este seria el list del doctor
          arrayUsers.push({
            id: user.data().identification,
            fullName: user.data().fullName,
            age: user.data().age,
            email: user.data().email,
            cellNumber: user.data().cellNumber,
            phoneNumber: user.data().phoneNumber,
            address: user.data().address,
            rol: user.data().rol,
          });
        }
      });

      setUsers(arrayUsers);
    })();
  }, [users]);

  const handleEditRowsModelChange = React.useCallback((model) => {
    console.log("Modelo entrada: ", model);
    if (JSON.stringify(model) !== JSON.stringify({})) {
      //Se organiza la data para que llegue limpia a la función del action
      console.log("Modelo actua: ", model);
      const arrayDato = JSON.stringify(model).split(":", 5);
      arrayDato.toString().replace("{", "");
      const id = arrayDato[0]
        .toString()
        .replace("{", "")
        .replace('"', "")
        .replace('"', "");
      const dataFieldName = arrayDato[1].replace('{"', "").replace('"', "");
      const dataValue = arrayDato[3]
        .replace('"', "")
        .replace('"}}}', "")
        ?.replace('","error"', "");
      const dataError =
        arrayDato[4] !== undefined &&
        arrayDato[4].replace('"', "").replace('"}}}', "")?.replace("}}}", "");
      // Se obtiene el id encriptado del documento según la identificación del usuario
      // Se actualiza el campo modificado en la tabla
      /*(async () => {
        const idUserData = await getIdUser(id);
        const data = {
          identificacion: idUserData.data[0],
          fieldName: dataFieldName,
          value: dataValue,
          error: dataError,
        };
        console.log("Data a actualizar: ", data);
        const statusUpdate =
          data.error !== "true" && (await updateFieldUser(data));
        console.log("Estado actualización: ", statusUpdate);
      })();*/
    }
  }, []);

  return (
    <div>
      <br></br>
    <Box
      style={{ height: 500, width: "100%" }}
      sx={{
        height: 400,
        width: 1,
        "& .MuiDataGrid-cell--editing": {
          bgcolor: "rgb(255,215,115, 0.19)",
          color: "#1a3e72",
          "& .MuiInputBase-root": {
            height: "100%",
          },
        },
        "& .Mui-error": {
          bgcolor: (theme) =>
            `rgb(126,10,15, ${theme.palette.mode === "dark" ? 0 : 0.1})`,
          color: (theme) =>
            theme.palette.mode === "dark" ? "#ff4343" : "#750f0f",
        },
      }}
    >
      <Button
        onClick={handleAddRow}>
        <FontAwesomeIcon icon= {faPlus} size='md'/>
        &nbsp;&nbsp;Agregar Usuario
      </Button>
      <DataGrid
        components={{
          Toolbar: Herramientas,
        }}
        rows={users}
        columns={getcolumns()}
        onEditRowsModelChange={handleEditRowsModelChange}
      />
    </Box>
    </div>
  );
}

const getcolumns = () => {
  if (UserActualRol === "doctor") {
    return columnsDoctor;
  } else if (UserActualRol === "admin") {
    return columnsAdmin;
  } else {
    return null;
  }
};

const columnsDoctor = [
  {
    field: "id",
    headerName: "Identificación",
    dataGeneratorUniquenessEnabled: true,
    width: 110,
    filterable: true,
  },
  {
    field: "fullName",
    headerName: "Nombre Completo",
    width: 180,
    editable: false,
  },
  {
    field: "age",
    headerName: "Edad",
    width: 60,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 210,
    editable: false,
  },
  {
    field: "cellNumber",
    headerName: "Celular",
    width: 100,
    editable: false,
  },
  {
    field: "phoneNumber",
    headerName: "Teléfono",
    width: 100,
    editable: false,
  },
  {
    field: "address",
    headerName: "Dirección",
    dataGeneratorUniquenessEnabled: true,
    width: 200,
    editable: false,
  },
  {
    field: "rol",
    headerName: "Rol",
    dataGeneratorUniquenessEnabled: true,
    width: 70,
    editable: false,
  },
];

const columnsAdmin = [
  {
    field: "id",
    headerName: "Identificación",
    dataGeneratorUniquenessEnabled: true,
    width: 110,
    filterable: true,
  },
  {
    field: "fullName",
    headerName: "Nombre",
    width: 180,
    editable: true,
  },
  {
    field: "age",
    headerName: "Edad",
    width: 60,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 210,
    editable: true,
    preProcessEditCellProps: (params) => {
      const isValid = validateEmail(params.props.value);
      return { ...params.props, error: !isValid };
    },
  },
  {
    field: "password",
    headerName: "Clave",
    width: 100,
    editable: true,
  },
  {
    field: "cellNumber",
    headerName: "Celular",
    width: 100,
    editable: true,
  },
  {
    field: "phoneNumber",
    headerName: "Teléfono",
    width: 100,
    editable: true,
  },
  {
    field: "address",
    headerName: "Dirección",
    dataGeneratorUniquenessEnabled: true,
    width: 200,
    editable: true,
  },
  {
    field: "rol",
    headerName: "Rol",
    dataGeneratorUniquenessEnabled: true,
    width: 70,
    editable: true,
  },
  {
    field:"estado",
    headerName: "Estado",
    renderCell: (params) => {
      const onClick = async (e) => {
        e.stopPropagation(); // don't select this row after clicking
        const api: GridApi = params.api;
        const thisRow: Record<string, GridCellValue> = {};
        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          );
          //console.log("1 ",thisRow.estado);
            if(thisRow.estado === "Activo"){
              thisRow.estado = "Inactivo";
            }
            else if(thisRow.estado === "Inactivo"){
              thisRow.estado = "Activo";
            }
            //console.log(JSON.stringify(thisRow, null, 4))         
            const idUserData = await getIdUser(thisRow.id);
            const data = {
              identificacion: idUserData.data[0],
              fieldName: "estado",
              value:thisRow.estado,
            };
            //console.log("Data a actualizar: ", data);
            const statusUpdate = await updateFieldUser(data);
            //console.log("Estado actualización: ", statusUpdate);
          //console.log(JSON.stringify(thisRow, null, 4))
        //return alert(JSON.stringify(thisRow, null, 4));
        return null;
       // return(alert(thisRow));
      };
      //console.log(params.row.estado);
      var estado = params.row.estado; 
      //console.log(estado);
      return <Button onClick={onClick}>{estado != 'Activo' ? 'Inactivo' : 'Activo'}</Button>;
    },
    /*renderCell: () =>{
      const [estado, setEstado] = useState('Inactivo');
      return(
      <Button color="primary" variant="contained" size="medium" sx={{ fontSize: 11 }}
      onClick={() =>
        setEstado((current) =>
            current === 'Inactivo' ? 'Activo' : 'Inactivo',
          )
        }
      > {estado === 'Inactivo' ? 'Activo' : 'Inactivo'}</Button>
    )},*/
  },

];

