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
import DateFormatter from '../../utils/DateFormatter';

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
          <strong>Record details</strong>
        </DialogTitle>
        <DialogContent>
          <Paper>
            <Grid item style={gridItemStyle}>
              <Typography>
                <strong>Reporter:</strong> {name}
              </Typography>
              <Typography>
                <strong>Age:</strong> {age}
              </Typography>
              <Typography>
                <strong>Title:</strong> {title}
              </Typography>
              <Typography>
                <strong>Note:</strong> {note}
              </Typography>
              <Typography>
                <strong>Created:</strong> <DateFormatter date={created_at}/>  
              </Typography>
              <Typography>
                <strong>Attached files:</strong>
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