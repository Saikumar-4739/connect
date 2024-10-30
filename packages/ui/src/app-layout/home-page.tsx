import React from 'react';
import { Typography } from 'antd';
import { TeamOutlined, MessageOutlined, CalendarOutlined, RobotOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Home: React.FC = () => {
  const sideNavItems = [
    { key: 'community', icon: <TeamOutlined />, label: 'Community', path: '/community' },
    { key: 'chat', icon: <MessageOutlined />, label: 'Chat', path: '/chat' },
    { key: 'calendar', icon: <CalendarOutlined />, label: 'Calendar', path: '/calendar' },
    { key: 'bot', icon: <RobotOutlined />, label: 'Ask Maya', path: '/bot' },
  ];

  return (
    <div style={styles.container}>
      <Title level={2}>Welcome to Connect!</Title>
      <Title level={4}>Explore our features:</Title>
      <div style={styles.navContainer}>
        {sideNavItems.map(item => (
          <div key={item.key} style={styles.item}>
            {item.icon} {/* Directly using the icon here */}
            <Link to={item.path} style={styles.link}>{item.label}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles for centering and navigation
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    minHeight: '100vh', // Full viewport height
    padding: '20px',
    textAlign: 'center', // Center text
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'center', // Center items horizontally
    flexWrap: 'wrap', // Allow wrapping for responsiveness
    marginTop: '20px', // Space above the navigation items
  },
  item: {
    display: 'flex',
    alignItems: 'center', // Center icon and text vertically
    justifyContent: 'center', // Center icon and text horizontally
    margin: '0 15px', // Add horizontal margin for gap between items
  },
  link: {
    textDecoration: 'none', // Remove underline from link
    color: '#007bff', // Link color
    marginLeft: '8px', // Space between icon and text
  },
};

export default Home;
