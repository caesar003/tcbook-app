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
      isChattingWith: {
        id: '',
        profile_picture: '',
        name: '',
      },
      message: '',
      messages: [],
      /**/
    }
  }

  // fetchConversations = () => {
  //   fetch('http://localhost:3027/allConversation', )
  // }

  seeAllMembers = () => {
    this.updateAction('showingAllMembers');
    this.props.showNav(false);
  }

  updateAction = (action) => {
    this.setState({currentAction:action});
    if(!action){
      this.props.showNav(true);
      this.createChatInstance();
    } else {
      this.props.showNav(false);
    }
  }

  fetchMessages = (x, y) => {
    const identifier = x<y? `u${x}u${y}` : `u${y}u${x}`;
    fetch(`http://localhost:3027/message/${identifier}`)
    .then(response=> response.json())
    .then(messages => {
      this.setState({messages:messages});
    });
  }

  createChatInstance = (id, picture, name) => {
    if(!id || !picture || !name){

    } else {
      this.fetchMessages(this.props.user.id, id);
      this.setState({
        isChattingWith: {
          id: id,
          profile_picture: picture,
          name: name,
        }
      });
      setTimeout(()=> this.updateAction('havingConversation'), 200);
    }
  }

  renderConversation = () => {
    const x = this.props.user.id;
    const Conversation = [];
    if(!this.state.messages.length){
      return (<p>there is no conversation</p>);
    } else {
      for(let i=0; i<this.state.messages.length; i++){
        if(this.state.messages[i].sender === x){
          Conversation.push(
            <div key={this.state.messages[i].id} className="row justify-content-end pr-2">
              <div className="message-sent-container">
                <div className="message-text">
                  {this.state.messages[i].message}
                </div>

                <div className="sent-date">
                  {this.state.messages[i].sent_date}
                </div>
              </div>
            </div>)
        } else {
          Conversation.push(
            <div key={this.state.messages[i].id} className="row justify-content-start pl-2">
              <div className="message-received-container">
                <div className="message-text">
                  {this.state.messages[i].message}
                </div>

                <div className="sent-date">
                  {this.state.messages[i].sent_date}
                </div>
              </div>
            </div>
          )
        }
      }
      return Conversation;
    }
  }

  onMessageChange = (e) => {
    this.setState({message: e.target.value});
  }

  sendMessage = (e) => {
    e.preventDefault();
    const currentList = this.state.messages;
    const sender = this.props.user.id;
    const receiver = this.state.isChattingWith.id;
    const identifier = sender<receiver ? `u${sender}u${receiver}` : `u${receiver}u${sender}` ;
    const message = this.state.message;
    const totalMessage = this.state.messages.length;
    if(message){
      fetch('http://localhost:3027/message', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          sender: sender,
          receiver: receiver,
          identifier: identifier,
          message: message,
        })
      }).then(response => response.json())
      .then(data => {
        this.updateList(identifier, data[0].sent_date, message, sender, receiver, totalMessage)
        currentList.push(data[0]);
        this.setState({
          messages: currentList,
          message: '',
        });
        this.clearForm();
        console.log(data);
        console.log(totalMessage);
      })
    }
  }

  updateList = (identifier, sent_date, message, sender, receiver, totalMessage) => {
    const method = totalMessage>0?'put':'post';
    fetch('http://localhost:3027/conversationlist', {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sender: sender,
        receiver: receiver,
        message: message,
        identifier: identifier,
        sent_date: sent_date
      })
    }).then(response => response.json())
    .then(data => {
      console.log(data);
    })
  }

  clearForm = () => {
    document.getElementById('chat-form').reset();
  }

  previewMedia = () => {

  }
  render(){
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
          :(this.state.currentAction==='showingAllMembers'?
            <>
              <BackButton
                action={this.updateAction}
              />
              <div className="container-fluid pt-4">
              {
                users.map((user, i) =>{
                  return (
                    <div
                      onClick={() => this.createChatInstance(users[i].id, users[i].profile_picture, users[i].username)}
                      key={users[i].id}
                      className="container">
                      <div className="row justify-content-center align-items-center">
                        <div className="col-2 b">
                          <img
                            className="img-fluid"
                            src={`http://localhost:3027/picture/${users[i].profile_picture}`}
                            alt="profile" />
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
          :
            <>
              <div className="fixed-top container-fluid d-flex justify-content-start back-button py-2 pl-1 align-items-center">
                <span
                  onClick={()=>this.updateAction(null)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>
                <img
                  className="message-avatar ml-1"
                  src={`http://localhost:3027/picture/${this.state.isChattingWith.picture}`} alt={this.state.isChattingWith.picture}
                />
                <div className="ml-1">
                  {this.state.isChattingWith.username}
                </div>
              </div>

              <div className="container-fluid pt-5">
                {this.renderConversation()}



              </div>

              <div className="container-fluid fixed-bottom message-field">
                <form
                  id="chat-form"
                  onSubmit={this.sendMessage}>

                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faPaperclip} />
                      </span>
                    </div>
                    <input
                      onChange={this.onMessageChange}
                      className="form-control"
                      type="text" />
                    <div className="input-group-append">
                      <button type="submit" className="input-group-text">
                        Send
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </>
          )
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

*/


/*
  => clicking a user, initiate createConversation instance.
      we need to display things, on this new conversation instance, they are,
        * user profile, which we get from on click event listener,
        * (if exists) chat history among two users,
          * using fetch, getting back response from the backend, whether the conversation exists,
            if it does, display it,
            if it is empty, display empty message,

*/
