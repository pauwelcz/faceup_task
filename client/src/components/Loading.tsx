import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading: FC = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }}>
      <CircularProgress />
    </div>
  );
};

export default Loading;