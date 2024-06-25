import './App.css';
import React, { FC } from 'react';
import RecordList from './components/RecordsList';


const App: FC = () => {
  return (
    <div className="App">
      <RecordList />
    </div>
  );
}

export default App;
