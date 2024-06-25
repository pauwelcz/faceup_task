import React, { useState, FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { useMutation } from "@apollo/client";
import { REMOVE_RECORD_MUTATION } from '../../../graphql/graphqlOperations';

type DeleteRecordProps = {
  id: number;
  refetch: () => void;
};

const DeleteRecord: FC<DeleteRecordProps> = (props) => {
  const { id, refetch } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteRecord] = useMutation(REMOVE_RECORD_MUTATION);

  const handleDelete = async (id: number) => {
    await deleteRecord({variables: {id}});

    refetch();
    handleClose();
  };

  return(
    <Grid item xs={1}>                   
      <Button startIcon={<DeleteIcon /> } onClick={handleOpen}/>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
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