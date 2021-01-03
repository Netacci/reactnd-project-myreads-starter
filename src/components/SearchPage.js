import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import Books from './Books';

class SearchPage extends Component {
  static propTypes = {
    onMove: PropTypes.func.isRequired,
    allBooks: PropTypes.array.isRequired,
  };
  state = {
    books: [],
    query: '',
  };

  // search books
  searchBooks = (query) => {
    BooksAPI.search(query).then((response) => {
      if (query === '' || response.error) {
        this.setState({
          books: [],
          query: '',
        });
      } else {
        this.setState({
          books: response,
        });
      }
    });
    this.setState(() => ({
      query,
    }));
  };

  render() {
    // destructuring
    const { onMove, allBooks } = this.props;
    const { query, books } = this.state;

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
                onChange={(e) => this.searchBooks(e.target.value.toLowerCase())}
              />
            </div>
          </div>
          <div className='search-books-results'>
            <ol className='books-grid'>
              {books.map((book) => {
                const searchShelf = allBooks.find(
                  (searchbook) => searchbook.id === book.id
                );
                // console.log(searchShelf);

                return (
                  <Books
                    key={book.id}
                    changeShelf={(e) => onMove(book, e.target.value)}
                    bookImg={book.imageLinks}
                    bookThumb={book.imageLinks.smallThumbnail}
                    bookTitle={book.title}
                    bookAuthor={book.authors}
                    bookID={book.id}
                    bookshelf={
                      searchShelf
                        ? (book.shelf = searchShelf.shelf)
                        : (book.shelf = 'none')
                    }
                  />
                );
              })}
            </ol>
          </div>
        </div>
      </>
    );
  }
}
export default SearchPage;
