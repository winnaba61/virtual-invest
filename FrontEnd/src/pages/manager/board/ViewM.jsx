import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './viewM.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const ViewM = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get("id");

    const [post, setPost] = useState(null);
    const [userKey, setUserKey] = useState(-1);

    useEffect(() => {
        //fetch('http://localhost:3001/Mboard')
        fetch('http://localhost:3000/api/readBoard?id=' + postId)
            .then(response => response.json())
            .then(data => setPost(data));

        fetch('http://localhost:3000/api/getLoginId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: sessionStorage.getItem('token'),
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setUserKey(data.user_key))
            .catch((error) => {
                console.error('로그인 ID를 가져오는 중 오류 발생:', error);
            });

    }, [postId]);

    const handleButtonClickBoard = () => {
        window.location.href = '/manager/board';
    };
    const handleButtonClickModify = () => {
        if (userKey === post.login_id)
            window.location.href = '/manager/board/modify?id=' + postId;
        else
            alert("수정 권한이 없습니다");
    };
    const handleButtonClickDelete = () => {
        fetch(`http://localhost:3000/api/deleteBoard?id=${postId}`, {
            method: 'DELETE',
        })
            .then(() => {
                window.location.href = '/manager/board';
            });
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
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <Topbar />
            <p className="view-plane-text"> 관리자 모드 </p>
            <div className="view-content-wrapper">
                <div className="view">
                    <div className="view-date">
                        <div id="title">작성일</div>
                        {post.date.split('T')[0]}
                    </div>
                    <div className="view-author">
                        <div id="title">작성자</div>
                        {post.author}
                    </div>
                    <div className="view-title">
                        <div id="title">제목</div>
                        <div className="view-title-content">{post.title}</div>
                    </div>
                    <div className="view-content">
                        <div id="title">내용</div>
                        <div className="view-content-content" wrap="hard">{post.content}</div>
                    </div>
                </div>
                <div className="view-pagination">
                    <button className="view-pagination-button" onClick={handleButtonClickBoard}>
                        목록
                    </button>
                    <button className="view-pagination-button" onClick={handleButtonClickModify}>
                        수정하기
                    </button>
                    <button className="view-pagination-button" onClick={handleButtonClickDelete}>
                        삭제하기
                    </button>
                </div>
            </div>
        </>
    );
};
