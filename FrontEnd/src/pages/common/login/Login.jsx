import './login.css';
import { useRef, useState } from 'react';

export const Login = () => {
    const idRef = useRef(null);
    const passwordRef = useRef(null);

    const handleButtonClickLogin = () => {
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: idRef.current.value,
                user_passwd: passwordRef.current.value,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((response) => {
                if (response.islogin === 'ok') {
                    console.log('login successful:');
                    fetch('http://localhost:3000/api/setLoginInfo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id: idRef.current.value,
                        }),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            sessionStorage.clear();
                            return response.json();
                        })
                        .then((response) => {
                            sessionStorage.setItem('token', response.token);
                            console.log('set login token: ' + response.token);
                            //alert('로그인 성공.' + sessionStorage.token);
                            window.location.href = 'http://localhost:5173/main';
                        })
                        .catch((error) => {
                            console.error('Error checking:', error);
                        });
                    
                } else {
                    console.log('login failed:');
                    alert('로그인 실패.');
                }
            })
            .catch((error) => {
                console.error('Error checking:', error);
                alert('로그인 실패.');
            });
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-title" id="logo">
                    소프트웨어 공학 팀프로젝트 -2조
                </div>
                <div className="login-title">로그인</div>
                <input type="text" placeholder="ID" className="login-input" ref={idRef} />
                <input type="password" placeholder="PW" className="login-input" ref={passwordRef} />
                <button className="login-button" onClick={handleButtonClickLogin}>
                    로그인
                </button>
                <a href="/signup" className="login-text">
                    회원가입
                </a>
                <button className="login-button" id="kakao">
                    카카오톡
                </button>
            </div>
        </div>
    );
};
