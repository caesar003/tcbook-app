import React from 'react';
import './Post.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons';

const Post = () => {
  return (
    <div className="container post mb-2">
      <h5 className="text-left">Charlie</h5>
      <small className="posted-date"> March, 12, 2020</small>
      <p> the quick brown fox jumps over the lazy dog</p>
      <div className="input-group">
        <input type="text" className="form-control" />
        <div className="input-group-append">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faCommentAlt} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Post;
