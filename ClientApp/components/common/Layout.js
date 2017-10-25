import React from 'react';

import Navigation from './Navigation';

export default class Layout extends React.Component {
  render() {
    return (
      <section>
        <Navigation />
        <section className="container">
          {this.props.children}
        </section>
      </section>
    );
  }
}