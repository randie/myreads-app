import React, { Component } from 'react';
import Bookshelf from './Bookshelf';

class Bookcase extends Component {
  render() {
    const { books, moveBookToBookshelf } = this.props;
    const bookshelves = ['currentlyReading', 'wantToRead', 'read'];

    return (
      <div className="list-books-content">
        {bookshelves.map(bookshelf => (
          <Bookshelf
            key={bookshelf}
            title={bookshelf}
            books={books.filter(book => book.shelf === bookshelf)}
            bookshelves={bookshelves}
            moveBookToBookshelf={moveBookToBookshelf}
          />
        ))}
      </div>
    );
  }
}

export default Bookcase;
