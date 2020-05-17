import React from 'react';
// import Post from './Post/Post';
import './Post/Post.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons';


const Home = ({handleLogout, onPostChange, onPostSubmit, Posts}) => {
  const renderPost = () => {
    const div = [];
    for(let i=0; i<Posts.length; i++){
      const {id, user_id,post, post_date} = Posts[i];
      div.push(
      <div key={id} className="container post mb-2">
        <h5 className="text-left">{user_id}</h5>
        <small className="posted-date"> {post_date}</small>
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
        <textarea
          onChange={onPostChange}
          className="form-control"
          placeholder="What's in your mind?"></textarea>
        <div className="d-flex justify-content-end mt-1">
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
