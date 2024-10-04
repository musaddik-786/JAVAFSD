import React from 'react';
import './BookCard.css'; 

const BookCard = ({ title, author, isbn, publicationYear }) => {
  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p><strong>Author:</strong> {author}</p>
      <p><strong>ISBN:</strong> {isbn}</p>
      <p><strong>Published:</strong> {publicationYear}</p>
    </div>
  );
};

export default BookCard;
