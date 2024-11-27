import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography } from 'antd';
import Container from 'react-bootstrap/Container';
const { Title, Text } = Typography;

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user');
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
    <section id="hero" className="block hero-block">
      <Container fluid>
      <Card style={styles.card}>
        <Title level={2} style={styles.title}>Thông tin người dùng</Title>
        <div style={styles.infoBox}>
            <Text strong>Tên: </Text>
            <Text>Tên</Text>
            <br />
            <Text strong>Email: </Text>
            <Text>email</Text>
            <br />
            <Text strong>Phone: </Text>
            <Text>phone</Text>
            <br />
            <Text strong>Số dư trang: </Text>
            <Text>balance</Text>
            <br />
            <Text strong>Địa chỉ: </Text>
            <Text>address</Text>
        </div>
        </Card>
      </Container>
    </section>
  );
};

const styles = {
  card: {
    width: 400,
    margin: '20px auto',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  infoBox: {
    padding: '16px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default UserInfo;