import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { UPDATE_RECORD_MUTATION } from '../../../graphql/graphqlOperations';

function UpdateRecordForm(props) {
  const {record, refetch} = props;

  const [id] = useState(record.id);
  const [name, setName] = useState(record.name);
  const [age, setAge] = useState(record.age);
  const [title, setTitle] = useState(record.title);
  const [note, setNote] = useState(record.note);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [updateRecord] = useMutation(UPDATE_RECORD_MUTATION);

  const handleUpdate = async (variables) => {
    await updateRecord({variables});

    refetch();
    handleClose();
  };

  return(
    <Grid item xs={1}> 
      <Button startIcon={<EditIcon />} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><strong>Update record</strong></DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems={'center'} xs={4} margin={4}>
            <Grid margin={1} sx={4}>
              <TextField 
                  required label='User name' value={name} onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid margin={1} sx={4}>
              <TextField 
                required label='User age' value={age} onChange={e => setAge(e.target.value)}
              />
            </Grid>
            <Grid margin={1} sx={4}>
              <TextField 
                required label='Title' value={title} onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid margin={1} sx={4}>
              <TextField 
                required label='Note' value={note} onChange={e => setNote(e.target.value)}
              />
            </Grid>
            <Grid sx={2}>
              <Button variant='contained' onClick={() => {
                handleClose();
              }}>Cancel</Button>
            </Grid>
            <Grid sx={2}>
              <Button variant='contained' onClick={() => {
                handleUpdate({ id, name, age: parseInt(age), note, title });
              }}>Update</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default UpdateRecordForm;