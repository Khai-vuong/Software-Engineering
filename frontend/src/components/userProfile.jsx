// src/components/UserCard.jsx
import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography } from 'antd';

const { Title, Text } = Typography;

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Card style={styles.card}>
      <Title level={2}>User Information</Title>
      <Text strong>Name: </Text>
      <Text>{user.name}</Text>
      <br />
      <Text strong>Email: </Text>
      <Text>{user.email}</Text>
      <br />
      <Text strong>Phone: </Text>
      <Text>{user.phone}</Text>
      <br />
      <Text strong>Address: </Text>
      <Text>{user.address}</Text>
    </Card>
  );
};

const styles = {
  card: {
    width: 400,
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    borderRadius: '10px',
    align: 'left',
  },
};

export default UserInfo;
