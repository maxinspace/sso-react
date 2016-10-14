import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import GoogleAuthSource from 'sources/googleAuth';
import SessionActions from 'actions/session';
import ProfileActions from 'actions/profile';

@createActions(Alt)
export default class GoogleAuthActions {
  authenticate() {
    return GoogleAuthSource.authenticate((promise) => {
      promise.then(response => {
        if (response.status == 201) {
          this.authenticateSuccess(response);
        } else {
          this.authenticateFail(response);
        }
      });
    });
  }

  authenticateSuccess(response) {
    SessionActions.create(response);

    return response;
  }

  authenticateFail(response) {
    return (dispatch) => {
      response.json().then(json => {
        dispatch(json);
      });
    };
  }

  connect() {
    return (dispatch) => {
      GoogleAuthSource.connect((promise) => {
        promise.then(response => {
          if (response.status == 201) {
            this.connected(response);
          }
        });
      });
    };
  }

  connected(response) {
    ProfileActions.loaded(response);
    return response;
  }

  delete() {
    return (dispatch) => {
      GoogleAuthSource.delete().then(response => {
        ProfileActions.loaded(response);
        dispatch(response);
      });
    };
  }
}
