import React, {Component} from 'react';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Members from './components/Members/Members';
import Chat from './components/Chat/Chat';
import axios from 'axios';
const api = 'http://localhost:3027/';


class App extends Component {
  constructor(){
    super();
    this.state = {
      route: 'signin',
      isSignedIn:false,
      user:{
        about: '',
        dob: '',
        email: '',
        id: '',
        origin: '',
        profile_picture: '',
        tcbatch: '',
        username: ''
      },
      signInMessage:false,
      alertType:'',
      msg:'',
      current:'',
      post: '',
      Posts:[],
      Users: [],
      fileToUpload:null,
      fileName: ''
    }
  }

  componentDidMount(){
    this.fetchPost();
    this.fetchUsers();
  }

  onPostChange = (e) => {
    this.setState({post:e.target.value});
  }

  uploadFile = (file) => {
    const data = new FormData();
    data.append('file', file);
    axios.post(api+'postMedia', data, {})
      .then(res=>{
        console.log(res.data);
        this.submitPost(this.state.post, this.state.user.name, res.data)
      })
  }

  submitPost = (post, username, attachment) => {
    fetch(api+'post', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        post : post,
        user_id : username,
        attachment: attachment,
      })
    })
      .then(response => response.json())
      .then(response => {

        this.fetchPost();
        /*if(response==='error'){
          console.log('Error Signing Up!');
        } else {
          console.log('Registration Successfull');
          this.props.onRegistrationSuccess();
          this.props.onRouteChange('signin');
        }*/
      })
  }

  onPostSubmit = () => {
    const post = this.state.post;
    const username = this.state.user.name;
    const file = this.state.fileToUpload;
    if(file){
      this.uploadFile(file);
    } else if(post) {
      this.submitPost(post, username);
    }
  }

  onFileInputChange = (e) => {
    const file = e.target.files[0];
    if(file){
      this.setState({fileName:file.name});
      this.setState({fileToUpload:file, loaded:0});
    } else {
      this.setState({fileName:''})
    }
    console.log(!file);
  }
  onRegistrationSuccess = () => {
    this.setState({signInMessage:true});
    this.setState({alertType:'alert-success'})
    this.setState({msg:'Your account has been created!'})
  }

  loadUser = (user) => {
    this.setState({
      user:{
        about: user.about ,
        dob: user.dob ,
        email: user.email ,
        id: user.id ,
        origin: user.origin ,
        profile_picture: user.profile_picture ,
        tcbatch: user.tcbatch,
        username: user.username
      }
    })
  }
  onProfileUpdate = (formdata) => {
    fetch(api+'profile-detail', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formdata)
    }).then(response=> response.json())
      .then(response => {
        console.log(response);
      })
  }
  onRouteChange = (route) => {
    if(route==='signin'){
      this.setState({isSignedIn:false})
    } else if(route==='home'){
      this.setState({isSignedIn:true});
    }
    this.setState({current:route})
    this.setState({route:route});
  }
  renderLogin = () => {
    return (
      <Login
        onRouteChange={this.onRouteChange}
        signInMessage={this.state.signInMessage}
        alertType={this.state.alertType}
        msg={this.state.msg}
        loadUser={this.loadUser}
        api={api}
      />
    )
  }
  renderRegister = () => {
    return (
      <Register
        onRouteChange={this.onRouteChange}
        loadUser={this.loadUser}
        onRegistrationSuccess={this.onRegistrationSuccess}
        api={api}
      />
    )
  }
  fetchPost = () => {
    fetch(api+'post')
      .then(response=>response.json())
      .then(response=>{
        this.setState({Posts:response})
      })
  }
  fetchUsers = () => {
    fetch(api+'users')
    .then(response=>response.json())
    .then(response=>{
      this.setState({Users:response});
    })
  }
  renderProfile = () => {
    return (
      <Profile
        user={this.state.user}
        onProfileUpdate={this.onProfileUpdate}
      />
    )
  }
  renderHome = () => {
    return (
      <Home
        onPostChange={this.onPostChange}
        onPostSubmit={this.onPostSubmit}
        Posts={this.state.Posts}
        onFileInputChange={this.onFileInputChange}
        fileToUpload={this.state.fileName}
      />
    )
  }
  render(){
    return(
      <div className="App">
        {this.state.route==='signin'?
          this.renderLogin()
        :
          (this.state.route === 'register'?
            this.renderRegister()
          :
            <>
              <Navigation
                onRouteChange={this.onRouteChange}
                current={this.state.current}
              />
              {this.state.route==='home'?
                this.renderHome()
              :
                (this.state.route==='search'?
                  <Search />
                :(
                  this.state.route==='members'?
                    <Members
                      members={this.state.Users}
                    />
                  :
                    (this.state.route==='chat'?
                      <Chat />
                    :
                    this.renderProfile()
                    )
                  )
                )
              }
            </>
          )
        }
      </div>
    )
  }
}

export default App;
