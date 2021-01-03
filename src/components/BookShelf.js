import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Books from './Books';
import Header from './Header';
import { Shelves } from './../util/Shelves';

const BookShelf = ({ onMove, books }) => (
  <div className='list-books'>
    <div className='list-books-content'>
      <Header />
      <div>
        <div className='bookshelf'>
          {Shelves.map((shelf) => (
            <div key={shelf.id}>
              <h2 className='bookshelf-title'>{shelf.title}</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {books
                    .filter((book) => book.shelf === shelf.id)
                    .map((book) => {
                      return (
                        <Books
                          key={book.id}
                          changeShelf={(e) => onMove(book, e.target.value)}
                          bookImg={book.imageLinks}
                          bookThumb={book.imageLinks.smallThumbnail}
                          bookTitle={book.title}
                          bookAuthor={book.authors}
                          bookID={book.id}
                          bookshelf={book.shelf}
                        />
                      );
                    })}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <Link to='/search' className='open-search'>
      <button>Add book</button>
    </Link>
  </div>
);

BookShelf.propTypes = {
  onMove: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
};

export default BookShelf;
