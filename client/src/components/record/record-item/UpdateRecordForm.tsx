import { useMutation } from '@apollo/client';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useState, FC, useRef } from 'react';
import { UPDATE_RECORD_MUTATION } from '../../../graphql/graphqlOperations';
import { Record } from '../../../types/record-type';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { dialogActionsStyle, gridItemStyle } from '../../../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { File as FileOutput } from '../../../types/file-type';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useDialog from '../../../hooks/useDialog';

type UpdateRecordFormProps = {
  record: Record;
  files: FileOutput[];
  refetch: () => void;
  fileRefetch: () => void;
};

const UpdateRecordForm: FC<UpdateRecordFormProps> = (props) => {
  const {record, refetch, files, fileRefetch} = props;

  const [id] = useState<number>(record.id);
  const [name, setName] = useState<string>(record.name);
  const [age, setAge] = useState<string>((record.age).toString());
  const [title, setTitle] = useState<string>(record.title);
  const [note, setNote] = useState<string>(record.note);

  const { open, handleClickOpen, handleClickClose } = useDialog();

  const [nameError, setNameError] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [noteError, setNoteError] = useState<string>('');
  const [ageError, setAgeError] = useState<string>('');
  const [uploadedFilesToDelete, setUpdatedFilesToDelete] = useState<number[]>([]);

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

    setTitle(record.title);
    setName(record.name);
    setAge(record.age.toString());
    setNote(record.note);
    setUploadedFiles([]);
    handleClickClose()
  };

  const [updateRecord] = useMutation(UPDATE_RECORD_MUTATION);

  const handleUpdate = async (variables: { id: number, name: string; age: string | number; title: string; note: string; uploadedFilesToDelete: number[]; files: File[]}) => {
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
              {files.map((file, index) => (
                <Grid key={index}>
                  <Checkbox 
                    icon={<DeleteOutlineOutlinedIcon />}
                    checkedIcon={<DeleteIcon />} 
                    checked={uploadedFilesToDelete.includes(file.id)}
                    onChange={() => handleUpdatedFilesToDelete(file.id)}
                  /> {file.filename}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item style={gridItemStyle}>
              <strong>Attached files:</strong>
                {uploadedFiles.map((file, index) => (
                  <>
                  <Grid key={index}>
                    <Tooltip  title={`Click to remove ${file.name}`}>
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
              handleUpdate(
                {
                  id,
                  name,
                  age,
                  note,
                  title,
                  uploadedFilesToDelete,
                  files: uploadedFiles
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