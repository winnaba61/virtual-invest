import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './userM.css';
import TopbarManager from '../../../components/topbar/Topbar';

export const UserM = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const accountId = queryParams.get("account");

    const [isAdmin, setIsAdmin] = useState(true);
    const [userInfo, setUserInfo] = useState({ user_birth: '0T0' });
    const [newValue, setNewValue] = useState('');


    useEffect(() => {
        fetch('http://localhost:3000/api/theUserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account: accountId,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    alert('Network response was not ok');
                    return {};
                }
                return response.json();
            })
            .then((data) => setUserInfo(data));
        fetch('http://localhost:3000/api/getLoginId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: sessionStorage.getItem('token'),
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                fetch(`http://localhost:3000/api/admin?id=${data.user_key}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((admin) => {
                        console.log('관리자 상태를 가져왔습니다.');
                        setIsAdmin(admin.user_admin);
                    })
                    .catch((error) => {
                        console.error('관리자 상태를 가져오는 중 오류 발생:', error);
                    });
            })
            .catch((error) => {
                console.error('로그인 ID를 가져오는 중 오류 발생:', error);
                alert('로그인 에러가 발생했습니다. 다시 로그인 해주세요.');
                window.location.href = '/';
            });
    }, []);
    useEffect(() => {
        if (!isAdmin) {
            alert('권한이 없습니다. 다시 로그인 해주세요.');
            window.location.href = '/';
        }
    }, [isAdmin]);

    const handleButtonClickChange = () => {
        fetch('http://localhost:3000/api/changeWallet', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newVal: newValue,
                account: accountId,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    alert('변경실패');
                    return;
                }
                fetch('http://localhost:3000/api/theUserInfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        account: accountId,
                    }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            alert('Network response was not ok');
                            return {};
                        }
                        return response.json();
                    })
                    .then((data) => { setUserInfo(data); console.log(data); });
            })
    };

    const handleButtonClickGoBack = () => {
        window.location.href = '/manager/account';
    };
    return (
        <>
            <TopbarManager />
            <div className="user">
                <div className="user-info-container">
                    <div className="user-title">
                        <span id="name">{userInfo.user_name}</span>님의 계정관리
                    </div>
                    <table className="user-info-table">
                        <tr>
                            <th>생년월일</th>
                            <td>{userInfo.user_birth.split('T')[0]}</td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>{ userInfo.user_phone }</td>
                        </tr>
                        <tr>
                            <th>초기배정금액</th>
                            <td>1000000</td>
                        </tr>
                        <tr>
                            <th>현재금액</th>
                            <td>{userInfo.user_wallet}</td>
                        </tr>
                    </table>
                </div>
                <div className="user-price-container">
                    <div className="user-title">배정 금액 변경</div>
                    <div className="user-search">
                        <input type="text" className="user-search-input" onChange={e => setNewValue(e.target.value)} />
                        <button className="user-search-button" onClick={handleButtonClickChange}>
                            변경
                        </button>
                    </div>
                </div>
                <div className="board-pagination">
                    <button className="board-pagination-button" onClick={handleButtonClickGoBack }>
                        뒤로
                    </button>
                </div>s
            </div>
        </>
    );
};
