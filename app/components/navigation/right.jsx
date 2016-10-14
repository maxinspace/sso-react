import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import { Nav, NavItem } from 'react-bootstrap';
import ApplicationActions from 'actions/application';
import session from 'services/session';

@connectToStores
export default class NavigationRight extends Component {
  static getStores(props) {
    return [session.store()];
  }

  static getPropsFromStores(props) {
    return session.store().getState();
  }

  signin() {
    ApplicationActions.openModal({ name: 'signin' });
  }

  signup() {
    ApplicationActions.openModal({ name: 'signup' });
  }

  signout() {
    session.delete();
  }

  render() {
    if (session.loggedIn()) {
      return (
        <Nav pullRight>
          <NavItem onClick={ this.signout }>
            Sign out
          </NavItem>
        </Nav>
      );
    }

    return (
      <Nav pullRight>
        <NavItem onClick={ this.signup }>
          Sign up
        </NavItem>
        <NavItem onClick={ this.signin }>
          Sign in
        </NavItem>
      </Nav>
    );
  }
}
