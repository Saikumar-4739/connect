import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Button, Modal, Form, Input } from 'antd';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../style-sheet/calender-page.css'; 

// Set up the localizer by providing the moment Object
const localizer = momentLocalizer(moment);

// Define a type for event objects
interface Event {
  title: string;
  start: Date;
  end: Date;
}

// Define a type for the selected date range
interface SelectedDate {
  start: Date;
  end: Date;
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedDate({ start, end });
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onFinish = (values: { title: string }) => {
    if (selectedDate) {
      const newEvent: Event = {
        title: values.title,
        start: selectedDate.start,
        end: selectedDate.end,
      };
      setEvents([...events, newEvent]);
      form.resetFields();
      setModalVisible(false);
    }
  };

  return (
    <div style={{ padding: '20px', height: '100vh', background: '#ffffff' }}>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: '80vh',
          margin: '20px',
          backgroundColor: 'white', // White background
          border: '2px solid white', // White border
          borderRadius: '8px', // Optional: Rounded corners
        }}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: '#e0f7fa', // Light blue background for events
            color: 'black', // Text color
            borderRadius: '5px',
            padding: '5px',
          },
        })}
      />

      <Modal
        title="Create Meeting"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Please input the meeting title!' }]}
          >
            <Input placeholder="Meeting Title" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendarPage;
