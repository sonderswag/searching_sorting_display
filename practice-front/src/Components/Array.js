import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Colors from '../Colors'
import colors from '../Colors';

const Container = styled(TransitionGroup)`
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
  transform: skewX(-35deg);
  & > * {
    transform: skewX(35deg);
  }
  background-color: ${props => props.background};
  transition: all .2s ease-out;
  ${props => props.sorted ? 'border-color: red;' : ''}
`;

ItemBox.defaultProps = {
  background: 'none',
}

const Item = styled.span`
  color: white;
`;

const Fade = styled(CSSTransition)`
  /* &.fade-appear {
    opacity: 0.1;
    transform: translateX(10px) scaleX(.5);
  }

  &.fade-appear.fade-appear-active{
    opacity: 1;
    transform: translateX(0px) scaleX(1);
    transition: all 1000ms ease-in;
  } */

  &.fade-enter {
    opacity: 0.1;
    width: 10px;
    transform: translateX(40px) skewX(-35deg);
  }

  &.fade-enter.fade-enter-active {
    opacity: 1;
    transform: translateX(0px) skewX(-35deg);
    width: 70px;
    transition: all 500ms ease-in;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit.fade-exit-active {
    opacity: 0.1;
    width: 0px;
    transition: all 500ms ease-out;
  }
`;



// given an array of data create a list of data
export default function Array(props) {
  const { data, highlight, styleByIndex } = props; // need the old data in order to determine if there was a change

  // highlight is a list of object describing which index to highlight and the color
  const createBlocks = () => {
    return data.map((item, index) => {
      return (
        <Fade
          key={item.id} // these idea need to be unique for the array element.
          timeout={500}
          classNames="fade"
        >
          <ItemBox
            key={`Array-${item.id}`}
            background={highlight[index]}
            style={styleByIndex[index]}
            sorted={item.sorted}
          >
            <Item>
              {item.value}
            </Item>
          </ItemBox>
        </Fade>
      );
    });
  };

  return (
    <Container className="todo-list">
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