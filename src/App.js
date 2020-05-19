import React, {Component} from 'react';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Members from './components/Members/Members';
import axios from 'axios';
const api = 'http://localhost:3027/';


class App extends Component {
  constructor(){
    super();
    this.state = {
      route: 'signin',
      isSignedIn:false,
      user:{
        id:'',
        email:'',
        name:'',
        batch:'',
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
        // if(response==='error'){
        //   console.log('Error Signing Up!');
        // } else {
        //   console.log('Registration Successfull');
        //   this.props.onRegistrationSuccess();
        //   this.props.onRouteChange('signin');
        // }
      })
  }

  onPostSubmit = () => {
    // console.log('submitted');
    const post = this.state.post;
    const username = this.state.user.name;
    const file = this.state.fileToUpload;
    if(file){
      this.uploadFile(file);
    } else if(post) {
      this.submitPost(post, username);
    }
  }

  // onPostSubmit = () => {
  //   const post = this.state.post;
  //   const username = this.state.user.name;
  //   if(post){
  //     fetch(api+'post', {
  //       method: 'post',
  //       headers: {'Content-Type':'application/json'},
  //       body: JSON.stringify({
  //         post : post,
  //         user_id : username,
  //       })
  //     })
  //       .then(response => response.json())
  //       .then(response => {
  //
  //         this.fetchPost();
  //         // if(response==='error'){
  //         //   console.log('Error Signing Up!');
  //         // } else {
  //         //   console.log('Registration Successfull');
  //         //   this.props.onRegistrationSuccess();
  //         //   this.props.onRouteChange('signin');
  //         // }
  //       })
  //   }
  // }

  onFileInputChange = (e) => {
    // console.log(!e.target.files[0]);
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
        email:user.email,
        name:user.username,
        id:user.id,
        batch:user.tcbatch,
      }
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
                <Home
                  onPostChange={this.onPostChange}
                  onPostSubmit={this.onPostSubmit}
                  Posts={this.state.Posts}
                  onFileInputChange={this.onFileInputChange}
                  fileToUpload={this.state.fileName}
                />
              :
                (this.state.route==='search'?
                  <Search />
                :(
                  this.state.route==='members'?
                    <Members
                      members={this.state.Users}
                    />
                  :
                    this.renderProfile()
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
