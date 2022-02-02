import { Grid} from '@mui/material';
import { Button, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grid: {
    "margin" : "5%",
    "font-size" : "80px",
    "color" : "#4054B4"
  },
}));

export default function ProfileUser() {
    const classes = useStyles(); 
    return (
        <div>
            <center>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={classes.grid}>404 ERROR</div>
                    <br></br>
                    <div>No hemos podido encontrar la Página que buscas</div>
                    <br></br>
                    <Button color="inherit">
                        <NavLink
                        activeclassname="active"
                        className={"styleButtonsNav"}
                        exact
                        to="/"
                        >
                        Ir a la página principal
                        </NavLink>
                    </Button>
                </Grid>
                </Grid>
            </center>
        </div>
    );
}