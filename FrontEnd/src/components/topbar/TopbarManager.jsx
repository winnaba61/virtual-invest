//상단 타이틀 박스
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './topbar.css';

export const TopbarManager = () => {
    const [activePage, setActivePage] = useState('');
    const location = useLocation();

    useEffect(() => {
        // useLocation의 pathname을 기반으로 현재 페이지 설정
        setActivePage(location.pathname);
    }, [location]);

    return (
        <div className="topbar">
            <div className="topbar-wrapper">
                <div>
                    <Link to="/manager/account" className="topbar-title">
                        가상투자시뮬_M
                    </Link>
                </div>
                <ul className="topbar-menu-wrapper">
                    <li
                        className={`topbar-menu ${
                            activePage === '/manager/board' ||
                            activePage === '/manager/board/view' ||
                            activePage === '/manager/board/modify' ||
                            activePage === '/manager/board/write'
                                ? 'active'
                                : ''
                        }`}
                    >
                        <Link to="/manager/board">게시판</Link>
                    </li>
                    <li className={`topbar-menu ${activePage === '/manager/account' ? 'active' : ''}`}>
                        <Link to="/manager/account">계정관리</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TopbarManager;
