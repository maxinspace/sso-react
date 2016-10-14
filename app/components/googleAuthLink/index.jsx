import React, { PropTypes } from 'react';
import GoogleAuthActions from 'actions/googleAuth';

export default class GoogleAuthLink extends React.Component {
  static propTypes = {
    connected: PropTypes.bool,
    userAuthenticated: PropTypes.bool
  }

  handleClick = (event) => {
    event.preventDefault();

    if (this.props.connected) {
      GoogleAuthActions.delete();
    } else if (this.props.userAuthenticated) {
      GoogleAuthActions.connect();
    } else {
      GoogleAuthActions.authenticate();
    }
  }

  buttonName() {
    let buttonName = "google_oauth2";

    if (this.props.connected) {
      buttonName += " google_oauth2--connected";
    }

    return buttonName;
  }

  render() {
    return (
      <a className={ this.buttonName() } onClick={ this.handleClick }/>
    );
  }
}
