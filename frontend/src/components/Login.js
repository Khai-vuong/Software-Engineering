import '../components/css/Hero.css';
import img3 from '../assets/images/4 SCENE 1.png'
import {Form, Row, Col} from 'react-bootstrap';
import "../components/css/login.css"
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // login(data.user.username);
      sessionStorage.setItem('username', data.user.username);
      navigate('/logedin');
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Incorrect username or password. Please try again.');
    }
  };

  return (
    <section id="hero" className="block hero-block" style={{ margin: '80px 0px 0' }}>
    <Container fluid="sm" style={{minHeight: '300px'}}>
    <Row>
      <Col>
        <img src={img3} alt=""></img>
      </Col>
      <form className="col" onSubmit={handleSubmit}>
      <div className="rounded-container">
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className='form-group mb-3' >
        <Form.Label htmlFor='username'>Username</Form.Label>
        <input 
          type="text"
          className="form-control form-input" 
          id="username"  
          placeholder='Username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className='form-group mb-3'>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <input 
          type="password" 
          className="form-control form-input" 
          id="password" 
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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