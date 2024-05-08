import './login.css';

export const Login = () => {
    const handleButtonClickLogin = () => {
        window.location.href = 'http://localhost:5173/main'; // 원하는 주소로 변경하세요
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-title" id="logo">
                    소프트웨어 공학 팀프로젝트 -2조
                </div>
                <div className="login-title">로그인</div>
                <input type="text" placeholder="ID" className="login-input" />
                <input type="password" placeholder="PW" className="login-input" />
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
