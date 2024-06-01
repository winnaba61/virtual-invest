import React from 'react';
import './accountM.css';
import TopbarManager from '../../../components/topbar/TopbarManager';

export const AccountM = () => {
    const handleButtonClickSearch = () => {
        window.location.href = 'http://localhost:5173/manager/account/user';
    };

    return (
        <>
            <TopbarManager />
            <div className="account">
                <div className="account-search-container">
                    <div className="account-title">사용자 이름 검색</div>
                    <div className="account-search">
                        <input type="text" className="account-search-input" />
                        <button className="account-search-button" onClick={handleButtonClickSearch}>
                            검색
                        </button>
                    </div>
                </div>
                <table className="account-table">
                    <tr>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>전화번호</th>
                        <th>가상계좌</th>
                    </tr>
                    <tr>
                        <td>
                            <a href="/manager/account/user">-</a>
                        </td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>
                            <a href="/manager/account/user">-</a>
                        </td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table>
            </div>
        </>
    );
};
