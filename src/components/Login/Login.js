import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {faAt} from '@fortawesome/free-solid-svg-icons';
import {faKey} from '@fortawesome/free-solid-svg-icons';


class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      formMessage: this.props.signInMessage,
      alertType:this.props.alertType,
      msg: this.props.msg,
    }
  }

  onEmailChange = (event) => {
    this.setState({email:event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({password:event.target.value});
  }

  onSubmitSignin = () => {
    const email = this.state.email;
    const password = this.state.password;
    if(!email||!password){
      this.setState({msg:'Please fill out all fields'});
      this.setState({alertType:'alert-danger'});
      this.setState({formMessage:true});
    } else {
      fetch(this.props.api+'signin', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
        .then(response => response.json())
        .then(data => {
          if(data==='400'){
            this.setState({msg:'Email or (and) password is (are) incorrect!'});
            this.setState({alertType:'alert-danger'});
            this.setState({formMessage:true});
          } else {
            this.props.loadUser(data);
            this.props.onRouteChange('home');
          }
        })
    }
  }

  renderMessage = () => {
    return (
      <div className={`alert ${this.state.alertType}`}>{this.state.msg}</div>
    );
  }

  render(){
    const {onRouteChange} = this.props;
    return (
      <>
        <div className="container mt-3 pt-3">
          <div className="row justify-content-center">
            <div className="col-10">
              <h3>Login</h3>
              <div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        {<FontAwesomeIcon icon={faAt} />}
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
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">{<FontAwesomeIcon icon={faKey} />}</span>
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={()=>this.onSubmitSignin()}
                >
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </button>
                <br />
                <small className="text-muted">Don't have an account yet? <span
                  className="link"
                  onClick={()=>onRouteChange('register')}
                > create one </span> here. </small>
              </div>
              {this.state.formMessage?this.renderMessage():''}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
