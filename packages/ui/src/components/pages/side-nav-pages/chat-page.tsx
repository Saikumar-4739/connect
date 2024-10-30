import React, { useState } from 'react';
import { Input, Button, List, Typography, Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ChatPage: React.FC = () => {
  const [participants] = useState(['Alice', 'Bob', 'Charlie', 'David', 'Eve']);
  const [messages, setMessages] = useState<{ user: string; text: string; type: string; file?: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleUserSelect = (user: string) => {
    setSelectedUser(user);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      setMessages([...messages, { user: selectedUser, text: newMessage, type: 'text' }]);
      setNewMessage('');
    }
  };

  const handleFileUpload = (file: File) => {
    if (selectedUser) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileUrl = reader.result as string;
        setMessages([...messages, { user: selectedUser, text: file.name, type: 'file', file: fileUrl }]);
      };
      reader.readAsDataURL(file);
    } else {
      message.warning('Please select a user to send a file.');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', margin: '20px 0' }}>
        {/* Chat Page */}
      </Typography.Title>

      <Row style={{ flex: 1, margin: 0 }}>
        <Col xs={24} sm={8} style={{ padding: '10px', borderRight: '1px solid #f0f0f0', height: '100%', overflowY: 'auto' }}>
          <Typography.Title level={4}>Participants</Typography.Title>
          <List
            bordered
            dataSource={participants}
            renderItem={(user) => (
              <List.Item
                key={user}
                onClick={() => handleUserSelect(user)}
                style={{
                  cursor: 'pointer',
                  background: selectedUser === user ? '#e6f7ff' : '',
                }}
              >
                {user}
              </List.Item>
            )}
          />
        </Col>

        <Col xs={24} sm={16} style={{ padding: '10px', height: '100%', overflowY: 'auto' }}>
          <Typography.Title level={4}>
            Chat with {selectedUser || 'Select a user'}
          </Typography.Title>
          {selectedUser ? (
            <>
              <div style={{ marginBottom: '20px', maxHeight: '60vh', overflowY: 'auto', border: '1px solid #d9d9d9', padding: '10px' }}>
                <List
                  dataSource={messages.filter((msg) => msg.user === selectedUser || msg.type === 'file')}
                  renderItem={(msg, index) => (
                    <List.Item key={index}>
                      <strong>{msg.user}: </strong>
                      {msg.type === 'text' ? (
                        msg.text
                      ) : (
                        <a href={msg.file} target="_blank" rel="noopener noreferrer">
                          {msg.text} (Click to view)
                        </a>
                      )}
                    </List.Item>
                  )}
                />
              </div>

              <form onSubmit={handleMessageSubmit}>
                <Input.TextArea
                  rows={4}
                  value={newMessage}
                  onChange={handleMessageChange}
                  placeholder="Type your message..."
                  required
                  style={{ marginBottom: '10px' }}
                />
                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                  Send
                </Button>
                <Upload
                  showUploadList={false}
                  beforeUpload={(file) => {
                    handleFileUpload(file);
                    return false; // Prevent automatic upload
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload File</Button>
                </Upload>
              </form>
            </>
          ) : (
            <Typography.Text>Select a participant to start chatting!</Typography.Text>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ChatPage;
