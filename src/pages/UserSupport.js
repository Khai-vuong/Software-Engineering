import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../components/css/Hero.css';

function UserSupport() {
    // Dữ liệu mẫu với trạng thái (completed / pending)
    const [requests, setRequests] = useState([
        {
            id: 1,
            name: 'Nguyen Van A',
            email: 'nguyenvana@example.com',
            message: 'Xin vui lòng hỗ trợ vấn đề liên quan đến in ấn.',
            status: 'pending', // Trạng thái ban đầu
        },
        {
            id: 2,
            name: 'Tran Thi B',
            email: 'tranthib@example.com',
            message: 'Máy in báo lỗi, cần hỗ trợ gấp.',
            status: 'completed',
        },
        {
            id: 3,
            name: 'Le Van C',
            email: 'levanc@example.com',
            message: 'Không thể in file PDF, vui lòng kiểm tra.',
            status: 'pending',
        },
    ]);

    // Trạng thái modal
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Mở modal chi tiết
    const handleShowDetails = (request) => {
        setSelectedRequest(request);
    };

    // Đóng modal chi tiết
    const handleClose = () => {
        setSelectedRequest(null);
    };

    // Cập nhật trạng thái của yêu cầu (hoàn thành hoặc chưa hoàn thành)
    const handleStatusChange = (id) => {
        setRequests(requests.map((request) => 
            request.id === id ? { ...request, status: request.status === 'pending' ? 'completed' : 'pending' } : request
        ));
    };

    return (
        <section id="hero" className="block hero-block">
            <Container fluid>
                <div className="title-holder">
                    <h2>Hỗ trợ người dùng</h2>
                </div>
                <Table className="table" responsive="xl">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Tên người gửi</th>
                            <th>Email</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={request.id}>
                                <td>{index + 1}</td>
                                <td>{request.name}</td>
                                <td>{request.email}</td>
                                <td>
                                    <span
                                        className={request.status === 'completed' ? 'text-success' : 'text-warning'}
                                    >
                                        {request.status === 'completed' ? 'Hoàn thành' : 'Chưa hoàn thành'}
                                    </span>
                                </td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShowDetails(request)}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Modal chi tiết */}
                {selectedRequest && (
                    <Modal show onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Thông tin chi tiết</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>Tên:</strong> {selectedRequest.name}</p>
                            <p><strong>Email:</strong> {selectedRequest.email}</p>
                            <p><strong>Lời nhắn:</strong> {selectedRequest.message}</p>
                            <p><strong>Trạng thái:</strong> 
                                <span className={selectedRequest.status === 'completed' ? 'text-success' : 'text-warning'}>
                                    {selectedRequest.status === 'completed' ? 'Hoàn thành' : 'Chưa hoàn thành'}
                                </span>
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button 
                                variant="success" 
                                onClick={() => { handleStatusChange(selectedRequest.id); handleClose(); }}
                            >
                                {selectedRequest.status === 'pending' ? 'Đánh dấu là hoàn thành' : 'Đánh dấu là chưa hoàn thành'}
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </Container>
        </section>
    );
}

export default UserSupport;
