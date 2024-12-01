import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from "../components/print_report/FilterBar";
import ReportTable from "../components/print_report/ReportTable";
import Loading from '../components/Loading';
import '../components/css/Report.css'

function PrintReport() {
    const navigate = useNavigate();
    
    const [minMonth, ] = useState(1);
    const [minYear, ] = useState(2020);
    const [loading, setLoading] = useState(false);

    const [selectedType, setSelectedType ] = useState('monthly');
    const [selectedMonth, setSelectedMonth ] = useState("all");
    const [selectedYear, setSelectedYear ] = useState("all");

    const [data, setData] = useState([]);  // Dữ liệu sẽ hiển thị trong bảng

    useEffect(() => {
        // Tạo dữ liệu mẫu
        const fetchUser = async () => {
            try {
              const response = await fetch(`http://localhost:4000/api/printers/history`, {
                credentials: 'include', // Include credentials for session
              });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setData(data);
            } catch (error) {
              console.error('Error fetching user data:', error);
            } finally {
              setLoading(false);
            }
          };
        fetchUser();
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
