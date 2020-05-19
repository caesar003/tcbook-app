import React from 'react';

const Members = ({members}) => {

  return (
    <>
    {
      members.map((member, i) =>{
        return (
          <div key={members[i].id} className="container">
            <h3>{members[i].username}</h3>
          </div>
        );
      })
    }

    </>
  )
}

export default Members;
