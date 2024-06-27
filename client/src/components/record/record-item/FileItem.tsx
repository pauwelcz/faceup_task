import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { gridContainerStyle, gridItemStyle, paperStyle } from '../../../styles';
import { File } from '../../../types/file-type';
import FileNameFormatter from '../../utils/FileNameFormatter';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

type FileItemProps = {
  file: File;
};

const handleDownload = (id: number) => {
  alert(`Downloading file with id ${id}`);
}

const FileItem: FC<FileItemProps> = (props) => {
  const { file } = props;
  const { id, filename, extension} = file;

  return (
    <Paper style={{...paperStyle, backgroundColor: id % 2 === 0 ? '#afeaed' : '#97ebf0', borderColor: 'black' }}>
      <Grid container style={gridContainerStyle}>
        <Grid item >
          <Button startIcon={<DownloadIcon />} onClick={() => handleDownload(id)} />
        </Grid>
        <Grid item >
          <FileNameFormatter filename={filename} extension={extension} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FileItem;
