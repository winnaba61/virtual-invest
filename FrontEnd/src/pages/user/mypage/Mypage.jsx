import React from 'react';
import './mypage.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Mypage = () => {
    return (
        <>
            <Topbar />
            <div className="mypage">
                <div className="mypage-user-container">
                    <div className="mypage-title">개인 정보</div>
                    <table className="mypage-info-table">
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <td>최승아</td>
                            </tr>
                            <tr>
                                <th>생일</th>
                                <td>2001.04.18</td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>010-7110-0441</td>
                            </tr>
                            <tr>
                                <th>가상계좌</th>
                                <td>71100441</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mypage-stocks-container">
                    <div className="mypage-title">
                        개인 투자 상세 정보<a className="mypage-subtitle">(단위: 원)</a>
                    </div>
                    <table className="mypage-stocks-table">
                        <tbody>
                            <tr>
                                <th>초기 투자 자금</th>
                                <td>1000000</td>
                            </tr>
                            <tr>
                                <th>매수 원금</th>
                                <td>800000</td>
                            </tr>
                            <tr>
                                <th>총 주식 평가금액</th>
                                <td>900000</td>
                            </tr>
                            <tr>
                                <th>현 투자 가능 금액</th>
                                <td>200000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mypage-stock-container">
                    <div className="mypage-title">
                        보유 주식 정보
                        <a className="mypage-subtitle">(주식의 상세 정보를 알고 싶다면 종목명을 클릭하세요)</a>
                    </div>
                    <table className="mypage-stock-table">
                        <thead>
                            <tr>
                                <th>종목명</th>
                                <th>수익률</th>
                                <th>수익금액</th>
                                <th>보유 주식 수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <a href={`/stockInfo`}>-</a>
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>
                                    <a href={`/stockInfo`}>-</a>
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>
                                    <a href={`/stockInfo`}>-</a>
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>
                                    <a href={`/stockInfo`}>-</a>
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>
                                    <a href={`/stockInfo`}>-</a>
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>
                                    <a href={`/stockInfo`}>-</a>
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
