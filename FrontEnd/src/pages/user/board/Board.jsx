import React, { useState } from 'react';
import './board.css';
import { Topbar } from '../../../components/topbar/Topbar';
import { bulletinBoard } from '../../../data/bulletinBoard'; // 데이터 import

export const Board = () => {
    const [currentPage] = useState(1);
    const postsPerPage = 15;

    const handleButtonClickWrite = () => {
        window.location.href = 'http://localhost:5173/board/write';
    };

    // 현재 페이지에 보여질 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = bulletinBoard.slice(indexOfFirstPost, indexOfLastPost); // 수정된 부분

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
                                    <a href={`/board/view`}>{post.id}</a>
                                </td>
                                <td id="post-title">
                                    <a href={`/board/view`}>{post.pub_title}</a>
                                </td>
                                <td id="post-author">
                                    <a href={`/board/view`}>{post.pub_writer}</a>
                                </td>
                                <td id="post-date">
                                    <a href={`/board/view`}>{post.pub_date}</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <div className="board-pagination">
                    <button className="board-pagination-button">이전</button>
                    <button className="board-pagination-button">다음</button>
                </div> */}
            </div>
        </>
    );
};
