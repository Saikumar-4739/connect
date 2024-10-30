import React, { useState } from 'react';
import { Tabs, Dropdown, Menu, Modal, Button } from 'antd';

const { TabPane } = Tabs;

const SettingsPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [, setDropdownVisible] = useState(false); // State for dropdown visibility

  const showModal = (content: string) => {
    setModalContent(content);
    setIsModalVisible(true);
    setDropdownVisible(false); // Close dropdown when modal opens
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => showModal('Appearance Settings')}>
        Appearance
      </Menu.Item>
      <Menu.Item onClick={() => showModal('Account Settings')}>
        Accounts
      </Menu.Item>
      <Menu.Item onClick={() => showModal('Privacy Settings')}>
        Privacy
      </Menu.Item>
      <Menu.Item onClick={() => showModal('About Connect')}>
        About Connect
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Settings" key="1">
          <Dropdown
            overlay={menu}
            placement="bottomCenter"
            trigger={['click']} // Specify that it should open on click
            onVisibleChange={(visible) => setDropdownVisible(visible)} // Control dropdown visibility
          >
            {/* Ensure only one child element here */}
            <Button onClick={() => setDropdownVisible(true)}>Open Settings</Button>
          </Dropdown>
        </TabPane>
      </Tabs>

      <Modal
        title="Settings"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered // Center the modal on the screen
      >
        <p>{modalContent}</p>
      </Modal>
    </>
  );
};

export default SettingsPage;
