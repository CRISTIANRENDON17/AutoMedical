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
import { getCollection, getIdUser, updateFieldUser, getSchedulesByUser } from "../../actions";
import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
//import ScrollDialog from "./ListUserModal.js";
import swal from 'sweetalert';
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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

//var UserActualRol = "";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function ListUser() {
  const [users, setUsers] = useState([]);
  //const [logueado, setLogueado] = useState(false);
  const [rolUser, setRolUser] = useState("");
  const history = useNavigate();

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
      const data = DataUsers?.data?.docs;
      const auth = getAuth(); 
      setTimeout(function (){ 
        const email = auth.currentUser?.email;  
        if(email !== undefined){
            //setLogueado(true);
            const rolUserLogueaded = data.filter((user) => user.data().email === email)[0].data().rol;
            rolUserLogueaded && setRolUser(rolUserLogueaded);
            console.log("User desde el ListUser: ", rolUserLogueaded);
        } 
        else {
          history('/Login', {replace : true});            
        }       
      }, 1000); 
        (data && rolUser) && data.map((user) => {
        if (user.data().rol !== rolUser & rolUser === "admin") {
          //list del admin
          arrayUsers.push({
            id: user.data().identification,
            fullName: user.data().fullName,
            age: user.data().age,
            email: user.data().email,
            cellNumber: user.data().cellNumber,
            phoneNumber: user.data().phoneNumber,
            address: user.data().address,
           // modal: user.data().modal,
           rol: user.data().rol,
            password: user.data().password,
            estado: user.data().estado,
          });
        } else if (user.data().rol !== rolUser & rolUser === "doctor" & user.data().rol !== "admin") {
          //este seria el list del doctor
          if(user.data().estado !== "Inactivo"){
            arrayUsers.push({
              id: user.data().identification,
              fullName: user.data().fullName,
              age: user.data().age,
              email: user.data().email,
              cellNumber: user.data().cellNumber,
              phoneNumber: user.data().phoneNumber,
              address: user.data().address,
              rol: user.data().rol,
            //  modal: user.data().modal,
            });
          }
        }
        return null;
      });

      setUsers(arrayUsers);
    })();
  }, [rolUser, history]);

  const getcolumns = () => {
    if (rolUser === "doctor") {
      return columnsDoctor;
    } else if (rolUser === "admin") {
      return columnsAdmin;
    } else {
      return columnsAdmin;
    }
  };

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
      (async () => {
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
      })();
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
      
      <DataGrid
        components={{
          Toolbar: Herramientas,
        }}
        rows={users}
        columns={getcolumns()}
        onEditRowsModelChange={handleEditRowsModelChange}
      />
      <Button
        onClick={handleAddRow}>
        <FontAwesomeIcon icon= {faPlus} size='sm'/>
        &nbsp;&nbsp;Agregar Usuario
      </Button>
      
    </Box>
    </div>
  );



}

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
    hide:true,
    
  },
  {
    field: "address",
    headerName: "Dirección",
    dataGeneratorUniquenessEnabled: true,
    width: 200,
    editable: false,
    hide:true,
  },
  {
    field: "rol",
    headerName: "Rol",
    dataGeneratorUniquenessEnabled: true,
    width: 70,
    editable: false,
  },
  {
    field: "modal",
    headerName: "Modal",
    dataGeneratorUniquenessEnabled: true,
    width: 150,
    editable: false,
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
            const data = await getSchedulesByUser(thisRow.email);

            let aux = "";
            for(let i = 0 ; i < data.data.length; i++)
            {
              aux = aux + "Id: " + data.data[i].idUsuario + "\n";
              aux = aux + "Nombre: " + data.data[i].nombreUsuario + "\n";
              aux = aux + "Lugar Atencion: " + data.data[i].lugarAtencion + "\n";
              aux = aux + "EstadoAgenda: " + data.data[i].estadoAgenda + "\n";
              aux = aux + "Fecha Cita: " + data.data[i].fechaCita + "\n";
              aux = aux + "Sintomas: " + data.data[i].sintomas + "\n";
              aux = aux + "\n \n";
            }
            if(aux === "")
            {
              aux = "No tiene agendas registradas";
            }
          //  let aux = data.data.map(({data})=> {"Nombre"+data.nombreUsuario+"\n"+sata});
            //console.log(aux);
            //console.log(data.data[0]);
            swal({
              title: "Historial de Agendas",
              text: `${aux}`,
              button: "Salir",
            });
        return (null);
      };
      return (<div><Button onClick={onClick}>Descripcion</Button></div>);
    },
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
    hide:true,
  },
  {
    field: "address",
    headerName: "Dirección",
    width: 200,
    editable: true,
    hide:true,
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
            await updateFieldUser(data);
            //console.log("Estado actualización: ", statusUpdate);
          //console.log(JSON.stringify(thisRow, null, 4))
        //return alert(JSON.stringify(thisRow, null, 4));
        return null;
       // return(alert(thisRow));
      };
      //console.log(params.row.estado);
      var estado = params.row.estado; 
      //console.log(estado);
      return <Button onClick={onClick}>{estado !== 'Activo' ? 'Inactivo' : 'Activo'}</Button>;
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

