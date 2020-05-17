import React from 'react';
import './Navigation.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';



const Navigation = ({onRouteChange, current}) => {
  return (
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
          <p onClick={()=>onRouteChange('signin')}><FontAwesomeIcon icon={faSignOutAlt} /></p>
        </div>
      </div>
    </div>
  )
}

export default Navigation;

/*<nav style={{display:'flex', justifyContent:'flex-end'}}>
  <p onClick={()=>onRouteChange('signin')}>Logout</p>
</nav>*/
