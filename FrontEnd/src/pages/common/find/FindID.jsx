import './findID.css';
import { useRef, useState } from 'react';

export const FindID = () => {
    const nameRef = useRef(null);
    const birthRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);

    const handleButtonClickID = () => {
        fetch('http://localhost:3000/api/findID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: nameRef.current.value,
                user_birth: birthRef.current.value,
                user_phone: phoneRef.current.value,
                user_email: emailRef.current.value
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((response) => {
            if (response.ischeck === 'ok') {
                window.location.href = 'http://localhost:5173';
            } else {
                console.log('login failed:');
                alert('아이디 찾기 실패.');
            }
        })
        .catch((error) => {
            console.error('Error checking:', error);
            alert('아이디 찾기 실패.');
        });
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-title" id="logo">
                    소프트웨어 공학 팀프로젝트 -2조
                </div>
                <div className="login-title">아이디 찾기</div>
                <input type="text" placeholder="이름" className="login-input" ref={nameRef} />
                <input type="text" placeholder="생년월일" className="login-input" ref={birthRef} />
                <input type="text" placeholder="전화번호" className="login-input" ref={phoneRef} />
                <input type="text" placeholder="이메일" className="login-input" ref={emailRef} />
                <button className="login-button" onClick={handleButtonClickID}>
                    아이디 찾기
                </button>
            </div>
        </div>
    );
};