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

  componentDidMount() {
    this.getUsersSessions();
  }

  render() {
    return (
      <ul className="session-list">
        {this.state.sessions.map(session => <Session key={session.sessionId} id={session.sessionId} session={session} />)}
      </ul>
    )
  }

})