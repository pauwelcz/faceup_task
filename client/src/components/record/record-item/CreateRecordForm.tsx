import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useState, FC, useRef } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CREATE_RECORD_MUTATION } from '../../../graphql/graphqlOperations';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { dialogActionsStyle, gridItemStyle } from '../../../styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useDialog from '../../../hooks/useDialog';

type CreateRecordFormProps = {
  refetch: () => void;
};

const CreateRecordForm: FC<CreateRecordFormProps> = (props) => {
  const { refetch } = props;
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const [nameError, setNameError] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [noteError, setNoteError] = useState<string>('');
  const [ageError, setAgeError] = useState<string>('');

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setUploadedFiles(prevFiles => [...prevFiles, ...filesArray]);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

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

  const { open, handleClickOpen, handleClickClose } = useDialog();

  const handleClose = () => {
    setAge('');
    setName('');
    setNote('');
    setTitle('');

    setNameError('');
    setTitleError('');
    setAgeError('');
    setNoteError('');
    setUploadedFiles([]);
    handleClickClose();
  };

  const [createRecord] = useMutation(CREATE_RECORD_MUTATION);

  const handleCreate = async (variables: { name: string; age: string | number; title: string; note: string; files: File[]}) => {
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
      variables.files = uploadedFiles;
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
            <Grid item style={gridItemStyle}>
              <strong>Attached files:</strong>
                {uploadedFiles.map((file, index) => (
                  <>
                  <Grid>
                    <Tooltip key={index} title={`Click to remove ${file.name}`}>
                      <Button
                        key={index}
                        variant="outlined"
                        onClick={() => handleRemoveFile(index)}
                      >{file.name}</Button>
                    </Tooltip>
                    </Grid>
                  </>
                ))}                              
            </Grid>
            <Grid item style={gridItemStyle}>
              <Button 
                 component="label"
                 variant="contained"
                 startIcon={<CloudUploadIcon />}
               >
                 Upload file
                 <input
                    type="file"
                    multiple
                    style={{ display: 'none' }} // Make the file input element invisible
                    onChange={handleFileChange}
                    ref={fileInputRef}
                 />
              </Button>
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
              handleCreate(
                { 
                  name, 
                  age, 
                  note, 
                  title, 
                  files: uploadedFiles 
                }
              );
            }}>Create</Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateRecordForm;