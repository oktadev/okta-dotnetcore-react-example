import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class ProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      user: null,
      sessions: [] 
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async getCurrentUser(){
    this.props.auth.getUser()
      .then(user => this.setState({user}));
  }

  async getUsersSessions(){
    fetch('/api/sessions', {
      headers: {
        Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
      }
    })
    .then(rsp => rsp.json())
    .then(sessions => {
      this.setState({sessions});
    })
    .catch(err => {
      console.error(err);
    });
  }

  componentDidMount(){
    this.getCurrentUser();
    this.getUsersSessions();
  }

  render() {
    if(!this.state.user) return null;
    return (
      <section className="user-profile">
        <h1>User Profile</h1>
        <div>
          <label>Name:</label>
          <span>{this.state.user.name}</span>
        </div>
        <ul>
          {this.state.sessions.map(session => <li key={session.sessionId}>{session.title}</li>)}
        </ul>
        <Link to="/submission" className="btn btn-primary">Submit A Session</Link>
      </section>

    )
  }
});