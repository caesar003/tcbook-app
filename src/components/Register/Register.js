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
    console.log(e.target.value);
  }

  onPasswordChange = (e) => {
    console.log(e.target.value);
  }

  onConfirmPasswordChange = (e) => {
    console.log(e.target.value);
  }

  onNameChange = (e) => {
    console.log(e.target.value);
  }

  onBatchChange = (e) => {
    console.log(e.target.value);
  }

  onSigningUp = (e) => {
    e.preventDefault();
    console.log('signing up');
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
              {this.state.isFormInvalid?this.renderMessage():''}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
