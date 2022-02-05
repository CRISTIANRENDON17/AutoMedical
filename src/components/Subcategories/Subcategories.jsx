import { Box, Skeleton } from '@mui/material';
import { getAuth } from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useParams } from 'react-router-dom';
import CategoriesList from '../Categories/Categories.json';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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

    var categoriesIcons = [faHeart, faEye, faBone, faLungs, faBrain, faGoogleWallet, faHeadSideCough, faAssistiveListeningSystems, 
        faHeadSideMask, faShoePrints, faBacteria, faCarCrash, faDiagnoses, faHeadSideVirus, faAngry, faSlash];
    const [logueado, setLogueado] = useState(false);
    const [open, setOpen] = useState(false);
    const {categoryName} = useParams();
    const [categories] = React.useState(CategoriesList);
    const [sintomas, setSintomas] = useState();
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


    const handleClickOpen = (category, subcategory) => {
        const dataSintomas = [{categoria: category, subcategoria: subcategory}];
        setSintomas(dataSintomas);
        setOpen(true);
        console.log("Sintomas después del set: ",sintomas);
    };
  
    const handleClose = () => {
      setOpen(false);
      //history('/Agendamiento', {replace : true});
      console.log("Sintomas desde el aceptar: ",sintomas);
      history('/Agendamiento', {
        state: {
          arraySintomas: sintomas,
        }
      });
    };

    const handJustClose = () => {
        console.log("Sintomas desde el cancel: ",sintomas);
        setOpen(false);
    }


        
    return(
    
        <div>
            {
                <div>
                    {
                    logueado ?      
                    <div>
                    <p>Selecciona en qué subcategoría se encuentra tu síntoma.</p>            
                    <div className="buttonBack"><Link to="/SelfTriage"><ArrowBackIosIcon style={{margin : "8px 0px 0px 12px", color : "white"}}/></Link></div>
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
                                                    <Item className='itemCategory' onClick={() => handleClickOpen(categoryName, subcategory.subcategoryName)}><FontAwesomeIcon icon ={categoriesIcons[category.id]} size='lg' className='iconCategory'/>{subcategory.subcategoryName}</Item>                                            
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
                        <Button onClick={handJustClose}>Cancelar</Button>
                        <Button onClick={handleClose}>Aceptar</Button>
                        </DialogActions>
                    </Dialog>
                    </div>
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
            }
        </div>                      
    );
}

export default  Subcategories;