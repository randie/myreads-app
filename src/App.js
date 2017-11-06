import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import _find from 'lodash/find';
import { getAll, update, search } from './BooksAPI';
import Bookcase from './Bookcase';
import Search from './Search';
import './App.css';

class App extends Component {
  state = {
    books: [],
    query: '',
    results: [],
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={this.homePage} />
          <Route path="/search" render={this.searchPage} />
          <Route render={this.notFoundPage} />
        </Switch>
      </Router>
    );
  }

  componentDidMount() {
    getAll().then(books => this.setState({ books }));
  }

  homePage = () => (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads App</h1>
      </div>
      <Bookcase
        books={this.state.books}
        moveBookToBookshelf={this.moveBookToBookshelf}
      />
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );

  searchPage = () => (
    <Search
      query={this.state.query}
      results={this.state.results}
      searchBooks={this.searchBooks}
      moveBookToBookshelf={this.moveBookToBookshelf}
    />
  );

  notFoundPage = () => <h2>404 Page not found</h2>;

  moveBookToBookshelf = book => event => {
    const bookshelf = event.target.value;
    update(book, bookshelf)
      .then(getAll)
      .then(books => {
        if (this.state.results.length > 0) {
          const results = this.state.results.map(resultBook => {
            if (resultBook.id === book.id) {
              resultBook.shelf = bookshelf;
            }
            return resultBook;
          });
          this.setState({ books, results });
        } else {
          this.setState({ books });
        }
      })
      .catch(console.error);
  };

  searchBooks = event => {
    const query = event.target.value.trim();
    this.setState({ query });

    // only hit the search API if query is not empty, otherwise
    // it's just a wasted round trip that will return a 403 error
    if (!query) {
      return this.setState({ results: [] });
    }

    const maxNumResults = 20;
    search(query, maxNumResults)
      .then(searchResults => {
        if (!searchResults || !!searchResults.error) {
          return this.setState({ results: [] });
        }

        const results = searchResults.map(book => {
          let foundBook = _find(this.state.books, { id: book.id }); // is this book in my library?
          if (foundBook) {
            book.shelf = foundBook.shelf;
          } else if (!book.shelf) {
            book.shelf = 'none';
          }
          return book;
        });

        this.setState({ results });
      })
      .catch(console.error);
  };
}

export default App;
