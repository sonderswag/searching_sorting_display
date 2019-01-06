import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Colors from '../Colors';
import NavLink from './NavLink';

// container to account for the fixed positioning of the NavBar
const NavContainer = styled.div`
  height: 55px;
`;

// Display Container for the bar
const NavBar = styled.div`
  display: flex;
  position: fixed;
  z-index: 1;
  width: 150%;
  height: 55px;
  justify-content: flex-start;
  align-items: center;  
  background-color: ${Colors.darkGrey};
`;

// Display the logo in the left hand corner
const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    opacity: .8;
  }
`;

// Display the title of the page in the left hand corner
const Title = styled.h1`
  margin: 0px;
  margin-left: 10px;
  font-size: 20px;
  color: ${Colors.blue};
  user-select: none;
`;

// Handle the display for the un-order list of links
const NavList = styled.ul`
display: flex;
height: 100%;
margin: 0 20px 0 20px;
list-style-type: none;
& > li {
  display: flex;
  cursor: pointer;
  margin-right: 2px;
}
& > li:last-of-type {
  margin-right: 0px;
}
`;

// TODO: turn into a generic component that accepts props
/**
 * Functional component to render a nav bar.
 * Must use NavList and NavLink in order to be functional and styled properly
 * @export
 * @returns
 */
export default function Nav() {
  return (
    <Route render={({ history }) => (
      <NavContainer>
        <NavBar>
          <Logo onClick={() => history.push('/')}>
            <Title>Let's Have Some Fun</Title>
          </Logo>
          <NavList>
            <li>
              <NavLink to="/">QuickSort</NavLink>
            </li>
            <li>
              <NavLink to="/stem">BubbleSort</NavLink>
            </li>
          </NavList>
        </NavBar>
      </NavContainer>
    )}
    />
  );
}
