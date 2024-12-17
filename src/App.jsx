import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [user, setUser] = useState(null); // Global state to store the logged in user

  const handleLoginSuccess = (userData) => {
    setUser(userData); // Stores the logged in user in the global state
  }

  return (
    <Router basename="/time-to-shine">
      <Routes>
        <Route path="/" element={<HomePage onLoginSuccess={handleLoginSuccess}/>} />
        <Route path="/profile" element={<ProfilePage user={user}/>} />
      </Routes>
    </Router>
  );
}

export default App;
