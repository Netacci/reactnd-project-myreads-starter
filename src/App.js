import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import SearchPage from './components/SearchPage';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    books: [],
    query: '',
  };

  // gets books from api
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  // move books between shelves
  handleMove = (book, shelf) => {
    this.setState((currentState) => ({
      books: currentState.books.map((c) => {
        if (c.id === book.id) c.shelf = shelf;

        return c;
      }),
    }));
  };

  // search books
  searchBooks = (query) => {
    BooksAPI.search(query).then((result) => {
      if (result.error) {
        this.setState({
          books: [],
          query: '',
        });
      } else {
        this.setState({
          books: result,
        });
      }
    });
    this.setState(() => ({
      query: query.trim(),
    }));
  };

  render() {
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <BookShelf books={this.state.books} onMove={this.handleMove} />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchPage
              books={this.state.books}
              updateBooks={this.searchBooks}
              changeShelf={this.handleMove}
              query={this.state.query}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
