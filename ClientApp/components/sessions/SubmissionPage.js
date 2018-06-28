import React from 'react';
import { withRouter } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

class SubmissionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      abstract: '',
      submitted: false
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAbstractChange = this.handleAbstractChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleAbstractChange(e) {
    this.setState({ abstract: e.target.value });
  }

  async handleSubmit(e){
    e.preventDefault();
    fetch('/api/sessions', {
      body: JSON.stringify(this.state),
      cache: 'no-cache',
      headers: {
        'content-type':'application/json',
        Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
      },
      method: 'POST'
    })
    .then(rsp => {
      if(rsp.status === 201){
        this.props.history.push('/profile');
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  render(){
    if(this.state.submitted === true){
      <Redirect to="/profile"/>
    }
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-element">
          <label>Title:</label>
          <input
            id="title" type="text"
            value={this.state.title}
            onChange={this.handleTitleChange} />
        </div>
        <div className="form-element">
          <label>Abstract:</label>
          <textarea
            id="abstract"
            cols="100"
            rows="10"
            value={this.state.abstract}
            onChange={this.handleAbstractChange} />
        </div>
        <div className="form-actions">
          <input id="submit" type="submit" value="Submit Session"/>
        </div>
      </form>
    );
  }

};

export default withAuth(withRouter(SubmissionPage));