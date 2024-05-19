import React from 'react';
import './investment.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Investment = () => {
    return (
        <>
            <Topbar />
            <div className="investment">가상투자 매수/매도 화면입니다</div>
        </>
    );
};
