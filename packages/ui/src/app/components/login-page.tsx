import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { loginUser } from './authSlice';
import { Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const { Title } = Typography;

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Initialize navigate
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const result = await dispatch(loginUser({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/home'); // Navigate to home page on successful login
    }
  };

  const errorMessage = typeof error === 'string' ? error : error?.message || 'An unknown error occurred';

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
      <Title level={2}>Login</Title>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ marginBottom: '10px' }}
      />
      <Input.Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ marginBottom: '10px' }}
      />
      <Button type="primary" onClick={handleLogin} disabled={loading} block>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;
