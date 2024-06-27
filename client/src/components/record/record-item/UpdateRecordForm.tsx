import { useMutation } from '@apollo/client';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useState, FC } from 'react';
import { UPDATE_RECORD_MUTATION } from '../../../graphql/graphqlOperations';
import { Record } from '../../../types/record-type';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { dialogActionsStyle, gridItemStyle } from '../../../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { File } from '../../../types/file-type';

type UpdateRecordFormProps = {
  record: Record;
  files: File[];
  refetch: () => void;
  fileRefetch: () => void;
};

const UpdateRecordForm: FC<UpdateRecordFormProps> = (props) => {
  const {record, refetch, files, fileRefetch} = props;

  const [id] = useState(record.id);
  const [name, setName] = useState(record.name);
  const [age, setAge] = useState((record.age).toString());
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
  const [updatedFilesToDelete, setUpdatedFilesToDelete] = useState<number[]>([]);

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

  const handleUpdatedFilesToDelete = (fileId: number) => {
    setUpdatedFilesToDelete((prevState) => {
      if (prevState.includes(fileId)) {
        return prevState.filter(id => id !== fileId);
      } else {
        return [...prevState, fileId];
      }
    });
  };

  const handleClose = () => {
    setNameError('');
    setTitleError('');
    setAgeError('');
    setNoteError('');
    setOpen(false);
  };

  const [updateRecord] = useMutation(UPDATE_RECORD_MUTATION);

  const handleUpdate = async (variables: { id: number, name: string; age: string | number; title: string; note: string; updatedFilesToDelete: number[]}) => {
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
      await updateRecord({variables});
      refetch();
      fileRefetch();
      handleClose();
    }
  };

  return(
    <> 
      <Button variant='contained' startIcon={<EditIcon />} onClick={handleClickOpen} > Edit </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><strong>Update record</strong></DialogTitle>
        <DialogContent>
          <Grid item style={gridItemStyle}>
            <TextField 
                required 
                label='User name' 
                value={name} 
                error={!!nameError}
                helperText={nameError}
                onChange={handleNameChange}
            />
          </Grid>
          <Grid item style={gridItemStyle}>
            <TextField 
              required 
              label='User age' 
              value={age} 
              error={!!ageError}
              helperText={ageError}
              onChange={handleAgeChange}
            />
          </Grid>
          <Grid item style={gridItemStyle}>
            <TextField 
              required 
              label='Title' 
              value={title} 
              error={!!titleError}
              helperText={titleError}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item style={gridItemStyle}>
            <TextField 
              required 
              label='Note' 
              value={note} 
              error={!!noteError}
              helperText={noteError}
              onChange={handleNoteChange}
            />
          </Grid>
          <Grid>
            <Grid>
              <Typography><strong>Uploaded files</strong></Typography>
            </Grid>
            <Grid>
              {files.map((file) => (
                <Grid>
                  <Checkbox 
                    icon={<DeleteOutlineOutlinedIcon />}
                    checkedIcon={<DeleteIcon />} 
                    checked={updatedFilesToDelete.includes(file.id)}
                    onChange={() => handleUpdatedFilesToDelete(file.id)}
                  /> {file.filename}
                </Grid>
              ))}
            </Grid>
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
              handleUpdate(
                { 
                  id, 
                  name, 
                  age, 
                  note, 
                  title, 
                  updatedFilesToDelete
                }
              );
            }}>Save</Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateRecordForm;