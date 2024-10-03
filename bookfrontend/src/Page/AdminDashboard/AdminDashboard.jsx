import React, { useState, useEffect } from 'react';
import NormalHeader from '../../Component/Header/NormalHeader';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]); 
  const [selectedBook, setSelectedBook] = useState(null); 
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishedDate: '',
    publicationYear: '',
    isbn: '',
  });

  const [newBook, setNewBook] = useState({ 
    isbn: '',
    title: '',
    author: '',
    publicationYear: '',
  });

  const [fetchIsbn, setFetchIsbn] = useState(''); 
  const [fetchedBook, setFetchedBook] = useState(null); 


  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/books");
      const data = await response.json();
      setBooks(data); 
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  
  useEffect(() => {
    fetchBooks();
  }, []);

  
  const handleSelectChange = (e) => {
    const selectedISBN = e.target.value;
    const bookToUpdate = books.find((b) => b.isbn === selectedISBN);
    setSelectedBook(bookToUpdate); 
    setBook(bookToUpdate); 
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { publishedDate, ...updateBookData } = book; 
    const token = localStorage.getItem('token'); 

    updateBookData.isbn = book.isbn; 

    console.log('Updating book with data:', updateBookData);

    try {
      const response = await fetch(`http://localhost:8080/api/books/update/${book.isbn}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, 
        },
        body: JSON.stringify(updateBookData),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        console.error('Error response:', errorData);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Book updated successfully:', data);
      fetchBooks(); 
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  
  const handleDelete = async () => {
    if (!selectedBook) {
      alert('Please select a book to delete');
      return;
    }

    const token = localStorage.getItem('token');
    const isbnToDelete = selectedBook.isbn;

    try {
      const response = await fetch(`http://localhost:8080/api/books/delete/${isbnToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token, 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting book:', errorData);
        throw new Error('Network response was not ok');
      }

      console.log('Book deleted successfully');
      fetchBooks(); 
      setSelectedBook(null); 
      setBook({ title: '', author: '', publishedDate: '', publicationYear: '', isbn: '' }); 
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  
  const handleAddBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBookSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 

    try {
      const response = await fetch(`http://localhost:8080/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        console.error('Error adding book:', errorData);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Book added successfully:', data);
      fetchBooks(); 
      setNewBook({ isbn: '', title: '', author: '', publicationYear: '' }); 
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  
  const handleFetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/books/${fetchIsbn}`);
      if (!response.ok) {
        const errorData = await response.json(); 
        console.error('Error fetching book:', errorData);
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFetchedBook(data); 
      setBook(data); 
      console.log('Fetched book successfully:', data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  return (
    <>
      <NormalHeader />
      <div>
        <h2>Fetch and Update Book by ISBN</h2>
        <div>
          <label>
            Enter Book ISBN:
            <input
              type="text"
              value={fetchIsbn}
              onChange={(e) => setFetchIsbn(e.target.value)}
            />
          </label>
          <button onClick={handleFetchBook}>Fetch Book</button>
        </div>

        {fetchedBook && (
          <div>
            <h3>Fetched Book Details:</h3>
            <p>Title: {fetchedBook.title}</p>
            <p>Author: {fetchedBook.author}</p>
            <p>ISBN: {fetchedBook.isbn}</p>
            <p>Publication Year: {fetchedBook.publicationYear}</p>
          </div>
        )}

        <h2>Update Book</h2>
        <label>
          Select Book ISBN:
          <select onChange={handleSelectChange} value={selectedBook ? selectedBook.isbn : ''}>
            <option value="">Select a book</option>
            {books.map((book) => (
              <option key={book.isbn} value={book.isbn}>
                {book.title} - {book.isbn}
              </option>
            ))}
          </select>
        </label>

        {selectedBook && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Author:
                <input
                  type="text"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Published Date:
                <input
                  type="date"
                  name="publishedDate"
                  value={book.publishedDate}
                  onChange={handleChange}
                  required
                  readOnly
                />
              </label>
            </div>
            <div>
              <label>
                Publication Year:
                <input
                  type="text"
                  name="publicationYear"
                  value={book.publicationYear}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <button type="submit">Update Book</button>
          </form>
        )}

        <h2>Add New Book</h2>
        <form onSubmit={handleAddBookSubmit}>
          <div>
            <label>
              ISBN:
              <input
                type="text"
                name="isbn"
                value={newBook.isbn}
                onChange={handleAddBookChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleAddBookChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Author:
              <input
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleAddBookChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Publication Year:
              <input
                type="text"
                name="publicationYear"
                value={newBook.publicationYear}
                onChange={handleAddBookChange}
                required
              />
            </label>
          </div>
          <button type="submit">Add Book</button>
        </form>

        <h2>Delete Book</h2>
        <button onClick={handleDelete}>Delete Selected Book</button>
      </div>
    </>
  );
};

export default AdminDashboard;
