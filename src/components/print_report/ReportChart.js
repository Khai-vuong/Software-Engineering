import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Đảm bảo đã đăng ký các phần tử cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const option = (title) => ({
    plugins: {
        title: {
            display: true,
            text: title,
        },
    },
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
});

function ReportChart({ data }) {  // Nhận dữ liệu từ props
    const [chartData, setChartData] = useState({
        chart_1: {
            labels: ['Máy in A1', 'Máy in B2', 'Máy in C3'],
            datasets: [{
                label: "Tổng số đơn đặt hàng",
                backgroundColor: ['#FF6384', '#36A2EB'],
                data: [10, 15, 12],
            }],
        },
        chart_2: {
            labels: ['Máy in A1', 'Máy in B2', 'Máy in C3'],
            datasets: [
                { label: "Tổng số lượng giấy A3", backgroundColor: '#FFCE56', data: [5, 8, 6] },
                { label: "Tổng số lượng giấy A4", backgroundColor: '#4BC0C0', data: [20, 30, 25] },
            ],
        },
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setChartData({
                chart_1: {
                    labels: data.map(item => item.name),
                    datasets: [{
                        label: "Số lượng đơn đặt hàng",
                        backgroundColor: '#FF6384',
                        data: data.map(item => item.quantity),
                    }],
                },
                chart_2: {
                    labels: data.map(item => item.name),
                    datasets: [
                        {
                            label: "Số trang giấy A3",
                            backgroundColor: '#FFCE56',
                            data: data.map(item => item.quantity),  // Ví dụ dữ liệu
                        },
                        {
                            label: "Số trang giấy A4",
                            backgroundColor: '#4BC0C0',
                            data: data.map(item => item.revenue),  // Ví dụ dữ liệu
                        },
                    ],
                },
            });
        }
    }, [data]);

    return (
        <div className="row text-center justify-content-around mt-5">
            <h3 className='col-12 m-2'>Biểu đồ thống kê số đơn đặt hàng</h3>
            <div className="col-6 m-3">
                <Bar data={chartData.chart_1} options={option('Biểu đồ cột')} />
            </div>
            <div className="col-3 m-3">
                <Pie data={chartData.chart_1} options={option('Biểu đồ tròn')} />
            </div>
            <h3 className='col-12 m-2'>Biểu đồ thống kê các loại giấy in</h3>
            <div className="col-6 m-3">
                <Bar data={chartData.chart_2} options={option('Biểu đồ cột')} />
            </div>
        </div>
    );
}

export default ReportChart;
