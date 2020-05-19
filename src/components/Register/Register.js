import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {faAt} from '@fortawesome/free-solid-svg-icons';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {faHashtag} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';


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

  onEmailChange = (event) => {
    this.setState({email:event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({password:event.target.value});
  }

  onConfirmPasswordChange = (event) => {
    this.setState({password2:event.target.value});
  }

  onNameChange = (event) => {
    this.setState({name:event.target.value});
  }

  onBatchChange = (event) => {
    this.setState({batch:event.target.value});
  }

  renderMessage = () => {
    return (
      <div className="alert alert-danger">{this.state.invalidMsg}</div>
    )
  }

  onRegister = () => {
    const email = this.state.email;
    const name  = this.state.name;
    const batch = this.state.batch;
    const password = this.state.password;
    const password2 = this.state.password2;
    if(!email||!name||!batch||!password||!password2){
      this.setState({invalidMsg:'please fill out all fields'})
      this.setState({isFormInvalid:true});
    } else {
      if(!/\S+@\S+\.\S+/.test(email)){
        this.setState({invalidMsg:'Please enter valid email!'})
        this.setState({isFormInvalid:true});
      } else {
        if(password!==password2){
          this.setState({invalidMsg:'passwords don\'t match!'})
          this.setState({isFormInvalid:true});
        } else {
          fetch(this.props.api+'register', {
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
                this.props.onRouteChange('signin');
              }
            })
            /* end fetch block */
        }
      }
    }
  }
  render(){
    const {onRouteChange} = this.props;
    return (
      <>
        <div className="container mt-3 pt-3">
          <div className="row justify-content-center">
            <div className="col-10">
              <h3>Create an account</h3>
              <div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faAt} />
                      </span>
                    </div>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      id="email"
                      onChange={this.onEmailChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </div>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      id="username"
                      onChange={this.onNameChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="tcbatch">TC Batch</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faHashtag} />
                      </span>
                    </div>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      id="batch"
                      onChange={this.onBatchChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faKey} />
                      </span>
                    </div>
                    <input
                      type="password"
                      autoComplete="off"
                      className="form-control"
                      id="password"
                      onChange={this.onPasswordChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faKey} />
                      </span>
                    </div>
                    <input
                      type="password"
                      autoComplete="off"
                      className="form-control"
                      id="password2"
                      onChange={this.onConfirmPasswordChange}
                    />
                  </div>
                </div>
                <button type="submit"
                  className="btn btn-warning"
                  onClick={()=>this.onRegister()}
                >
                  <FontAwesomeIcon icon={faUserPlus} /> Sign up</button>
                <br />
                <small
                  className="text-muted">Have an account? <span className="link"
                  onClick={()=>onRouteChange('signin')}> login</span> here. </small>
              </div>
              {this.state.isFormInvalid?this.renderMessage():''}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
