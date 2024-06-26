import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useState, FC } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CREATE_RECORD_MUTATION } from '../../../graphql/graphqlOperations';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { dialogActionsStyle, gridStyle } from '../../../styles';

type CreateRecordFormProps = {
  refetch: () => void;
};

const CreateRecordForm: FC<CreateRecordFormProps> = (props) => {
  const { refetch } = props;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const [nameError, setNameError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [noteError, setNoteError] = useState('');
  const [ageError, setAgeError] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (nameError) {
      setNameError('');
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (titleError) {
      setTitleError('');
    }
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
    if (noteError) {
      setNoteError('');
    }
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setAge('');
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

  const handleCreate = async (variables: { name: string; age: string | number; title: string; note: string; }) => {
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

    if (parseInt(age) < 1 || isNaN(parseInt(age))) {
      setAgeError('Age must be filled and greater than 0');
      valid = false;
    }

    if (valid) {
      variables.age = parseInt(age);
      await createRecord({variables});
      refetch();
      handleClose();
    }
  };

  return(
    <> 
      <Button  variant='contained' startIcon={<AddCircleIcon />} onClick={handleClickOpen} >Create new record</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <strong>Create new record</strong></DialogTitle>
        <DialogContent>
            <Grid item style={gridStyle}>
              <TextField 
                  required 
                  label='User name' 
                  value={name} 
                  error={!!nameError}
                  helperText={nameError}
                  onChange={handleNameChange}
              />
            </Grid>
            <Grid item style={gridStyle}>
              <TextField 
                required 
                label='User age' 
                value={age} 
                error={!!ageError}
                helperText={ageError}
                onChange={handleAgeChange}
              />
            </Grid>
            <Grid item style={gridStyle}>
              <TextField 
                required 
                label='Title' 
                value={title} 
                error={!!titleError}
                helperText={titleError}
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid item style={gridStyle}>
              <TextField 
                required 
                label='Note' 
                value={note} 
                error={!!noteError}
                helperText={noteError}
                onChange={handleNoteChange}
              />
            </Grid>
        </DialogContent>
        <DialogActions style={dialogActionsStyle}>
          <Grid>
            <Button startIcon={<CloseIcon />} variant='contained' onClick={() => {
              handleClose();
            }}>Cancel</Button>
          </Grid>
          <Grid>
            <Button startIcon={<SaveIcon />} variant='contained' onClick={() => {
              handleCreate({ name, age, note, title });
            }}>Create</Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateRecordForm;