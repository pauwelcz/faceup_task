import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function Header() {
  return (
      <Paper style={{margin: 5, padding: 2, backgroundColor: '#02ecfa', borderColor: 'black'}} >
        <Grid container>
          <Grid item xs={2} > 
              <strong>User name</strong> 
          </Grid>
          <Grid item xs={2} > 
              <strong>Title</strong> 
          </Grid>
          <Grid item xs={3} > 
              <strong>Note</strong> 
          </Grid>
          <Grid item xs={2} > 
              <strong>Created</strong> 
          </Grid>
        </Grid>
      </Paper>
  );
} 

export default Header;