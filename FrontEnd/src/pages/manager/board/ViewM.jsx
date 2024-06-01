import React from 'react';
import './viewM.css';
import { TopbarManager } from '../../../components/topbar/TopbarManager';

export const ViewM = () => {
    const handleButtonClickBoard = () => {
        window.location.href = 'http://localhost:5173/manager/board';
    };

    return (
        <>
            <TopbarManager />
            <div className="view">
                <div className="view-date">
                    <div id="title">작성일</div>
                    2024.03.23
                </div>
                <div className="view-title">
                    <div id="title">제목</div>
                    <div className="view-title-content">제목입니다</div>
                </div>
                <div className="view-content">
                    <div id="title">내용</div>
                    <div className="view-content-content">내용입니다</div>
                </div>
                <div className="view-pagination">
                    <button className="view-pagination-button" onClick={handleButtonClickBoard}>
                        삭제
                    </button>
                </div>
            </div>
        </>
    );
};
