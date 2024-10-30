import React, { useState } from 'react';
import { Input, Button, List, Typography, Row, Col, Divider } from 'antd';

const sampleCommunities = [
  { id: 1, name: 'React Developers' },
  { id: 2, name: 'Web3 Enthusiasts' },
  { id: 3, name: 'AI Researchers' },
  { id: 4, name: 'Frontend Ninjas' },
  { id: 5, name: 'Backend Wizards' },
];

const CommunityPage: React.FC = () => {
  const [communities, setCommunities] = useState(sampleCommunities);
  const [newCommunity, setNewCommunity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleCommunityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommunity(e.target.value);
  };

  const handleCommunitySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCommunity.trim()) {
      const newCommunityData = {
        id: communities.length + 1,
        name: newCommunity,
      };
      setCommunities([...communities, newCommunityData]);
      setNewCommunity('');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCommunitySelect = (communityName: string) => {
    setSelectedCommunity(communityName);
    setMessages([]); // Clear messages when switching communities
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() && selectedCommunity) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Row style={{ flex: 1, margin: 0 }}>
        <Col xs={24} sm={8} style={{ padding: '10px', borderRight: '1px solid #f0f0f0', height: '100%' }}>
          <Typography.Title level={4}>Communities</Typography.Title>
          <Input
            placeholder="Search Communities"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: '20px' }}
          />
          <List
            bordered
            dataSource={filteredCommunities}
            renderItem={(community) => (
              <List.Item
                key={community.id}
                onClick={() => handleCommunitySelect(community.name)}
                style={{
                  cursor: 'pointer',
                  background: selectedCommunity === community.name ? '#e6f7ff' : '',
                }}
              >
                {community.name}
              </List.Item>
            )}
          />
          <Divider />
          <Typography.Title level={4}>Create a New Community</Typography.Title>
          <form onSubmit={handleCommunitySubmit} style={{ display: 'flex', marginBottom: '20px' }}>
            <Input
              type="text"
              value={newCommunity}
              onChange={handleCommunityChange}
              placeholder="Enter community name"
              required
              style={{ marginRight: '10px', flexGrow: 1 }}
            />
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </form>
        </Col>

        <Col xs={24} sm={16} style={{ padding: '10px', height: '100%', overflowY: 'auto' }}>
          {selectedCommunity ? (
            <>
              <Typography.Title level={4}>Messages in {selectedCommunity}</Typography.Title>
              <div style={{ marginBottom: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
                <List
                  bordered
                  dataSource={messages}
                  renderItem={(message, index) => (
                    <List.Item key={index}>
                      {message}
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
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </form>
            </>
          ) : (
            <Typography.Text>Select a community to start messaging!</Typography.Text>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CommunityPage;
