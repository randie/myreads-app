import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { getAll, update, search } from './BooksAPI';
import Bookcase from './Bookcase';
import './App.css';

class App extends Component {
  state = {
    books: [],
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={this.homePage} />
          <Route path="/search" render={this.searchPage} />
          <Route render={this.notFoundPage} />
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    getAll().then(books => this.setState({ books }));
  }

  homePage = () => (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Bookcase books={this.state.books} />
      </div>
      <div className="open-search">
        <a href="/search">Add a book</a>
      </div>
    </div>
  );

  searchPage = () => (
    <div className="search-books">
      <div className="search-books-bar">
        <a href="/" className="close-search">
          Close
        </a>
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
}

export default App;
