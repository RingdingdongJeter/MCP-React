import React from 'react';
import { useState,  useEffect, useRef } from "react";
import { Modal, Button, OverlayTrigger, Tooltip, Collapse } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './MoreInfo.css';

function MoreInfo(){
    return(
        <div>
            <Header/>
            <Main_Sight/>
        </div>
    );
}
export default MoreInfo;


function Header(){
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
                <NavLink className="nav-link" to="/">網頁編輯系統</NavLink>
              </li>
              <li class="nav-item-info">
                <NavLink className="nav-link" to="/">網頁作品管理</NavLink>
              </li>
              <li class="nav-item-info">
                <NavLink className="nav-link" to="/">更多工具</NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-3">
                <span className="fs-5">🌐</span>
                <NavLink className="text-light text-decoration-none fw-semibold">Sign Up</NavLink>
                <button className="btn btn-secondary rounded-pill px-4">Log In</button>
            </div>
          </div>
        </div>
      </nav>
    );
}

function Main_Sight(){
  const [htmlContent, setHtmlContent] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const ClickProject = (project) => {
    // 選擇專案並顯示
    handleGenerate(project['Webcode']);
    setSelectedProject(project);
  };

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
        <div class="darktheme-info">
            <div class="container-fluid p-3">
                <div class="row">
                    <div class="col-4">
                        <ProjectList All_Projects={All_Projects} onClickProject={ClickProject}/>
                    </div>
                    <div class="col-5" style={{textAlign: "center"}}>
                      <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                        <div style={{ width: '120px' }}></div>
                        <h4 className="text-white mx-auto m-0">預覽畫面</h4>
                        <button className="btn btn-secondary rounded-5">
                          <i className="bi bi-download me-2"></i>
                          預覽
                        </button>
                      </div>
                        <div class="row h-100">
                          <WebResult htmlContent={htmlContent}/>
                          {/*<iframe src="http://localhost:3000/" />*/}
                        </div>
                    </div>
                    <div class="col-3">
                      {selectedProject ? (
                        <ListFromProject project={selectedProject} />
                      ) : (
                        <div className="text-muted mt-3">請點選一個專案以顯示檔案</div>
                      )}
                    </div>
                </div>
            </div>
        </div>
    );
}

  
function ProjectCard({ title, date, onClick }) {
    const [showModal, setShowModal] = useState(false);
    const [openCollapse, setOpenCollapse] = useState(false);
  
    return (
      <>
        <div className="card mb-3 border-0 shadow-sm hover-shadow card-hover"
              onClick={onClick}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div className='mb-2'>
                <h5 className="card-title fw-bold" style={{ color: '#000000'}}>{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Generated on {date}</h6>
              </div>
  
              {/* Collapse toggle */}
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setOpenCollapse(!openCollapse)}
                aria-expanded={openCollapse}
              >
                {openCollapse ? '▲' : '▼'}
              </Button>
            </div>
  
            <Collapse in={openCollapse}>
              <div>
                <p className="text-secondary">這裡是可展開/收合的詳細內容，例如專案摘要、技術說明、描述等。</p>
              </div>
            </Collapse>
  
            {/* Button group */}
            
            <div className="d-flex flex-wrap gap-3">
              {/* Tooltip 實例 */}
              <OverlayTrigger placement="top" overlay={<Tooltip>開啟預覽畫面</Tooltip>}>
                <Button variant="outline-primary" size="sm" onClick={() => setShowModal(true)}>開啟 AI 編輯</Button>
              </OverlayTrigger>
  
              <Button variant="outline-secondary" size="sm">下載程式碼</Button>
  
              {/* Tooltip 實例 */}
              <OverlayTrigger placement="top" overlay={<Tooltip>刪除此項目</Tooltip>}>
                <Button variant="outline-danger" size="sm">🗑</Button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
  
        {/* Modal 彈窗 */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Preview - {title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>這裡是預覽內容，你可以在這裡嵌入 iframe、HTML、圖表或更多資訊。</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              關閉
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
function ProjectList({ All_Projects, onClickProject }) {
    return (
        <div className="container mt-2">
            <h4 className="mb-4">Previous Projects</h4>
            {All_Projects.map((project, i) => (
            <ProjectCard key={i} title={project.title} date={project.date}
                         onClick={() => onClickProject(project)} />
            ))}
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

function ListFromProject({ project }) {
  const [fileList, setFileList] = useState([]);

  const handleAddFiles = () => {
    // 過濾出所有以 "file" 開頭的欄位
    const files = Object.entries(project)
      .filter(([key, _]) => key.startsWith("file"))
      .map(([key, value]) => ({
        name: value,
        type: getFileTypeIcon(value),
      }));

    setFileList(files);
  };

  useEffect(() => {
    handleAddFiles();
  }, [project]);

  // 簡單判斷檔案類型加上 icon
  const getFileTypeIcon = (filename) => {
    if (filename.endsWith('.html')) return '📄';
    if (filename.endsWith('.css')) return '🎨';
    if (filename.endsWith('.js')) return '📜';
    return '📁';
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-3">{project.title} 檔案列表</h5>

      <div className="list-group mb-3">
        {fileList.map((file, index) => (
          <div
            key={index}
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex justify-content-between">
              <span>{file.type} {file.name}</span>
              <small>{project.date}</small>
            </div>
          </div>
        ))}
      </div>

      {/*<button className="btn btn-primary" onClick={handleAddFiles}>
        ➕ 匯入所有檔案
      </button>*/}
    </div>
  );
}


const Webcode = `
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <title>Iframe 頁面切換示範</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: sans-serif;
      background: #f5f5f5;
      padding: 2rem;
      margin: 0;
    }

    h2 {
      text-align: center;
      color: #333;
    }

    nav {
      text-align: center;
      margin-bottom: 1rem;
    }

    button {
      padding: 0.5rem 1.2rem;
      margin: 0 0.5rem;
      border: 1px solid #333;
      background: white;
      cursor: pointer;
      border-radius: 5px;
      transition: all 0.3s ease;
    }

    button:hover {
      background: #e0e0e0;
    }

    .page {
      display: none;
      text-align: center;
      padding: 1rem;
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
    }

    .page.active {
      display: block;
    }
  </style>
</head>
<body>
  <h2>Iframe 可切換頁面</h2>

  <nav>
    <button onclick="showPage('page1')">顯示第一頁</button>
    <button onclick="showPage('page2')">顯示第二頁</button>
  </nav>

  <div id="page1" class="page active">
    <p>這是第一頁的內容！你可以在這裡顯示一些介紹、圖片或 HTML 項目。</p>
  </div>

  <div id="page2" class="page">
    <p>這是第二頁內容！也可以放表單、範例、其他功能。</p>
  </div>

  <script>
    function showPage(id) {
      document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }
  </script>
</body>
</html>`

const Webcode2 = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>美麗預覽頁面</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      height: 100vh;
      background: linear-gradient(135deg, #74ebd5, #ACB6E5);
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(12px);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      padding: 2rem 3rem;
      max-width: 400px;
      text-align: center;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .card h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .card p {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .card button {
      background-color: #ffffff;
      color: #333;
      border: none;
      padding: 0.6rem 1.2rem;
      font-size: 1rem;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .card button:hover {
      background-color: #f1f1f1;
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>My Portfolio</h1>
    <p>Empowering brands through thoughtful and strategy-led marketing。<br>FULL POTENTIAL</p>
    <button onclick="alert('你點了按鈕！')">Try It Now</button>
  </div>
</body>
</html>`

const project1 = {id:"1", title: 'Build Smooth Landing Pages', date: 'April 24, 2024',
  Webcode: Webcode, file1:"Main.html", file2:"Main.css", file3:"Preview.js"}; 

const project2 = {id:"2", title: 'My Portfolio', date: 'April 23, 2024',
  Webcode: Webcode2, file1:"Index.html", file2:"Index.css", file3:"Component.js"}; 

const project3 = {id:"2", title: 'Responsive Navbar Example', date: 'April 22, 2024',
  Webcode: Webcode, file1:"Index.html", file2:"Index.css", file3:"Component.js"};

const project4 = {id:"2", title: 'Contact Form Design', date: 'April 21, 2024',
  Webcode: Webcode, file1:"Index.html", file2:"Index.css", file3:"Component.js"}; 

const All_Projects = [project1, project2, project3, project4]
