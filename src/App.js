import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormattedMessage } from 'react-intl';
import ListaPeliculas from './components/ListaPeliculas';

function App() {

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary">

        <h5><FormattedMessage id="Navbar" /></h5>
      </nav>
      <ListaPeliculas />
    </div>
  );
}

export default App;
