import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React from 'react';
import CreateRecordForm from './record/CreateRecordForm';

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
          <CreateRecordForm />
        </Grid>
      </Paper>
  );
} 

export default Header;