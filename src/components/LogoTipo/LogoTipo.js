import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AutoMedical from './AutoMedical.png';
export default function LogoTipo() {
  return (
    <Stack direction="row" spacing={2}> 
      <Avatar 
      alt="Remy Sharp" 
      src={AutoMedical}  
      sx={{height:"90px",width:"90px",margin:"10px"}} 
      variant="rounded" 
      />      
    </Stack>
  );
}
