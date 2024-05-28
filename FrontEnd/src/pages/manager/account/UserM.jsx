import React from 'react';
import './userM.css';
import TopbarManager from '../../../components/topbar/TopbarManager';

export const UserM = () => {
    const handleButtonClickAdd = () => {
        window.location.href = 'http://localhost:5173/manager/account';
    };
    return (
        <>
            <TopbarManager />
            <div className="user">
                <div className="user-info-container">
                    <div className="user-title">
                        <span id="name">최승아</span>님의 계정관리
                    </div>
                    <table className="user-info-table">
                        <tr>
                            <th>생년월일</th>
                            <td>2001.04.18</td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>010-7110-0441</td>
                        </tr>
                        <tr>
                            <th>초기배정금액</th>
                            <td>1000000</td>
                        </tr>
                        <tr>
                            <th>현재금액</th>
                            <td>900000</td>
                        </tr>
                    </table>
                </div>
                <div className="user-price-container">
                    <div className="user-title">배정 금액 추가</div>
                    <div className="user-search">
                        <input type="text" className="user-search-input" />
                        <button className="user-search-button" onClick={handleButtonClickAdd}>
                            변경
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
