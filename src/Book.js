import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst.js';

class Book extends Component {
  render() {
    const { book, moveBookToBookshelf } = this.props;
    const bookshelves = ['currentlyReading', 'wantToRead', 'read', 'none']; // for bookshelf selector

    const bookCoverStyle = {
      width: 128,
      height: 193,
    };

    // some books have no image thumbnail, so check first
    if (!!book.imageLinks) {
      bookCoverStyle.backgroundImage = `url(${book.imageLinks.thumbnail})`;
    }

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={bookCoverStyle} />
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={moveBookToBookshelf}>
              <option value="moveTo" disabled>
                Move to...
              </option>
              {bookshelves.map(bookshelf => (
                <option
                  key={bookshelf}
                  value={bookshelf}
                  disabled={bookshelf === book.shelf}
                >
                  {upperFirst(bookshelf.replace(/([A-Z])/g, ' $1'))}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

export default Book;
