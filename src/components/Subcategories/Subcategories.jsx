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
import { Button } from '@material-ui/core';
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
    const [prioridad, setPrioridad] = useState([{ tipoPrioridad :"", textoPrioridad :""}]);
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

    /* M??todo para abrir la modal de di??logo */
    const handleClickOpen = (category, priority, subcategory) => {
        const dataSintomas = [{categoria: category, prioridad: priority, subcategoria: subcategory}];
        setSintomas(dataSintomas);
        if(priority === 1){
            setPrioridad({ tipoPrioridad : "prioritaria", textoPrioridad : "De acuerdo con sus respuestas, la atenci??n m??s adecuada requiere una" + 
            "valoraci??n prioritaria presencial, por lo que se sugiere una cita presencial prioritaria en la IPS."});
        }else if(priority === 2){
            setPrioridad({ tipoPrioridad : "general", textoPrioridad : "De acuerdo con sus respuestas, la atenci??n m??s adecuada requiere una" + 
            "valoraci??n general presencial, por lo que se sugiere una cita presencial general en la IPS."});
        }else if(priority === 3){
            setPrioridad({ tipoPrioridad : "telef??nica", textoPrioridad : "De acuerdo con sus respuestas, la atenci??n m??s adecuada requiere una" + 
            "sugerencia telef??nica, por lo que se sugiere una cita por v??a telef??nica."});
        }
        setOpen(true);
        console.log("Sintomas despu??s del set: ", sintomas);
    };
  
    /* M??todo para cerrar la modal */
    const handleClose = () => {
        setOpen(false);
        console.log("Sintomas desde el cancel o clic por fuera de la modal: ", sintomas);
    };

    /* M??todo para redirigirlo al Agendamiento de citas, decisi??n del sistema */
    const agendarCita = () => {
        setOpen(false);
        console.log("Sintomas desde el aceptar: ", sintomas);
        history('/Agendamiento', {
            state: {
              arraySintomas: sintomas,
            }
        });
    }

    /* M??todo para redirigirlo al Agendamiento de citas, decisi??n del usuario */
    const asesoriaTelefonica = () => {
        setOpen(false);
        const dataSintomas = sintomas;
        dataSintomas[0].prioridad = 3;  
        console.log("Sintomas desde el solo aser??a telef??nica: ", sintomas);
        setSintomas(dataSintomas);
        history('/Agendamiento', {
            state: {
              arraySintomas: sintomas,
            }
        }); 
    }
       
    return(
        <div>
            {
                <div>
                    {
                    logueado ?      
                    <div>
                    <p>Selecciona en qu?? subcategor??a se encuentra tu s??ntoma.</p>            
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
                                                    <Item className='itemCategory' onClick={() => handleClickOpen(categoryName, category.prioridad, subcategory.subcategoryName)}><FontAwesomeIcon icon ={categoriesIcons[category.id]} size='lg' className='iconCategory'/>{subcategory.subcategoryName}</Item>
                                                </Grid>
                                            );
                                        }));   
                                    }
                                    else{
                                        return(<p key={category.id}>No existen subcategor??as para la categor??a: <strong>{category.categoryName}</strong></p>)
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
                        <DialogTitle>{"Informaci??n"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">   
                                {prioridad.textoPrioridad}  
                                <br></br>
                                <br></br>
                                <strong>??Deseas realizar el agendamiento de tu cita {prioridad.tipoPrioridad}?</strong>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                variant="outlined"
                                color="primary"
                                onClick={handleClose}
                            >Cancelar
                            </Button>
                            <Button 
                                variant="contained"
                                color="primary"
                                onClick={agendarCita}
                            >Aceptar
                            </Button>
                            <Button 
                                variant="contained"
                                color="primary"
                                onClick={asesoriaTelefonica}
                                disabled={prioridad.tipoPrioridad === "telef??nica"}
                            >Solo Asesor??a telef??nica
                            </Button>
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