import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Books from './Books';
import Header from './Header';
import { Shelves } from './../util/Shelves';

class BookShelf extends Component {
  static propTypes = {
    onMove: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
  };

  render() {
    const { onMove, books } = this.props;

    return (
      <>
        <div className='list-books'>
          <div className='list-books-content'>
            <Header />
            <div>
              {Shelves.map((shelf) => (
                <Books
                  key={shelf.id}
                  books={books.filter((book) => book.shelf === shelf.id)}
                  shelfTitle={shelf.title}
                  changeShelf={onMove}
                />
              ))}
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
