import React from 'react';
import './main.css';
import Topbar from '../../../components/topbar/Topbar';

export const Main = () => {
    return (
        <>
            <Topbar />
            <div className="main">메인 화면입니다</div>
        </>
    );
};
