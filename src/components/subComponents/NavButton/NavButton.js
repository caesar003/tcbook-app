import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const NavButton = ({
  onClickAction,
  currentRoute,
  route,
  icon,
}) => {
  return (
    <div className={`col text-center ${route === currentRoute?'current':''}`}>
      <p onClick={()=>onClickAction(route)}><FontAwesomeIcon icon={icon} /></p>
    </div>
  )
}

export default NavButton;
