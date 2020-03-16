import React, { FC } from 'react';
import WorldStats from './components/WorldStats';
import CountryStats from './components/CountryStats';
import Header from './components/Header';

const App: FC = () => {
  return (
    <div className="App flex flex-col md:justify-center items-center min-h-screen">
      <div className="w-screen md:w-6/12">
        <Header/>
        <CountryStats />
        <WorldStats />
      </div>
    </div>
  )
}

export default App;
