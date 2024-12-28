import React from 'react';
import SearchForm from './components/SearchForm';

import Navbar from './components/navbar';
import './App.css';

function App() {
  return (
      <div className="container">
        <Navbar />
        <SearchForm/>
        
      </div>
  );
}

export default App;
