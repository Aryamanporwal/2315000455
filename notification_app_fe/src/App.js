import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PriorityInbox from './pages/PriorityInbox';
import AllNotifications from './pages/AllNotifications';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="nav-bar">
        <h1 className="nav-title">Campus Connect</h1>
        <Link to="/" className="nav-link">Priority Inbox</Link>
        <Link to="/all" className="nav-link">All Notifications</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PriorityInbox />} />
        <Route path="/all" element={<AllNotifications />} />
      </Routes>
    </Router>
  );
}

export default App;