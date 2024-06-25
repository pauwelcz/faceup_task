import { gql, useMutation } from '@apollo/client';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

const UPDATE_RECORD_MUTATION = gql`
  mutation UpdateRecord(
    $id: Int!
    $name: String!
    $title: String!
    $note: String!
    $age: Int!
  ) {
    updateRecord(
      updateRecordInput: {
        id: $id
        name: $name
        title: $title
        note: $note
        age: $age
      }
    ) {
      id
      name
      title
      note
      age
    }
  }
`;

function UpdateRecordForm(props) {
  const {record} = props;

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

  return(
    <Grid item xs={1}> 
      <Button startIcon={<EditIcon />} onClick={handleClickOpen} />
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
                updateRecord({variables: { id, name, age: parseInt(age), note, title }});
                handleClose();
              }}>Update</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default UpdateRecordForm;