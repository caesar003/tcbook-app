import React from 'react';
import moment from 'moment';
import './Post/Post.css';
import './Home.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';


const Home = ({
  handleLogout,
  onPostChange,
  onPostSubmit,
  onFileInputChange,
  fileToUpload,
  Posts}) => {
  const renderPost = () => {
    const div = [];
    for(let i=0; i<Posts.length; i++){
      const {id, user_id,post, post_date, atch} = Posts[i];
      div.push(
      <div key={id} className="container post mb-2">
        <h5 className="text-left">{user_id}</h5>
        <small className="posted-date"> {moment(post_date).fromNow()}</small>
        {atch?
        <img className="post-picture img-fluid" src={`http://localhost:3027/picture/${atch}`} alt={atch} />:
        ''}
        <p>{post}</p>
        <div className="input-group">
          <input type="text" className="form-control" />
          <div className="input-group-append">
            <span className="input-group-text">
              {<FontAwesomeIcon icon={faCommentAlt} />}
            </span>
          </div>
        </div>
      </div>);
    }
    return (
      <>
        {div}
      </>
    );
  }
  return (
    <>
      <div className="container pt-2">
          <input
            id="fileInput"
            type="file"
            name="file"
            onChange={onFileInputChange}
          />
        <div className="input-group">
          <div className="input-group-prepend">
              <label
                id="fileLabel"
                className="input-group-text"
                htmlFor="fileInput">
                <FontAwesomeIcon icon={faPaperclip} />
              </label>

          </div>
          <textarea
            onChange={onPostChange}
            className="form-control"
            placeholder="What's in your mind?"></textarea>
        </div>
        <div className="d-flex justify-content-between mt-1">
          <span className="fileName">
            <small style={{fontStyle:'italic'}}>{fileToUpload}</small>
          </span>
          <button
            onClick={()=>onPostSubmit()}
            className="btn btn-outline-danger btn-sm">Post</button>
        </div>
      </div>
      {renderPost()}
    </>
  )
}

export default Home;

/*
<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
  </div>
  <div className="custom-file">
    <input
      onChange={onFileInputChange}
      type="file"
      className="custom-file-input"
      id="inputGroupFile01"
      aria-describedby="inputGroupFileAddon01"
    />
    <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
  </div>
</div>
*/
