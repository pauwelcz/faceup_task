import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import RecordDetails from './record-item/RecordDetails';
import UpdateRecordForm from './record-item/UpdateRecordForm';
import DeleteRecord from './record-item/DeleteRecord';

function RecordItem(props) {
  const {refetch, record} = props;
  const {id, name, title, note, created_at} = record;
  return (
    <Paper style={{ margin: 1, backgroundColor: id % 2 === 0 ? '#afeaed' : '#97ebf0', elevation: 3, borderColor: 'black' }}>
      <Grid container spacing={0.25} margin={1}>
          <Grid item xs={2}>
            <strong>{name} </strong>
          </Grid>
          <Grid item xs={2}>
            <strong>{title}</strong>
          </Grid>
          <Grid item xs={3} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'}>
            {note}
          </Grid>
          <Grid item xs={2}>
            {created_at}
          </Grid>
          <RecordDetails record={props.record} />
          <UpdateRecordForm record={props.record} refetch={refetch} />
          <DeleteRecord id={id} refetch={refetch} />
      </Grid>
    </Paper>
  );
}

export default RecordItem;
