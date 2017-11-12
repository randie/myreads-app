import React from 'react';

export default props => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    {props.children}
  </div>
);
