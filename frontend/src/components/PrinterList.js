import { Container, Button, ListGroup, Modal, Form } from "react-bootstrap";
import React, { useState, useEffect} from "react";
import '../components/css/Hero.css';
import axios from "axios";

function PrinterList() {
    const [printers, setPrinters] = useState([]);
    const [showAddPrinterModal, setShowAddPrinterModal] = useState(false);
    const [newPrinterName, setNewPrinterName] = useState("");
    const [newPrinterLocation, setNewPrinterLocation] = useState("CS2-H6-106");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiClient = axios.create({
        baseURL: "http://localhost:4000/api",
        headers: { "Content-Type": "application/json" },
    });

    useEffect(() => {
        const fetchPrinters = async () => {
            try {
                const response = await apiClient.get("/printers");
                return response.data;
            } catch (error) {
                console.error("Error fetching printers: ", error);
                throw error;
            }
        };

        const loadPrinters = async () => {
            try {
                const data = await fetchPrinters();
                setPrinters(data);
            } catch (error) {
                setError("Failed to load printers");
            } finally {
                setLoading(false);
            }
        };

        loadPrinters();
    }, [apiClient]);

    const updatePrinterStatus = async (printerName, enabled) => {
        try {
            const response = await apiClient.put(`/printers/${printerName}/status`, { enabled });
            return response.data;
        } catch (error) {
            console.error("Error updating printer status: ", error);
            throw error;
        }
    };

    const addPrinter = async (printerName, location) => {
        try {
            const response = await apiClient.post("/printers", { PName: printerName, Location: location });
            return response.data;
        } catch (error) {
            console.error("Error adding printer: ", error);
            throw error;
        }
    };

    const togglePrinterStatus = async (printerName, enable) => {
        setPrinters((prevPrinters) =>
            prevPrinters.map((printer) =>
                printer.PName === printerName
                    ? { ...printer, enabled: !printer.enabled }
                    : printer
            )
        );

        try {
            await updatePrinterStatus(printerName, enable);
        } catch (error) {
            console.error("Error updating printer status: ", error);
            setPrinters((prevPrinters) =>
                prevPrinters.map((printer) =>
                    printer.PName === printerName
                        ? { ...printer, enabled: !enable }
                        : printer
                )
            );
        }
    };

    const handleAddPrinter = async () => {
        if (!newPrinterName.trim()) return;

        try {
            const newPrinter = await addPrinter(newPrinterName.trim(), newPrinterLocation);
            setPrinters((prevPrinters) => [...prevPrinters, newPrinter]);
            setNewPrinterName("");
            setNewPrinterLocation("CS2-H6-106");
            setShowAddPrinterModal(false);
        } catch (error) {
            console.error("Error adding printer: ", error);
        }
    };

    if (loading) return <Container className="mt-4"><h4>Loading printers...</h4></Container>;
    if (error) return <Container className="mt-4"><h4>{error}</h4></Container>;

    return (
        <section id="hero" className="block hero-block">
            <Container className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Máy In Hiện Có</h4>
                    <Button variant="primary" onClick={() => setShowAddPrinterModal(true)}>
                        Thêm máy in
                    </Button>
                </div>
                <ListGroup>
                    {printers.map((printer, idx) => (
                        <ListGroup.Item
                            key={idx}
                            className="d-flex flex-column"
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <span>
                                    <b>{printer.PName} </b> - Vị trí: {printer.Location} ({printer.enabled ? "Kích hoạt" : "Vô hiệu hóa"})
                                </span>
                                <Button
                                    variant={printer.enabled ? "warning" : "success"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        togglePrinterStatus(printer.PName, !printer.enabled);
                                    }}
                                >
                                    {printer.enabled ? "Vô hiệu hóa" : "Kích hoạt"}
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Modal
                    show={showAddPrinterModal}
                    onHide={() => setShowAddPrinterModal(false)}
                    dialogClassName="modal-dialog-centered"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm Máy In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="newPrinterName">
                                <Form.Label>Tên máy in</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên máy in"
                                    value={newPrinterName}
                                    onChange={(e) => setNewPrinterName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="newPrinterLocation" className="mt-3">
                                <Form.Label>Vị trí</Form.Label>
                                <Form.Select
                                    value={newPrinterLocation}
                                    onChange={(e) => setNewPrinterLocation(e.target.value)}
                                >
                                    <option value="CS2-H6-106">CS2-H6-106</option>
                                    <option value="CS1-B1-201">CS1-B1-201</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddPrinterModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="primary" onClick={handleAddPrinter}>
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </section>
    );
}

export default PrinterList;
