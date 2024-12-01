import { useState } from 'react';
import { Link } from 'react-router-dom';

function ReportTable() {
    const [reportData, ] = useState([
        { month: '01', year: '2024' },
        { month: '02', year: '2024' },
        { month: '03', year: '2024' },
    ]); // Dữ liệu mẫu

    return (
        <div className="container-fluid">
            <table className="table table-hover mt-4">
                <thead>
                    <tr className="align-middle">
                        <th className="text-center" scope="col">STT</th>
                        <th className="text-center" scope="col">Tháng</th>
                        <th className="text-center" scope="col">Năm</th>
                        <th className="text-center" scope="col">Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{item.month}</td>
                            <td className="text-center">{item.year}</td>
                            <td className="text-center">
                            <Link to={`/printreportdetail?year=${item.year}&month=${item.month}`}>
                                Xem báo cáo tháng {item.month} - Năm {item.year}
                            </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReportTable;
