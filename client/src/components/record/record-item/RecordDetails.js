import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

function RecordDetails(props) {
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
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default RecordDetails;