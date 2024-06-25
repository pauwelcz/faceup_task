import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { useQuery, gql } from "@apollo/client";
import { Pagination } from '@mui/material';
import Header from './Header';
import RecordItem from './RecordItem';

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
  // pagination
  const [limit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const { loading, error, data } = useQuery(RECORDS_QUERY, { variables: { limit, offset: (page - 1) * limit}});

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  return (
    <Paper style={{margin: 5, padding: 2, backgroundColor: "#97ebf0", border: 10, borderColor: "#FFF" }} >
      <h2>Records</h2>  
      <Paper style={{margin: 5, padding: 2, elevation: 3}} >
        <Header />
        <Paper style={{margin: 5, padding: 2, elevation: 3,backgroundColor: '#02ecfa'}} >
        {data.records.records.map((record) => (
          <RecordItem record={record}/>
        ))}
        </Paper>
        <Paper elevation={3} style={{margin: 5, padding: 2, backgroundColor: '#02ecfa' }}>
          <Pagination count={Math.ceil(data.records.totalNumber / limit)} page={page} onChange={handleChange} />
        </Paper>
      </Paper>
    </Paper>


  );
}

export default RecordList;
