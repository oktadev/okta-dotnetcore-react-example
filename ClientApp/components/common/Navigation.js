import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.logout = this.logout.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  logout(){
    this.props.auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) return null;
    const authNav = this.state.authenticated ?
      <ul className="nav navbar-nav navbar-right">
        <li><a href="javascript:void(0)" onClick={this.logout}>Logout</a></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul> :
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>;

    return (
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">React App</Link>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/notes">Notes</Link></li>
            </ul>
            {authNav}
          </div>
        </div>
      </div>
    )
  }
})