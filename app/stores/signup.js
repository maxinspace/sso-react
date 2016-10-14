import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import SignupActions from 'actions/signup';
import ApplicationActions from 'actions/application';

@createStore(Alt)
export default class SignupStore {
  static displayName = 'SignupStore'

  defaultProps = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  constructor() {
    this.user = Object.assign({}, this.defaultProps);
    this.errorMessages = [];

    this.bindListeners({
      setValue: SignupActions.SET_VALUE,
      handleSignupFailed: SignupActions.SIGNUP_FAILED,
      reset: ApplicationActions.CLOSE_MODAL
    });
  }

  setValue(obj) {
    this.user[obj.name] = obj.value;
  }

  reset() {
    this.user = Object.assign({}, this.defaultProps);
    this.errorMessages = [];
  }

  handleSignupFailed(json) {
    const validations = json['rails_api_format/error']['validations'];

    for (const attribute in validations) {
      for (const message of validations[attribute]) {
        this.errorMessages.push(`${attribute} ${message}`);
      }
    }
  }
}
