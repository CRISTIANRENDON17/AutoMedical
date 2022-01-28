import * as React from "react";
import Grid from '@material-ui/core/Grid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faTwitter, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'
import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <footer>
        <Grid container>
            {/* Primer columna */}
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <h6>
                <ol>Cristian Rendon Rodriguez</ol>
                <ol>León Ángel Chancí Guzmán</ol>
                <ol>Darbey Tejada Ruiz</ol>
                <ol>Ferney de Jesus Londoño</ol>
              </h6>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <h5>
                <br></br>
                <i className="fa fa-copyright" aria-hidden="true">
                  Copyright © AutoMedical 2022.
                </i>
                <br></br>
                <br></br>
                <Grid container>
                  <Grid item xs={3} sm={3} md={3} lg={3}>
                    <FontAwesomeIcon icon= {faFacebook} size='lg' className="iconFacebook"/>
                  </Grid>
                  <Grid item xs>
                    <FontAwesomeIcon icon= {faTwitter} size='lg' className="iconTwiter"/>
                  </Grid>
                  <Grid item xs>
                    <FontAwesomeIcon icon= {faInstagram} size='lg' className="iconInstagram"/>
                  </Grid>
                  <Grid item xs>
                    <FontAwesomeIcon icon= {faYoutube} size='lg' className="iconYoutube"/>
                  </Grid>
                </Grid>
              </h5>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <h6>
                <ol>Aviso legal</ol>
                <ol>Política de privacidad</ol>
                <ol>Política de cookies</ol>
                <ol>Contacto</ol>
              </h6>
            </Grid>
        </Grid>
      </footer>
    </div>
  );
}
