import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import RecordDetails from './record-item/RecordDetails';
import { Record } from '../../types/record-type';
import { gridContainerStyle, gridItemStyle, paperStyle } from '../../styles';
import DateFormatter from '../utils/DateFormatter';

type RecordItemProps = {
  record: Record;
  refetch: () => void;
};

const RecordItem: FC<RecordItemProps> = (props) => {
  const { record, refetch } = props;
  const { id, name, title, note, created_at } = record;

  return (
    <Paper style={{...paperStyle, backgroundColor: id % 2 === 0 ? '#afeaed' : '#97ebf0', borderColor: 'black' }}>
      <Grid container style={gridContainerStyle}>
          <Grid item xs={2} style={gridItemStyle}>
            <strong>{name}</strong>
          </Grid>
          <Grid item xs={2} style={gridItemStyle}>
            <strong>{title}</strong>
          </Grid>
          <Grid item xs={3} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'} style={gridItemStyle}>
            {note}
          </Grid>
          <Grid item xs={2} style={gridItemStyle}>
            <DateFormatter date={created_at}/>
          </Grid>
          <RecordDetails record={props.record}  refetch={refetch} />
      </Grid>
    </Paper>
  );
}

export default RecordItem;
