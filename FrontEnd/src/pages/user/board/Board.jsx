import React, { useState } from 'react';
import './board.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Board = () => {
    const [currentPage] = useState(1);
    const postsPerPage = 15;

    //데이터
    const rows = new Array(100).fill(null).map((_, index) => ({
        id: index + 1,
        title: '건의사항이 있습니다',
        author: '한지성',
        date: '2024.03.01',
    }));

    const handleButtonClickWrite = () => {
        window.location.href = 'http://localhost:5173/board/write';
    };

    // 현재 페이지에 보여질 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = rows.slice(indexOfFirstPost, indexOfLastPost);

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
                        {currentPosts.map((post, index) => (
                            <tr key={post.id}>
                                <td id="post-number">
                                    <a href={`/board/view`}>{indexOfFirstPost + index + 1}</a>
                                </td>
                                <td id="post-title">
                                    <a href={`/board/view`}>{post.title}</a>
                                </td>
                                <td id="post-author">
                                    <a href={`/board/view`}>{post.author}</a>
                                </td>
                                <td id="post-date">
                                    <a href={`/board/view`}>{post.date}</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="board-pagination">
                    <button className="board-pagination-button">이전</button>
                    <button className="board-pagination-button">다음</button>
                </div>
            </div>
        </>
    );
};
