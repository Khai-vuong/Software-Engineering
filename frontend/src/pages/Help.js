import Container from 'react-bootstrap/Container';
import '../components/css/Hero.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AppHelp() {
    return (
      <section id="hero" className="block hero-block">
        <Container fluid>
            <div className="title-holder">
                <h2>Hỗ trợ</h2>
            </div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Địa chỉ email</Form.Label>
                    <Form.Control type="email" placeholder="name@hcmut.edu.vn" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                    <Form.Label>Nội dung hỗ trợ</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
            <div className="title-holder">
                <Button variant="primary" type="submit">
                    Gửi
                </Button>
            </div>
        </Container>
      </section>
    );
  }
  
  export default AppHelp;