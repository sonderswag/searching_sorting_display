import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import Nav from './NavigationBar/Nav';
import SelectionSort from './Views/SelectionSort';
import Colors from './Colors';


class App extends Component {
  constructor(props) {
    super(props);
    this.something = 'something';
  }

  render() {
    return (
      <React.Fragment>
        <Nav />
          <SelectionSort />
      </React.Fragment>
    );
  }
}

export default App;
