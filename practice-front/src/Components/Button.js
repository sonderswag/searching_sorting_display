import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


// The `withStyles()` higher-order component is injecting a `classes`
// property that is used by the `Button` component.
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 2,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    transform: 'skewX(-35deg)'
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const Text = styled.span`
  transform: skewX(35deg);
`


export default function StyledComp(props) {
  return (
    <StyledButton {...props}>
      <Text>
        {props.children}
      </Text>
    </StyledButton>
  )
}
