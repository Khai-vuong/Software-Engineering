import React from 'react';

function DetailTable({ data }) {  // Nhận dữ liệu từ props
    return (
        <div className="container-fluid pb-2">
            <table className="table table-hover mt-4">
                <thead>
                    <tr className="align-middle">
                        <th className="text-center" scope="col">STT</th>
                        <th className="text-center" scope="col">Máy in</th>
                        <th className="text-center" scope="col">Số đơn đặt hàng</th>
                        <th className="text-center" scope="col">Số trang giấy A3</th>
                        <th className="text-center" scope="col">Số trang giấy A4</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{'Máy in ' + item.name}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-center">{item.quantity}</td> 
                            <td className="text-center">{item.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DetailTable;
