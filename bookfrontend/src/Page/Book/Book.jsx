import React, { useState, useEffect } from 'react';
import BookCard from '../../Component/BookCard/BookCard'; 

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("http://localhost:8080/api/books")
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="books-container">
      <h2>Available Books</h2>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }} 
      />
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <BookCard
              key={index}
              title={book.title}
              author={book.author}
              isbn={book.isbn}
              publicationYear={book.publicationYear}
            />
          ))
        ) : (
          <p>No books found.</p> 
        )}
      </div>
    </div>
  );
};

export default Books;
