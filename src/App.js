import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Search from './components/Search/Search';

import Profile from './components/Profile/Profile';
// eslint-disable-next-line
import Member from './components/Member/Member';
import Message from './components/Message/Message';
import Modal from 'react-bootstrap/Modal';

class App extends Component {
  constructor(){
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false,
      isSigningOut: false,
      isNavShown: true,
      signInMessage: {
        alertType: '',
        message: '',
        formHasMessage: false,
      },
      user:{
        about: '',
        dob: '',
        email: '',
        id: 0,
        origin: '',
        profile_picture: '',
        completename:'',
        tcbatch: 0,
        username: '',
      },
      users: [],
    }
  }

  componentDidMount(){
    // this.fetchUsers();
  }

  showNav = (bool) => {
    this.setState({isNavShown:bool});
  }

  fetchUsers = (id) => {
    fetch('http://localhost:3027/users/'+id)
    .then(response=>response.json())
    .then(response=>{
      this.setState({users:response});
    })
  }

  isSigningOut = () => {
    this.setState({isSigningOut:true});
  }

  signOutCancel = () => {
    this.setState({isSigningOut:false});
  }

  onRouteChange = (route) => {
    this.setState({
      route:route
    })
  }

  signingOut = () => {
    this.setState({
      route: 'signin',
      isSigningOut: false,
    })
    this.setState({
      isSignedIn:false
    })
  }
  signingIn = (user) => {
    this.loadUser(user);
    this.onRouteChange('home');
    this.setState({
      isSignedIn:true
    });
  }

  loadUser = (user) => {
    let id;
    if(!user){
      fetch('http://localhost:3027/profile/'+this.state.user.id)
      .then(response=>response.json())
      .then(response=>{
        this.setState({
          user:{
            about: response.about,
            dob: response.dob,
            email: response.email,
            id: response.id,
            origin: response.origin,
            profile_picture: response.profile_picture,
            tcbatch: response.tcbatch,
            username: response.username,
            completename:response.completename
          }
        });
        id = response.id;
      });
    } else {
      this.setState({
        user:{
          about: user.about,
          dob: user.dob,
          email: user.email,
          id: user.id,
          origin: user.origin,
          profile_picture: user.profile_picture,
          tcbatch: user.tcbatch,
          username: user.username,
          completename:user.completename
        }
      });
      id = user.id;
    }
    this.fetchUsers(id);
  }

  onRegistrationSuccess = () => {
    this.setState({
      signInMessage:{
        alertType: 'alert alert-success',
        message: 'Your account has been created!',
        formHasMessage:true,
      }
    })
    this.setState({
      route: 'signin'
    })
  }

  render(){
    return(
      <div className="App">
        {
          this.state.isSignedIn?
            /* first check sign in status,
               then if it is, we want navbar no matter what */
            <>
              {
                this.state.isNavShown?
                <Navigation
                  onRouteChange={this.onRouteChange}
                  currentRoute={this.state.route}
                  signingOut={this.signingOut}
                  isSigningOut={this.isSigningOut}
                />
                :''
              }
              <Modal
                show={this.state.isSigningOut}
                onHide={this.signOutCancel}
                animation={false}
              >
                <Modal.Header closeButton> </Modal.Header>

                <Modal.Body>
                  <div className="text-center">
                  Sign out?
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <button
                    className="btn btn-info"
                    onClick={this.signOutCancel}
                  >Cancel
                  </button>
                  <button
                    className="btn btn-outline-warning"
                    onClick={this.signingOut}
                  >
                    Sign me out
                  </button>
                </Modal.Footer>
              </Modal>
              {
                this.state.route === 'home'?
                  <Home />
                :(
                  this.state.route==='search'?
                    <Search />
                  :(
                    this.state.route==='profile'?
                      <Profile
                        user={this.state.user}
                        loadUser={this.loadUser}
                      />
                    :(
                      this.state.route === 'member'?
                        <Member
                          users={this.state.users}
                        />
                      : <Message
                          user={this.state.user}
                          users={this.state.users}
                          showNav={this.showNav}
                        />
                    )
                  )
                )
              }
            </>
          :(
            this.state.route==='signin'?
              <Login
                onRouteChange={this.onRouteChange}
                signingIn={this.signingIn}
                signInMessage={this.state.signInMessage}
              />
            :
              <Register
                onRouteChange={this.onRouteChange}
                onRegistrationSuccess={this.onRegistrationSuccess}
              />
            )
          }
      </div>
    )
  }
}

export default App;
