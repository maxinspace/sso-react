import config from 'config';
import request from 'lib/request';

export default class GoogleAuthSource {
  static url = `${config.apiTarget}/users/auth/google_oauth2/callback`;

  static create(callback) {
    return this.authorize((response) => {
      delete response["g-oauth-window"];

      if (response && !response.error) {
        const result = request(this.url, {
          method: 'POST',
          body: JSON.stringify(response)
        })
        .then(result => result.json());

        callback(result);
      }
    });
  }

  static authorize(callback) {
    return gapi.auth.authorize({
      immediate: false,
      response_type: 'code',
      cookie_policy: 'single_host_origin',
      client_id: '268133722716-6ns7scj1s107eco5bqskvldns66hdisa.apps.googleusercontent.com',
      scope: 'email profile'
    }, callback);
  }
}
