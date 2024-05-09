import React from 'react';
import './search.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Search = () => {
    const handleButtonClickSearch = () => {
        window.location.href = 'http://localhost:5173/stockInfo';
    };
    return (
        <>
            <Topbar />
            <div className="search">
                <div className="search-input-container">
                    <div className="search-title">종목 검색</div>
                    <input className="search-input" type="text" />
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
