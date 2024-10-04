// import React, { useState, useEffect } from 'react';
// import NormalHeader from '../../Component/Header/NormalHeader';

// const AdminDashboard = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [book, setBook] = useState({
//     title: '',
//     author: '',
//     publishedDate: '',
//     publicationYear: '',
//     isbn: '',
//   });

//   const [newBook, setNewBook] = useState({
//     isbn: '',
//     title: '',
//     author: '',
//     publicationYear: '',
//   });

//   const [fetchIsbn, setFetchIsbn] = useState('');
//   const [fetchedBook, setFetchedBook] = useState(null);

//   const fetchBooks = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/books");
//       const data = await response.json();
//       setBooks(data);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleSelectChange = (e) => {
//     const selectedISBN = e.target.value;
//     const bookToUpdate = books.find((b) => b.isbn === selectedISBN);
//     setSelectedBook(bookToUpdate);
//     setBook(bookToUpdate);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBook((prevBook) => ({
//       ...prevBook,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { publishedDate, ...updateBookData } = book;
//     const token = localStorage.getItem('token');

//     updateBookData.isbn = book.isbn;

//     console.log('Updating book with data:', updateBookData);

//     try {
//       const response = await fetch(`http://localhost:8080/api/books/update/${book.isbn}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//         body: JSON.stringify(updateBookData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error response:', errorData);
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       console.log('Book updated successfully:', data);
//       fetchBooks();
//     } catch (error) {
//       console.error('Error updating book:', error);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedBook) {
//       alert('Please select a book to delete');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     const isbnToDelete = selectedBook.isbn;

//     try {
//       const response = await fetch(`http://localhost:8080/api/books/delete/${isbnToDelete}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': token,
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error deleting book:', errorData);
//         throw new Error('Network response was not ok');
//       }

//       console.log('Book deleted successfully');
//       fetchBooks();
//       setSelectedBook(null);
//       setBook({ title: '', author: '', publishedDate: '', publicationYear: '', isbn: '' });
//     } catch (error) {
//       console.error('Error deleting book:', error);
//     }
//   };

//   const handleAddBookChange = (e) => {
//     const { name, value } = e.target;
//     setNewBook((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddBookSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');

//     try {
//       const response = await fetch(`http://localhost:8080/api/books`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//         body: JSON.stringify(newBook),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error adding book:', errorData);
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       console.log('Book added successfully:', data);
//       fetchBooks();
//       setNewBook({ isbn: '', title: '', author: '', publicationYear: '' });
//     } catch (error) {
//       console.error('Error adding book:', error);
//     }
//   };

//   const handleFetchBook = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/books/${fetchIsbn}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error fetching book:', errorData);
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setFetchedBook(data);
//       setBook(data);
//       console.log('Fetched book successfully:', data);
//     } catch (error) {
//       console.error('Error fetching book:', error);
//     }
//   };

//   return (
//     <>
//       <NormalHeader />
//       <div className="admin-dashboard">
//         <h2 className="dashboard-title">Fetch and Update Book by ISBN</h2>
//         <div className="fetch-book-section">
//           <label className="fetch-book-label">
//             Enter Book ISBN:
//             <input
//               type="text"
//               className="fetch-book-input"
//               value={fetchIsbn}
//               onChange={(e) => setFetchIsbn(e.target.value)}
//             />
//           </label>
//           <button className="fetch-book-button" onClick={handleFetchBook}>Fetch Book</button>
//         </div>

//         {fetchedBook && (
//           <div className="fetched-book-details">
//             <h3 className="fetched-book-title">Fetched Book Details:</h3>
//             <p>Title: {fetchedBook.title}</p>
//             <p>Author: {fetchedBook.author}</p>
//             <p>ISBN: {fetchedBook.isbn}</p>
//             <p>Publication Year: {fetchedBook.publicationYear}</p>
//           </div>
//         )}

//         <h2 className="update-book-title">Update Book</h2>
//         <label className="update-book-label">
//           Select Book ISBN:
//           <select className="update-book-select" onChange={handleSelectChange} value={selectedBook ? selectedBook.isbn : ''}>
//             <option value="">Select a book</option>
//             {books.map((book) => (
//               <option key={book.isbn} value={book.isbn}>
//                 {book.title} - {book.isbn}
//               </option>
//             ))}
//           </select>
//         </label>

