import Container from 'react-bootstrap/Container';
import '../components/css/Hero.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

function PurchaseHistory(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Lịch sử thanh toán
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="table" responsive="xl">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Số lượng (A4)</th>
                    <th>Số tiền</th>
                    <th>Ngày thanh toán</th>
                    <th>Trạng thái</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

function AppPurchase() {
    const [modalShow, setModalShow] = React.useState(false)
    return (
      <section id="hero" className="block hero-block">
        <Container fluid>
            <div className="title-holder">
                <h2>Mua trang in</h2>
            </div>

            <div className="button-holder">
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Lịch sử
                </Button>
                <PurchaseHistory
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
            <Form>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Nhập số trang cần mua:</Form.Label>
                    <Form.Control type="page" placeholder="Nhập số trang" />
                    <Form.Text className="text-muted">
                    Lưu ý: số trang phải lớn hơn 1.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Phương thức thanh toán:</Form.Label>
                    <Form.Select aria-label="Default select example">
                    <option>Nhấn vào để chọn</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                </Form.Group>
            </Form>
            <div className="title-holder">
            <Button variant="primary" type="submit">
                    Xác nhận
            </Button>
            </div>
            
        </Container>
      </section>
    );
  }
  export default AppPurchase;