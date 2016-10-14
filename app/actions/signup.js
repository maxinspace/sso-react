import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import SignupSource from 'sources/signup';
import ApplicationActions from 'actions/application';

@createActions(Alt)
export default class SignupActions {
  setValue(name, value) {
    return { name, value };
  }

  perform(user) {
    return SignupSource.create(user).then(response => {
      if (response.status == 201) {
        this.signedUp(response);
      } else {
        this.notSignedUp(response);
      };
    });
  }

  signedUp(response) {
    ApplicationActions.closeModal();

    return response;
  }

  notSignedUp(response) {
    return (dispatch) => {
      response.json().then(json => dispatch(json));
    };
  }
}
