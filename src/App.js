// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './component/SignUp';
import Login from './component/LogIn';
import Dashboard from './component/Dashboard';
import LoginSignupDashboard from './component/mainpage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/login"
            element={<Login onAuthentication={handleAuthentication} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/"
            element={<LoginSignupDashboard />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
