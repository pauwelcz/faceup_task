import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { gridContainerStyle, paperStyle } from '../../../styles';
import { File } from '../../../types/file-type';
import FileNameFormatter from '../../utils/FileNameFormatter';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useQuery } from '@apollo/client';
import { GENERATE_URL_QUERY } from '../../../graphql/graphqlOperations';

type FileItemProps = {
  file: File;
};

const raiseInvoiceClicked = (generateUrl: string) => {
  const url = generateUrl;
  window.open(url, '_blank');
}

const FileItem: FC<FileItemProps> = (props) => {
  const { file } = props;
  const { id, filename } = file;
  const { loading, error, data } = useQuery(GENERATE_URL_QUERY, { variables: { id }});

  return (
    <Paper style={{...paperStyle, backgroundColor: id % 2 === 0 ? '#afeaed' : '#97ebf0', borderColor: 'black' }}>
      <Grid container style={gridContainerStyle}>
        <Grid item >
          <Button startIcon={<DownloadIcon />} onClick={() => {raiseInvoiceClicked(data?.generateUrl)}}/>
        </Grid>
        <Grid item >
          <FileNameFormatter filename={filename} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FileItem;
