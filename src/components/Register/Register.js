import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {faAt} from '@fortawesome/free-solid-svg-icons';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {faHashtag} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import TextInputGroup from '../subComponents/TextInputGroup/TextInputGroup';


class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      password2:'',
      name : '',
      batch : '',
      isFormInvalid: false,
      invalidMsg:'',
    }
  }

  onEmailChange = (e) => {
    this.setState({email:e.target.value})
  }

  onPasswordChange = (e) => {
    this.setState({password:e.target.value})
  }

  onConfirmPasswordChange = (e) => {
    this.setState({password2:e.target.value})
  }

  onNameChange = (e) => {
    this.setState({name:e.target.value})
  }

  onBatchChange = (e) => {
    this.setState({batch:e.target.value})
  }

  showSignUpMessage = (message) => {
    this.setState({invalidMsg:message});
    this.setState({isFormInvalid:true});
  }

  onSigningUp = (e) => {
    e.preventDefault();
    const email = this.state.email,
          name = this.state.name,
          batch = this.state.batch,
          password = this.state.password,
          password2 = this.state.password2;
    if(!email || !name || !batch || !password || !password2){
      this.showSignUpMessage('please fill out all fields');
    } else {
      if(!/\S+@\S+\.\S+/.test(email)){
        this.showSignUpMessage('Please enter valid email!');
      } else {
        if(password!==password2){
          this.showSignUpMessage('passwords don\'t match!');
        } else {
          fetch('http://localhost:3027/register', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              email: email,
              password: password,
              name: name,
              batch: batch,
            })
          })
          .then(response => response.json())
          .then(response => {
            if(response==='error'){
              console.log('Error Signing Up!');
            } else {
              console.log('Registration Successfull');
              this.props.onRegistrationSuccess();
            }
          }) // end fetch block,
        }
      }
    }
  }

  render(){
    return (
      <>
        <div className="container mt-3 pt-3">
          <div className="row justify-content-center">
            <div className="col-10">
              <h3>Create an account</h3>
              <form onSubmit={this.onSigningUp}>
                <TextInputGroup
                  label="Email address"
                  type="text"
                  id="email"
                  icon={faAt}
                  onChangeAction={this.onEmailChange}
                />
                <TextInputGroup
                  label="Username"
                  type="text"
                  id="username"
                  icon={faUser}
                  onChangeAction={this.onNameChange}
                />
                <TextInputGroup
                  label="Tc Batch"
                  type="text"
                  id="batch"
                  icon={faHashtag}
                  onChangeAction={this.onBatchChange}
                />
                <TextInputGroup
                  label="Password"
                  type="password"
                  id="password"
                  icon={faKey}
                  onChangeAction={this.onPasswordChange}
                />
                <TextInputGroup
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  icon={faKey}
                  onChangeAction={this.onConfirmPasswordChange}
                />

                <button type="submit"
                  className="btn btn-warning"

                >
                  <FontAwesomeIcon icon={faUserPlus} /> Sign up</button>
                <br />
                <small
                  className="text-muted">Have an account?
                  <span className="link"
                  onClick={() => this.props.onRouteChange('signin')}
                  > login</span> here. </small>
              </form>
              {this.state.isFormInvalid?
                  <div className="alert alert-danger">
                    {this.state.invalidMsg}
                  </div>
                :''}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
