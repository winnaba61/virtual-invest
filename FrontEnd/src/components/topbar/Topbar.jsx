//상단 타이틀 박스
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './topbar.css';

export const Topbar = () => {
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
                    <Link to="/main" className="topbar-title">
                        가상투자시뮬
                    </Link>
                </div>
                <ul className="topbar-menu-wrapper">
                    <li className={`topbar-menu ${activePage === '/investment' ? 'active' : ''}`}>
                        <Link to="/investment">가상투자</Link>
                    </li>
                    <li
                        className={`topbar-menu ${
                            activePage === '/board' ||
                            activePage === '/board/view' ||
                            activePage === '/board/modify' ||
                            activePage === '/board/write'
                                ? 'active'
                                : ''
                        }`}
                    >
                        <Link to="/board">게시판</Link>
                    </li>
                    <li className={`topbar-menu ${activePage === '/mypage' ? 'active' : ''}`}>
                        <Link to="/mypage">마이페이지</Link>
                    </li>
                    <li className={`topbar-menu ${activePage === '/stockInfo' ? 'active' : ''}`}>
                        <Link to="/stockInfo">주식 상세정보</Link>
                    </li>
                    <li className={`topbar-menu ${activePage === '/search' ? 'active' : ''}`}>
                        <Link to="/search">검색</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Topbar;
