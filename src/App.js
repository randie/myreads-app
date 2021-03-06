import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import _find from 'lodash/find';
import { getAll, update, search } from './BooksAPI';
import Layout from './Layout';
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
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" render={this.homePage} />
            <Route path="/search" render={this.searchPage} />
            <Route render={this.notFoundPage} />
          </Switch>
        </Router>
      </Layout>
    );
  }

  componentDidMount() {
    getAll().then(books => this.setState({ books }));
  }

  homePage = () => (
    <div>
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

  notFoundPage = () => <h2 class="app-message">404 Page not found</h2>;

  moveBookToBookshelf = book => event => {
    const bookshelf = event.target.value;
    update(book, bookshelf)
      .then(getAll)
      .then(books => {
        // update the state of the books in the bookcase and
        // if there are search result books, update those too
        if (_find(this.state.results, { id: book.id })) {
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
    // it's a wasted round trip that will return a 403 error
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
          let libraryBook = _find(this.state.books, { id: book.id }); // is this book in my library?
          if (libraryBook) {
            book.shelf = libraryBook.shelf;
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
