import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import googleAuthSource from 'sources/google_auth';

@createActions(Alt)
export default class GoogleAuthActions {
  create() {
    return (dispatch) => {
      googleAuthSource.create((promise) => {
        promise.then(result => {
          dispatch(result);
        });
      });
    }
  }
}
