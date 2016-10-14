import config from 'config';
import requestAuth from 'lib/requestAuth';

export default class ProfileSource {
  static url = `${config.apiTarget}/v1/user`;

  static load() {
    return requestAuth(this.url, { method: 'GET' });
  }

  static update(profile) {
    return requestAuth(this.url, { method: 'PUT', body: JSON.stringify(profile) });
  }
}
