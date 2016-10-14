import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import SignoutSource from 'sources/signout';
import config from 'config';
import Storage from 'lib/storage';
import appHistory from 'services/history';
import { paths } from 'helpers/routes';
import ApplicationActions from 'actions/application';

const STORAGE_KEY = config.storageKey;

@createActions(Alt)
export default class SessionActions {
  create(response) {
    return (dispatch) => {
      response.json().then(json => {
        const { user } = json;

        dispatch(user);

        Storage.set(STORAGE_KEY, user);
        ApplicationActions.closeModal();
        appHistory.push(paths.profile());
      });
    };
  }

  delete(user) {
    SignoutSource.perform(user);
    Storage.remove(STORAGE_KEY);
    appHistory.push(paths.home());

    return user;
  }
}
