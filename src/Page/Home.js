import React from 'react';
import { useState,  useEffect, useRef } from "react";
import { Modal, Button } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation  } from 'react-router-dom';
import LocalSideMenuMotion from './SideMenu';
import Chat from './Chat';
import Header from './Header'
import './All.css';
import { supabase } from "../lib/supabaseClient";
import * as database from './Database';

function Home(){
  const location = useLocation();
  // 新的專案
  const incomingProject = location.state?.project || database.project4;

    if (incomingProject.id === "4") {
      database.project4['id'] = "5";
      database.All_Projects.push(incomingProject);
    };

    return(
        <div>
            <Header/>
            <Main_Sight incomingProject={incomingProject}/>
        </div>
    );
}
export default Home;


  
function Main_Sight({ incomingProject }){
    const project = incomingProject;
    const [menuVisible, setMenuVisible] = useState(false);
    const [messages, setMessages] = useState([{ sender: 'bot', text: '您好！請輸入訊息 👋' },]);
    const [htmlContent, setHtmlContent] = useState('');
    const [histories, setHistories] = useState(
      Object.entries(project)
      .filter(([key, _]) => key.startsWith("history"))
      .map(([_, value]) => value)
    );
    const [selectedIndex, setSelectedIndex] = useState(histories.length - 1);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // 執行預覽
    useEffect(() => {
      if (project.Webcode) {
        handleGenerate(project.Webcode);
      }
    }, []);

  
    const handleDialogue = async (inputText) => {
      setMessages((prev) => [...prev, { sender: 'user', text: inputText }]);

      const loadingMessage = { sender: 'bot', text: 'AI 正在回覆中...' };
      setMessages((prev) => [...prev, loadingMessage]);
  
      try {
        // 1. 先做 POST 請求，把 inputText 傳出去
        const post_status = await PostAIResponse(inputText);
        if (!post_status.success) {
          throw new Error(`後端錯誤：${post_status}`);
        }
        // 2. 再做 GET 請求
        const response = await GetAIResponse();
        const content = response.message.content;
        const htmlCode = response.message.data.html;
        // `${JSON.stringify(response)}`
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { sender: 'bot', text: content };
          return newMessages;
        });
        project['Webcode'] = htmlCode;
        handleGenerate(htmlCode);   // 產生網頁回應

        // 增加歷史紀錄
        const now = new Date();
        const taiwanTime = now.toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
        const nextIndex = Object.keys(project).filter(k => k.startsWith('history')).length + 1;
        const newKey = `history${nextIndex}`;
        //project[newKey] = `第 ${nextIndex} 筆新的歷史紀錄`;
        project[newKey] = `${taiwanTime}, ${content}`
      
        // 重新拉 histories
        const updatedHistories = Object.entries(project)
          .filter(([key, _]) => key.startsWith("history"))
          .map(([_, value]) => value);
      
        setHistories(updatedHistories);
        setSelectedIndex(updatedHistories.length - 1);

      } catch (err) {
        console.error('❌ 發生錯誤：', err);
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { sender: 'bot', text: `發生錯誤：${err.message}` };
          return newMessages;
        });
      }
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

    // 下載程式碼動作
    const handleConfirmSave = () => {
      const filename = `${project.title.replace(/\s+/g, '_')}.txt`; // 檔案名稱（自動把空白轉底線）
      const blob = new Blob([project.Webcode], { type: 'text/plain;charset=utf-8' });  // 將 codeText 包成 blob
      const url = URL.createObjectURL(blob); // 產生 blob 下載網址

      const link = document.createElement('a'); // 建立一個隱藏的 <a> 標籤
      link.href = url;
      link.download = filename; // 設定下載檔案名稱
      document.body.appendChild(link); // 把 a 放到畫面上
      link.click(); // 自動觸發點擊
      document.body.removeChild(link); // 下載完後移除
      URL.revokeObjectURL(url); // 釋放 blob 資源

      console.log('✅ 已儲存程式碼到本地端：', filename);

      setShowConfirmModal(false); // 關掉確認視窗
    }
  
    return(
      <>
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
                          onClose={() => setMenuVisible(false)} position="left"
                          // ---------------------------------------------------------------------project 改
                          title={project.title}
                          records={histories}selectedIndex={selectedIndex}
                          setSelectedIndex={setSelectedIndex}
                          onSelectRecord={(record, index) => {
                            setSelectedIndex(index);
                            // TODO: 載入那一筆聊天內容
                          }}>
                        </LocalSideMenuMotion>
                  </div>
                  {/* nav-bar */}
                </div>
                <PromptInput onSend={handleDialogue}/>
              </div>
              
              <div class="col" style={{textAlign: "center"}}>
                <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                  
                  <button className="btn btn-secondary rounded-5" style={{ backgroundColor: "#8e99a3"}}
                          onClick={() => setShowModal(true)}>
                    <i className="bi bi-eye-fill me-2"></i>
                    預覽程式碼
                  </button>
                  <h4 className="text-white mx-auto m-0">預覽畫面</h4>
                  <button className="btn btn-secondary rounded-5" onClick={() => setShowConfirmModal(true)}>
                    <i className="bi bi-download me-2"></i>
                    儲存程式碼
                  </button>
                </div>
                  <WebResult htmlContent={htmlContent}/>
              </div>
            </div>
          </div>
      </div>

      {/* 預覽程式碼 */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        centered 
        size="xl"            // ← 這裡！直接用 Bootstrap 的超大 Modal
        dialogClassName="modal-90w" // ← 再稍微自訂一下讓寬度更大
        style={{ maxHeight: "90vh" }} // ← 防止超出螢幕高度
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview - {project.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ overflowY: "auto", maxHeight: "70vh" }}>
          {/* 放程式碼區塊 */}
          <pre style={{
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            padding: "1rem",
            borderRadius: "8px",
            overflowX: "auto",
            whiteSpace: "pre-wrap", // ← 保留換行、也能自動換行
            wordBreak: "break-word",
            fontSize: "0.9rem",
          }}>
            {project.Webcode}
          </pre>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 儲存程式碼 */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>確認儲存</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>確定要儲存目前的程式碼嗎？</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={handleConfirmSave}>
            確認儲存
          </Button>
        </Modal.Footer>
      </Modal>
      </>
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
    const sessionId = "test-session";
    const session = await supabase.auth.getSession();
    const accessToken = session.data.session?.access_token;

    if (!accessToken) {
        alert("No access token found");
        return;
    }

    try {
      const res = await fetch(`http://140.113.73.25:8001/api/sessions/${sessionId}/agent`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            query: userInput,
          }),
      });

      const postData = await res.json();
      return postData
      
    } catch (err) {
      console.error('Fetch 錯誤:', err);
      throw err; // 傳給呼叫者處理
    }
  };
  
  
  
  async function GetAIResponse() {
    const sessionId = "test-session";
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const token = session?.access_token;

    if (!token) {
        alert("No access token found. Are you logged in?");
        return;
    }

    try {
      const res = await fetch(`http://140.113.73.25:8001/api/sessions/${sessionId}/messages/latest`, { //messages
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Fetch 錯誤:', err);
      throw err; // 傳給呼叫者處理
    }
  }
  
