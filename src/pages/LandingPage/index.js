import React from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
export default function LandingPage() {
  const navigate = useNavigate();
  const onGetStart = () => {
    navigate("/login");
  };
  return (
    <div className="landing">
      <div className="landing-header">
        <div className="logo">
          <span>
            <b>STORE MANAGER</b>
          </span>
        </div>
        <div className="login-register">
          <div style={{ margin: "0 1rem" }}>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              ログイン
            </Link>
          </div>
          <div style={{ margin: "0 1rem" }}>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              サインアップ
            </Link>
          </div>
        </div>
      </div>
      <div className="landing-content">
        <div className="landing-content-des">
          <p>プロダクトのメリット：</p>
          <ul>
            <li>ユーザー（特にSNSをよく使っているユーザー）と店舗のブリッジだ。</li>
            <li>広告のことを簡単にする。</li>
            <li>ユーザーの買う習慣を集めて、将来の計画を作成できる。</li>
          </ul>
        </div>
        <br/>
        <button className="get-start" onClick={onGetStart}>
          スタート
        </button>
      </div>
    </div>
  );
}
