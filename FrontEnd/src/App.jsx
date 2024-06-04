import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/font.css';

import { Login } from './pages/common/login/Login';
import { Signup } from './pages/common/signup/Signup';
import { AccountM } from './pages/manager/account/AccountM';
import { BoardM } from './pages/manager/board/BoardM';
import { WriteM } from './pages/manager/board/WriteM';
import { ViewM } from './pages/manager/board/ViewM';
import { ModifyM } from './pages/manager/board/ModifyM';
import { Board } from './pages/user/board/Board';
import { Write } from './pages/user/board/Write';
import { View } from './pages/user/board/View';
import { Modify } from './pages/user/board/Modify';
import { Investment } from './pages/user/investment/Investment';
import { Main } from './pages/user/main/Main';
import { Mypage } from './pages/user/mypage/Mypage';
import { Search } from './pages/user/search/Search';
import { StockInfo } from './pages/user/stockInfo/StockInfo';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        {/* 공통 */}
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* 관리자 */}
                        <Route path="/manager/account" element={<AccountM />} />
                        <Route path="/manager/board" element={<BoardM />} />
                        <Route path="/manager/board/view" element={<ViewM />} />
                        <Route path="/manager/board/write" element={<WriteM />} />
                        <Route path="/manager/board/Modify" element={<ModifyM />} />

                        {/* 사용자 */}
                        <Route path="/board" element={<Board />} />
                        <Route path="/board/write" element={<Write />} />
                        <Route path="/board/view" element={<View />} />
                        <Route path="/board/modify" element={<Modify />} />
                        <Route path="/investment" element={<Investment />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/mypage" element={<Mypage />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/stockInfo" element={<StockInfo />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
