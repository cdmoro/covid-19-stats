import React, { FC } from 'react';
import WorldStats from './components/WorldStats';
import CountryStats from './components/CountryStats';
import Header from './components/Header';
import GithubCorner from './components/GithubCorner';
import Footer from './components/Footer';

const App: FC = () => {
  return (
    <div className="App md:flex md:justify-center md:items-center min-h-screen p-4">
      <div className="md:w-10/12 lg:w-8/12">
        <Header/>
        <CountryStats />
        <WorldStats />
        <Footer />
      </div>
      <GithubCorner />
    </div>
  )
}

export default App;
