import React, { PropTypes } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert
} from 'react-bootstrap';
import ProfileStore from 'stores/profile';
import ProfileActions from 'actions/profile';
import styles from './styles';
import GoogleAuthLink from 'components/googleAuthLink';

@connectToStores
export default class Profile extends React.Component {
  static propTypes = {
    errorMessages: PropTypes.arrayOf(PropTypes.string),
    profile: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      bio: PropTypes.string,
      email: PropTypes.string,
      current_password: PropTypes.string,
      password: PropTypes.string,
      password_confirmation: PropTypes.string,
      identities: PropTypes.arrayOf(PropTypes.object)
    })
  }

  static getStores(props) {
    return [ProfileStore];
  }

  static getPropsFromStores(props) {
    return ProfileStore.getState();
  }

  componentDidMount() {
    ProfileActions.load();
  }

  componentWillUnmount() {
    ProfileActions.reset();
  }

  submit = (event) => {
    event.preventDefault();

    ProfileActions.update(this.props.profile);
  }

  setValue(event) {
    ProfileActions.setValue(event.target.name, event.target.value);
  }

  errorMessage() {
    if (this.props.errorMessages.length) {
      return (
        <Alert bsStyle="danger">
          <ul>
            { this.props.errorMessages.map((message, index) => {
              return <li key={ index }>{ message }</li>;
            }) }
          </ul>
        </Alert>
      );
    }
  }

  isLoading = () => {
    return !Object.keys(this.props.profile).length;
  }

  hasProvider = (provider) => {
    return this.props.profile.identities.map(identity => identity.provider).indexOf(provider) != -1;
  }

  render() {
    if (this.isLoading()) {
      return (
        <Grid>
          <Row className="show-grid">
            <Col md={ 3 } mdOffset={ 3 }>
              <h2>Loading...</h2>
            </Col>
          </Row>
        </Grid>
      );
    }

    return (
      <Grid>
        <Row className="show-grid">
          <Col md={ 3 } mdOffset={ 3 }>
            <h2>Profile</h2>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={ 6 } mdOffset={ 3 }>
            { this.errorMessage() }

            <form onSubmit={ this.submit }>
              <FormGroup controlId="first_name">
                <ControlLabel>First name</ControlLabel>
                <FormControl type="text" name="first_name"
                  value={ this.props.profile.first_name }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="last_name">
                <ControlLabel>Last name</ControlLabel>
                <FormControl type="text" name="last_name"
                  value={ this.props.profile.last_name }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="bio">
                <ControlLabel>Bio</ControlLabel>
                <FormControl componentClass="textarea" name="bio"
                  value={ this.props.profile.bio }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="email">
                <ControlLabel>Email</ControlLabel>
                <FormControl type="email" name="email"
                  value={ this.props.profile.email }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="current_password">
                <ControlLabel>Current password</ControlLabel>
                <FormControl type="password" name="current_password"
                  value={ this.props.profile.current_password }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password" name="password"
                  value={ this.props.profile.password }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="password_confirmation">
                <ControlLabel>Password Confirmation</ControlLabel>
                <FormControl type="password" name="password_confirmation"
                  value={ this.props.profile.password_confirmation }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <Button bsStyle="primary" type="submit">
                Save
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
