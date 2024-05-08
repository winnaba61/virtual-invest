import React from 'react';
import './view.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const View = () => {
    const handleButtonClickBoard = () => {
        window.location.href = 'http://localhost:5173/board';
    };
    const handleButtonClickModify = () => {
        window.location.href = 'http://localhost:5173/board/modify';
    };

    return (
        <>
            <Topbar />
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
                        목록
                    </button>
                    <button className="view-pagination-button" onClick={handleButtonClickModify}>
                        수정하기
                    </button>
                </div>
            </div>
        </>
    );
};
