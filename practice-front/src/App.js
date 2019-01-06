import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import Nav from './NavigationBar/Nav';
import SelectionSort from './Views/SelectionSort';
import Colors from './Colors';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 100%;
  margin: auto;
  border: 1px solid ${Colors.contentBackground};
  margin-top: 20px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.something = 'something';
  }

  render() {
    return (
      <React.Fragment>
        <Nav />
        <PageContainer>
          <SelectionSort />
        </PageContainer>
      </React.Fragment>
    );
  }
}

export default App;
