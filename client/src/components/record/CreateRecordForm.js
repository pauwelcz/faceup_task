import { gql, useMutation } from '@apollo/client';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';

const CREATE_RECORD_MUTATION = gql`
  mutation CreateRecord(
    $name: String!
    $title: String!
    $note: String!
    $age: Int!
  ) {
    createRecord(
      createRecordInput: { name: $name, title: $title, note: $note, age: $age }
    ) {
      id
      name
      title
      note
      age
    }
  }
`;

function CreateRecordForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [createRecord] = useMutation(CREATE_RECORD_MUTATION);

  return(
    <Grid item xs={1}> 
      <Button onClick={handleClickOpen}>Create new record</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Creating new record</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems={'center'} xs={4} margin={4}>
            <Grid margin={1} sx={4}>
              <TextField 
                  label='User name' value={name} onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid margin={1} sx={4}>
              <TextField 
                label='User age' value={age} onChange={e => setAge(e.target.value)}
              />
            </Grid>
            <Grid margin={1} sx={4}>
              <TextField 
                label='Title' value={title} onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid margin={1} sx={4}>
              <TextField 
                label='Note' value={note} onChange={e => setNote(e.target.value)}
              />
            </Grid>
            <Grid margin={1} sx={2}>
              <Button onClick={() => {
                handleClose();
              }}>Cancel</Button>
            </Grid>
            <Grid margin={1} sx={2}>
              <Button onClick={() => {
                createRecord({variables: { name, age: parseInt(age), note, title }});
                handleClose();
              }}>Create</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default CreateRecordForm;