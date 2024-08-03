import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import StudentForm from './pages/StudentForm/StudentForm';
import StudentDetails from './pages/StudentDetails/StudentDetails'; // Import the new page

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/student-details" element={<StudentDetails />} /> {/* Add the new route */}
      </Routes>
    </Router>
  );
}

export default App;
