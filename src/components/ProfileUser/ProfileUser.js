import React, { useState, useEffect } from "react";
import { Grid} from '@mui/material';
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, Skeleton } from '@mui/material';

export default function ProfileUser() {
    const [logueado, setLogueado] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        (async => {
          const auth = getAuth(); 
          setTimeout(function (){ 
            const email = auth.currentUser?.email;  
            if(email !== undefined){
                setLogueado(true);
            } 
            else {
              history('/Login', {replace : true});            
            }       
          }, 1000); 
        })()
      }, [logueado, history]);

    return (
        <div>
            {
                logueado ?
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        See Profile
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>                   
                        Edit Profile
                    </Grid>
                </Grid>
                :
                <div className='container'>
                    <br />
                    <div className='row'>
                        <Box sx={{ pt: 0.5 }}>
                        <Skeleton variant="rectangular" width="100%" height={118} />
                        <Skeleton />
                        <Skeleton width="60%" />
                        </Box>
                    </div>
                </div>
            }
        </div>
    );
}