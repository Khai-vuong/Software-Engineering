import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import '../components/css/Hero.css';
import React, { useState, useEffect } from 'react';

function AppHistory() {
    const [printHistory, setPrintHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrintHistory = async () => {
          try {
            const response = await fetch('http://localhost:4000/api/user/printhistory', {
              credentials: 'include', // Include credentials for session
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch printing history');
            }
    
            const data = await response.json();
            setPrintHistory(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPrintHistory();
      }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
    return (
      <section id="hero" className="block hero-block">
        <Container fluid>
            <div className="title-holder">
                <h2>Lịch sử in</h2>
            </div>
            
            <Table className="table" responsive="xl">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Tên tài liệu</th>
                    <th>Máy in</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Trạng thái</th>
                    <th>Xem chi tiết</th>
                </tr>
                </thead>
                <tbody>
                {(() => {
                    const rows = [];
                    for (let index = 0; index < printHistory.length; index++) {
                        const entry = printHistory[index];
                        rows.push(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entry.PName}</td>
                                <td>{entry.PrinterName}</td>
                                <td>{entry.StartTime}</td>
                                <td>{entry.EndTime}</td>
                                <td>{entry.Status}</td>
                                <td><button>View Details</button></td>
                            </tr>
                        );
                    }
                    return rows;
                })()}
                </tbody>
            </Table>
        </Container>
      </section>
    );
  }
  
  export default AppHistory;