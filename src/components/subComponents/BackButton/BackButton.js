import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './BackButton.css';
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const BackButton = ({action, extra}) => {
  return (
    <div className="fixed-top container-fluid d-flex justify-content-start back-button">
      <span
        onClick={()=>action(extra?extra:null)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </span>
    </div>
  )
}

export default BackButton;
