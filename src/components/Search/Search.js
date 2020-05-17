import React from 'react';

const Search = () => {
  return (
    <div className="container pt-2">
      <input autoComplete="off" type="text" className="form-control" name="search" />
      <div className="jumbotron mt-2">
        some text here
      </div>
    </div>
  )
}

export default Search;
