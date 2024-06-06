import React from 'react';
import './accountM.css';
import TopbarManager from '../../../components/topbar/TopbarManager';

export const AccountM = () => {
    return (
        <>
            <TopbarManager />
            <div className="account">
                <div className="account-search-container">
                    <div className="account-title">사용자 계좌번호 검색</div>
                    <div className="account-search">
                        <input type="text" className="account-input" />
                        <button className="account-button">검색</button>
                    </div>
                </div>
                <table className="account-table">
                    <tr>
                        <th>이름</th>
                        <td>최승아</td>
                    </tr>
                    <tr>
                        <th>생년월일</th>
                        <td>2001.04.18</td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>010-7110-0441</td>
                    </tr>
                    <tr>
                        <th>가상계좌</th>
                        <td>71100441</td>
                    </tr>
                </table>
                <div className="account-reset-container">
                    <div className="account-title">사용자 투자 자금 리셋</div>
                    <div className="account-reset">
                        <input type="number" className="account-input" placeholder="지정할 금액을 입력하세요" />
                        <button className="account-button">리셋</button>
                    </div>
                </div>
            </div>
        </>
    );
};
