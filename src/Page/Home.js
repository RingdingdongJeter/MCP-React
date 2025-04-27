import React from 'react';
import { useState,  useEffect, useRef } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import LocalSideMenuMotion from './SideMenu';
import Chat from './Chat';
import MoreInfo from './MoreInfo'
import './Home.css';

function Home(){
    return(
        <div>
            <Header/>
            <Main_Sight/>
        </div>
    );
}
export default Home;

function Header(){

  const navigate = useNavigate();

  const handleLoginClick = () => {
      navigate('/log-in');
  };

  return(
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
                  {/*<span className="fs-5">🌐</span>
                  <NavLink className="text-light text-decoration-none fw-semibold">Sign Up</NavLink>*/}
                  <button className="btn btn-outline-light rounded-pill px-4" onClick={handleLoginClick}>Log In</button>
              </div>
            </div>
          </div>
        </nav>
      );
}

  
function Main_Sight(){
    const [menuVisible, setMenuVisible] = useState(false);
    const [messages, setMessages] = useState([{ sender: 'bot', text: '您好！請輸入訊息 👋' },]);
    const [htmlContent, setHtmlContent] = useState('');
  
    // API
    const fetchBotReply = async (userInput) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`你說的是：「${userInput}」`);
        }, 500);
      });
    };
    
  
    const handleDialogue = async (inputText) => {
      setMessages((prev) => [...prev, { sender: 'user', text: inputText }]);
  
      /*try {
        // 1. 先做 POST 請求，把 inputText 傳出去
        const post_status = await PostAIResponse(inputText);
        if (!post_status.success) {
          throw new Error(`後端錯誤：${post_status.message || '未成功處理'}`);
        }
        // 2. 再做 GET 請求
        const response = await GetAIResponse();
        // 加入 bot 的回覆
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: `伺服器回應：${JSON.stringify(response)}` }
        ]);
        handleGenerate(response);   // 產生網頁回應
      } catch (err) {
        console.error('❌ 發生錯誤：', err);
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: `發生錯誤：${err.message}` }
        ]);
      }*/
  
      fetchBotReply(inputText).then((botReply) => {
        setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
        // 根據產生的回應輸出
        botReply = `我產生了一個形象網頁:
        1. 首頁大標語、品牌定位
        2. 三個主要服務項目介紹
        3. 最後底部版權、聯絡資訊等
        希望能符合你的要求!`
        /*botReply = `<form action="signup" method="post">
          帳號: <input type="text" name="user"/><br/>
          密碼: <input type="password" name="password"/><br/>
          信箱: <input type="email" name="email"/><br/>
          生日: <input type="date" name="birthday"/><br/>
          照片: <input type="file" name="picture"/><br/>
          性別: <input type="radio" name="sex" value="male" checked/> 男
                <input type="radio" name="sex" value="female"/> 女<br/>
          血型: <select name="BloodType">
                  <option value="A">A 型</option>
                  <option value="B">B 型</option>
                  <option value="AB">AB 型</option>
                  <option value="O">O 型</option>
                </select> <br/>
          自我介紹： <br/>
          <textarea name="AboutMe">
          </textarea> <br/>
  
          <input type="submit" value="送出"/><input type="reset" value="清除"/><br/>
          </form>`*/
        handleGenerate(BrandHTML);
      });
    };
  
    // 滑到最底
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);
  
    // 預覽畫面
    const handleGenerate = (inputText) => {
      // 假設輸入的是 HTML 原始碼（或經過轉換）
      const template = `
        <html>
          <head>
            <style>
              body { font-family: sans-serif; padding: 20px; }
              h1 { color: #3366ff; }
            </style>
          </head>
          <body>
            ${inputText}
          </body>
        </html>
      `;
      setHtmlContent(template);
    };
  
    return(
      <div class="darktheme">
          <div class="custom-container-fluid p-3">
            <div class="row h-100">
              <div className="col d-flex flex-column justify-content-between"
                  style={{borderRight: "1px solid #ccc" }}>
                <div>
                  {/* nav-bar */}
                  <nav class="navbar navbar-dark darktheme">
                    <div className="container d-flex justify-content-between align-items-center">
                      <button class="navbar-toggler" type="button" onClick={() => setMenuVisible((prev) => !prev)}>
                        <span class="navbar-toggler-icon"></span>
                      </button>
                      <h4 className="text-white mx-auto m-0">聊天室</h4>
                      <div style={{ width: '50px' }}></div>
                    </div>
                  </nav>
                  <div className="row chatbox" style={{overflowY: 'auto', position: 'relative'}}  ref={scrollRef}>
                    <div className="col">
                      <Dialogue messages={messages}/>
                    </div>
                        <LocalSideMenuMotion visible={menuVisible}
                          onClose={() => setMenuVisible(false)} position="left">
                          <h5>側邊選單</h5>
                          <p>這是局部滑出的內容</p>
                        </LocalSideMenuMotion>
                  </div>
                  {/* nav-bar */}
                </div>
                <PromptInput onSend={handleDialogue}/>
              </div>
              
              <div class="col" style={{textAlign: "center"}}>
                <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                  <div style={{ width: '120px' }}></div>
                  <h4 className="text-white mx-auto m-0">預覽畫面</h4>
                  <button className="btn btn-secondary rounded-5">
                    <i className="bi bi-download me-2"></i>
                    儲存程式碼
                  </button>
                </div>
                  <WebResult htmlContent={htmlContent}/>
              </div>
            </div>
          </div>
      </div>
    );
  }
  
  function Dialogue({ messages }){
    return(
      <div class="container mt-4">
        <Chat messages={messages} />
      </div>
    );
  }
  
  function PromptInput({ onSend }){
    const [msginput,setMsg] = useState('');  //請幫我產生簡易的網頁
  
    const handleSend = () =>{
      if (msginput.trim() === '') return;
      onSend(msginput);
      setMsg('');
    };
  
    return(
      <div class="input-group mb-3">
        <input type="text" className="form-control" placeholder="請問任何問題" 
        aria-label="Recipient's username" aria-describedby="button-addon2"
        value={msginput}  onChange={(e) => setMsg(e.target.value)}/>
        <button className="btn btn-secondary" type="button" id="button-addon2"
          onClick={handleSend}>確認送出</button>
      </div>
    );
  }
  
  function WebResult({ htmlContent }){
    return (
      <iframe
        title="HTML Preview"
        srcDoc={htmlContent}
        style={{
          width: '100%',
          height: '90%',
          border: 'none',
          background: '#fff',
        }}
      />
    );
  }
  
  async function PostAIResponse(userInput) {
    try {
      const postRes = await fetch('//140.113.73.25:8001/api/sessions/test-session/agent', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer afWww4DMsQLpObfm0Y6aTSu130lDinjd',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "query": userInput,
          "user_id": "test-user",
          "request_id": "abc123"
        }),
      });
  
      if (!postRes.ok) {
        throw new Error(`POST 失敗: ${postRes.status}`);
      }
  
      const postData = await postRes.json();
      return postData
      
    } catch (err) {
      console.error('Fetch 錯誤:', err);
      throw err; // 傳給呼叫者處理
    }
  };
  
  
  
  async function GetAIResponse() {
    try {
      const res = await fetch('//140.113.73.25:8001/api/sessions/test-session/messages/latest', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer afWww4DMsQLpObfm0Y6aTSu130lDinjd',
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Fetch 錯誤:', err);
      throw err; // 傳給呼叫者處理
    }
  }
  
const BrandHTML = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>科技創新形象網站</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: #f5f7fa;
      color: #333;
    }

    header {
      background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
      padding: 1.5rem 2rem;
      color: white;
      text-align: center;
    }

    nav {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 0.5rem;
    }

    nav a {
      color: #eee;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    nav a:hover {
      color: #ffd700;
    }

    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: #ffffff;
    }

    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .hero p {
      font-size: 1.2rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }

    .features {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      padding: 3rem 2rem;
      background: #f0f0f0;
    }

    .feature-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 2rem;
      max-width: 300px;
      text-align: center;
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-6px);
    }

    .feature-card h3 {
      color: #2c5364;
    }

    .cta {
      text-align: center;
      padding: 2rem;
      background: #2c5364;
      color: white;
    }

    .cta button {
      background-color: #ffd700;
      color: #000;
      border: none;
      padding: 0.8rem 2rem;
      font-size: 1rem;
      border-radius: 30px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .cta button:hover {
      background-color: #e6c200;
    }

    footer {
      background: #1c1c1c;
      color: #aaa;
      text-align: center;
      padding: 1rem;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>

  <header>
    <h1>創新科技品牌</h1>
    <nav>
      <a href="#">首頁</a>
      <a href="#">服務</a>
      <a href="#">關於我們</a>
      <a href="#">聯絡</a>
    </nav>
  </header>

  <section class="hero">
    <h1>啟動您的數位未來</h1>
    <p>我們專注於打造高效、現代化的網頁與應用，幫助企業快速進入數位市場。</p>
  </section>

  <section class="features">
    <div class="feature-card">
      <h3>⚡ 極速響應</h3>
      <p>網站快速載入，使用者體驗最佳化。</p>
    </div>
    <div class="feature-card">
      <h3>🎨 品牌設計</h3>
      <p>提供視覺識別、LOGO 與整體品牌形象打造。</p>
    </div>
    <div class="feature-card">
      <h3>🔒 資安第一</h3>
      <p>內建資安防護，網站更安全、客戶更安心。</p>
    </div>
  </section>

  <section class="cta">
    <h2>準備好改變未來了嗎？</h2>
    <p>立即聯絡我們，開始打造您的網站。</p>
    <button onclick="alert('感謝您的洽詢！')">立即聯絡</button>
  </section>

  <footer>
    &copy; 2024 創新科技品牌 | Powered by HTML & CSS
  </footer>
</body>
</html>`