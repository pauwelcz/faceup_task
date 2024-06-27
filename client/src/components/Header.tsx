import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React from 'react';
import CreateRecordForm from './record/record-item/CreateRecordForm';
import { gridContainerStyle, gridItemStyle, paperStyle } from '../styles';

type HeaderProps = {
  refetch: () => void;
};

const Header: FC<HeaderProps> = (props) => {
  const { refetch } = props;
  return (
      <Paper style={{...paperStyle, backgroundColor: '#02ecfa'}} >
        <Grid container style={gridContainerStyle}>
          <Grid item xs={2} style={gridItemStyle}> 
            <strong>User name</strong> 
          </Grid>
          <Grid item xs={2} style={gridItemStyle}> 
            <strong>Title</strong> 
          </Grid>
          <Grid item xs={3} style={gridItemStyle}> 
            <strong>Note</strong> 
          </Grid>
          <Grid item xs={2} style={gridItemStyle}> 
            <strong>Created</strong> 
          </Grid>
          <Grid item xs={2} style={gridItemStyle}> 
            <CreateRecordForm refetch={refetch}/>
          </Grid>
        </Grid>
      </Paper>
  );
} 

export default Header;