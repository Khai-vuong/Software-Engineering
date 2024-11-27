import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../components/css/Hero.css';

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img2 from '../assets/images/img2.png';

function AppLandingHero() {
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
              <div>
                <Link to="/choice">
                  <Button variant="primary">Đăng Nhập</Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AppLandingHero;