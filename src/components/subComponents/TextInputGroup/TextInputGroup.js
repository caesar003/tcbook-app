import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const TextInputGroup = ({label, type, onChangeAction, id, icon}) => {
  return (
    <div className="form-group">
      <label htmlFor="email">{label}</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <FontAwesomeIcon icon={icon} />
          </span>
        </div>
        <input
          type={type}
          autoComplete="off"
          className="form-control"
          id={id}
          onChange={onChangeAction}
        />
      </div>
    </div>
  )
}

export default TextInputGroup;
