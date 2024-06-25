import { gql, useMutation } from '@apollo/client';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

function CreateRecordForm(props) {
  const { refetch } = props;
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

  const handleCreate = async (variables) => {
    await createRecord({variables});

    refetch();
    handleClose();
  };
  return(
    <Grid item xs={1}> 
      <Button startIcon={<AddCircleIcon />} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><strong>Create new record</strong></DialogTitle>
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
                handleCreate({ name, age: parseInt(age), note, title });
              }}>Create</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default CreateRecordForm;