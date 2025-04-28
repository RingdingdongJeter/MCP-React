import React from 'react';
import { useState,  useEffect, useRef } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from "../lib/supabaseClient";
import './All.css';

function Header(){

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
          setUser(user);
        });
    
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
          if (session?.user) {
            setShowModal(false); // 登入成功後自動關閉 modal
          }
        });
    
        return () => {
          authListener.subscription.unsubscribe();
        };
      }, []);


      const handleLoginClick = () => {
        setShowModal(true); // 打開登入 Modal
      };
    
      const handleLogoutClick = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
          setUser(null);
          navigate('/'); // 登出後回首頁
        } else {
          console.error("Logout error:", error.message);
        }
      };
    
      const handleModalLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
          })
          if (error) console.error('Login error:', error.message)
        };

    return(
        <>
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid custom-cont">
              <NavLink className="navbar-brand fw-bold fs-4" to="/">
                MCP 網頁撰寫
              </NavLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item-info">
                  <NavLink className="nav-link" to="/more-info">網頁編輯系統</NavLink>
                </li>
                <li class="nav-item-info">
                  <NavLink className="nav-link" to="/more-info">網頁作品管理</NavLink>
                </li>
                <li class="nav-item-info">
                  <NavLink className="nav-link" to="/more-info">更多工具</NavLink>
                </li>
              </ul>
              <div className="d-flex align-items-center gap-3">
              {/* Log In / Out 設定 */}    
              {user ? (
                <>
                  <span className="text-light">{user.email}</span>
                  <button
                    className="btn btn-outline-light rounded-pill px-4"
                    onClick={handleLogoutClick}
                  >
                    Log Out
                  </button>
                </>
                ) : (
                  <button
                    className="btn btn-outline-light rounded-pill px-4"
                    onClick={handleLoginClick}
                  >
                    Log In
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Modal 登入彈窗 */}
        {showModal && (
        <div 
            className="modal fade show d-block" 
            tabIndex="-1" 
            style={{ 
            backgroundColor: "rgba(0, 0, 0, 0.6)", 
            backdropFilter: "blur(8px)", 
            WebkitBackdropFilter: "blur(8px)" 
            }}
        >
            <div className="modal-dialog modal-dialog-centered">
            <div 
                className="modal-content p-4"
                style={{
                background: "linear-gradient(135deg, rgba(40,40,60,0.9) 0%, rgba(30,30,50,0.95) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "1rem",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
                color: "#f0f0f0",
                }}
            >
                <div className="modal-header border-0">
                <h5 className="modal-title w-100 text-center fs-3 fw-bold">
                    歡迎登入
                </h5>
                <button 
                    type="button" 
                    className="btn-close btn-close-white position-absolute end-0 me-3" 
                    onClick={() => setShowModal(false)}
                />
                </div>

                <div className="modal-body text-center">
                <p className="mb-4 fs-5">只需一鍵，即可登入您的帳戶！</p>
                <button
                    className="btn btn-lg px-5 py-3 rounded-pill border-0"
                    style={{
                    background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                    boxShadow: "0 4px 15px rgba(0, 198, 255, 0.5)",
                    transition: "0.3s",
                    }}
                    onMouseOver={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.background = "linear-gradient(135deg, #0072ff 0%, #00c6ff 100%)";
                    }}
                    onMouseOut={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.background = "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)";
                    }}
                    onClick={handleModalLogin}
                >
                    🚀 一鍵登入
                </button>
                </div>
            </div>
            </div>
        </div>
        )}
        </>

      );
}
export default Header;