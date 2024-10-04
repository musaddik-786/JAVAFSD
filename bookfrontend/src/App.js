import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Page/Homepage/Homepage';
import Books from './Page/Book/Book';
import LoginPage from './Page/LoginPage/LoginPage';
import AdminDashboard from './Page/AdminDashboard/AdminDashboard';
import RegisterPage from './Page/RegisterPage/RegisterPage';

function App() {
  return (
<Router>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/books" element={<Books />} /> 
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        </Routes>


    </Router>
  );
}

export default App;
