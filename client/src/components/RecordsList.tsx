import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { useQuery } from "@apollo/client";
import { Pagination } from '@mui/material';
import Header from './Header';
import { RECORDS_QUERY } from '../graphql/graphqlOperations';
import RecordItem from './record/RecordItem';
import { Record } from '../types/record-type';
import { paperStyle } from '../styles';
import Loading from './Loading';
import SomethingWentWrong from './SomethingWentWrong';
import { COLORS } from '../types/colors';

type RecordsData = {
  records: {
    totalNumber: number;
    records: Record[];
  };
};

function RecordList() {
  const [limit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const { loading, error, data, refetch } = useQuery<RecordsData>(RECORDS_QUERY, { variables: { limit, offset: (page - 1) * limit}});

  if (error) return <SomethingWentWrong />;
  if (loading) return <Loading />;

  const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    refetch({
      offset: (value - 1) * limit
    });
  };

  return (
    <Paper style={{...paperStyle, backgroundColor: "#97ebf0", height: '90vh', width: '90%', margin: 'auto', display: 'flex', flexDirection: 'column'}} >
      <h2>Records</h2>  
      <Paper style={{...paperStyle, flex: 1, display: 'flex', flexDirection: 'column'}} >
        <Header refetch={refetch} />
        <Paper style={{...paperStyle, backgroundColor: COLORS.primary, flex: 1, overflowY: 'auto'}} >
        {data?.records.records.map((record, index) => (
          <div key={index}>
            <RecordItem record={record} refetch={refetch}/>
          </div>
        ))}
        </Paper>
        <Paper style={{...paperStyle, backgroundColor: COLORS.primary, marginTop: 'auto' }}>
          <Pagination count={Math.ceil((data?.records?.totalNumber ?? 0) / limit)} page={page} onChange={handleChange} />
        </Paper>
      </Paper>
    </Paper>
  );
}

export default RecordList;
