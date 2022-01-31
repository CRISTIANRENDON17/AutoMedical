import React from "react";
import { Grid} from '@mui/material';
import { Avatar} from '@mui/material';
import Covid from './Covid.png';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    "margin" : "auto",
    "marginTop" : "1em"
  },
}));

export default function LandingPage() {
    const classes = useStyles(); 
    return (
        <div>
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
        </div>
    );
}
