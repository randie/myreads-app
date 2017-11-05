import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
      .then(books => this.setState({ books }))
      .catch(console.error);
  };

  searchBooks = event => {
    const query = event.target.value.trim();
    const maxNumResults = 20;

    this.setState({ query });
    search(query, maxNumResults)
      .then(results => {
        if (!results || !!results.error || !this.state.query.length) {
          return this.setState({ results: [] });
        }
        this.setState({ results });
      })
      .catch(console.error);
  };
}

export default App;
