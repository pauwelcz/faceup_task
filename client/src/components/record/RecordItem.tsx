import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import RecordDetails from './record-item/RecordDetails';
import { Record } from '../../types/record-type';
import { gridStyle, paperStyle } from '../../styles';

type RecordItemProps = {
  record: Record;
  refetch: () => void;
};

const RecordItem: FC<RecordItemProps> = (props) => {
  const { record, refetch } = props;
  const { id, name, title, note, created_at } = record;

  return (
    <Paper style={{...paperStyle, backgroundColor: id % 2 === 0 ? '#afeaed' : '#97ebf0', borderColor: 'black' }}>
      <Grid container alignItems={'center'}>
          <Grid item xs={2} style={gridStyle}>
            <strong>{name}</strong>
          </Grid>
          <Grid item xs={2} style={gridStyle}>
            <strong>{title}</strong>
          </Grid>
          <Grid item xs={3} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'} style={gridStyle}>
            {note}
          </Grid>
          <Grid item xs={2} style={gridStyle}>
            {created_at}
          </Grid>
          <RecordDetails record={props.record}  refetch={refetch} />
      </Grid>
    </Paper>
  );
}

export default RecordItem;