//         {selectedBook && (
//           <form className="update-book-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label className="form-label">
//                 Title:
//                 <input
//                   type="text"
//                   className="form-input"
//                   name="title"
//                   value={book.title}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//             </div>
//             <div className="form-group">
//               <label className="form-label">
//                 Author:
//                 <input
//                   type="text"
//                   className="form-input"
//                   name="author"
//                   value={book.author}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//             </div>
//             <div className="form-group">
//               <label className="form-label">
//                 Published Date:
//                 <input
//                   type="date"
//                   className="form-input"
//                   name="publishedDate"
//                   value={book.publishedDate}
//                   onChange={handleChange}
//                   required
//                   readOnly
//                 />
//               </label>
//             </div>
//             <div className="form-group">
//               <label className="form-label">
//                 Publication Year:
//                 <input
//                   type="text"
//                   className="form-input"
//                   name="publicationYear"
//                   value={book.publicationYear}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//             </div>
//             <button type="submit" className="update-book-button">Update Book</button>
//           </form>
//         )}

//         <h2 className="add-book-title">Add New Book</h2>
//         <form className="add-book-form" onSubmit={handleAddBookSubmit}>
//           <div className="form-group">
//             <label className="form-label">
//               ISBN:
//               <input
//                 type="text"
//                 className="form-input"
//                 name="isbn"
//                 value={newBook.isbn}
//                 onChange={handleAddBookChange}
//                 required
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             <label className="form-label">
//               Title:
//               <input
//                 type="text"
//                 className="form-input"
//                 name="title"
//                 value={newBook.title}
//                 onChange={handleAddBookChange}
//                 required
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             <label className="form-label">
//               Author:
//               <input
//                 type="text"
//                 className="form-input"
//                 name="author"
//                 value={newBook.author}
//                 onChange={handleAddBookChange}
//                 required
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             <label className="form-label">
//               Publication Year:
//               <input
//                 type="text"
//                 className="form-input"
//                 name="publicationYear"
//                 value={newBook.publicationYear}
//                 onChange={handleAddBookChange}
//                 required
//               />
//             </label>
//           </div>
//           <button type="submit" className="add-book-button">Add Book</button>
//         </form>

//         <h2 className="delete-book-title">Delete Book</h2>
//         <button className="delete-book-button" onClick={handleDelete}>Delete Selected Book</button>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import NormalHeader from '../../Component/Header/NormalHeader';
// import './AdminDashboard.css'; // Make sure to import your CSS file
// import Modal from '../../Component/Modal/Modal'


// const AdminDashboard = () => {
//     // Existing state variables
//     const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [book, setBook] = useState({
//     title: '',
//     author: '',
//     publishedDate: '',
//     publicationYear: '',
//     isbn: '',
//   });

//   const [newBook, setNewBook] = useState({
//     isbn: '',
//     title: '',
//     author: '',
//     publicationYear: '',
//   });

//   const [fetchIsbn, setFetchIsbn] = useState('');
//   const [fetchedBook, setFetchedBook] = useState(null);

//   const fetchBooks = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/books");
//       const data = await response.json();
//       setBooks(data);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleSelectChange = (e) => {
//     const selectedISBN = e.target.value;
//     const bookToUpdate = books.find((b) => b.isbn === selectedISBN);
//     setSelectedBook(bookToUpdate);
//     setBook(bookToUpdate);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBook((prevBook) => ({
//       ...prevBook,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { publishedDate, ...updateBookData } = book;
//     const token = localStorage.getItem('token');
//     updateBookData.isbn = book.isbn;

//     try {
//       const response = await fetch(`http://localhost:8080/api/books/update/${book.isbn}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//         body: JSON.stringify(updateBookData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error response:', errorData);
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       fetchBooks();
//     } catch (error) {
//       console.error('Error updating book:', error);
//     }
//   };

//   // const handleDelete = async () => {
//   //   if (!selectedBook) {
//   //     alert('Please select a book to delete');
//   //     return;
//   //   }

//   //   const token = localStorage.getItem('token');
//   //   const isbnToDelete = selectedBook.isbn;

//   //   try {
//   //     const response = await fetch(`http://localhost:8080/api/books/delete/${isbnToDelete}`, {
//   //       method: 'DELETE',
//   //       headers: {
//   //         'Authorization': token,
//   //       },
//   //     });

//   //     if (!response.ok) {
//   //       const errorData = await response.json();
//   //       console.error('Error deleting book:', errorData);
//   //       throw new Error('Network response was not ok');
//   //     }

//   //     fetchBooks();
//   //     setSelectedBook(null);
//   //     setBook({ title: '', author: '', publishedDate: '', publicationYear: '', isbn: '' });
//   //   } catch (error) {
//   //     console.error('Error deleting book:', error);
//   //   }
//   // };
//   const handleDelete = () => {
//     if (!selectedBook) {
//       alert('Please select a book to delete');
//       return;
//     }
//     setIsModalOpen(true); // Open the modal to confirm deletion
//   };

//   const confirmDelete = async () => {
//     const token = localStorage.getItem('token');
//     const isbnToDelete = selectedBook.isbn;

