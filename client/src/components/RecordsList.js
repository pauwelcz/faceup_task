import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useQuery, gql, useMutation } from "@apollo/client";
import { Box, CardContent, Pagination } from '@mui/material';
import Header from './Header';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';

const RECORDS_QUERY = gql`
  query AllRecords($limit: Int!, $offset: Int!) {
    records(findRecordsArgs: {limit: $limit, offset: $offset}) {
      totalNumber
      records {
        id
        age
        name
        title
        note
        created_at
        updated_at
      }
    }
  }
`;

export const REMOVE_RECORD_MUTATION = gql`
    mutation RemoveRecord($id: Int!) {
      removeRecord(id: $id) {
        id
      }
    }
`;

function RecordList() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // TODO - use pagination
  const { loading, error, data } = useQuery(RECORDS_QUERY, { variables: { limit, offset: page - 1}});
  const [deleteRecord] = useMutation(REMOVE_RECORD_MUTATION, {
    refetchQueries: [{ query: RECORDS_QUERY, variables: {limit, offset: page - 1}}]
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  return (
    <Paper style={{margin: 5, padding: 2, backgroundColor: "#97ebf0", border: 10, borderColor: "#FFF" }} >
      <h2>Records</h2>  
      <Paper style={{margin: 5, padding: 2, elevation: 3}} >
        <Header />
        <Paper style={{margin: 5, padding: 2, elevation: 3,backgroundColor: '#02ecfa'}} >
        {data.records.records.map((record) => (
          <Paper style={{ margin: 1, backgroundColor: record.id % 2 === 0 ? '#afeaed' : '#97ebf0', elevation: 3, borderColor: 'black' }}>
            <Grid container spacing={0.25} margin={1}>
                <Grid item xs={2}>
                  <strong>{record.name} </strong>
                </Grid>
                <Grid item xs={2}>
                  <strong>{record.title}</strong>
                </Grid>
                <Grid item xs={3} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'}>
                  {record.note}
                </Grid>
                <Grid item xs={2}>
                  {record.created_at}
                </Grid>
                <Grid item xs={1}> 
                  <Button startIcon={<InfoIcon />} />
                </Grid>
                <Grid item xs={1}> 
                  <Button startIcon={<EditIcon />} />
                </Grid>
                <Grid item xs={1}> 
                  <Button startIcon={<DeleteIcon />} onClick={() => {
                    deleteRecord({ variables: { id: record.id } });
                    // TODO - confirmation 
                    // TODO - refresh after delete
                  }} />
                </Grid>
            </Grid>
          </Paper>
        ))}
        </Paper>
        <Paper elevation={3} style={{margin: 5, padding: 2, backgroundColor: '#02ecfa' }}>
          <Pagination count={Math.ceil(data.records.totalNumber / limit)} />
        </Paper>
      </Paper>
    </Paper>
  );
}

export default RecordList;
