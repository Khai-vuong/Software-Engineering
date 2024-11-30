import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../components/css/Hero.css';
import Button from 'react-bootstrap/Button';
import img3 from '../assets/images/img3.png'
import anonymous from '../assets/images/anonymous.png'
import img4 from '../assets/images/group.png'
import { Link } from 'react-router-dom';
function AppHero() {
  return (
    
    <section id="hero" className="block hero-block" style={{ margin: '30px 0px 0' }}>
      <Container fluid="sm" style={{maxWidth: '560px'}}>
        <Row className="justify-content-center" style={{width: 'auto'}}>
        <Image src={img3} />
        </Row>
        <Row style={{width: 'auto'}}>
          <Col>
            <div class="d-grid gap-2">
              <Link to="/guest">
                <Button as="a" href="google.com" variant="primary" size="lg">
                <Image src={anonymous} className="mb-2"/>
                <div style={{ color: 'black' }}>
                  Người Dùng Khách
                </div>
            </Button>
            </Link>
            </div>
          </Col>
          <Col>
            <div class="d-grid gap-2">
              <Link to="/login">
                <Button as="a" href="google.com" variant="primary" size="lg">
                <Image src={img4} className="mb-2" />
                <div style={{ color: 'black' }}>
                  Cán bộ và Sinh viên
                </div>
              </Button>
              </Link>
              {/* <Link to="/loginasstaff">
                <Button as="a" href="google.com" variant="primary" size="lg">
                <Image src={img4} className="mb-2" />
                <div style={{ color: 'black' }}>
                  nút thử cho SPSO
                </div>
              </Button>
              </Link> */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AppHero;