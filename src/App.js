import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { getAll, update, search } from './BooksAPI';
import Bookcase from './Bookcase';
import './App.css';

class App extends Component {
  state = {
    books: [],
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
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" placeholder="Search by title or author" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid" />
      </div>
    </div>
  );

  notFoundPage = () => <h2>404 Page not found</h2>;

  moveBookToBookshelf = book => event => {
    const bookshelf = event.target.value;
    update(book, bookshelf)
      .then(getAll)
      .then(books => this.setState({ books }));
  };
}

export default App;
