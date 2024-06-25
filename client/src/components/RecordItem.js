import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';


function RecordItem(props) {
  return (
    <div>
      <li key={props.id}>
        <strong>{props.name}</strong>: 
        {props.title} 
        {props.created_at} 
        <Button variant="outlined" startIcon={<InfoIcon />}></Button>
        <Button variant="outlined" startIcon={<EditIcon />}></Button>
        <Button variant="outlined" startIcon={<DeleteIcon />}></Button>
      </li>
    </div>
  );
}

export default RecordItem;
