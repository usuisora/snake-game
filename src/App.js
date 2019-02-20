import React, { Component } from 'react';

import './App.css';
import Game from './components/Game';

class App extends Component {
  render() {
    return (
     
      <div className="App">
      <h3>slime</h3>
       <Game/>
      </div>
    );
  }
}

export default App;
