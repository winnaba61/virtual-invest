import React from 'react';
import './stockInfo.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const StockInfo = () => {
    return (
        <>
            <Topbar />
            <div className="stockinfo">주식상세정보 화면입니다</div>
        </>
    );
};
