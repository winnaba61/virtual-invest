import React from 'react';
import './mypage.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Mypage = () => {
    return (
        <>
            <Topbar />
            <div className="mypage">마이페이지 화면입니다</div>
        </>
    );
};
