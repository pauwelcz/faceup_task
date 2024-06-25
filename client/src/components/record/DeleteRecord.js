import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { useMutation } from "@apollo/client";
import { REMOVE_RECORD_MUTATION } from '../../graphql/graphqlOperations';

function DeleteRecord(props) {
  const { id, refetch } = props;
  const [open, setOpen] = useState(false);

  const handleDeleteConfirmationClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setOpen(false);
  };

  const [deleteRecord] = useMutation(REMOVE_RECORD_MUTATION);

  const handleDelete = async (id) => {
    await deleteRecord({variables: {id}});

    refetch();
    handleDeleteConfirmationClose();
  };

  return(
    <Grid item xs={1}>                   
      <Button startIcon={<DeleteIcon /> } onClick={handleDeleteConfirmationClickOpen}/>
        <Dialog open={open} onClose={handleDeleteConfirmationClose}>
          <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
          <DialogActions>
            <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
            <Button onClick={() => {
              handleDelete(id);
            }} autoFocus>
              Delete
            </Button>
        </DialogActions>
        </Dialog>
    </Grid>
  );
}

export default DeleteRecord;