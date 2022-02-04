import { Box, Skeleton } from '@mui/material';
import { getAuth } from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from "../Categories/Categories";

export default function SelfTriage() {
    const [logueado, setLogueado] = useState(false);
    const history = useNavigate();

    useEffect(() => {
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
    }, [logueado, history]);

    return(
    <div>
        {
            logueado ?
            <Categories/>
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
