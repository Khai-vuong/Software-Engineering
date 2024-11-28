import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../components/css/Hero.css';

import img2 from '../assets/images/img2.png';

function AppHero() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user', {
          credentials: 'include', // Include credentials for session
        });

        if (!response.ok) {
          throw new Error('Failed to fetch username');
        }

        const data = await response.json();
        setUsername(data.name); // Set the username from the response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <section id="hero" className="block hero-block">
      <Container fluid>
        <Row>
          <Col sm={6}>
            <Image src={img2} />
          </Col>
          <Col sm={6}>
            <div className="title-holder">
              <br/><br/><br/><br/>
              <h2>Chào mừng bạn đến với BKPrinter</h2>
              {username && <h1>{username}</h1>}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AppHero;