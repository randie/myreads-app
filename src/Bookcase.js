import React, { Component } from 'react';
import uniq from 'lodash.uniq';
import Bookshelf from './Bookshelf';

class Bookcase extends Component {
  render() {
    const { books, moveBookToBookshelf } = this.props;

    //const bookshelves = uniq(books.map(book => book.shelf));
    const bookshelves = ['currentlyReading', 'wantToRead', 'read'];

    return (
      <div>
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
