import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import RecordDetails from './record-item/RecordDetails';
import { Record } from '../../types/record-type';
import { paperStyle } from '../../styles';

type RecordItemProps = {
  record: Record;
  refetch: () => void;
};

const RecordItem: FC<RecordItemProps> = (props) => {
  const { record, refetch } = props;
  const { id, name, title, note, created_at } = record;

  return (
    <Paper style={{...paperStyle, backgroundColor: id % 2 === 0 ? '#afeaed' : '#97ebf0', borderColor: 'black' }}>
      <Grid container margin={1}>
          <Grid item xs={2} padding={1}>
            <strong>{name}</strong>
          </Grid>
          <Grid item xs={2} padding={1}>
            <strong>{title}</strong>
          </Grid>
          <Grid item xs={3} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'} padding={1}>
            {note}
          </Grid>
          <Grid item xs={2} padding={1}>
            {created_at}
          </Grid>
          <RecordDetails record={props.record}  refetch={refetch} />
      </Grid>
    </Paper>
  );
}

export default RecordItem;
