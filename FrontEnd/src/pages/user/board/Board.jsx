import React, { useState, useEffect } from 'react';
import './board.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Board = () => {
    const [currentPage, setCurrentpage] = useState(1);
    const [contents, setContents] = useState([]);
    const postsPerPage = 15;

    useEffect(() => {
        fetch('http://localhost:3001/boards')
            .then(response => response.json())
            .then(data => setContents(data));
    }, []);

    const handleButtonClickWrite = () => {
        //window.location.href = 'http://localhost:5173/board/write';
        window.location.href = '/board/write';
    };

    const getNextPage = () => {
        if (indexOfLastPost >= contents.length) {
            alert("마지막 페이지입니다");
            return;
        }
        setCurrentpage(currentPage + 1);
    };

    const getPrevPage = () => {
        if (currentPage === 1) {
            alert("이전 페이지가 없습니다!");
            return;
        }
        setCurrentpage(currentPage - 1);
    };

    // 현재 페이지에 보여질 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage > contents.length ? contents.length : currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage < 0 ? 0 : indexOfLastPost - postsPerPage;
    const currentPosts = contents.slice(indexOfFirstPost, indexOfLastPost > contents.length ? contents.length : indexOfLastPost);

    return (
        <>
            <Topbar />
            <div className="board">
                <button className="board-write-button" onClick={handleButtonClickWrite}>
                    글쓰기
                </button>
                <table className="board-table" border="1">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.length > 0 ? (
                            currentPosts.map((post, index) => (
                                <tr key={post.id}>
                                    <td id="post-number">
                                        <a href={`/board/view?id=${post.id}`}>{indexOfFirstPost + index + 1}</a>
                                    </td>
                                    <td id="post-title">
                                        <a href={`/board/view?id=${post.id}`}>{post.title}</a>
                                    </td>
                                    <td id="post-author">
                                        <a href={`/board/view?id=${post.id}`}>{post.author}</a>
                                    </td>
                                    <td id="post-date">
                                        <a href={`/board/view?id=${post.id}`}>{post.date}</a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">페이지 데이터가 없습니다!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="board-pagination">
                    <button className="board-pagination-button" onClick={getPrevPage}>이전</button>
                    <button className="board-pagination-button" onClick={getNextPage}>다음</button>
                </div>
            </div>
        </>
    );
};
