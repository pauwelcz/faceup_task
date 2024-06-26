import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React from 'react';
import CreateRecordForm from './record/record-item/CreateRecordForm';

type HeaderProps = {
  refetch: () => void; // Typ pro refetch funkci
};

const Header: FC<HeaderProps> = (props) => {
  const { refetch } = props;
  return (
      <Paper style={{margin: 5, padding: 2, backgroundColor: '#02ecfa'}} >
        <Grid container margin={1}>
          <Grid item xs={2} padding={1}> 
            <strong>User name</strong> 
          </Grid>
          <Grid item xs={2} padding={1}> 
            <strong>Title</strong> 
          </Grid>
          <Grid item xs={3} padding={1}> 
            <strong>Note</strong> 
          </Grid>
          <Grid item xs={2} padding={1}> 
            <strong>Created</strong> 
          </Grid>
          <CreateRecordForm refetch={refetch}/>
        </Grid>
      </Paper>
  );
} 

export default Header;