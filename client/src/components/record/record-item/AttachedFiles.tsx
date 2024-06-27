import { useQuery } from '@apollo/client';
import { Paper, Typography } from '@mui/material';
import React, { FC } from 'react';
import { FILES_BY_RECORD_QUERY } from '../../../graphql/graphqlOperations';
import { File } from '../../../types/file-type';
import FileItem from './FileItem';
import { paperStyle } from '../../../styles';

type AttachedFilesProps = {
  id: number;
}

type FilesData = {
  filesByRecord: {
    totalNumber: number;
    files: File[];
  };
};

const AttachedFiles: FC<AttachedFilesProps> = (props) => {
  const { id } = props;
  const { loading, error, data } = useQuery<FilesData>(FILES_BY_RECORD_QUERY, { variables: { recordId: id }});
  return(<>
    { data?.filesByRecord.totalNumber !== 0 && 
    <Paper style={{...paperStyle, backgroundColor: '#02ecfa'}}>
      <Typography padding={1}>
        <strong>Attached files:</strong>
      </Typography>
      {data?.filesByRecord.files.map((file) => (
        <FileItem file={file} />
      ))}
    </Paper>}
  </>);
}

export default AttachedFiles;