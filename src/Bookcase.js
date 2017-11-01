import React, { Component } from 'react';
import uniq from 'lodash.uniq';
import Bookshelf from './Bookshelf';

class Bookcase extends Component {
  render() {
    // bookshelves = ['currentlyReading', 'wantToRead', 'read']
    const bookshelves = uniq(this.props.books.map(book => book.shelf));

    return (
      <div>
        {bookshelves.map(bookshelf => (
          <Bookshelf
            title={bookshelf}
            books={this.props.books.filter(book => book.shelf === bookshelf)}
          />
        ))}
      </div>
    );
  }
}

export default Bookcase;
