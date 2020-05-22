import React, {Component} from 'react';
import './Home.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  posting = (e) => {
    e.preventDefault();
    console.log('sending form');
  }
  render(){
    return(
      <>
        <div className="container">
          <form onSubmit={this.posting}>
            <input type="file" id="inputFile" />
            <div className="input-group">
              <div className="input-group-append">
                <label className="input-group-text" htmlFor="inputFile">
                  <FontAwesomeIcon icon={faPaperclip} />
                </label>
              </div>
              <input
                className="form-control"
                placeholder="What do you have in mind?"
              />
              <div className="input-group-prepend">
                <button type="submit" className="input-group-text">
                  send
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }
}

export default Home;
