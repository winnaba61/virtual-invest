import React from 'react';
import './write.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Write = () => {
    const handleButtonClickWrite = () => {
        window.location.href = 'http://localhost:5173/board';
    };

    return (
        <>
            <Topbar />
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
