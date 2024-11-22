import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../components/css/Header.css';

export default function AppHeader(){
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">BKPrinter</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Trang chủ</Nav.Link>
                        <Nav.Link href="#print">In tài liệu</Nav.Link>
                        <Nav.Link href="#purchase">Thanh Toán</Nav.Link>
                        <Nav.Link href="#help">Hỗ trợ</Nav.Link>
                        <Nav.Link href="#user">User</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}