import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route, Switch } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import SearchPage from './components/SearchPage';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  // gets books from api
  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({
      books,
    });
  }

  // move books between shelves and update backend
  handleMove = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState((currentState) => ({
        books: currentState.books.map((c) => {
          if (c.id === book.id) c.shelf = shelf;

          return c;
        }),
      }));
    });
  };

  render() {
    return (
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <BookShelf books={this.state.books} onMove={this.handleMove} />
          </Route>
          <Route path='/search'>
            <SearchPage onMove={this.handleMove} allBooks={this.state.books} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
