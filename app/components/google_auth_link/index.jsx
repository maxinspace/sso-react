import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'
import GoogleAuthActions from 'actions/google_auth'
import GoogleAuthStore from 'stores/google_auth'

@connectToStores
export default class GoogleAuthLink extends React.Component {
  static getStores(props) {
    return [GoogleAuthStore];
  }

  static getPropsFromStores(props) {
    return GoogleAuthStore.getState();
  }

  authenticate(event) {
    event.preventDefault();

    GoogleAuthActions.create();
  }

  render() {
    return (
      <a onClick={ this.authenticate }>Sign in using Google</a>
    )
  }
}
