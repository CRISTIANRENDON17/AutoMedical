import { Grid} from '@mui/material';

export default function ProfileUser() {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    See Profile
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>                   
                    Edit Profile
                </Grid>
            </Grid>
        </div>
    );
}