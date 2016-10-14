import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import SigninSource from 'sources/signin';
import SessionActions from 'actions/session';

@createActions(Alt)
export default class SigninActions {
  perform(user) {
    return SigninSource.perform(user).then(response => {
      if (response.status == 201) {
        this.signedIn(response);
      } else {
        this.notSignedIn(response);
      };
    });
  }

  signedIn(response) {
    SessionActions.create(response);

    return response;
  }

  notSignedIn(response) {
    return (dispatch) => {
      response.json().then(json => { dispatch(json); });
    };
  }

  setValue(name, value) {
    return { name, value };
  }
}
