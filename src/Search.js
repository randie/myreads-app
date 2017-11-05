import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {
  render() {
    const { query, results, searchBooks, moveBookToBookshelf } = this.props;
    const bookshelves = ['currentlyReading', 'wantToRead', 'read'];

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={searchBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map(book => (
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

export default Search;
