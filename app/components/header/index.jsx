import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import NavigationLeft from 'components/navigation/left';
import NavigationRight from 'components/navigation/right';
import { paths } from 'helpers/routes';

export default class Header extends Component {
  render() {
    const links = [
      { title: 'Home', route: paths.home() }
    ];

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            React Oauth
          </Navbar.Brand>
        </Navbar.Header>
        <NavigationLeft items={ links }/>
        <NavigationRight/>
      </Navbar>
    );
  }
}
