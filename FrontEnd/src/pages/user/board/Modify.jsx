import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './modify.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Modify = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get("id");
    const boardNo = queryParams.get("board");
    const backendServerURL = boardNo == 1 ? 'http://localhost:3001/Mboard' : 'http://localhost:3001/boards';


    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(backendServerURL)
            .then(response => response.json())
            .then(data => {
                const foundPost = data.find(item => item.id == postId);
                setPost(foundPost);
                setContent(foundPost.content)
                setTitle(foundPost.title)
            });
    }, [postId]);

    const handleButtonClickMoidfy = () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        //fetch(`http://localhost:3001/boards/${postId}`, {
        fetch(`${backendServerURL}/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author: post.author,
                title,
                content,
                date: new Date().toISOString().split('T')[0],
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('게시글 등록 성공:', data);
                window.location.href = '/board';
            })
            .catch(error => {
                console.error('게시글 등록 실패:', error);
            });
    };

    const handleButtonClickDelete = () => {
        fetch(`${backendServerURL}/${postId}`, {
            method: 'DELETE',
        })
            .then(() => {
                window.location.href = '/board';
            });
    };

    if (!post) {
        return (
            <>
                <Topbar />
                <div className="modify">
                    <div>게시물을 찾을 수 없습니다.</div>
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

    return (
        <>
            <Topbar />
            <div className="modify">
                <div className="modify-date">
                    <div id="title">작성일</div>
                    { post.date }
                </div>
                <div className="modify-title">
                    <div id="title">제목</div>
                    <input
                        type="text"
                        className="modify-title-content"
                        value={title}
                        onChange={e => setTitle(e.target.value) }
                    ></input>
                </div>
                <div className="modify-content">
                    <div id="title">내용</div>
                    <textarea
                        className="write-content-content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        wrap="hard"
                    />
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
