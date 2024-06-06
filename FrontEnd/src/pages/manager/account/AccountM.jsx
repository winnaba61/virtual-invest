import React, { useState, useEffect } from 'react';
import './accountM.css';
import TopbarManager from '../../../components/topbar/Topbar';

export const AccountM = () => {
    const [isAdmin, setIsAdmin] = useState(true);
    const [currentPage, setCurrentpage] = useState(1);
    const [contents, setContents] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const postsPerPage = 15;

    useEffect(() => {
        fetch('http://localhost:3000/api/allUserInfo')
            .then((response) => response.json())
            .then((data) => setContents(data));
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

    const handleButtonClickSearch = () => {
        if (searchValue)
            fetch('http://localhost:3000/api/userInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: searchValue,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        return null;
                    }
                    return response.json();
                })
                .then((data) => setContents(data));
        else
            fetch('http://localhost:3000/api/allUserInfo')
                .then((response) => response.json())
                .then((data) => setContents(data));
        setCurrentpage(1);
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
            <TopbarManager />
            <div className="account">
                <div className="account-search-container">
                    <div className="account-title">사용자 이름 검색</div>
                    <div className="account-search">
                        <input type="text" className="account-search-input" onChange={e => setSearchValue(e.target.value)} />
                        <button className="account-search-button" onClick={handleButtonClickSearch}>
                            검색
                        </button>
                    </div>
                </div>
                <table className="account-table">
                    <tr>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>전화번호</th>
                        <th>가상계좌</th>
                    </tr>
                    {currentPosts.length > 0 ? (
                        currentPosts.map((post, index) => (
                            <tr key={post.id}>
                                <td id="post-name">
                                    <a href={`/manager/account/user?account=${post.user_account}`}>
                                        {post.user_name}
                                    </a>
                                </td>
                                <td id="post-birth">
                                    <a href={`/manager/account/user?account=${post.user_account}`}>{post.user_birth.split('T')[0]}</a>
                                </td>
                                <td id="post-phone">
                                    <a href={`/manager/account/user?account=${post.user_account}`}>{post.user_phone}</a>
                                </td>
                                <td id="post-account">
                                    <a href={`/manager/account/user?account=${post.user_account}`}>{post.user_account}</a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">페이지 데이터가 없습니다!</td>
                        </tr>
                    )}
                </table>
                <div className="account-pagination">
                    <button className="account-pagination-button" onClick={getPrevPage}>
                        이전
                    </button>
                    <button className="account-pagination-button" onClick={getNextPage}>
                        다음
                    </button>
                </div>
            </div>
        </>
    );
};
