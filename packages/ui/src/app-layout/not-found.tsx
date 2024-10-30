import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

// Styles (using React.CSSProperties)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column', // Explicitly define the string type
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa', // Light background color
    color: '#343a40', // Dark text color
    padding: '20px', // Add some padding
    boxSizing: 'border-box' // Ensure padding does not affect height
  },
  title: {
    fontSize: '5rem', // Increased font size for prominence
    fontWeight: 'bold',
    margin: '0', // Remove default margin
    color: '#dc3545', // Red color for the title
  },
  message: {
    fontSize: '1.5rem',
    margin: '1rem 0',
  },
  link: {
    marginTop: '1rem',
    textDecoration: 'none',
    color: '#007bff', // Blue color for the link
    fontSize: '1.25rem', // Slightly larger font size for the link
    fontWeight: '500', // Medium font weight for emphasis
    transition: 'color 0.2s', // Transition for hover effect
  },
};

export default NotFound;
