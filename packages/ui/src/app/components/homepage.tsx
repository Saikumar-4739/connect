// src/components/home.tsx
import React from 'react';
import { Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from './authSlice';

const { Title } = Typography;

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
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
