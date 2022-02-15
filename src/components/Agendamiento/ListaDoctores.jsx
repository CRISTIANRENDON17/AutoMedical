import React, {useEffect, useState} from 'react';
import { getDoctores } from '../../actions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@material-ui/core';

export default function ListarDoctores(props) {
  const [doctorName, setDoctorName] = useState('');
  const [dataDoctores, setDataDoctores] = useState([]);
  
  const handleChange = (event) => {
    setDoctorName(event.target.value);  
    getDoctorSelected(event.target.value);        
  };

  useEffect(() => {    
    (async() => {
      var options = [];
      const result = await getDoctores();
      console.log("Lista de doctores: ",result);
      result.statusResponse && result.data.map((doctor) => options.push({idDoctor: doctor.identification, doctorName: doctor.fullName}))
      setDataDoctores(options);
    })();
  }, [])

  const getDoctorSelected = (data) => {
    console.log("Doctor seleccionado data: ", data);
    props.setDoctor(data);
  }

  return (
    <div>
      <Box sx={{ minWidth: 120, display: "flex", alignItems: "flex-end", marginBottom: "-9px" }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Doctor</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={doctorName}
            onChange={handleChange}
            label="Doctor"
          >
            {
              dataDoctores.map((doctor) => 
                <MenuItem value={doctor} name={doctor.idDoctor} key={doctor.idDoctor}>
                  {doctor.doctorName}
                </MenuItem>
              )
            }
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
