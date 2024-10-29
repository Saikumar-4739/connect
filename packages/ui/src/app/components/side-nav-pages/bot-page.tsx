import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed: npm install axios
import { Layout, Input, Button, List, Typography, Spin, notification } from 'antd'; // Importing antd components
import '../style-sheet/bot-page.css'; // Import the CSS stylesheet

const { Content } = Layout;
const { Text } = Typography;

const BotPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') {
      notification.warning({
        message: 'Empty Message',
        description: 'Please type a message before sending.',
      });
      return;
    }

    const userMessage = { sender: 'You', text: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Use an environment variable for your API URL
    const apiUrl = process.env.REACT_APP_AURORA_GPT_API_URL || 'https://api.auroragpt.com/v1/chat'; // Example placeholder URL

    try {
      const response = await axios.post(apiUrl, {
        message: inputValue,
      });

      const botMessage = {
        sender: 'Bot',
        text: response.data.reply || 'Sorry, I could not understand that.',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching the bot response:', error);
      const errorMessage = {
        sender: 'Bot',
        text: 'Sorry, I could not respond. Please try again later.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ height: '90vh', overflow: 'hidden' }}>
      <Content style={{ padding: '10px', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
        <List
          bordered
          dataSource={messages}
          renderItem={(msg, index) => (
            <List.Item
              key={index}
              style={{ background: msg.sender === 'You' ? '#e6f7ff' : '#ffffff', borderColor: '#ffffff' }}
            >
              <Text strong>{msg.sender}:</Text> {msg.text}
            </List.Item>
          )}
          style={{ flex: 1, overflowY: 'auto', marginBottom: '10px', borderColor: '#ffffff' }}
        />
        {isLoading && <Spin style={{ margin: '10px auto', textAlign: 'center' }} />}
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSendMessage}
            placeholder="Type your message..."
            style={{ flex: 1, marginRight: '10px', border: '1px solid black' }} // Added black border
          />
          <Button
            type="primary"
            onClick={handleSendMessage}
            style={{ border: '1px solid black' }} // Added black border
          >
            Send
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default BotPage;