//     try {
//       const response = await fetch(`http://localhost:8080/api/books/delete/${isbnToDelete}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': token,
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error deleting book:', errorData);
//         throw new Error('Network response was not ok');
//       }

//       fetchBooks(); // Refresh the book list
//       setSelectedBook(null); // Clear the selected book
//     } catch (error) {
//       console.error('Error deleting book:', error);
//     } finally {
//       setIsModalOpen(false); // Close the modal after operation
//     }
//   };

//   const handleAddBookChange = (e) => {
//     const { name, value } = e.target;
//     setNewBook((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddBookSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     try {
//       const response = await fetch(`http://localhost:8080/api/books`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//         body: JSON.stringify(newBook),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error adding book:', errorData);
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       fetchBooks();
//       setNewBook({ isbn: '', title: '', author: '', publicationYear: '' });
//     } catch (error) {
//       console.error('Error adding book:', error);
//     }
//   };

//   const handleFetchBook = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/books/${fetchIsbn}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error fetching book:', errorData);
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setFetchedBook(data);
//       setBook(data);
//     } catch (error) {
//       console.error('Error fetching book:', error);
//     }
//   };

//   return (
//     <>
//       <NormalHeader />
//       <div className="admin-dashboard">
//         <h2 className="dashboard-title">Admin Dashboard</h2>

//         <div className="card-container">
//           {/* Fetch Book Card */}
//           <div className="card">
//             <h3 className="card-title">Fetch Book by ISBN</h3>
//             <div className="card-content">
//               <input
//                 type="text"
//                 className="fetch-book-input"
//                 value={fetchIsbn}
//                 onChange={(e) => setFetchIsbn(e.target.value)}
//                 placeholder="Enter ISBN"
//               />
//               <button className="card-button" onClick={handleFetchBook}>Fetch</button>
//               {fetchedBook && (
//                 <div className="fetched-book-details">
//                   <p>Title: {fetchedBook.title}</p>
//                   <p>Author: {fetchedBook.author}</p>
//                   <p>ISBN: {fetchedBook.isbn}</p>
//                   <p>Publication Year: {fetchedBook.publicationYear}</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Update Book Card */}
//           <div className="card">
//             <h3 className="card-title">Update Book</h3>
//             <select className="update-book-select" onChange={handleSelectChange} value={selectedBook ? selectedBook.isbn : ''}>
//               <option value="">Select a book</option>
//               {books.map((book) => (
//                 <option key={book.isbn} value={book.isbn}>
//                   {book.title} - {book.isbn}
//                 </option>
//               ))}
//             </select>
//             {selectedBook && (
//               <form className="update-book-form" onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   className="form-input"
//                   name="title"
//                   value={book.title}
//                   onChange={handleChange}
//                   required
//                   placeholder="Title"
//                 />
//                 <input
//                   type="text"
//                   className="form-input"
//                   name="author"
//                   value={book.author}
//                   onChange={handleChange}
//                   required
//                   placeholder="Author"
//                 />
//                 <input
//                   type="text"
//                   className="form-input"
//                   name="publicationYear"
//                   value={book.publicationYear}
//                   onChange={handleChange}
//                   required
//                   placeholder="Publication Year"
//                 />
//                 <button type="submit" className="card-button">Update</button>
//               </form>
//             )}
//           </div>

//           {/* Add Book Card */}
//           <div className="card">
//             <h3 className="card-title">Add New Book</h3>
//             <form className="add-book-form" onSubmit={handleAddBookSubmit}>
//               <input
//                 type="text"
//                 className="form-input"
//                 name="isbn"
//                 value={newBook.isbn}
//                 onChange={handleAddBookChange}
//                 required
//                 placeholder="ISBN"
//               />
//               <input
//                 type="text"
//                 className="form-input"
//                 name="title"
//                 value={newBook.title}
//                 onChange={handleAddBookChange}
//                 required
//                 placeholder="Title"
//               />
//               <input
//                 type="text"
//                 className="form-input"
//                 name="author"
//                 value={newBook.author}
//                 onChange={handleAddBookChange}
//                 required
//                 placeholder="Author"
//               />
//               <input
//                 type="text"
//                 className="form-input"
//                 name="publicationYear"
//                 value={newBook.publicationYear}
//                 onChange={handleAddBookChange}
//                 required
//                 placeholder="Publication Year"
//               />
//               <button type="submit" className="card-button">Add Book</button>
//             </form>
//           </div>

//           {/* Delete Book Card */}
//           <div className="card">
//             <h3 className="card-title">Delete Book</h3>
//             <button className="card-button" onClick={handleDelete}>Delete Selected Book</button>

