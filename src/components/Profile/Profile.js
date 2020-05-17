import React from 'react';

const Profile = ({user}) => {
  return(
    <div className="container mt-2">
      <ul className="list-group">
        <li className="list-group-item">{user.name}</li>
        <li className="list-group-item">TC batch {user.batch}</li>
        <li className="list-group-item">{user.email}</li>
      </ul>
    </div>
  )
}

export default Profile;
