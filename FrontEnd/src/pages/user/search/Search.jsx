import React, { useState } from 'react';
import './search.css';
import { Topbar } from '../../../components/topbar/Topbar';
import { stockDB } from '../../../data/stockDB'; // stockDB import

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가

    const handleButtonClickSearch = () => {
        const foundStock = stockDB.find((stock) => stock.itmsNm === searchTerm); // 종목명으로 검색
        if (foundStock) {
            window.location.href = `http://localhost:5173/stockInfo?id=${foundStock.id}`; // 검색된 주식 ID를 URL 파라미터로 전달
        } else {
            alert('검색된 주식이 없습니다.');
        }
    };

    return (
        <>
            <Topbar />
            <div className="search">
                <div className="search-input-container">
                    <div className="search-title">
                        종목 검색<p>(종목명이 정확히 일치해야 합니다.)</p>
                    </div>
                    <input
                        className="search-input"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // 입력값 상태 업데이트
                    />
                </div>
                <div className="search-list">
                    종목명 리스트:
                    {stockDB.map((stock) => (
                        <p className="search-list-item" key={stock.id}>
                            {stock.itmsNm}
                        </p>
                    ))}
                </div>
                <div className="search-pagination">
                    <button className="search-pagination-button" onClick={handleButtonClickSearch}>
                        종목 검색
                    </button>
                </div>
            </div>
        </>
    );
};
