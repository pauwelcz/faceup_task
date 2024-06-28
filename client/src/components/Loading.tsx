import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading: FC = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: "#97ebf0"
    }}>
      <CircularProgress />
    </div>
  );
};

export default Loading;