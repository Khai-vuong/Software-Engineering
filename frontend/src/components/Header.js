import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../components/css/Header.css';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import logo from '../assets/images/hcmut.jpg';

export default function AppHeader(){
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                <Image src={logo} className="img-fluid" style={{ maxWidth: '30px', height: 'auto' }} />
                {' '}
                BKPrinter
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/logedin">Trang chủ</Nav.Link>
                        <Nav.Link as={Link} to="/print">In tài liệu</Nav.Link>
                        <Nav.Link as={Link} to="/history">Lịch sử in</Nav.Link>
                        <Nav.Link as={Link} to="/purchase">Thanh Toán</Nav.Link>
                        <Nav.Link as={Link} to="/help">Hỗ trợ</Nav.Link>
                        <Nav.Link as={Link} to="/user">User</Nav.Link>
                        <Nav.Link as={Link} to="/"> Đăng xuất</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}