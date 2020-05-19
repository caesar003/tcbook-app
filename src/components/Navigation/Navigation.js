import React from 'react';
import './Navigation.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Navigation = ({onRouteChange, current}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  const signOut = () => {
    closeModal();
    onRouteChange('signin');
  }
  return (
    <>
    <Modal
      show={isOpen}
      onHide={closeModal}
      animation={false}
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        Do you really want to sign out?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={signOut}>
          Sign me out
        </Button>
      </Modal.Footer>
    </Modal>
    <div className="container-fluid fixed-bottom" id="navbar">
      <div className="row">
        <div className={`col text-center ${current==='home'?'current':''}`}>
          <p onClick={()=>onRouteChange('home')}><FontAwesomeIcon icon={faHome} /></p>
        </div>
        <div className={`col text-center ${current==='search'?'current':''}`}>
          <p onClick={()=>onRouteChange('search')}><FontAwesomeIcon icon={faSearch} /></p>
        </div>
        <div className={`col text-center ${current==='profile'?'current':''}`}>
          <p onClick={()=>onRouteChange('profile')}><FontAwesomeIcon icon={faUserAlt} /></p>
        </div>
        <div className={`col text-center ${current==='members'?'current':''}`}>
          <p onClick={()=>onRouteChange('members')}><FontAwesomeIcon icon={faUserFriends} /></p>
        </div>
        <div className="col text-center">
          <p onClick={showModal}><FontAwesomeIcon icon={faSignOutAlt} /></p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navigation;

/*<nav style={{display:'flex', justifyContent:'flex-end'}}>
  <p onClick={()=>onRouteChange('signin')}>Logout</p>
</nav>*/
