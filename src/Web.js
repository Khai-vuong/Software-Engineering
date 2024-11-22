import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Web.css';
import logo from "./hcmut.png"
function Web() {
    return (
        <div>
        <Navbar bg="dark" data-bs-theme="dark" className="navbar">
        <Container>
          <Navbar.Brand href="#home">
            <img       
                alt="My Website Logo"         
                src={logo}
                width="50"
                height="50"
            />
            Navbar with text
            </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
    );
} 
export default Web;