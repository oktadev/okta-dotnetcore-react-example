import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import config from './app.config';
import Layout from './components/common/Layout';
import HomePage from './components/home/HomePage';
import ContactPage from './components/contact/ContactPage';
import AboutPage from './components/about/AboutPage';
import NotesPage from './components/notes/NotesPage';
import RegisterPage from './components/auth/RegisterPage';
import ProfilePage from './components/auth/ProfilePage';
import LoginPage from './components/auth/LoginPage';


const onAuthRequired = ({ history }) => history.push('/login');

render(
  <BrowserRouter>
    <Security issuer={config.issuer}
      client_id={config.client_id}
      redirect_uri={config.redirect_uri}
      onAuthRequired={onAuthRequired}>
      <Layout>
        <Route exact path="/" component={HomePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/notes" component={NotesPage} />
        <Route path="/login" render={() => <LoginPage baseUrl={config.url} />} />
        <Route path="/implicit/callback" component={ImplicitCallback} />
        <Route path="/register" component={RegisterPage} />
        <SecureRoute path="/profile" component={ProfilePage} />
      </Layout>
    </Security>
  </BrowserRouter>,
  document.getElementById('app')
);