import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import ProfileActions from 'actions/profile';

@createStore(Alt)
export default class ProfileStore {
  static displayName = 'ProfileStore'

  constructor() {
    this.profile = {};
    this.errorMessages = [];

    this.bindListeners({
      saveProfile: [ProfileActions.LOADED, ProfileActions.UPDATED],
      reset: [ProfileActions.RESET, ProfileActions.LOAD_FAILED],
      setValue: ProfileActions.SET_VALUE,
      handleUpdateFailed: ProfileActions.UPDATE_FAILED
    });
  }

  saveProfile(json) {
    this.profile = this._profile(json.user);
    this.errorMessages = [];
  }

  reset() {
    this.profile = {};
    this.errorMessages = [];
  }

  setValue(obj) {
    this.profile[obj.name] = obj.value;
  }

  handleUpdateFailed(json) {
    this.errorMessages = [];

    const validations = json['rails_api_format/error']['validations'];

    for (const attribute in validations) {
      for (const message of validations[attribute]) {
        this.errorMessages.push(`${attribute} ${message}`);
      }
    }
  }

  _profile(user) {
    user['current_password'] = '';

    return user;
  }
}
