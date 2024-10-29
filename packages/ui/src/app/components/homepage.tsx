import React from 'react';
import { Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './authSlice';
import { AppDispatch } from './store';

const { Title } = Typography;

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      // After successful logout, redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally handle error (e.g., show error message to user)
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Title level={2}>Welcome to Connect</Title>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;