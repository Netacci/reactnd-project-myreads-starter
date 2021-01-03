import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class SearchPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    updateBooks: PropTypes.func.isRequired,
  };

  render() {
    // destructuring
    const { changeShelf, books, query, updateBooks } = this.props;

    return (
      <>
        <div className='search-books'>
          <div className='search-books-bar'>
            <Link to='/' className='close-search'>
              Close
            </Link>
            <div className='search-books-input-wrapper'>
              <input
                type='text'
                placeholder='Search by title or author'
                value={query}
                onChange={(e) => updateBooks(e.target.value.toLowerCase())}
              />
            </div>
          </div>
          <div className='search-books-results'>
            <ol className='books-grid'>
              {books.map((book) => (
                <li key={book.id}>
                  <div className='book'>
                    <div className='book-top'>
                      <div
                        className='book-cover'
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            book.imageLinks
                              ? book.imageLinks.smallThumbnail
                              : ''
                          })`,
                        }}
                      />
                      <div className='book-shelf-changer'>
                        <select
                          value={
                            book.shelf ? book.shelf : (book.shelf = 'none')
                          }
                          onChange={(e) => changeShelf(book, e.target.value)}
                        >
                          <option value='move' disabled>
                            Move to...
                          </option>
                          <option value='currentlyReading'>
                            Currently Reading
                          </option>
                          <option value='wantToRead'>Want to Read</option>
                          <option value='read'>Read</option>
                          <option value='none'>None</option>
                        </select>
                      </div>
                    </div>
                    <div className='book-title'>
                      {book.title ? book.title : 'No Title'}
                    </div>
                    <div className='book-authors'>
                      {book.authors ? book.authors.join(', ') : 'No authors'}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </>
    );
  }
}
export default SearchPage;
