import '../components/css/Hero.css';
import img3 from '../assets/images/4 SCENE 1.png'
import {Form, Row, Col} from 'react-bootstrap';
import "../components/css/login.css"
import Container from 'react-bootstrap/Container';

function Login() {

  return (
    <section id="hero" className="block hero-block" style={{ margin: '80px 0px 0' }}>
    <Container fluid="sm">
    <Row>
      <Col>
        <img src={img3} alt=""></img>
      </Col>
      <form className="col">
      <div class="rounded-container">
        <div className='form-group mb-3' >
        <Form.Label htmlFor='username'>Username</Form.Label>
        <input type="email" className="form-control form-input" id="username"  placeholder='Username'/>
        </div>
        <div className='form-group mb-3'>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <input type="password" className="form-control form-input" id="password" placeholder='Password'/>
        </div>
        <div className='text-center'>
        <div className='form-group mb-3'>
        <button type="submit" class="btn btn-primary form-button" >Đăng Nhập</button>
        </div>
        </div>
        </div>
      </form>

    </Row>
    </Container>
    </section>
  );
}

export default Login;