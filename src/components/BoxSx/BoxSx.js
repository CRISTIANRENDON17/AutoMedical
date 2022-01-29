import { Avatar} from '@mui/material';
import "./BoxSx.css";
import Covid from './Covid.png';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    "margin" : "auto",
    "marginTop" : "1em"
  },
}));

export default function BoxSx() {
  const classes = useStyles(); 
  return (
    <div>     
      {/*<Box
        sx={{
          center:'center',
          width: '100%',
          height: 300,
          backgroundColor: "primary",
        }}
      > 
      </Box>*/}
      <Avatar 
          alt="Remy Sharp" 
          src={Covid}  
          sx={{height:"75%", width:"50%"}} 
          variant="rounded"
          margin= "5px"
          className={classes.avatar}
      />
    </div>
  );
}
