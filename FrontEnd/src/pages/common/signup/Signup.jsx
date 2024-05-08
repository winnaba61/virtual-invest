import './signup.css';

export const Signup = () => {
    const handleButtonClickSignup = () => {
        window.location.href = 'http://localhost:5173/main'; // 원하는 주소로 변경하세요
    };
    return (
        <div className="signup">
            <div className="signup-container">
                <div className="signup-title" id="logo">
                    소프트웨어 공학 팀프로젝트 -2조
                </div>
                <div className="signup-title">회원가입</div>
                <input type="text" placeholder="이름" className="signup-input" />
                <input type="text" placeholder="ID" className="signup-input" />
                <input type="password" placeholder="PW" className="signup-input" />
                <input type="password" placeholder="PW 확인" className="signup-input" />
                <input type="text" placeholder="생년월일" className="signup-input" />
                <input type="text" placeholder="전화번호" className="signup-input" />
                <button className="signup-button" onClick={handleButtonClickSignup}>
                    회원가입
                </button>
            </div>
        </div>
    );
};
