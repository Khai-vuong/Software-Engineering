import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { IoPrintOutline } from "react-icons/io5";
import Loading from '../components/Loading';
import DetailTable from '../components/print_report/DetailTable';
import ReportChart from '../components/print_report/ReportChart';

function PrintReportDetail() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const year = queryParams.get('year');
    const month = queryParams.get('month');

    const [data, setData] = useState(null);  
    const [loading, setLoading] = useState(true);  

    // Dữ liệu mẫu (có thể thay thế bằng dữ liệu thực tế từ API hoặc database)
    const sampleData = useMemo(() => [
        { id: 1, name: 'Máy in A', quantity: 120, revenue: 1500 },
        { id: 2, name: 'Máy in B', quantity: 80, revenue: 1000 },
        { id: 3, name: 'Máy in C', quantity: 200, revenue: 2500 },
    ], []);

    
    useEffect(() => {
        if (year && month) {
            setData(sampleData);  
        } else {
            setData(sampleData); 
        }
        setLoading(false);  
    }, [sampleData, data, year, month]);

    const handlePrint = useReactToPrint({
        content: () => document.getElementById("reportContent"),
    });

    return (
        <div className="container-fluid mt-5 mb-5">
                <div className="col-12" id="reportContent">
                    <h1 className="col-12 text-center py-4">
                        Báo cáo chi tiết tháng {month} năm {year}
                    </h1>
                    {loading ? (
                        <Loading />  // Hiển thị khi đang load dữ liệu
                    ) : data && data.length > 0 ? (
                        <div className="col-12 px-2">
                            <h3 className='text-center mt-3'>Bảng thống kê chi tiết</h3>
                            <DetailTable data={data} />  
                            <ReportChart data={data} /> 
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
    );
}

export default PrintReportDetail;
