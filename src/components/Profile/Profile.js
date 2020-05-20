import React from 'react';
import './Profile.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {faCameraRetro} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';


const Profile = ({user, onProfileUpdate}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  const formdata = {
    id: user.id,
    name: user.username,
    tcbatch: user.tcbatch,
    origin: user.origin,
    dob : user.dob,
  }
  const update = () => {
    onProfileUpdate(formdata);
  }
  const onNameChange = (e) => {
    formdata.name = e.target.value
  }
  const onBatchChange = (e) => {
    formdata.tcbatch = e.target.value
  }
  const onOriginChange = (e) => {
    formdata.origin = e.target.value
  }
  const onDateChange = (e) => {
    formdata.dob = e.target.value;
  }
  return(
    <>
      <Modal
        show={isOpen}
        onHide={closeModal}
        animation={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-10">

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={user.username}
                    onChange={onNameChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tcbatch">Tc Batch</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tcbatch"
                    defaultValue={user.tcbatch}
                    onChange={onBatchChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="origin">Origin</label>
                  <input
                    type="text"
                    className="form-control"
                    id="origin"
                    defaultValue={user.origin}
                    onChange={onOriginChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    defaultValue={user.dob}
                    onChange={onDateChange}
                  />
                </div>

              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={update}>
            update
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className="container-fluid"
        id="headerCover"
        style={{
          background:'url(http://localhost:3027/picture/Crocus_Wallpaper_by_Roy_Tanck.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
          }}
        >
        <div id="headerCoverInner" className="row justify-content-around align-items-center">
          <div className="col-4 d-flex justify-content-center">
            <input
              type="file"
              id="prof-picture-input"
            />
            <img
              className="img-fluid profile-picture"
              src="http://localhost:3027/picture/avatar.jpg"
              alt="avatar"
            />
            <label id="prof-pict-input-label" htmlFor="prof-picture-input">
              <FontAwesomeIcon icon={faCameraRetro} />
            </label>
          </div>
          <div className="col-5">
            <p>the quick brown fox jumps over tha lazy dog</p>
          </div>

        </div>
      </div>

      <div className="container mt-2">
        <ul className="list-group">
          <li className="list-group-item"> {user.username}</li>
          <li className="list-group-item">TC batch {user.tcbatch}</li>
          <li className="list-group-item">origin: {user.origin}</li>
          <li className="list-group-item">Birthday: {moment(user.dob).format('MMM Do YYYY')}</li>
        </ul>
        <div className="text-center">
          <button
            onClick={showModal}
            className="btn btn-sm btn-secondary">
            <FontAwesomeIcon icon={faPencilAlt}
            />
          </button>
        </div>
      </div>
    </>
  )
}

export default Profile;
/*
  username |      email       | tcbatch | origin | dob | profile_picture
*/
