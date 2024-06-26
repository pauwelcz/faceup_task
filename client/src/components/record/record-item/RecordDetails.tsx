import React, { FC, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Record } from '../../../types/record-type';
import UpdateRecordForm from './UpdateRecordForm';
import DeleteRecord from './DeleteRecord';
import CloseIcon from '@mui/icons-material/Close';
import { dialogActionsStyle, gridItemStyle } from '../../../styles';

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
    <> 
      <Button variant='contained' startIcon={<SearchIcon />} onClick={handleClickOpen} >Details</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography>Record details</Typography>
        </DialogTitle>
        <DialogContent>
          <Paper>
            <Grid item style={gridItemStyle}>
              <Typography>
                Reporter: <strong>{name}</strong>, age <strong>{age}</strong>
              </Typography>
              <Typography>
                Title: <strong>{title}</strong>
              </Typography>
              <Typography>
                Note: {note}
              </Typography>
              <Typography>
                Created: {(new Date(created_at)).toUTCString()}  
              </Typography>
              <Typography>
                Attached files: 
              </Typography>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogActions style={dialogActionsStyle}>
          <Button variant='contained' startIcon={<CloseIcon />} onClick={handleClose}>Close</Button>
          <UpdateRecordForm record={props.record} refetch={refetch} />
          <DeleteRecord id={props.record.id} refetch={refetch} />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RecordDetails;