import * as React from 'react';
import './Categories.css';
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

export default function Categories() {
  return (
    <div>
        <p>Selecciona en qué catergoría se encuentra tu síntoma</p>   
        <Box sx={{ width: '100%', 'margin-top': '3%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                
                <Grid item xs={6} md={4}>                    
                    <Item className='itemCategory'><FontAwesomeIcon icon={faHeart} size='lg' className='iconCategory'/>Cardiovascular</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faEye} size='lg' className='iconCategory'/>Oftamológico</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faBone} size='lg' className='iconCategory'/>Ortopedia o músculos esqueléticos</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faLungs} size='lg' className='iconCategory'/>Respiratorio</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faBrain} size='lg' className='iconCategory'/>Neurológico y cabeza</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faGoogleWallet} size='lg' className='iconCategory'/>Abdominal o gastrointestinal</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faHeadSideCough} size='lg' className='iconCategory'/>Boca, garganta y cuello</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faAssistiveListeningSystems} size='lg' className='iconCategory'/>Oídos</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faHeadSideMask} size='lg' className='iconCategory'/>Nariz</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faShoePrints} size='lg' className='iconCategory'/>Vascular periférico</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faBacteria} size='lg' className='iconCategory'/>Genito urinario</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faCarCrash} size='lg' className='iconCategory'/>Caídas, accidentes, traumas</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faDiagnoses} size='lg' className='iconCategory'/>Piel, uñas, cabello, pestañas</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faHeadSideVirus} size='lg' className='iconCategory'/>Salud mental</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faAngry} size='lg' className='iconCategory'/>Violencia</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item  className='itemCategory'><FontAwesomeIcon icon={faSlash} size='lg' className='iconCategory'/>No me identifico con ninguna</Item>
                </Grid>
            </Grid>
        </Box>
    </div>    
  );
}