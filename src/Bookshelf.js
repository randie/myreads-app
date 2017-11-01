import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst.js';

class Bookshelf extends Component {
  render() {
    // e.g. 'currentlyReading' => 'Currently Reading'
    const bookshelfTitle = upperFirst(
      this.props.title.replace(/([A-Z])/g, ' $1'),
    );

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <ol>
          {this.props.books.map(book => (
            <li>
              {book.title} ({book.shelf})
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Bookshelf;
