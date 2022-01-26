import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AutoMedical from './AutoMedical.png';
import AutoMedical2 from './AutoMedical2.png';
export default function LogoTipo() {
  return (
    <Stack direction="row" spacing={2}> 
      <Avatar 
      alt="Remy Sharp" 
      src={AutoMedical2}  
      sx={{height:"96px", width:"190px", margin:"10px"}} 
      variant="rounded" 
      />      
    </Stack>
  );
}
