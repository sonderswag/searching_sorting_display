import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../Colors'
import colors from '../Colors';

const Container = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  margin: auto;
  width: 80%;
`;

const ItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 30px; 
  padding: 10px;
  border: 1px solid ${Colors.green};
  transform: skewX(-45deg);
  & > * {
    transform: skewX(45deg);
  }
  background-color: ${props => props.background};
`;

ItemBox.defaultProps = {
  background: 'none',
}
// given an array of data create a list of data
export default function Array(props) {
  const { data, highlight, styleByIndex } = props; // need the old data in order to determine if there was a change

  // highlight is a list of object describing which index to highlight and the color
  const createBlocks = () => {
    return data.map((item, index) => {
      return (
        <ItemBox
          key={`Array-${item}-${index}`}
          background={highlight[index]}
          style={styleByIndex[index]}
        >
          <span>
            {item}
          </span>
        </ItemBox>
      );
    });
  };

  return (
    <Container>
      {createBlocks()}
    </Container>
  );
}

Array.defaultProps = {
  highlight: {},
  styleByIndex: {},
}

Array.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
}