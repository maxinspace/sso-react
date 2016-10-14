import connectToStores from 'alt-utils/lib/connectToStores';
import React, { Component, PropTypes } from 'react';
import { Nav } from 'react-bootstrap';
import NavigationItem from 'components/navigation';
import NavigationLeftStore from 'stores/navigationLeft';

@connectToStores
export default class NavigationLeft extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        route: PropTypes.string,
        title: PropTypes.string
      })
    )
  }

  static getStores(props) {
    return [NavigationLeftStore];
  }

  static getPropsFromStores(props) {
    return NavigationLeftStore.getState();
  }

  renderLinks = () => {
    return this.props.links.map((item, index) => {
      return (
        <NavigationItem key={ index } item={ item }/>
      );
    });
  }

  render() {
    return (
      <Nav>
        { this.renderLinks() }
      </Nav>
    );
  }
}
