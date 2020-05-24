import React, {Component} from 'react';
import './Message.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  // eslint-disable-next-line
  faArrowLeft,faPaperclip,
  faPlus,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

import BackButton from '../subComponents/BackButton/BackButton';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAction: null,
      isShowingMembers: false,
      /**/
    }
  }

  updateAction = (action) => {
    this.setState({currentAction:action})
  }

  sendMessage = (message) => {
    console.log(message);
  }

  fetchMessage = () => {

  }

  previewMedia = () => {

  }
  render(){
    /*
      sender, message, sent_date
    */
    // eslint-disable-next-line
    const sender = "John Doe", message = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const {users} = this.props;
    return(
      <>
        {
          !this.state.currentAction?
            <div className="container-fluid">

              <button
                onClick={() => this.updateAction('showingAllMembers')}
                id="new-conversation-button"
                className="btn btn-info">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          :
          <>
            <BackButton
              action={this.updateAction}
            />
            <div className="container-fluid">
            {
              users.map((user, i) =>{
                return (
                  <div key={users[i].id} className="container">
                    <div className="row justify-content-center align-items-center">
                      <div className="col-2 b">
                        <img
                          className="img-fluid"
                          src={`http://localhost:3027/picture/${users[i].profile_picture}`}
                          alt="no photo"/>
                      </div>
                      <div className="col-8 b">
                        <h4>{users[i].username}</h4>
                        <p>{users[i].origin}</p>
                      </div>
                      <div className="col-2 b envelope-icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>
                    </div>
                  </div>
                );
              })
            }
            </div>
          </>
        }
      </>
    )
  }
}

export default Message;

/*
  ==============================================================================
  WHAT TO DO HERE?
  ==============================================================================

  Firts, we display list of converstations, that looks like this.

  | Photo | Sender             time    |
  |       | last message               |

  on the bottom right, we put a plus button which opens a dialog contains all
  members of the app to have conversation with.

  => LIST ALL CONVERSATION
  => NEW CONVERSATION BUTTON
  => LIST ALL MEMBERS
  => PERSONAL CHAT DIALOG
  => GROUP CHAT DIALOG
  => FORM WITH MEDIA ATTACHMENT

*/

/*
  New chat button

  text input

  file attachment

  ===
  message boilerplate
  ===


*/


/*
<div className="container">
  <div className="row">

    <div className="col-2 avatar">
      photo
    </div>

    <div className="col">
      <div className="sender">
        {sender}
        <span className="float-right">
          <small>09.45</small>
        </span>
      </div>
      <div className="message-text">
        {message.length>50?message.substr(0,50)+'...':message}
      </div>
    </div>

  </div>
</div>

*/

/*
<div className="container-fluid message-field">
  <form>

    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faPaperclip} />
        </span>
      </div>
      <input className="form-control" type="text" />
      <div className="input-group-append">
        <button type="submit" className="input-group-text">
          Send
        </button>
      </div>
    </div>
  </form>

</div>

*/

/*
<div className="sender-info">
  <span className="back">
    <FontAwesomeIcon icon={faArrowLeft} />
  </span>
  <span className="sender-name">
    John
  </span>
</div>

*/


/*
<div className="container-fluid">

  <div className="row justify-content-end pr-2">
    <div className="message-sent-container">
      <div className="message-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      </div>

      <div className="sent-date">
        9.45
      </div>
    </div>
  </div>
  <div className="row justify-content-start pl-2">
    <div className="message-received-container">
      <div className="message-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa
      </div>

      <div className="sent-date">
          10.00
      </div>
    </div>
  </div>

</div>
*/
