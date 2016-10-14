import config from 'config';
import request from 'lib/request';

export default class SignupSource {
  static url = `${config.apiTarget}/v1/users/sign_up`;

  static create(user) {
    return request(this.url, { method: 'POST', body: JSON.stringify(user) });
  }
}
