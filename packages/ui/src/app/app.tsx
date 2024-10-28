import React from 'react';
import './app.module.css';
import LoginForm from './components/login-page';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { Route, Routes } from 'react-router-dom'; // Use BrowserRouter
import Home from './components/homepage';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}> {/* Wrap your component with Provider */}
        <Layout style={{ minHeight: '100vh' }}>
          <Content style={{ padding: '20px' }}>
            <Routes>
              <Route path="/" element={<LoginForm />} /> {/* Login route */}
              <Route path="/home" element={<Home />} /> {/* Home route */}
              {/* Add more routes as needed */}
            </Routes>
          </Content>
        </Layout>
    </Provider>
  );
};

export default App;
