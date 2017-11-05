import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst.js';

class Book extends Component {
  render() {
    const { book, bookshelves, moveBookToBookshelf } = this.props;
    const bookCoverStyle = {
      width: 128,
      height: 193,
      backgroundImage: `url(${book.imageLinks.thumbnail})`,
    };

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={bookCoverStyle} />
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={moveBookToBookshelf}>
                <option value="none" disabled>
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
                <option value="xnone">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
          <div className="book-authors">id: {book.id}</div>
        </div>
      </li>
    );
  }
}

export default Book;
