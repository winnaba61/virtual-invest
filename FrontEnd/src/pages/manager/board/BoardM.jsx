import React, { useState, useEffect } from 'react';
import './boardM.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const BoardM = () => {
    const [currentPage, setCurrentpage] = useState(1);
    const [contents, setContents] = useState([]);
    const [Mcontents, setMContents] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true);
    const postsPerPage = 15;

    useEffect(() => {
        //fetch('http://localhost:3001/boards')
        fetch('http://localhost:3000/api/boardHeadlines')
            .then((response) => response.json())
            .then((data) => setContents(data.reverse()));
        //fetch('http://localhost:3001/Mboard')
        fetch('http://localhost:3000/api/mBoardHeadlines')
            .then((response) => response.json())
            .then((data) => setMContents(data.reverse()));
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
                fetch(`http://localhost:3000/api/admin?id=${data.user_key}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((admin) => {
                        console.log('관리자 상태를 가져왔습니다.');
                        setIsAdmin(admin.user_admin);
                    })
                    .catch((error) => {
                        console.error('관리자 상태를 가져오는 중 오류 발생:', error);
                    });
            })
            .catch((error) => {
                console.error('로그인 ID를 가져오는 중 오류 발생:', error);
                alert('로그인 에러가 발생했습니다. 다시 로그인 해주세요.');
                window.location.href = '/';
            });
    }, []);
    useEffect(() => {
        if (!isAdmin) {
            alert('권한이 없습니다. 다시 로그인 해주세요.');
            window.location.href = '/';
        }
    }, [isAdmin]);
    const handleButtonClickWrite = () => {
        window.location.href = '/manager/board/write';
    };

    const getNextPage = () => {
        if (indexOfLastPost >= contents.length) {
            alert('마지막 페이지입니다');
            return;
        }
        setCurrentpage(currentPage + 1);
    };

    const getPrevPage = () => {
        if (currentPage === 1) {
            alert('이전 페이지가 없습니다!');
            return;
        }
        setCurrentpage(currentPage - 1);
    };

    // 현재 페이지에 보여질 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage > contents.length ? contents.length : currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage < 0 ? 0 : indexOfLastPost - postsPerPage;
    const currentPosts = contents.slice(
        indexOfFirstPost,
        indexOfLastPost > contents.length ? contents.length : indexOfLastPost
    );

    return (
        <>
            <Topbar />
            <p class="board-plane-text"> 관리자 모드</p>
            <div className="board">
                <button className="board-write-button" onClick={handleButtonClickWrite}>
                    글쓰기
                </button>
                <table
                    className="board-table"
                    border="1"
                    height={
                        40 * (indexOfLastPost - indexOfFirstPost + (currentPage == 1 ? Mcontents.length : 0)) + 'px'
                    }
                >
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPage == 1
                            ? Mcontents.map((post, index) => (
                                  <tr key={post.id}>
                                      <td id="post-number">
                                          <a href={`/manager/board/view?id=${post.id}`}>공지</a>
                                      </td>
                                      <td id="post-title">
                                          <a href={`/manager/board/view?id=${post.id}`}>{post.title}</a>
                                      </td>
                                      <td id="post-author">
                                          <a href={`/manager/board/view?id=${post.id}`}>{post.author}</a>
                                      </td>
                                      <td id="post-date">
                                          <a href={`/manager/board/view?id=${post.id}`}>{post.date.split('T')[0]}</a>
                                      </td>
                                  </tr>
                              ))
                            : ''}
                        {currentPosts.length > 0 ? (
                            currentPosts.map((post, index) => (
                                <tr key={post.id}>
                                    <td id="post-number">
                                        <a href={`/manager/board/view?id=${post.id}`}>
                                            {contents.length - (indexOfFirstPost + index)}
                                        </a>
                                    </td>
                                    <td id="post-title">
                                        <a href={`/manager/board/view?id=${post.id}`}>{post.title}</a>
                                    </td>
                                    <td id="post-author">
                                        <a href={`/manager/board/view?id=${post.id}`}>{post.author}</a>
                                    </td>
                                    <td id="post-date">
                                        <a href={`/manager/board/view?id=${post.id}`}>{post.date.split('T')[0]}</a>
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
                    <button className="board-pagination-button" onClick={getPrevPage}>
                        이전
                    </button>
                    <button className="board-pagination-button" onClick={getNextPage}>
                        다음
                    </button>
                </div>
            </div>
        </>
    );
};
