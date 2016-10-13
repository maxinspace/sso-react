import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import Home from 'components/home';
import session from 'services/session';

@connectToStores
export default class Main extends Component {
  static getStores(props) {
    return [session.store()];
  }

  static getPropsFromStores(props) {
    return session.store().getState();
  }

  render() {
    return <Home/>;
  }
}
