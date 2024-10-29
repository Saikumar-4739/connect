import React, { ReactNode, useState, useEffect } from 'react';
import { Layout, Menu, Typography, Input, Button, Tooltip, Drawer } from 'antd';
import {
  CalendarOutlined,
  MessageOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  RobotOutlined,
  UserOutlined,
  BulbOutlined,
  MoonOutlined,
  BellOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { logoutUser } from '../authSlice';
import { AppDispatch } from '../store';

import './app-layout.css';
import { useTheme } from '../theme-change/theme-context';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState('activity');
  const { isDarkTheme, toggleTheme } = useTheme(); // Access theme state and toggle function
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setSelectedKey(path || 'activity');
  }, [location]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: isDarkTheme ? '#001529' : '#ffffff',
      }}
    >
      <Sider
        className={isDarkTheme ? 'dark' : ''}
        theme={isDarkTheme ? 'dark' : 'light'}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            padding: '20px',
            color: isDarkTheme ? 'white' : 'black',
            textAlign: 'center',
          }}
        >
          <Menu
            theme={isDarkTheme ? 'dark' : 'light'}
            mode="inline"
            selectedKeys={[selectedKey]}
          >
            <Menu.Item
              key="notifications"
              icon={<BellOutlined />}
              onClick={showDrawer}
            >
              Notifications
            </Menu.Item>
          </Menu>
        </div>
        <Menu
          theme={isDarkTheme ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={[selectedKey]}
        >
          <Tooltip title="Community" placement="right">
            <Menu.Item key="community" icon={<TeamOutlined />}>
              <Link to="/community">Community</Link>
            </Menu.Item>
          </Tooltip>
          <Tooltip title="Chat" placement="right">
            <Menu.Item key="chat" icon={<MessageOutlined />}>
              <Link to="/chat">Chat</Link>
            </Menu.Item>
          </Tooltip>
          <Tooltip title="Calendar" placement="right">
            <Menu.Item key="calendar" icon={<CalendarOutlined />}>
              <Link to="/calendar">Calendar</Link>
            </Menu.Item>
          </Tooltip>
          <Tooltip title="Bot" placement="right">
            <Menu.Item key="bot" icon={<RobotOutlined />}>
              <Link to="/bot">Ask Maya</Link>
            </Menu.Item>
          </Tooltip>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: isDarkTheme ? '#001529' : '#ffffff',
          }}
        >
          {/* Wrap the Title in a Link to navigate to the home page */}
          <Link to="/">
            <Title
              level={3}
              style={{ margin: 0, color: isDarkTheme ? 'white' : 'black' }}
            >
              Connect{' '}
              <UserAddOutlined
                style={{ marginLeft: 8 }}
                aria-label="User add icon"
              />
              <span role="img" aria-label="praying hands"></span>
            </Title>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input.Search
              placeholder="Search"
              style={{
                width: 200,
                marginRight: '20px',
                borderRadius: '4px',
                background: isDarkTheme ? '#333' : '#f5f5f5',
                color: isDarkTheme ? 'white' : 'black',
                borderColor: isDarkTheme ? 'white' : '#d9d9d9',
              }}
              onSearch={(value) => console.log(value)}
            />
            <Link to="/settings">
              <Button
                type="text"
                icon={
                  <SettingOutlined
                    style={{ color: isDarkTheme ? 'white' : 'black' }}
                  />
                }
              />
            </Link>
            <Button
              type="text"
              icon={
                isDarkTheme ? (
                  <BulbOutlined style={{ color: 'gold' }} />
                ) : (
                  <MoonOutlined style={{ color: 'gray' }} />
                )
              }
              onClick={toggleTheme} // Use the toggleTheme function from context
            />
            <Button
              type="text"
              icon={
                <LogoutOutlined
                  style={{ color: isDarkTheme ? 'white' : 'black' }}
                />
              }
              onClick={handleLogout}
            />
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: isDarkTheme ? '#333' : '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '10px',
              }}
            >
              <UserOutlined
                style={{ color: isDarkTheme ? 'white' : 'black' }}
              />
            </div>
          </div>
        </Header>

        <Content
          style={{
            padding: '20px',
            background: isDarkTheme ? '#001529' : '#ffffff',
          }}
        >
          {children}
        </Content>
      </Layout>

      {/* Drawer for Notifications */}
      <Drawer
        title="Notifications"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: '20px' }}>
          <h3>Your Notifications</h3>
          <p>You have 3 new messages.</p>
          <p>Your activity was updated.</p>
        </div>
      </Drawer>
    </Layout>
  );
};

export default AppLayout;
