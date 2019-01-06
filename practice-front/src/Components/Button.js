import styled from 'styled-components';
import React from 'react'
import Colors from '../Colors';

const ButtonStyle = styled.div`
  display: flex;
  color: white;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  border: 2px solid ${props => props.color};
  user-select: none;

  transform: skewX(-35deg);
  & > * {
    transform: skewX(35deg);
  }

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

ButtonStyle.defaultProps = {
  color: Colors.green,
}

export default function Button(props) {

  return (
    <ButtonStyle {...props}>
      <span>
        {props.children}
      </span>
    </ButtonStyle>
  )
}

