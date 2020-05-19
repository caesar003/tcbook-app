import React from 'react';
import './Profile.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Profile = ({user}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  const update = () => {
    console.log('updated');
  }
  const onNameChange = (e) => {
    console.log(e.target.value);
  }
  const onEmailChange = (e) => {
    console.log(e.target.value);
  }

  const onBatchChange = (e) => {
    console.log(e.target.value);
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
                    defaultValue={user.name}
                    onChange={onNameChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    defaultValue={user.email}
                    onChange={onEmailChange}
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
                  <input type="text" className="form-control" id="origin"/>
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input type="date" className="form-control" id="dob"/>
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
        className="jumbotron"
        id="headerCover"
        style={{
          background:'url(http://localhost:3027/picture/landing_page1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
          }}>
        <div id="headerCoverInner" className="row justify-content-end">
          <div className="col-5">
            <h5>this is the header</h5>
            <p>some text</p>
          </div>
        </div>
      </div>
      <div className="container mt-2">
        <ul className="list-group">
          <li className="list-group-item"> {user.name}</li>
          <li className="list-group-item">TC batch {user.batch}</li>
          <li className="list-group-item">email: {user.email}</li>
          <li className="list-group-item">origin: {user.origin}</li>
          <li className="list-group-item">Birthday: {user.dob}</li>
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
