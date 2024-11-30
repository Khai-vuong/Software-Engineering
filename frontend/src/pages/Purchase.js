import Container from 'react-bootstrap/Container';
import '../components/css/Hero.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useState, useEffect } from 'react';

function PurchaseHistory(props) {
      const [logs, setLogs] = useState([]);
      useEffect(() => {

        if (props.show) {
          axios.get('http://localhost:4000/payment/history', {
            withCredentials: true,
          })
            .then((response) => {
              console.log('Fetched logs:', response.data); 
              setLogs(response.data);
          })
            .catch((error) => {
              console.error('Error fetching logs:', error);
            });
        }
      }, [props.show]);

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
                    <th>Nội dung</th>
                    <th>Thời gian</th>
                </tr>
                </thead>
                <tbody>
                {(() => {
                    const rows = [];
                    for (let index = 0; index < logs.length; index++) {
                        const entry = logs[index];
                        rows.push(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>Đã mua {entry.pageNumber} trang A4 qua {entry.paymentMethod}</td>
                                <td>{entry.timestamp}</td>
                            </tr>
                        );
                    }
                    return rows;
                })()}
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
        pageNumber: '',
        paymentMethod: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        
        // Validate form data
        if (!formData.pageNumber || !formData.paymentMethod) {
            alert('Please fill in all fields');
            return;
        }

        axios.post('http://localhost:4000/payment/create', {
            pageNumber: parseInt(formData.pageNumber),
            paymentMethod: formData.paymentMethod
        }, {
            withCredentials: true
        })
        .then((response) => {
            console.log('Response:', response);
            alert(`You bought ${formData.pageNumber} pages by ${formData.paymentMethod}`);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to process payment. Please try again.');
        });
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
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nhập số trang cần mua:</Form.Label>
                        <Form.Control
                            type="number"
                            name="pageNumber"
                            value={formData.pageNumber}
                            onChange={handleChange}
                            placeholder="Nhập số trang"
                        />
                        <Form.Text className="text-muted">
                            Lưu ý: số trang phải lớn hơn 1.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phương thức thanh toán:</Form.Label>
                        <Form.Select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                        >
                            <option value="">Nhấn vào để chọn</option>
                            <option value="BKpay">BKPay</option>
                            <option value="Momo">Momo</option>
                            <option value="Ngân hàng">Ngân hàng</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Xác nhận
                    </Button>
                </Form>


            </Container>
        </section>
    );
}

export default AppPurchase;
