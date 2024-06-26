import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React from 'react';
import CreateRecordForm from './record/record-item/CreateRecordForm';
import { gridStyle, paperStyle } from '../styles';

type HeaderProps = {
  refetch: () => void; // Typ pro refetch funkci
};

const Header: FC<HeaderProps> = (props) => {
  const { refetch } = props;
  return (
      <Paper style={{...paperStyle, backgroundColor: '#02ecfa'}} >
        <Grid container alignItems={'center'}>
          <Grid item xs={2} style={gridStyle}> 
            <strong>User name</strong> 
          </Grid>
          <Grid item xs={2} style={gridStyle}> 
            <strong>Title</strong> 
          </Grid>
          <Grid item xs={3} style={gridStyle}> 
            <strong>Note</strong> 
          </Grid>
          <Grid item xs={2} style={gridStyle}> 
            <strong>Created</strong> 
          </Grid>
          <Grid item xs={2} style={gridStyle}> 
            <CreateRecordForm refetch={refetch}/>
          </Grid>
        </Grid>
      </Paper>
  );
} 

export default Header;