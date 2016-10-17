import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import SigninActions from 'actions/signin';
import ApplicationActions from 'actions/application';

@createStore(Alt)
export default class SigninStore {
  static displayName = 'SigninStore'

  defaultProps = {
    email: '',
    password: ''
  }

  constructor() {
    this.user = Object.assign({}, this.defaultProps);

    this.bindListeners({
      setValue: SigninActions.SET_VALUE,
      handleSigninFailed: SigninActions.NOT_SIGNED_IN,
      reset: ApplicationActions.CLOSE_MODAL
    });
  }

  setValue(obj) {
    this.user[obj.name] = obj.value;
  }

  reset() {
    this.user = Object.assign({}, this.defaultProps);
  }

  handleSigninFailed(json) {
    this.errorMessage = json.error.error;
  }
}
