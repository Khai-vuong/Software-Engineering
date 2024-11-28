import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from "../components/print_report/FilterBar";
import ReportTable from "../components/print_report/ReportTable";
import Loading from '../components/Loading';
import '../components/css/Report.css'

function PrintReport() {
    const navigate = useNavigate();
    
    const [minMonth, setMinMonth] = useState(1);
    const [minYear, setMinYear] = useState(2020);
    const [loading, setLoading] = useState(false);

    const [selectedType, setSelectedType ] = useState('monthly');
    const [selectedMonth, setSelectedMonth ] = useState("all");
    const [selectedYear, setSelectedYear ] = useState("all");

    const [data, setData] = useState([]);  // Dữ liệu sẽ hiển thị trong bảng

    useEffect(() => {
        // Tạo dữ liệu mẫu
        const sampleData = [
            { id: 1, month: 1, year: 2020, value: 100 },
            { id: 2, month: 2, year: 2020, value: 120 },
            { id: 3, month: 3, year: 2020, value: 130 },
        ];
        setData(sampleData);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className='my-3 text-center'>
                <h3>Dữ liệu đang tải, vui lòng chờ</h3>
                <Loading />
            </div>
        );
    }

    const handleRowClick = (year, month) => {
        // Chuyển sang trang detail và truyền dữ liệu qua state
        navigate(`/printreportdetail/${year}/${month}`, {
            state: { data, year, month }  
        });
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center p-4">
                <h1 className="col-12 text-center pb-3 mt-5">Báo cáo hệ thống</h1>
                <div className="col-12 text-bold mx-1">
                    <FilterBar 
                        minMonth={minMonth} 
                        minYear={minYear}
                        typeState={[selectedType, setSelectedType ]}
                        monthState={[selectedMonth, setSelectedMonth ]}
                        yearState={[selectedYear, setSelectedYear]}
                    />
                </div>
                <div className="col-12">
                    <ReportTable 
                        input_data={data} 
                        isMonthlyType={selectedType === 'monthly'}
                        onRowClick={handleRowClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default PrintReport;
