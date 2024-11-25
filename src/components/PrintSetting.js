import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

function PrintSetting() {
    // State to store settings
    const [defaultPages, setDefaultPages] = useState(10);
    const [resetDate, setResetDate] = useState('');
    const [permittedFileTypes, setPermittedFileTypes] = useState([]);
    
    // State to control if we are in "edit" mode
    const [isEditing, setIsEditing] = useState(false);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch settings from the backend
    useEffect(() => {
        const fetchSettings = async () => {
            // UNCOMMENT THIS WHEN APPLYING BACKEND
            // setLoading(true);
            // setError(null);
            // try {
            //     const response = await fetch('/api/print-settings'); // Replace with actual API URL
            //     if (!response.ok) {
            //         throw new Error('Failed to fetch settings');
            //     }
            //     const data = await response.json();
            //     setDefaultPages(data.defaultPages || 10);
            //     setResetDate(data.resetDate || '');
            //     setPermittedFileTypes(data.permittedFileTypes || []);
            // } catch (err) {
            //     setError('Error fetching print settings');
            //     console.error('Error:', err);
            // } finally {
            //     setLoading(false);
            // }
            //COMMENT THIS WHEN APPLYING BACKEND
            setLoading(false)
        };

        fetchSettings();
    }, []);

    // Handle form submission for updating settings
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/print-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
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
        } catch (err) {
            setError('Error updating print settings');
            console.error('Error:', err);
        }
    };

    // Toggle editing mode
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Show loading or error state
    if (loading) {
        return (
            <Container className="mt-4">
                <h4>Loading print settings...</h4>
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
        <Container className="mt-4">
            <h4>Print Settings</h4>
            {!isEditing ? (
                <div>
                    <Row className="mb-3">
                        <Col sm={4}><strong>Default Number of Pages</strong></Col>
                        <Col sm={8}>{defaultPages}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4}><strong>Reset Date for Default Pages</strong></Col>
                        <Col sm={8}>{resetDate || "Not Set"}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={4}><strong>Permitted File Types</strong></Col>
                        <Col sm={8}>{permittedFileTypes.join(", ") || "None"}</Col>
                    </Row>

                    {/* Edit Button */}
                    <Button onClick={handleEditClick}>Edit Settings</Button>
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col sm={4}>
                            <Form.Label>Default Number of Pages</Form.Label>
                        </Col>
                        <Col sm={8}>
                            <Form.Control
                                type="number"
                                value={defaultPages}
                                onChange={(e) => setDefaultPages(e.target.value)}
                                placeholder="Enter default number of pages"
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm={4}>
                            <Form.Label>Reset Date for Default Pages</Form.Label>
                        </Col>
                        <Col sm={8}>
                            <Form.Control
                                type="date"
                                value={resetDate}
                                onChange={(e) => setResetDate(e.target.value)}
                                placeholder="Select reset date"
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm={4}>
                            <Form.Label>Permitted File Types</Form.Label>
                        </Col>
                        <Col sm={8}>
                            <Form.Control
                                as="select"
                                multiple
                                value={permittedFileTypes}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(
                                        e.target.selectedOptions,
                                        (option) => option.value
                                    );
                                    setPermittedFileTypes(selectedOptions);
                                }}
                            >
                                <option value="pdf">PDF</option>
                                <option value="jpg">JPG</option>
                                <option value="png">PNG</option>
                                <option value="docx">DOCX</option>
                                <option value="xlsx">XLSX</option>
                            </Form.Control>
                        </Col>
                    </Row>

                    <Button type="submit">Save Settings</Button>
                </Form>
            )}
        </Container>
    );
}

export default PrintSetting;
