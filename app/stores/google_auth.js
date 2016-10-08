import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import GoogleAuthActions from 'actions/google_auth';

@createStore(Alt)
export default class GoogleAuthStore {
  static displayName = 'GoogleAuthStore';

  constructor() {
    this.bindListeners({
      create: GoogleAuthActions.CREATE
    });
  }

  create(data) {
    console.log(data);
  }
}
