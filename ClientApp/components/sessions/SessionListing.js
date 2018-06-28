import React from 'react';
import { withAuth } from '@okta/okta-react';

import Session from './Session';

export default withAuth(class SessionListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sessions: [] }
  }

  async getUsersSessions() {
    fetch('/api/sessions', {
      headers: {
        Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
      }
    })
    .then(rsp => rsp.json())
    .then(sessions => {
      this.setState({ sessions });
    })
    .catch(err => {
      console.error(err);
    });
  }

  async deleteSession(session){
    fetch(`/api/sessions/${session.sessionId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
      }
    })
    .then(rsp => {
      if(rsp.status === 200){
        this.getUsersSessions();
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  componentDidMount() {
    this.getUsersSessions();
  }

  render() {
    return (
      <ul className="session-list">
        {this.state.sessions.map(session => 
          <Session key={session.sessionId} 
            id={session.sessionId}
            isOwner={session.userId === this.props.userId}
            delete={this.deleteSession.bind(this, session)} 
            session={session} />)}
      </ul>
    )
  }

})