import React, {Component} from 'react';
// eslint-disable-next-line
import BackButton from '../subComponents/BackButton/BackButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye
} from '@fortawesome/free-solid-svg-icons';

class Member extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentAction : null,
    }
  }

  onUserSelect = (user) => {
    console.log(user);
  }

  renderUsers = () => {
    const Users = [];
    for(let i=0; i<this.props.users.length; i++){
      const {id, profile_picture, username, origin, tcbatch} = this.props.users[i];
      Users.push(
        <div key={id} className="row">
          <div className="col-2">
            <img
              className="img-fluid profile-picture"
              src={`http://localhost:3027/picture/${profile_picture}`} alt="fuck you" />
          </div>
          <div className="col-7">
            {username} - {origin} <br />
            TC {tcbatch}
          </div>
          <div className="col-3">
            <FontAwesomeIcon icon={faEye} />
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
        </div>
      )
    }
    return Users;
  }
  render(){
    // const {id, username, completename, email, tcbatch, origin, dob, profile_picture, cover_picture, about} = this.props.users;
    return(
      <>
        <div className="container-fluid">
          {this.renderUsers()}
        </div>
      </>
    )
  }
}

export default Member;

/*
<div className="row">
  <div className="col-2">
    <img
      className="img-fluid profile-picture"
      src={`http://localhost:3027/picture/${this.props.users[0].profile_picture}`} alt="fuck you" />
  </div>
  <div className="col-7">
    {this.props.users[0].username} - {this.props.users[0].origin} <br />
    TC {this.props.users[0].tcbatch}
  </div>
  <div className="col-3">
    <FontAwesomeIcon icon={faEye} />
    <FontAwesomeIcon icon={faEnvelope} />
  </div>
</div>
*/
