import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt, faAt, faKey} from '@fortawesome/free-solid-svg-icons';
import TextInputGroup from '../subComponents/TextInputGroup/TextInputGroup';


class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      formHasMessage: false,
      messageType: '',
      message: '',
    }
  }

  onEmailChange = (e) => {
    this.clearMessage();
    this.setState({email:e.target.value});
  }

  onPasswordChange = (e) => {
    this.clearMessage();
    this.setState({password:e.target.value});
  }
  showSignInMessage = (messageType, message) => {
    this.setState({
      messageType: messageType,
      message: message,
      formHasMessage:true,
    })
  }
  clearMessage = () => {
    this.setState({
      formHasMessage:false,
    })
  }

  signingIn = (e) => {
    e.preventDefault();
    const email = this.state.email,
          password = this.state.password;
    if(!email||!password){
      // send the error message if any of fields is empty.
      this.showSignInMessage('alert alert-danger', 'Please fill out all fields!');
    } else {
      if(!/\S+@\S+\.\S+/.test(email)){
        // check whether it's a valid email address by single '@' and '.' characters.
        this.showSignInMessage('alert alert-danger', 'Please enter the correct email!');
      } else {
        fetch('http://localhost:3027/signin', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
            password: password,
          })
        })
        .then(response => response.json())
        .then(data=>{
          console.log(data);
          if(data === '400'){
            this.showSignInMessage('alert alert-danger', 'Either password or email is incorrect!');
          } else {
            this.props.signingIn(data);
          }
        }) // end fetch block

      }
    }
  }

  render(){
    return (
      <>
        <div className="container mt-3 pt-3">
          <div className="row justify-content-center">
            <div className="col-10">
              <h3>Login</h3>
              <form onSubmit={this.signingIn}>
                <TextInputGroup
                  label="Email address"
                  type="text"
                  id="email"
                  icon={faAt}
                  onChangeAction={this.onEmailChange}
                />

                <TextInputGroup
                  label="Password"
                  type="password"
                  id="password"
                  icon={faKey}
                  onChangeAction={this.onPasswordChange}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </button>
                <br />
                <small className="text-muted">Don't have an account yet? <span
                  className="link"
                  onClick={()=> this.props.onRouteChange('register')}
                > create one </span> here. </small>
              </form>
              {
                this.state.formHasMessage?
                  <div className={this.state.messageType}>
                    {this.state.message}
                  </div>
                :''
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
