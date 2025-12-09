import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand octofit-navbar">
        <div className="navbar-logo">
          <img src="/octofitapp-small.svg" alt="Octofit Logo" height="40" />
        </div>
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="/">Activities</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
        </ul>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
