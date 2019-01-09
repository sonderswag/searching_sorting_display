import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from './Slider';
import Array from '../Components/Array';
import Button from '../Components/Button';
import Colors from '../Colors';
import Sort from '../Algortihms/SelectionSort';

const PageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 1000px;
  height: 100%;
  margin: auto;
  border: 1px solid ${Colors.contentBackground}40;
  margin-top: 20px;
`;

const ContentContainer = styled.div`
  display: flex; 
  flex-direction: column;
`


const Row = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  margin-bottom: 30px;
`;

const Input = styled.input`
  height: 38px;
  width: 400px;
  font-size: 18px;
  transform: skewX(35deg);
  background: none;
  color: white;
  border: none;
  outline: none;
  :focus {
    font-size: 20px;
  }
  transition: font-size 100ms ease-in-out;
`;

const InputContainer = styled.div`
  transform: skewX(-35deg);
  padding-left: 15px;
  background-color: red;
  width: 420px;
  height: 40px;
  background: none;
  border: 3px solid ${Colors.green};
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  color: white;
  margin-right: 25px;
`
const SectionLabel = styled(Label)`
  margin-bottom: 40px;
`
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
      speed: 1000,
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

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ plainData: event.target.value, });
  }

  sliderChange = (event, value) => {
    this.setState({ speed: value });
  }

  render() {
    const {
      dataObj,
      highlight,
      styleByIndex,
      sorted,
      playing,
      plainData,
      speed,
    } = this.state;
   
    return (
      <PageContainer>
        <ContentContainer>
          <SectionLabel>
            Algorithm Step Through
          </SectionLabel>
          <Row>
            <Label style={{fontSize: '25px'}}>
              Array Input
            </Label>
            <InputContainer>
              <Input 
                id="array-input"
                value={plainData}
                onChange={this.onInputChange}
              />
            </InputContainer>
            <Button style={{marginLeft: '25px', width: '200px'}} onClick={this.handlePlay}> Random Array </Button>
          </Row>
          <Slider />


          <Row style={{justifyContent: 'space-between', position: 'relative', left: '15px'}}>
            { !sorted && <Button onClick={this.handleNext}> Step </Button> }
            { !playing ? 
              <Button onClick={this.handlePlay}> Play </Button>
              :
              <Button onClick={this.handleStop}> Stop </Button>
            }
            
            <Button onClick={this.handleReset}> Reset </Button>
          </Row>
          <Array data={dataObj} highlight={highlight} styleByIndex={styleByIndex} />
        </ContentContainer>
      </PageContainer>
    );
  }
}
