import React from 'react';
import { Route, BrowserRouter as Router, Routes  } from 'react-router-dom';
import LoginPage from './components/Login';
import HomePage from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import NonProtectedRoute from './components/NonProtectedRoute.js';

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={<NonProtectedRoute element={<LoginPage />} />}
      />
      <Route
        path="/home"
        element={<ProtectedRoute element={<HomePage />} />}
      />
    </Routes>
  </Router>
);

export default App;
