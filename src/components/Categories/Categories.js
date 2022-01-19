import React, { useState } from 'react';
import './Categories.css';
import CategoriesList from './Categories.json';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogleWallet} from '@fortawesome/free-brands-svg-icons';
import {faHeart, faEye, faBone, faLungs, faBrain, faHeadSideCough, faAssistiveListeningSystems, faDiagnoses, 
        faHeadSideVirus, faAngry, faCarCrash, faBacteria, faShoePrints, faHeadSideMask, faSlash} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Categories = () => {    

    const [categories] = useState(CategoriesList);
    var categoriesIcons = [faHeart, faEye, faBone, faLungs, faBrain, faGoogleWallet, faHeadSideCough, faAssistiveListeningSystems, 
                          faHeadSideMask, faShoePrints, faBacteria, faCarCrash, faDiagnoses, faHeadSideVirus, faAngry, faSlash];
    return(
        <div>
            <p>Selecciona en qué catergoría se encuentra tu síntoma</p>
            <Box sx={{ width: '100%', 'marginTop': '3%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {categories.map((category) => {
                        return(      
  
                        <Grid item xs={12} md={6} lg={4} key={category.id}>                    
                            <Link to={{pathname : category.categoryName}}>
                                    <Item className='itemCategory'><FontAwesomeIcon icon ={categoriesIcons[category.id]} size='lg' className='iconCategory'/>{category.categoryName}</Item>
                            </Link>
                        </Grid>                                                                                                                                       
                        );
                    })}
                </Grid>
            </Box>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );    
}

export default Categories;