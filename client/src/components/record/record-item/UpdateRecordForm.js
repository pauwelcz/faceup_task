import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
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

  const handleClose = () => {
    setNameError('');
    setTitleError('');
    setAgeError('');
    setNoteError('');
    setOpen(false);
  };

  const [updateRecord] = useMutation(UPDATE_RECORD_MUTATION);

  const handleUpdate = async (variables) => {
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
      await updateRecord({variables});
      refetch();
      handleClose();
    }
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
          </Grid>
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default UpdateRecordForm;