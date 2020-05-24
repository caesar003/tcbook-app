import React from 'react';
import './Navigation.css';
import {
  faHome,
  faUserAlt,
  faSignOutAlt,
  faSearch,
  faUserFriends,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import NavButton from '../subComponents/NavButton/NavButton';

const Navigation = ({onRouteChange, currentRoute, signingOut, isSigningOut}) => {
  return (
    <>
    <div className="container-fluid fixed-bottom" id="navbar">
      <div className="row">
        <NavButton
          onClickAction={onRouteChange}
          currentRoute={currentRoute}
          route="home"
          icon={faHome}
        />
        <NavButton
          onClickAction={onRouteChange}
          currentRoute={currentRoute}
          route="search"
          icon={faSearch}
        />
        <NavButton
          onClickAction={onRouteChange}
          currentRoute={currentRoute}
          route="profile"
          icon={faUserAlt}
        />
        <NavButton
          onClickAction={onRouteChange}
          currentRoute={currentRoute}
          route="member"
          icon={faUserFriends}
        />
        <NavButton
          onClickAction={onRouteChange}
          currentRoute={currentRoute}
          route="message"
          icon={faEnvelope}
        />
        <NavButton
          onClickAction={isSigningOut}
          currentRoute={currentRoute}
          route=""
          icon={faSignOutAlt}
        />
      </div>
    </div>
    </>
  )
}

export default Navigation;
