import config from 'config';
import request from 'lib/request';
import requestAuth from 'lib/requestAuth';

export default class GoogleAuthSource {
  static oauthCallbackUrl = `${config.apiTarget}/v1/users/auth/google_oauth2/callback`;
  static oathDeleteUrl = `${config.apiTarget}/v1/identities/google_oauth2`;

  static authenticate(callback) {
    return this._googleAuthenticate((googleAuthenticateResponse) => {
      delete googleAuthenticateResponse["g-oauth-window"];
      const response = this._backendAuthenticate(googleAuthenticateResponse);

      callback(response);
    });
  }

  static connect(callback) {
    return this._googleAuthenticate((authenticateResponse) => {
      delete authenticateResponse["g-oauth-window"];
      const response = this._authFromBackend(authenticateResponse);

      callback(response);
    });
  }

  static delete() {
    return requestAuth(this.oathDeleteUrl, {
      method: 'DELETE'
    });
  }

  static _googleAuthenticate(callback) {
    return gapi.auth.authorize({
      immediate: false,
      response_type: 'code',
      cookie_policy: 'single_host_origin',
      client_id: config.googleClientId,
      scope: 'email profile'
    }, callback);
  }

  static _backendAuthenticate(googleAuthenticateResponse) {
    return request(this.oauthCallbackUrl, {
      method: 'POST',
      body: JSON.stringify(googleAuthenticateResponse)
    });
  }

  static _authFromBackend(googleAuthenticateResponse) {
    return requestAuth(this.oauthCallbackUrl, {
      method: 'POST',
      body: JSON.stringify(googleAuthenticateResponse)
    });
  }
}
