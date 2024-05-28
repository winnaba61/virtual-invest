import './signup.css';
import { useRef, useState } from 'react';

export const Signup = () => {

    const nameRef = useRef(null);
    const idRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const birthdayRef = useRef(null);
    const phoneNumberRef = useRef(null);

    const [errorMsg, setErrorMsg] = useState('');

    const handleButtonClickSignup = () => {
        if (nameRef.current.value == "")
        {
            setErrorMsg("이름을 입력하세요");
            return;
        }
        if (idRef.current.value == "")
        {
            setErrorMsg("아이디를 입력하세요");
            return;
        }
        // id 중복 검사 루틴 필요

        if (passwordRef.current.value == "") {
            setErrorMsg("비밀번호를 입력하세요");
            return;
        }
        if (confirmPasswordRef.current.value != passwordRef.current.value) {
            setErrorMsg("비밀번호가 일치하는지 확인해세요");
            return;
        }

        if (birthdayRef.current.value == "") {
            setErrorMsg("생년월일을 입력하세요")
            return;
        }
        if (birthdayRef.current.value.length != 8) {
            setErrorMsg("생년월일을 YYYYMMDD형식으로 입력하세요")
            return;
        }
        if (isNaN(birthdayRef.current.value)) {
            setErrorMsg("생년월일에 숫자만 입력하세요")
            return;
        }

        if (phoneNumberRef.current.value == "") {
            setErrorMsg("전화번호를 입력하세요")
            return;
        }

        // database submit

        window.location.href = 'http://localhost:5173/main'; // 원하는 주소로 변경하세요
    };
    return (
        <div className="signup">
            <div className="signup-container">
                <div className="signup-title" id="logo">
                    소프트웨어 공학 팀프로젝트 -2조
                </div>
                <div className="signup-title">회원가입</div>
                <input type="text" placeholder="이름" className="signup-input" ref={nameRef} />
                <input type="text" placeholder="ID" className="signup-input" ref={idRef} />
                <input type="password" placeholder="PW" className="signup-input" ref={passwordRef} />
                <input type="password" placeholder="PW 확인" className="signup-input" ref={confirmPasswordRef} />
                <input type="text" placeholder="생년월일 (YYYYMMDD)" className="signup-input" ref={birthdayRef} />
                <input type="text" placeholder="전화번호" className="signup-input" ref={phoneNumberRef} />
                {errorMsg && <div className="signup-error-msg">{errorMsg}</div>}
                <button className="signup-button" onClick={handleButtonClickSignup}>
                    회원가입
                </button>
            </div>
        </div>
    );
};
