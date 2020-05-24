import React, {Component} from 'react';


class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAction: null,
      /**/
    }
  }

  sendMessage = (message) => {
    console.log(message);
  }

  fetchMessage = () => {

  }

  previewMedia = () => {

  }
  render(){
    return(
      <p>Message page </p>
    )
  }
}

export default Message;

/*
  New chat button

  text input

  file attachment

  ===
  message boilerplate
  ===
    <div className="container">
      <div className="row">
        <div className="col-4 avatar">

        </div>

        <div className="col-8 last-text">

        </div>

      </div>
    </div>


*/
