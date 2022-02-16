import React from "react";
import { Grid} from '@mui/material';
import { Avatar} from '@mui/material';
import Covid from './Covid.png';
import { makeStyles } from '@material-ui/core';
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Skeleton } from '@mui/material';
import AppBar from "../AppBar/AppBar";


const useStyles = makeStyles((theme) => ({
  avatar: {
    "margin" : "auto",
    "marginTop" : "1em"
  },
}));

export default function LandingPage() {

    const [logueado, setLogueado] = useState(false);
    const history = useNavigate();
    const classes = useStyles(); 

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
          <AppBar/>
            {
                logueado ?
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>                    
                        <Avatar 
                            alt="Remy Sharp" 
                            src={Covid}  
                            sx={{height:"100%", width:"65%"}}
                            variant="rounded"
                            margin= "5px"
                            className={classes.avatar}
                        />
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
