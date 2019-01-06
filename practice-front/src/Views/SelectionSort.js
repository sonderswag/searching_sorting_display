import React, { Component } from 'react';
import Array from '../Components/Array';
import styled from 'styled-components';
import Colors from '../Colors';
import Sort from '../Algortihms/SelectionSort';

const Button = styled.div`
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 30px;
  border: 2px solid ${Colors.green};
  user-select: none;
  :hover {
    text-decoration: none;  
    color: ${Colors.lightGrey}80;
    background-color: ${Colors.lightGrey}30;
    border-bottom: solid 2px ${Colors.blue};
  }
  :visited:active,
  :active {
    background-color: ${Colors.lightGrey}80;
  }
`

export default class SelectionSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [5, 3, 11, 2, 4, 5],
      plainData: [5, 3, 11, 2, 4, 5], // this should be temp until I get the input sorted out
      highlight: {},
      styleByIndex: {},
      sorted: false,
    };
    this.sortedStyle = {border: `1px solid red`};
    this.count = 0;
    this.playInterval = undefined;
  }

  componentDidMount() {
    this.sort = Sort(this.state.data);
  }

  handlePlay = () => {
    this.playInterval = setInterval(this.handleNext, 1000);
  }

  handleStop = () => {
    clearInterval(this.playInterval);
  }

  handleReset = () => {
    const { plainData } = this.state;
    this.sort = Sort(this.state.data);
    this.count = 0;
    this.setState({ highlight: {}, styleByIndex: {}, data: plainData, sorted: false });
  }

  handleNext = () => {
    const { data, styleByIndex } = this.state;
    const results = this.sort.next();
    const { search } = results.value;
    const { array } = results.value;
    const newHighlights = {}
    // console.log(results.done);
    // console.log(search, array);
    // check to see if the array has been re-ordered
    if (array.edit) {
      const newIndex = Object.assign(styleByIndex);
      newIndex[data.length - 1 - this.count] = this.sortedStyle;
      this.count += 1;
      this.setState({ data: array.sortedArray, styleByIndex: newIndex });
    } else {
      newHighlights[search.value.currentIndex] = Colors.lightGrey;
      newHighlights[search.value.smallest.index] = Colors.green;
    }

    if (results.done) {
      clearInterval(this.playInterval);
    }

    this.setState({ highlight: newHighlights, sorted: results.done });
  }

  render() {
    const { data, highlight, styleByIndex, sorted } = this.state;
    return (
      <React.Fragment>
        { !sorted && <Button onClick={this.handleNext}> Next </Button> }
        { !sorted && <Button onClick={this.handlePlay}> Play </Button> }
        { this.playInterval && <Button onClick={this.handleStop}> Stop </Button> }
        
        <Button onClick={this.handleReset}> Reset </Button>
        <Array data={data} highlight={highlight} styleByIndex={styleByIndex} />
      </React.Fragment>
    );
  }
}
