import React, { Component } from 'react';
import Table from './components/table/table';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h3>Drag Drop Supported in the Status Column. Use alt key to do change everything in between </h3>
        </header>
        <Table/>
      </div>
    );
  }
}

export default App;
