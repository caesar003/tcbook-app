import React from 'react';
import './Members.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';

const Members = ({members}) => {

  return (
    <>
    {
      members.map((member, i) =>{
        return (
          <div key={members[i].id} className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-2 b">
                foto
              </div>
              <div className="col-8 b">
                <h4>{members[i].username}</h4>
                <p>{members[i].origin}</p>
              </div>
              <div className="col-2 b envelope-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            </div>
          </div>
        );
      })
    }

    </>
  )
}

export default Members;
