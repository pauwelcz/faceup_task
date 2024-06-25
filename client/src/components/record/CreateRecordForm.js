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
  const [age, setAge] = useState(1);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const [nameError, setNameError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [noteError, setNoteError] = useState('');
  const [ageError, setAgeError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (nameError) {
      setNameError('');
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    if (titleError) {
      setTitleError('');
    }
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
    if (noteError) {
      setNoteError('');
    }
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
    if (ageError) {
      setAgeError('');
    }
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAge(1);
    setName('');
    setNote('');
    setTitle('');

    setNameError('');
    setTitleError('');
    setAgeError('');
    setNoteError('');
    setOpen(false);
  };


  const [createRecord] = useMutation(CREATE_RECORD_MUTATION);

  const handleCreate = async (variables) => {
    let valid = true;

    if (name === '') {
      setNameError('Name must be filled');
      valid = false;
    }

    if (title === '') {
      setTitleError('Title must be filled');
      valid = false;
    }

    if (note === '') {
      setNoteError('Note must be filled');
      valid = false;
    }

    if (parseInt(age) < 1 || age === '') {
      setAgeError('Age must be filled and greater than 0');
      valid = false;
    }

    if (valid) {
      await createRecord({variables});
      refetch();
      handleClose();
    }
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
                  required 
                  label='User name' 
                  value={name} 
                  error={!!nameError}
                  helperText={nameError}
                  onChange={handleNameChange}
              />
            </Grid>
            <Grid margin={1} sx={4}>
              <TextField 
                required 
                label='User age' 
                value={age} 
                error={!!ageError}
                helperText={ageError}
                onChange={handleAgeChange}
              />
            </Grid>
            <Grid margin={1} sx={4}>
              <TextField 
                required 
                label='Title' 
                value={title} 
                error={!!titleError}
                helperText={titleError}
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid margin={1} sx={4}>
              <TextField 
                required 
                label='Note' 
                value={note} 
                error={!!noteError}
                helperText={noteError}
                onChange={handleNoteChange}
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