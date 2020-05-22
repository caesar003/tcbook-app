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

class App extends Component {
  constructor(){
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false,
      user:{
        about: '',
        dob: '',
        email: '',
        id: 0,
        origin: '',
        profile_picture: '',
        tcbatch: 0,
        username: '',
      },
    }
  }

  onRouteChange = (route) => {
    this.setState({
      route:route
    })
  }

  signingOut = () => {
    this.setState({
      route: 'signin'
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
      }
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
              <Navigation
                onRouteChange={this.onRouteChange}
                currentRoute={this.state.route}
                signingOut={this.signingOut}
              />
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
                      />
                    :(
                      this.state.route === 'member'?
                        <Member />
                      : <Message />
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
              />
            :
              <Register
                onRouteChange={this.onRouteChange}
              />
            )
          }
      </div>
    )
  }
}

export default App;
