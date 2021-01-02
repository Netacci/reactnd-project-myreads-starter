import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Books extends Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };
  render() {
    const { shelfTitle, changeShelf, books } = this.props;
    return (
      <>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>{shelfTitle}</h2>
          <div className='bookshelf-books'>
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
                          backgroundImage: `url(${book.imageLinks.thumbnail})`,
                        }}
                      />
                      <div className='book-shelf-changer'>
                        <select
                          value={book.shelf}
                          onChange={
                            (e) => changeShelf(book, e.target.value)
                            // console.log(e.target.value, book)
                          }
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
                    <div className='book-title'>{book.title}</div>
                    <div className='book-authors'>{book.authors}</div>
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

export default Books;
