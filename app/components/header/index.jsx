import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import NavigationLeft from 'components/navigation/left';
import NavigationRight from 'components/navigation/right';

export default class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            React Oauth
          </Navbar.Brand>
        </Navbar.Header>
        <NavigationLeft/>
        <NavigationRight/>
      </Navbar>
    );
  }
}
