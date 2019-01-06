import React from 'react';
import styled from 'styled-components';
import Colors from '../Colors'

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
  ${props => (props.change ? `background-color: ${Colors.green};` : '')}
`;
// given an array of data create a list of data
export default function Array(props) {
  const { data, oldData } = props; // need the old data in order to determine if there was a change

  const createBlocks = () => {
    let rtv;
    if (oldData === undefined) {
      rtv = data.map((item) => {
        return (
          <ItemBox>
            <span>
              {item}
            </span>
          </ItemBox>
        );
      });
    } else {
      rtv = data.map((item, index) => {
        return (
          <ItemBox change={item !== oldData[index]}>
            <span>
              {item}
            </span>
          </ItemBox>
        );
      });
    }
    return rtv;
  };

  return (
    <Container>
      {createBlocks()}
    </Container>
  );
}
