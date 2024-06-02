import React, { useState, useEffect } from 'react';
import './write.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Write = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [userKey, setUserKey] = useState(0);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 유저 이름을 가져옴
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
            .then((data) => {
                setUserKey(data.user_key);
            })
            .catch((error) => {
                console.error('로그인 ID를 가져오는 중 오류 발생:', error);
                alert(error);
                window.location.href = '/';
            });
    }, []);

    useEffect(() => {
        if (userKey !== 0) {
            fetch(`http://localhost:3000/api/userName?id=${userKey}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((userName) => {
                    setAuthor(userName.user_name);
                })
                .catch((error) => {
                    console.error('유저 이름을 가져오는 중 오류 발생:', error);
                });
        }
    }, [userKey]);

    const handleButtonClickWrite = () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        //fetch('http://localhost:3001/boards', {
        fetch('http://localhost:3000/api/writeBoard', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                author: author,
                login_id: userKey
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('게시글 등록 성공:', data);
                window.location.href = 'http://localhost:5173/board';
            })
            .catch(error => {
                console.error('게시글 등록 실패:', error);
            });
    };

    return (
        <>
            <Topbar />
            <div className="write">
                <div className="write-title">
                    <div id="title">제목</div>
                    <input
                        type="text"
                        className="write-title-content"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="write-content">
                    <div id="title">내용</div>
                    <textarea
                        className="write-content-content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        wrap="hard"
                    />
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