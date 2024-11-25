import { Container, Row, Col, Button, ListGroup, Nav } from "react-bootstrap";

// import React, { useState, useEffect } from "react";
import PrinterList from "./PrinterList";
import { Router,Route, Routes,Link} from "react-router-dom";
import PrintSetting from "./PrintSetting";
function Layout() {
    return (
        <section id="hero" className="block hero-block" style={{margin:'10px 0px 0'}}>
            <Container fluid>
                <Row>
                    {/* Sidebar */}
                    <Col xs={3} className="bg-light p-3">
                        <h4>SPSO Configuration</h4>
                        <Nav defaultActiveKey="/printers" className="flex-column">
                            <Nav.Item>
                                <Link to="/printers" className="nav-link">
                                    Printers
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/printSetting" className="nav-link">
                                    Print Settings
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    {/* Main Content */}
                    <Col xs={9} className="p-4">
                        <Routes>
                            <Route path="/printers" element={<PrinterList />} />
                            <Route path="/printSetting" element={<PrintSetting />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </section>
        
    );
}
export default Layout