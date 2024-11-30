import { useState } from 'react';

function FilterBar({ minYear, typeState, monthState, yearState }) {
    const [isMonth, setIsMonth] = useState(true);
    const [years] = useState([2020, 2021, 2022, 2023, 2024]); // Dữ liệu mẫu

    return (
        <div className="row">
            <label className="col-4 col-md-3 col-lg-auto col-form-label">Chọn loại báo cáo</label>
            <div className="col-8 col-md-9 col-lg mb-2">
                <select 
                    className="form-select"
                    value={typeState[0]}
                    onChange={(event) => setIsMonth(event.target.value === 'monthly')}
                >
                    <option value="monthly">Theo tháng</option>
                    <option value="annually">Theo năm</option>
                </select>
            </div>
            <label className="col-4 col-md-3 col-lg-auto col-form-label">Chọn năm</label>
            <div className="col-8 col-md-9 col-lg mb-2">
                <select 
                    className="form-select" 
                    value={yearState[0]} 
                    onChange={(e) => yearState[1](e.target.value)}
                >
                    <option value="all">Tất cả</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            {isMonth && (
                <>
                    <label className="col-4 col-md-3 col-lg-auto col-form-label">Chọn tháng</label>
                    <div className="col-8 col-md-9 col-lg mb-2">
                        <select 
                            className="form-select" 
                            value={monthState[0]} 
                            onChange={(e) => monthState[1](e.target.value)}
                        >
                            <option value="all">Tất cả</option>
                            {[...Array(12).keys()].map(i => (
                                <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                            ))}
                        </select>
                    </div>
                </>
            )}
        </div>
    );
}

export default FilterBar;
