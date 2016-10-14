import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import { paths } from 'helpers/routes';
import Session from 'services/session';
import SessionActions from 'actions/session';

@createStore(Alt)
export default class NavigationLeftStore {
  static displayName = 'NavigationLeftStore'

  defaultLinks = [
    { title: 'Home', route: paths.home() }
  ]
  loggedInLinks = [
    { title: 'Profile', route: paths.profile() }
  ]

  constructor() {
    this.links = this.defaultLinks;

    if (Session.loggedIn()) {
      this.links = this.links.concat(this.loggedInLinks);
    }

    this.bindListeners({
      handleSessionCreate: SessionActions.CREATE,
      handleSessionDelete: SessionActions.DELETE
    });
  }

  handleSessionCreate() {
    this.links = this.defaultLinks.concat(this.loggedInLinks);
  }

  handleSessionDelete() {
    this.links = this.defaultLinks;
  }
}
