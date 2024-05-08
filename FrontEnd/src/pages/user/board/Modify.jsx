import React from 'react';
import './modify.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Modify = () => {
    const handleButtonClickMoidfy = () => {
        window.location.href = 'http://localhost:5173/board';
    };
    const handleButtonClickDelete = () => {
        window.location.href = 'http://localhost:5173/board';
    };

    return (
        <>
            <Topbar />
            <div className="modify">
                <div className="modify-date">
                    <div id="title">작성일</div>
                    2024.03.23
                </div>
                <div className="modify-title">
                    <div id="title">제목</div>
                    <input type="text" className="modify-title-content"></input>
                </div>
                <div className="modify-content">
                    <div id="title">내용</div>
                    <input type="text" className="modify-content-content"></input>
                </div>
                <div className="modify-pagination">
                    <button className="modify-pagination-button" onClick={handleButtonClickDelete}>
                        삭제
                    </button>
                    <button className="modify-pagination-button" onClick={handleButtonClickMoidfy}>
                        수정완료
                    </button>
                </div>
            </div>
        </>
    );
};
