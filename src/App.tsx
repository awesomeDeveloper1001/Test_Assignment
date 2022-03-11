import React from 'react';

import Header from './components/Header';
import CryptoConverterBox from './components/CrytoConverterBox';

import './App.scss';

function App() {
  return (
    <main className="App container">
      <Header />
      <section className="App-content m-4">
        <CryptoConverterBox />
      </section>
    </main>
  );
}

export default App;
