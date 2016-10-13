import 'stylesheets/application';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import appHistory from 'services/history';
import { requireAuth } from 'helpers/routes';
import Application from 'components/application';
import Main from 'components/main';

render((
  <Router history={ appHistory }>
    <Route component={ Application }>
      <Route path="/" component={ Main }/>
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
), document.getElementById('app'));
