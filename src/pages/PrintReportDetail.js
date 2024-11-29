import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { IoPrintOutline } from "react-icons/io5";
import Loading from '../components/Loading';
import Container from 'react-bootstrap/Container';
import DetailTable from '../components/print_report/DetailTable';
import ReportChart from '../components/print_report/ReportChart';

function PrintReportDetail() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const year = queryParams.get('year');
    const month = queryParams.get('month');

    const [data, setData] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [showChart, setShowChart] = useState(false); // State để điều khiển hiển thị biểu đồ

    // Dữ liệu mẫu
    const sampleData = [
        { id: 1, name: 'Máy in A1', quantity: 120, revenue: 1500, paperA3: 200, paperA4: 100 },
        { id: 2, name: 'Máy in B2', quantity: 80, revenue: 1000, paperA3: 150, paperA4: 50 },
        { id: 3, name: 'Máy in C3', quantity: 200, revenue: 2500, paperA3: 300, paperA4: 200 },
        { id: 4, name: 'Máy in D4', quantity: 50, revenue: 800, paperA3: 100, paperA4: 50 },
    ];
    
    useEffect(() => {
        if (year && month) {
            setData(sampleData);  
        } else {
            setData(sampleData);  
        }
        setLoading(false);  
    }, [year, month]);

    const handlePrint = useReactToPrint({
        content: () => document.getElementById("reportContent"),
    });

    return (
        <section id="hero" className="block hero-block" style={{ marginTop: '-10px' }}>
            <Container fluid>
                <div className="title-holder">
                    <h2>Báo cáo chi tiết tháng {month} năm {year}</h2>
                </div>
                <div className="container-fluid">
                    <div className="col-12" id="reportContent">
                        {loading ? (
                            <Loading />
                        ) : data && data.length > 0 ? (
                            <div className="col-12 px-2">
                                
                                {!showChart && <DetailTable data={data} />}
                                {showChart && <ReportChart data={data} />}
                                
                                <div className="d-flex justify-content-center mt-3">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setShowChart(!showChart)} // Chuyển đổi giữa bảng và biểu đồ
                                    >
                                        {showChart ? 'Xem Bảng' : 'Xem Biểu Đồ'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="col-12 text-center text-secondary py-5">
                                <h2>Không tìm thấy dữ liệu</h2>
                            </div>
                        )}
                    </div>
                    <div className="col-12 mb-2">
                        <div className="row justify-content-center">
                            {data && data.length > 0 && (
                                <button className="btn btn-success col-4" onClick={handlePrint}>
                                    <IoPrintOutline size={30} />
                                    In báo cáo
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default PrintReportDetail;