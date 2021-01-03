import React from 'react';
import { PropTypes } from 'prop-types';

const Books = ({
  changeShelf,
  bookImg,
  bookThumb,
  bookTitle,
  bookAuthor,
  bookID,
  bookshelf,
}) => (
  <li key={bookID}>
    <div className='book'>
      <div className='book-top'>
        <div
          className='book-cover'
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${bookImg ? bookThumb : ''})`,
          }}
        />
        <div className='book-shelf-changer'>
          <select value={bookshelf} onChange={changeShelf}>
            <option value='move' disabled>
              Move to...
            </option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{bookTitle ? bookTitle : 'No Title'}</div>
      <div className='book-authors'>
        {bookAuthor ? bookAuthor.join(', ') : 'No authors'}
      </div>
    </div>
  </li>
);

Books.propTypes = {
  changeShelf: PropTypes.func.isRequired,
};

export default Books;
