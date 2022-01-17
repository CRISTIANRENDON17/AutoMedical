import * as React from 'react';
import { useState } from 'react';
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Subcategories = () => {

    const [open, setOpen] = useState(false);
    const history = useNavigate();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      history('/Agendamiento')
    };

    const {categoryName} = useParams();
    const [categories] = React.useState(CategoriesList);
    var categoriesIcons = [faHeart, faEye, faBone, faLungs, faBrain, faGoogleWallet, faHeadSideCough, faAssistiveListeningSystems, 
        faHeadSideMask, faShoePrints, faBacteria, faCarCrash, faDiagnoses, faHeadSideVirus, faAngry, faSlash];

        
    return(
        <div>            
            <p>Selecciona en qué subcategoría se encuentra tu síntoma.</p>            
            <Link to="/SelfTriage"><ArrowBackIosIcon color="action" /></Link>
            <Box sx={{ width: '100%', 'marginTop': '3%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {categories.map((category) => {
                        if(category.categoryName === categoryName){
                            if(category.subcategories !== undefined)
                            {
                                return(                     
                                    category.subcategories.map((subcategory) => {
                                    return(                                
                                        <Grid item xs={12} md={6} lg={4} key={subcategory.idSubcategory}> 
                                            <Item className='itemCategory' onClick={handleClickOpen}><FontAwesomeIcon icon ={categoriesIcons[category.id]} size='lg' className='iconCategory'/>{subcategory.subcategoryName}</Item>                                            
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
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Información"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    De acuerdo con tus respuestas, la atención más adecuada para ti requiere una valoración prioritaria presencial,
                    Por lo que te direccionamos a una  cita presencial prioritaria a tu IPS.
                    <br></br>
                    <br></br>
                    <strong>¿Deseas realizar el agendamiento de tu cita?</strong>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleClose}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </div>                
    );
}

export default  Subcategories;