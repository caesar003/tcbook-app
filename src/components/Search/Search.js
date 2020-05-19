import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const Search = () => {
  return (
    <div className="container pt-2">
      <input autoComplete="off" type="text" className="form-control" name="search" />
      <div className="container-fluid mt-2">
        <Tabs
          defaultActiveKey="all"
          transition={false}
        >
          <Tab eventKey="all" title="All">
            <p>tab 1 </p>
          </Tab>

          <Tab eventKey="user" title="Users">
            <p>tab2</p>
          </Tab>

          <Tab eventKey="posts" title="Posts">
            <p>tab 3</p>
          </Tab>

        </Tabs>
      </div>
    </div>
  )
}

export default Search;
