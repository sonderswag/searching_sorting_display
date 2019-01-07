import React, { Component } from 'react';
import styled from 'styled-components';
import Array from '../Components/Array';
import Button from '../Components/Button';
import Colors from '../Colors';
import Sort from '../Algortihms/SelectionSort';

const Row = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-between;
  margin: auto;
`;

export default class SelectionSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataObj: {},
      plainData: [2, 3, 11, 1, 4, 5], // this should be temp until I get the input sorted out
      highlight: {},
      styleByIndex: {},
      sorted: false,
      playing: false,
    };
    this.sortedStyle = {border: `1px solid red`};
    this.playInterval = undefined;
  }

  componentWillMount() {
    const { plainData } = this.state;
    this.sort = Sort(this.createDataObj(plainData));
    this.setState({ dataObj: this.createDataObj(plainData) });
  }

  createDataObj = (arr) => {
    return arr.map((item, index) => ({value: item, id: `${item}-${index}`}))
  } 

  handlePlay = () => {
    this.playInterval = setInterval(this.handleNext, 700);
    this.setState({ playing: true });
  }

  handleStop = () => {
    clearInterval(this.playInterval);
    this.setState({ playing: false });
  }

  handleReset = () => {
    const { plainData } = this.state;
    this.sort = Sort(this.createDataObj(plainData));
    this.setState({ highlight: {}, styleByIndex: {}, dataObj: this.createDataObj(plainData), sorted: false });
  }

  handleNext = () => {
    const { dataObj, styleByIndex } = this.state;
    const results = this.sort.next();
    const { search } = results.value;
    const { array } = results.value;
    const newHighlights = {}
    // console.log(results.done);
    console.log(search, array);
    // check to see if the array has been re-ordered
    if (array.edit) {
      this.setState({ dataObj: array.sortedArray});
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
    const {
      dataObj,
      highlight,
      styleByIndex,
      sorted,
      playing,
    } = this.state;
    return (
      <React.Fragment>
        <Row>
          { !sorted && <Button onClick={this.handleNext}> Step </Button> }
          { !playing ? 
            <Button onClick={this.handlePlay}> Play </Button>
            :
            <Button onClick={this.handleStop}> Stop </Button>
          }
          
          <Button onClick={this.handleReset}> Reset </Button>
        </Row>
        <Array data={dataObj} highlight={highlight} styleByIndex={styleByIndex} />
      </React.Fragment>
    );
  }
}
