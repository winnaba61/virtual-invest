import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './view.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const View = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get("id");

    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/boards')
            .then(response => response.json())
            .then(data => {
                const foundPost = data.find(item => item.id == postId);
                setPost(foundPost);
            });
    }, [postId]);

    const handleButtonClickBoard = () => {
        window.location.href = '/board';
    };
    const handleButtonClickModify = () => {
        window.location.href = '/board/modify?id=' + postId;
    };

    if (!post) {
        return (
            <>
                <Topbar />
                <div className="view">
                    <div>게시물을 찾을 수 없습니다.</div>
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
    
    return (
        <>
            <Topbar />
            <div className="view">
                <div className="view-date">
                    <div id="title">작성일</div>
                    {post.date}
                </div>
                <div className="view-author">
                    <div id="title">작성자</div>
                    {post.author}
                </div>
                <div className="view-title">
                    <div id="title">제목</div>
                    <div className="view-title-content">{ post.title }</div>
                </div>
                <div className="view-content">
                    <div id="title">내용</div>
                    <div className="view-content-content">{ post.content }</div>
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
