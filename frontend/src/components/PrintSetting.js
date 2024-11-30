import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

function PrintSetting() {
    // State to store settings
    const [defaultPages, setDefaultPages] = useState(10);
    const [resetDate, setResetDate] = useState('');
    const [permittedFileTypes, setPermittedFileTypes] = useState([]);
    const [allFileTypes, setAllFileTypes] = useState([]);

    // State to control if we are in "edit" mode
    const [isEditing, setIsEditing] = useState(false);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch settings from the backend
    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:4000/api/print-settings');
                if (!response.ok) {
                    throw new Error('Failed to fetch settings');
                }
                const data = await response.json();
                console.log(data);
                setDefaultPages(data.defaultPages || 10);
                setResetDate(data.resetDate || '');
                setPermittedFileTypes(data.permittedFileTypes || []);
                setAllFileTypes(data.allFileTypes || []); // Lấy danh sách tất cả các loại file
            } catch (err) {
                setError('Error fetching print settings');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    // Handle form submission for updating settings
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/print-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    allFileTypes,
                    defaultPages,
                    resetDate,
                    permittedFileTypes,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update settings');
            }

            const result = await response.json();
            alert(result.message || 'Settings updated successfully!');
            setIsEditing(false);
        } catch (err) {
            setError('Lỗi cập nhật cấu hình in');
            console.error('Error:', err);
        }
    };

    // Toggle editing mode
    const handleEditClick = () => {
        setIsEditing(true);
    };
    // Cancel editing mode
    const handleCancelClick = () => {
        setIsEditing(false);
    };

    // Show loading or error state
    if (loading) {
        return (
            <Container className="mt-4">
                <h4>Tìm cấu hình in...</h4>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <h4>{error}</h4>
            </Container>
        );
    }

    return (
        <section id="hero" className="block hero-block">
            <Container className="mt-4">
                <h4>CẤU HÌNH IN</h4>
                {!isEditing ? (
                    <div>
                        <Row className="mb-3">
                            <Col sm={4}><strong>Số trang mặc định</strong></Col>
                            <Col sm={8}>{defaultPages}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={4}><strong>Ngày làm mới số trang</strong></Col>
                            <Col sm={8}>{resetDate || "Chưa cài đặt"}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={4}><strong>Loại file cho phép</strong></Col>
                            <Col sm={8}>{permittedFileTypes.join(", ") || "0"}</Col>
                        </Row>

                        {/* Edit Button */}
                        <Button onClick={handleEditClick}>Thay đổi</Button>
                    </div>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col sm={4}>
                                <Form.Label>Số trang mặc định</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control
                                    type="number"
                                    value={defaultPages}
                                    onChange={(e) => setDefaultPages(e.target.value)}
                                    placeholder="Nhập số trang mặc định"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={4}>
                                <Form.Label>Ngày làm mới số trang</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control
                                    type="date"
                                    value={resetDate}
                                    onChange={(e) => setResetDate(e.target.value)}
                                    placeholder="Chọn ngày làm mới"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={4}>
                                <Form.Label>Loại file cho phép</Form.Label>
                            </Col>
                            <Col sm={8}>
                                {allFileTypes.map((type) => (
                                    <Form.Check
                                        key={type}
                                        type="checkbox"
                                        label={type.toUpperCase()}
                                        value={type}
                                        checked={permittedFileTypes.includes(type)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                // Thêm loại file khi được chọn
                                                setPermittedFileTypes([...permittedFileTypes, type]);
                                            } else {
                                                // Loại bỏ loại file khi bỏ chọn
                                                setPermittedFileTypes(permittedFileTypes.filter((fileType) => fileType !== type));
                                            }
                                        }}
                                    />
                                ))}
                            </Col>
                        </Row>
                        <Button type="submit"> Lưu thay đổi</Button>
                        <Button onClick={handleCancelClick} style={{marginLeft : '10px'}}>Quay về</Button>   
                    </Form>
                )}
            </Container>
        </section>
    );
}

export default PrintSetting;
