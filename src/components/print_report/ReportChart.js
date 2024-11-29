import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

function ReportChart({ data }) {
    const [chartData, setChartData] = useState([]);
    const [showBarChart, setShowBarChart] = useState(true); // Điều khiển chuyển đổi cho tất cả các biểu đồ

    useEffect(() => {
        if (data && data.length > 0) {
            setChartData(data);
        }
    }, [data]);

    const pieChartData = [
        { name: "Giấy A3", value: chartData.reduce((total, item) => total + item.paperA3, 0) },
        { name: "Giấy A4", value: chartData.reduce((total, item) => total + item.paperA4, 0) },
      ];

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

    return (
        <div className="container text-center mt-5">
            <h2 className="mb-4">
                {showBarChart ? "Thống kê dữ liệu - Dạng Cột" : "Thống kê dữ liệu - Dạng Tròn"}
            </h2>
            <button
                className="btn btn-primary mb-4"
                onClick={() => setShowBarChart(!showBarChart)}
            >
                {showBarChart ? "Chuyển sang dạng tròn" : "Chuyển sang dạng cột"}
            </button>
            <div className="row justify-content-around">
                {/* Biểu đồ số đơn đặt hàng */}
                <div className="col-md-4 mb-4">
                    <h4>Số đơn đặt hàng</h4>
                    {showBarChart ? (
                        <BarChart
                            width={400}
                            height={300}
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="quantity" fill="#FF6384" name="Số lượng đơn" />
                        </BarChart>
                    ) : (
                        <PieChart width={300} height={300}>
                            <Pie
                                data={chartData}
                                dataKey="quantity"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    )}
                </div>

                {/* Biểu đồ số lượng giấy A3 và A4 */}
                <div className="col-md-4 mb-4">
                    <h4>Số lượng giấy A3 & A4</h4>
                    {showBarChart ? (
                        <BarChart
                            width={400}
                            height={300}
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="paperA3" fill="#36A2EB" name="Giấy A3" />
                            <Bar dataKey="paperA4" fill="#FFCE56" name="Giấy A4" />
                        </BarChart>
                    ) : (
                        <PieChart width={300} height={300}>
                            <Pie
                                data={pieChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    )}
                </div>

                {/* Biểu đồ doanh thu */}
                <div className="col-md-4 mb-4">
                    <h4>Doanh thu</h4>
                    {showBarChart ? (
                        <BarChart
                            width={400}
                            height={300}
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="revenue" fill="#4BC0C0" name="Doanh thu" />
                        </BarChart>
                    ) : (
                        <PieChart width={300} height={300}>
                            <Pie
                                data={chartData}
                                dataKey="revenue"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReportChart;
