import React, { FC } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { Typography } from '@mui/material';

const SomethingWentWrong: FC = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: "#97ebf0"
    }}>
      <ErrorIcon />
      <Typography><strong>Oops, something went wrong.</strong></Typography>
    </div>
  );
};

export default SomethingWentWrong;