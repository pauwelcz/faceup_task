import { Paper, Typography } from '@mui/material';
import React, { FC } from 'react';
import { File } from '../../../types/file-type';
import FileItem from './FileItem';
import { paperStyle } from '../../../styles';

type AttachedFilesProps = {
  files: File[];
}

const AttachedFiles: FC<AttachedFilesProps> = (props) => {
  const { files } = props;
  return(<>
    <Paper style={{...paperStyle, backgroundColor: '#02ecfa'}}>
      <Typography padding={1}>
        <strong>Attached files:</strong>
      </Typography>
      {files.map((file) => (
        <FileItem file={file} />
      ))}
    </Paper>
  </>);
}

export default AttachedFiles;