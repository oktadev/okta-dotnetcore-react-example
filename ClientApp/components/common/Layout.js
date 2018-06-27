import React from 'react';

import './Layout.css';
import Navigation from './Navigation';

export default class Layout extends React.Component {
  render() {
    return (
      <section>
        <Navigation />
        <section className="content container">
          {this.props.children}
        </section>
      </section>
    );
  }
}