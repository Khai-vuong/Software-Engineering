import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../components/css/Hero.css';

import img2 from '../assets/images/img2.png';

function AppGuestHero() {
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
              <h1>Người Dùng Khách</h1>
              <a className="btn btn-primary" href={'/login'}> Đăng nhập <i className="fas fa-chevron-right"></i></a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AppGuestHero;