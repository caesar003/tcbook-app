import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const NavButton = ({onRouteChange, route, icon}) => {
  return (
    <div className={`col text-center`}>
      <p
        onClick={
          route==='signout'?
            ()=> onRouteChange()
          :
            ()=> onRouteChange(route)}>
        <FontAwesomeIcon icon={icon} />
      </p>
    </div>
  )
}

export default NavButton;
