import { Container, Button, ListGroup,Modal,Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import '../components/css/Hero.css';

function PrinterList() {
    // State to store printers with their enabled/disabled status
    const [printers, setPrinters] = useState([]);
    const [showAddPrinterModal, setShowAddPrinterModal] = useState(false);
    const [newPrinterName, setNewPrinterName] = useState("");

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // Simulate fetching printers (could be from an API or database)
    useEffect(() => {
        const fetchPrinters = async () => {
            // UNCOMMENT THIS WHEN APPLYING BACKEND
            // try {
            //     const response = await fetch("...");
            //     const data = await response.json();
            //     setPrinters(data)
            // } catch (error){
            //     setError("Failed to load printers")
            //     console.error("Error fetching printers: ",error)
            // } finally{
            //     setLoading(false)
            // }
            // COMMENT THIS WHEN APPLYING BACKEND
            const printerList = [
                { name: "PlaceHolder 1", enabled: true },
                { name: "PlaceHolder 2", enabled: true },
                { name: "PlaceHolder 3", enabled: true },
            ];
            setPrinters(printerList);
            setLoading(false)
        };
        fetchPrinters();
    }, []);

    // Toggle printer enabled/disabled status
    const togglePrinterStatus = async (printerName, enable) => {
        setPrinters(prevPrinters =>
            prevPrinters.map(printer =>
                printer.name === printerName
                    ? { ...printer, enabled: !printer.enabled }
                    : printer
            )
        );

        try {
            const url = '...'

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({enabled: enable})
            });

            if(!response.ok){
                throw new Error('Failed to update printer status')
            }
            
        } catch(error){
            console.error("Error updating printer status: ",error);
            setPrinters(prevPrinters =>
                prevPrinters.map(printer =>
                    printer.name === printerName
                        ? { ...printer, enabled: !enable } // Revert to the original state
                        : printer
                )
            );
        }
        
    };
    const handleAddPrinter = () => {
        if(!newPrinterName.trim())  return;

        setPrinters(prevPrinters => [
            ...prevPrinters,
            {name: newPrinterName.trim(),enabled:true},
        ]);
        setNewPrinterName("");
        setShowAddPrinterModal(false);
        
        // UNCOMMENT FOR BACKEND API
        // try {
        //     const response = await fetch("...", {
        //         method: "POST",
        //         headers: { "Content-type": "application/json" },
        //         body: JSON.stringify({ name: newPrinterName.trim() }),
        //     });
        //     if (!response.ok) throw new Error("Failed to add printer");
        // } catch (error) {
        //     console.error("Error adding printer: ", error);
        // }
    };
    if (loading) return <Container className="mt-4"><h4>Loading printers...</h4></Container>;
    if (error) return <Container className="mt-4"><h4>{error}</h4></Container>
    return (
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
                        className="d-flex justify-content-between align-items-center"
                    >
                        <span>{printer.name} ({printer.enabled ? "Kích hoạt" : "Vô hiệu hóa"})</span>
                        <Button
                            variant={printer.enabled ? "warning" : "success"}
                            onClick={(e) => {
                                e.stopPropagation();  // Prevent any additional actions when clicking button
                                togglePrinterStatus(printer.name,!printer.enabled);
                            }}
                        >
                            {printer.enabled ? "Vô hiệu hóa" : "Kích hoạt"}
                        </Button>
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
                                onChange={(e) => setNewPrinterName(e.target.value)}/>
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
    );
}

export default PrinterList;
