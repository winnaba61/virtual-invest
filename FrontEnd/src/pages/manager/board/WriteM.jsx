import React from 'react';
import './writeM.css';
import { TopbarManager } from '../../../components/topbar/TopbarManager';

export const WriteM = () => {
    const handleButtonClickWrite = () => {
        window.location.href = 'http://localhost:5173/manager/board';
    };

    return (
        <>
            <TopbarManager />
            <div className="write">
                <div className="write-title">
                    <div id="title">제목</div>
                    <input type="text" className="write-title-content"></input>
                </div>
                <div className="write-content">
                    <div id="title">내용</div>
                    <input type="text" className="write-content-content"></input>
                </div>
                <div className="write-pagination">
                    <button className="write-pagination-button" onClick={handleButtonClickWrite}>
                        게시글 등록
                    </button>
                </div>
            </div>
        </>
    );
};
