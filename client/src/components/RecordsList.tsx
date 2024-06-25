import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { useQuery } from "@apollo/client";
import { Pagination } from '@mui/material';
import Header from './Header';
import { RECORDS_QUERY } from '../graphql/graphqlOperations';
import RecordItem from './record/RecordItem';
import { Record } from '../types/record-type';

type RecordsData = {
  records: {
    totalNumber: number;
    records: Record[];
  };
};

function RecordList() {
  // pagination
  const [limit] = useState(10);
  const [page, setPage] = useState(1);

  const { loading, error, data, refetch } = useQuery<RecordsData>(RECORDS_QUERY, { variables: { limit, offset: (page - 1) * limit}});

  // if (loading) return 'Loading...'; // TODO -> švihnout loadovací obrazovku
  // if (error) return `Error! ${error}`;

  const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    refetch({
      offset: (value - 1) * limit
    });
  };

  return (
    <Paper style={{margin: 5, padding: 2, backgroundColor: "#97ebf0", border: 10, borderColor: "#FFF" }} >
      <h2>Records</h2>  
      <Paper style={{margin: 5, padding: 2}} >
        <Header refetch={refetch} />
        <Paper style={{margin: 5, padding: 2, backgroundColor: '#02ecfa'}} >
        {data?.records.records.map((record) => (
          <RecordItem record={record} refetch={refetch}/>
        ))}
        </Paper>
        <Paper elevation={3} style={{margin: 5, padding: 2, backgroundColor: '#02ecfa' }}>
          <Pagination count={Math.ceil((data?.records?.totalNumber ?? 0) / limit)} page={page} onChange={handleChange} />
        </Paper>
      </Paper>
    </Paper>
  );
}

export default RecordList;
