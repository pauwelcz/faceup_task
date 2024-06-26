import React, { useState, FC } from 'react';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { useMutation } from "@apollo/client";
import { REMOVE_RECORD_MUTATION } from '../../../graphql/graphqlOperations';

import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { dialogActionsStyle } from '../../../styles';

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
    <>           
      <Button variant='contained' startIcon={<DeleteIcon /> } onClick={handleOpen}>Delete</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
          <DialogActions style={dialogActionsStyle}>
            <Button variant='contained' startIcon={<CloseIcon />} onClick={handleClose}>Cancel</Button>
            <Button variant='contained' startIcon={<DeleteIcon />} onClick={() => {
              handleDelete(id);
            }} autoFocus>
              Confirm delete
            </Button>
        </DialogActions>
        </Dialog>
    </>  
  );
}

export default DeleteRecord;