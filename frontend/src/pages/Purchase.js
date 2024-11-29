import Container from 'react-bootstrap/Container';
import '../components/css/Hero.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useState } from 'react';

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
    const [formData, setFormData] = useState({
      pageNumber: 0,
      paymentMethod: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const submitHandler = (e) => {
      e.preventDefault();

      axios.post('http://localhost:4000/payment/create', formData)
      .then((response) => {
          console.log(response);
      }).catch((error) => { 
          console.log(error);
      }).finally(() => {
        alert(`you bought ${document.querySelector('input[type="page"]').value} pages by ${document.querySelector('select').value}`);
      });

      console.log('Form submitted:', formData);
    };

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
            <Form  onSubmit={submitHandler}>
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
                    <option value="bkpay">BKPay</option>
                    <option value="momo">Momo</option>
                    <option value="bank">Ngân hàng</option>
                </Form.Select>
                </Form.Group>
            <div className="title-holder">
            <Button variant="primary" type="submit">
                    Xác nhận
            </Button>
            </div>
            </Form>

            
        </Container>
      </section>
    );
  }
  export default AppPurchase;