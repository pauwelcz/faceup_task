import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { gql, useMutation } from "@apollo/client";

export const REMOVE_RECORD_MUTATION = gql`
    mutation RemoveRecord($id: Int!) {
      removeRecord(id: $id) {
        id
      }
    }
`;

const RECORDS_QUERY = gql`
  query AllRecords($limit: Int!, $offset: Int!) {
    records(findRecordsArgs: {limit: $limit, offset: $offset}) {
      totalNumber
      records {
        id
        age
        name
        title
        note
        created_at
        updated_at
      }
    }
  }
`;

function DeleteRecord(props) {
  const { id } = props;
  const [open, setOpen] = useState(false);

  const handleDeleteConfirmationClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setOpen(false);
  };

  const [deleteRecord] = useMutation(REMOVE_RECORD_MUTATION, {
    refetchQueries: [{ query: RECORDS_QUERY, variables: {limit: 40, offset: 0}}]
  });

  return(
    <Grid item xs={1}>                   
      <Button startIcon={<DeleteIcon /> } onClick={handleDeleteConfirmationClickOpen}/>
        <Dialog open={open} onClose={handleDeleteConfirmationClose}>
          <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
          <DialogActions>
            <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
            <Button onClick={() => {
              deleteRecord({ variables: { id } });
              handleDeleteConfirmationClose();
            }} autoFocus>
              Delete
            </Button>
        </DialogActions>
        </Dialog>
    </Grid>
  );
}

export default DeleteRecord;