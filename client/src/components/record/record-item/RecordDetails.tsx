import React, { FC, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Record } from '../../../types/record-type';
import UpdateRecordForm from './UpdateRecordForm';
import DeleteRecord from './DeleteRecord';


type RecordDetailsProps = {
  record: Record;
  refetch: () => void;
};

const RecordDetails: FC<RecordDetailsProps> = (props) => {
  const { refetch } = props;
  const {name, title, created_at, age, note } = props.record;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <Grid item xs={1}> 
      <Button startIcon={<SearchIcon />} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Record details</DialogTitle>
        <DialogContent>
          <Paper>
            <Grid margin={1}>
              <Paper>
                <strong>{title}</strong>
              </Paper>
            </Grid>
            <Grid margin={1}>
              <Paper>
                by <strong>{name}</strong>, age <strong>{age}</strong>
              </Paper>
            </Grid>
            <Grid margin={1}>
              <Paper>
                Note
              </Paper>
            </Grid>
            <Grid margin={1}>
              <Paper>
                {note}
              </Paper>
            </Grid>
            <Grid margin={1}>
              <Paper>
                Created: {(new Date(created_at)).toUTCString()}
              </Paper>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>Close</Button>
          <UpdateRecordForm record={props.record} refetch={refetch} />
          <DeleteRecord id={props.record.id} refetch={refetch} />
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default RecordDetails;