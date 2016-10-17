import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import ProfileSource from 'sources/profile';
import ApplicationActions from 'actions/application';
import appHistory from 'services/history';
import { paths } from 'helpers/routes';

@createActions(Alt)
export default class ProfileActions {
  load() {
    return ProfileSource.load().then(response => {
      if (response.status == 200) {
        this.loaded(response);
      } else {
        this.loadFailed(response);
      }
    });
  }

  loaded(response) {
    return (dispatch) => {
      response.json().then(json => { dispatch(json); });
    };
  }

  loadFailed(response) {
    appHistory.push(paths.home());
    return response;
  }

  reset() {
    return {};
  }

  update(profile) {
    return ProfileSource.update(profile).then(response => {
      if (response.status == 200) {
        this.updated(response);
      } else {
        this.notUpdated(response);
      }
    });
  }

  updated(response) {
    return (dispatch) => {
      response.json().then(json => dispatch(json));
    };
  }

  notUpdated(response) {
    return (dispatch) => {
      response.json().then(json => dispatch(json));
    };
  }

  setValue(name, value) {
    return { name, value };
  }
}
