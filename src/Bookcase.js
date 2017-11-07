import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst.js';
import Book from './Book';

class Bookcase extends Component {
  render() {
    const { books, moveBookToBookshelf } = this.props;
    const bookshelves = ['currentlyReading', 'wantToRead', 'read'];

    return (
      <div className="list-books-content">
        {bookshelves.map(bookshelf => {
          // e.g. 'currentlyReading' => 'Currently Reading'
          const bookshelfTitle = upperFirst(
            bookshelf.replace(/([A-Z])/g, ' $1'),
          );

          return (
            <div key={bookshelf} className="bookshelf">
              <h2 className="bookshelf-title">{bookshelfTitle}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter(book => book.shelf === bookshelf)
                    .map(book => (
                      <Book
                        key={book.id}
                        book={book}
                        moveBookToBookshelf={moveBookToBookshelf(book)}
                      />
                    ))}
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Bookcase;
