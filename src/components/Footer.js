import Container from 'react-bootstrap/Container';
import '../components/css/Footer.css';

export default function AppFooter(){
    return(
        <Container fluid>
            <div className="footer-container">
                <div className="copyright">&copy; 2024 BKPrinter. All Right Reserved.</div>
                <div className="address">Địa chỉ: 268 Lý Thường Kiệt, P.14, Q.10, TP.HCM</div>
                <div className="contact">Liên hệ: bkprinter@hcmut.edu.vn</div>
            </div>
        </Container>
    )
}