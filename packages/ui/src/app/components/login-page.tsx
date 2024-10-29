import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store'; // Adjust the import based on your store setup
import { loginUser } from './authSlice'; // Adjust the import based on your file structure
import { Form, Input, Button, Alert } from 'antd';

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (values: { email: string; password: string }) => {
    const credentials = { email: values.email, password: values.password };
    dispatch(loginUser(credentials) as any); // Use `as any` temporarily if necessary
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login</h1>
      <Form
        name="login"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Form.Item>
        
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form.Item>
      </Form>
      {error && (
        <Alert
          message="Error"
          description={typeof error === 'string' ? error : error.message}
          type="error"
          showIcon
          style={{ marginTop: '16px' }}
        />
      )}
    </div>
  );
};

export default LoginPage;
