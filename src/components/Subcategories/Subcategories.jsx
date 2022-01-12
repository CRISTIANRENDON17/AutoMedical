import * as React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useParams } from 'react-router-dom';
import CategoriesList from '../Categories/Categories.json';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogleWallet} from '@fortawesome/free-brands-svg-icons';
import {faHeart, faEye, faBone, faLungs, faBrain, faHeadSideCough, faAssistiveListeningSystems, faDiagnoses, 
        faHeadSideVirus, faAngry, faCarCrash, faBacteria, faShoePrints, faHeadSideMask, faSlash} from '@fortawesome/free-solid-svg-icons';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Subcategories = () => {
    const {categoryName} = useParams();
    const [categories] = React.useState(CategoriesList);
    var categoriesIcons = [faHeart, faEye, faBone, faLungs, faBrain, faGoogleWallet, faHeadSideCough, faAssistiveListeningSystems, 
        faHeadSideMask, faShoePrints, faBacteria, faCarCrash, faDiagnoses, faHeadSideVirus, faAngry, faSlash];
    return(
        <div>            
            <p>Selecciona en qué subcategoría se encuentra tu síntoma.</p>            
            <Link to="/SelfTriage"><ArrowBackIosIcon color="action" /></Link>
            <Box sx={{ width: '100%', 'margin-top': '3%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {categories.map((category) => {
                        if(category.categoryName === categoryName){
                            if(category.subcategories !== undefined)
                            {
                                return(                     
                                    category.subcategories.map((subcategory) => {
                                    return(                                
                                        <Grid item xs={12} md={6} lg={4} key={subcategory.idSubcategory}> 
                                            <Item className='itemCategory'><FontAwesomeIcon icon ={categoriesIcons[category.id]} size='lg' className='iconCategory'/>{subcategory.subcategoryName}</Item>            
                                        </Grid>
                                    );
                                }));   
                            }
                            else{
                                return(<p key={category.id}>No existen subcategorías para la categoría: <strong>{category.categoryName}</strong></p>)
                            }                                                     
                        }
                        else
                        {
                            return(null);
                        }
                    })}
                </Grid>
            </Box>
        </div>                
    );
}

export default  Subcategories;