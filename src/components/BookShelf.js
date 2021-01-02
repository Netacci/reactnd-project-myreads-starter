import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Books from './Books';
import Header from './Header';

class BookShelf extends Component {
  static propTypes = {
    onMove: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
  };

  render() {
    const { onMove, books } = this.props;
    const currentlyReading = books.filter(
      (book) => book.shelf === 'currentlyReading'
    );
    const wantToRead = books.filter((book) => book.shelf === 'wantToRead');
    const read = books.filter((book) => book.shelf === 'read');

    return (
      <>
        <div className='list-books'>
          <div className='list-books-content'>
            <Header />
            <div>
              <Books
                books={currentlyReading}
                shelfTitle='Currently Reading'
                changeShelf={onMove}
              />

              <Books
                books={wantToRead}
                shelfTitle='Want to read'
                changeShelf={onMove}
              />

              <Books books={read} shelfTitle='Read' changeShelf={onMove} />
            </div>
          </div>
          <Link to='/search' className='open-search'>
            <button>Add book</button>
          </Link>
        </div>
      </>
    );
  }
}

export default BookShelf;
