import React, { FC } from 'react';
import WorldStats from './components/WorldStats';
import CountryStats from './components/CountryStats';
import Header from './components/Header';

const App: FC = () => {
  return (
    <div className="App md:flex md:justify-center md:items-center min-h-screen p-4">
      <div className="md:w-6/12">
        <Header/>
        <CountryStats />
        <WorldStats />
      </div>
    </div>
  )
}

export default App;
