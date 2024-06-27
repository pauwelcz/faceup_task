import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { gridItemStyle, paperStyle } from '../../../styles';
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
          <Grid item xs={1} style={gridItemStyle} >
            <Button variant='contained' startIcon={<DownloadIcon />} onClick={() => handleDownload(id)} />
          </Grid>
          <Grid item xs={1} style={gridItemStyle} >
            <FileNameFormatter filename={filename} extension={extension} />
          </Grid>
        </Paper>
  );
}

export default FileItem;
