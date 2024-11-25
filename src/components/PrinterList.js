import { Container, Button, ListGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";

function PrinterList() {
    // State to store printers with their enabled/disabled status
    const [printers, setPrinters] = useState([]);
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

    if (loading) return <Container className="mt-4"><h4>Loading printers...</h4></Container>;
    if (error) return <Container className="mt-4"><h4>{error}</h4></Container>
    return (
        <Container className="mt-4">
            <h4>Available Printers</h4>
            <ListGroup>
                {printers.map((printer, idx) => (
                    <ListGroup.Item
                        key={idx}
                        className="d-flex justify-content-between align-items-center"
                    >
                        <span>{printer.name} ({printer.enabled ? "Enabled" : "Disabled"})</span>
                        <Button
                            variant={printer.enabled ? "warning" : "success"}
                            onClick={(e) => {
                                e.stopPropagation();  // Prevent any additional actions when clicking button
                                togglePrinterStatus(printer.name,!printer.enabled);
                            }}
                        >
                            {printer.enabled ? "Disable" : "Enable"}
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default PrinterList;
