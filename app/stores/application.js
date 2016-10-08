import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import ApplicationActions from 'actions/application';
import GoogleAuthActions from 'actions/google_auth';

@createStore(Alt)
export default class ApplicationStore {
  static displayName = 'ApplicationStore'

  constructor() {
    this.isModalOpen = false;
    this.modalName = '';
    this.modalOptions = {};

    this.bindListeners({
      openModal: ApplicationActions.OPEN_MODAL,
      closeModal: ApplicationActions.CLOSE_MODAL,
      handleGoogleAuth: GoogleAuthActions.CREATE
    });
  }

  openModal({ name, ...rest }) {
    this.isModalOpen = true;
    this.modalName = name;
    this.modalOptions = { ...rest };
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalName = '';
  }

  handleGoogleAuth() {
    this.closeModal();
  }
}
