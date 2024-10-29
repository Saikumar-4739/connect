import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootState } from './components/store';
import Home from './components/homepage';
import LoginForm from './components/login-page';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />} 
      />
      <Route 
        path="/home" 
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
};

export default App;