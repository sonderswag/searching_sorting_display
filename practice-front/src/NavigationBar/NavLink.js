import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colors from '../Colors';

// style of the link text
const Text = styled.span`
  padding: 0px 20px 0px 20px;
  transform: skewX(35deg);
`;

// style of the container for the link
export const NavLinkStyle = styled.a`
  display: flex;
  align-items: center;
  /* padding: 0 10px 0 10px; */
  color: ${Colors.lightGrey};
  user-select: none;
  font-size: 16px;
  
  ${props => (!props.active ? ''
    : 'background: rgb(117,197,207);')}
  ${props => (!props.active ? ''
    : `background: linear-gradient(0deg, ${Colors.blue} 0%, ${Colors.blue}10 7%, rgba(34,34,34,1) 100%);`)}
  
  border-bottom: ${props => (props.active === true ? `solid 2px ${Colors.blue}` : 'none')};
  border-right: 2px solid ${Colors.blue}B0;
  /* this adds the angle to NavLinks*/
  transform: skewX(-35deg);

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
`;

class NavLink extends Component {
  handleClick = (e, history) => {
    const { onClick, to } = this.props;
    history.push(to);
    onClick(e);
  }

  render() {
    const { children, to } = this.props;
    // Route wrapper allows for access to history and location
    return (
      <Route render={({ history, location }) => (
        <NavLinkStyle
          active={location.pathname === to}
          onClick={e => this.handleClick(e, history, location)}
        >
          <Text>
            {children}
          </Text>
        </NavLinkStyle>
      )}
      />
    );
  }
}

NavLink.defaultProps = {
  onClick: () => {},
  to: '/',

};

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string, // route to link to
  onClick: PropTypes.func, // function to fire when clicked
};

export default NavLink;
