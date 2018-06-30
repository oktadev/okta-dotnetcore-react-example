import React from 'react'; 
import { Redirect} from 'react-router-dom';
import { withAuth } from '@okta/okta-react';


export default withAuth(class RegisterPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      sessionToken: null,
      registered: false
    };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);    
  }

  async checkAuthentication() {
    const sessionToken = await this.props.auth.getIdToken();
    if (sessionToken) {
      this.setState({ sessionToken });
    }
  }

  handleFirstNameChange(e){
    this.setState({firstName:e.target.value});
  }
  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    fetch('/api/users', { 
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    }).then(user => {
      this.setState({ registered: true });
    })
    .catch(err => console.log);
  }

  render(){
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    if(this.state.registered === true){
      return <Redirect to="/login"/>
    }

    return(
      <form onSubmit={this.handleSubmit} className="registration">
        <div className="form-element">
          <label>Email:</label>
          <input type="email" id="email" value={this.state.email} 
          onChange={this.handleEmailChange}/>
        </div>
        <div className="form-element">
          <label>First Name:</label>
          <input type="text" id="firstName" value={this.state.firstName} 
          onChange={this.handleFirstNameChange} />
        </div>
        <div className="form-element">
          <label>Last Name:</label>
          <input type="text" id="lastName" value={this.state.lastName} 
          onChange={this.handleLastNameChange} />
        </div>
        <div className="form-element">
          <label>Password:</label>
          <input type="password" id="password" value={this.state.password} 
          onChange={this.handlePasswordChange} />
        </div>
        <div className="form-actions">
          <input type="submit" id="submit" className="btn btn-primary" value="Register"/>
        </div>
      </form>
    );
  }

});