//  {/* Modal for deletion confirmation */}
//  <Modal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)} // Close modal
//           onConfirm={confirmDelete} // Confirm delete
//           message={`Are you sure you want to delete the book: ${selectedBook?.title}?`} // Dynamic message
//         />


//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import NormalHeader from '../../Component/Header/NormalHeader';
import './AdminDashboard.css'; // Make sure to import your CSS file
import Modal from '../../Component/Modal/Modal';
import Footer from '../Footer/Footer';

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      if (!response.ok) throw new Error('Failed to fetch books');
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
    setBook(bookToUpdate || { title: '', author: '', publishedDate: '', publicationYear: '', isbn: '' });
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
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8080/api/books/update/${book.isbn}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating book:', errorData);
        throw new Error('Failed to update book');
      }

      fetchBooks();
      setBook({ title: '', author: '', publishedDate: '', publicationYear: '', isbn: '' });
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = () => {
    if (!selectedBook) {
      alert('Please select a book to delete');
      return;
    }
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
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
        throw new Error('Failed to delete book');
      }

      fetchBooks();
      setSelectedBook(null);
    } catch (error) {
      console.error('Error deleting book:', error);
    } finally {
      setIsModalOpen(false);
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
        throw new Error('Failed to add book');
      }

      fetchBooks();
      setNewBook({ isbn: '', title: '', author: '', publicationYear: '' });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleFetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/books/${fetchIsbn}`);
      if (!response.ok) throw new Error('Failed to fetch book');
      const data = await response.json();
      setFetchedBook(data);
      setBook(data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  return (
    <>
      <NormalHeader />
      <div className="admin-dashboard">
        <h2 className="dashboard-title">Admin Dashboard</h2>

        <div className="card-container">
          {/* Fetch Book Card */}
          <div className="card">
            <h3 className="card-title">Fetch Book by ISBN</h3>
            <div className="card-content">
              <input
                type="text"
                className="fetch-book-input"
                value={fetchIsbn}
                onChange={(e) => setFetchIsbn(e.target.value)}
                placeholder="Enter ISBN"
              />
              <button className="card-button" onClick={handleFetchBook}>Fetch</button>
              {fetchedBook && (
                <div className="fetched-book-details">
                  <p>Title: {fetchedBook.title}</p>
                  <p>Author: {fetchedBook.author}</p>
                  <p>ISBN: {fetchedBook.isbn}</p>
                  <p>Publication Year: {fetchedBook.publicationYear}</p>
                </div>
              )}
            </div>
          </div>

          {/* Update Book Card */}
          <div className="card">
            <h3 className="card-title">Update Book</h3>
            <select className="update-book-select" onChange={handleSelectChange} value={selectedBook ? selectedBook.isbn : ''}>
              <option value="">Select a book</option>
              {books.map((book) => (
                <option key={book.isbn} value={book.isbn}>
                  {book.title} - {book.isbn}
                </option>
              ))}
            </select>
            {selectedBook && (
              <form className="update-book-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-input"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  required
                  placeholder="Title"
                />
                <input
                  type="text"
                  className="form-input"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  required
                  placeholder="Author"
                />
                <input
                  type="text"
                  className="form-input"
                  name="publicationYear"
                  value={book.publicationYear}
                  onChange={handleChange}
                  required
                  placeholder="Publication Year"
                />
                <button type="submit" className="card-button">Update</button>
              </form>
            )}
          </div>

          {/* Add Book Card */}
          <div className="card">
            <h3 className="card-title">Add New Book</h3>
            <form className="add-book-form" onSubmit={handleAddBookSubmit}>
              <input
                type="text"
                className="form-input"
                name="isbn"
                value={newBook.isbn}
                onChange={handleAddBookChange}
                required
                placeholder="ISBN"
              />
              <input
                type="text"
                className="form-input"
                name="title"
                value={newBook.title}
                onChange={handleAddBookChange}
                required
                placeholder="Title"
              />
              <input
                type="text"
                className="form-input"
                name="author"
                value={newBook.author}
                onChange={handleAddBookChange}
                required
                placeholder="Author"
              />
              <input
                type="text"
                className="form-input"
                name="publicationYear"
                value={newBook.publicationYear}
                onChange={handleAddBookChange}
                required
                placeholder="Publication Year"
              />
              <button type="submit" className="card-button">Add Book</button>
            </form>
          </div>

          {/* Delete Book Card */}
          <div className="card">
            <h3 className="card-title">Delete Book</h3>
            <button className="card-button" onClick={handleDelete}>Delete Book</button>
          </div>
        </div>

        {/* Modal for Confirmation */}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={confirmDelete}
            message={`Are you sure you want to delete "${selectedBook?.title}"?`}
          />
        )}
      </div>

      <Footer/>
    </>
  );
};

export default AdminDashboard;
