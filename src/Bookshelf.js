import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst.js';
import Book from './Book';

class Bookshelf extends Component {
  render() {
    const { title, books, bookshelves, moveBookToBookshelf } = this.props;

    // e.g. 'currentlyReading' => 'Currently Reading'
    const bookshelfTitle = upperFirst(title.replace(/([A-Z])/g, ' $1'));

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                key={book.id}
                book={book}
                bookshelves={bookshelves}
                moveBookToBookshelf={moveBookToBookshelf(book)}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
