import React from 'react';
import { useState,  useEffect, useRef } from "react";
import { Modal, Button, OverlayTrigger, Tooltip, Collapse } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './All.css';
import Header from './Header'
import * as database from './Database';

function MoreInfo(){
    return(
        <div>
            <Header/>
            <Main_Sight/>
        </div>
    );
}
export default MoreInfo;


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
            <div class="custom-container-fluid p-3">
                <div class="row">
                    <div class="col-4">
                        <ProjectList All_Projects={database.All_Projects} onClickProject={ClickProject}/>
                    </div>
                    <div class="col-5" style={{textAlign: "center"}}>
                      <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                        <div style={{ width: '120px' }}></div>
                        <h4 className="text-white mx-auto m-0">預覽畫面</h4>
                        <button className="btn btn-secondary rounded-5">
                          <i className="bi bi-download me-2"></i>
                          下載
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

  
function ProjectCard({ project, onClick }) {
    const [showModal, setShowModal] = useState(false);
    const [openCollapse, setOpenCollapse] = useState(false);
    const navigate = useNavigate();

    const handleGoHome = () => {
      navigate('/', { state: { project: project } });
    };
  
    return (
      <>
        <div className="card mb-3 border-0 shadow-sm hover-shadow card-hover"
              onClick={onClick}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div className='mb-2'>
                <h5 className="card-title fw-bold" style={{ color: '#000000'}}>{project.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Generated on {project.date}</h6>
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
                <Button variant="outline-primary" size="sm" onClick={handleGoHome}>開啟 AI 編輯</Button>
              </OverlayTrigger>
  
              <Button variant="outline-secondary" size="sm" onClick={() => setShowModal(true)}>預覽程式碼</Button>
  
              {/* Tooltip 實例 */}
              <OverlayTrigger placement="top" overlay={<Tooltip>刪除此項目</Tooltip>}>
                <Button variant="outline-danger" size="sm">🗑</Button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
  
        {/* Modal 彈窗 */}
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
      </>
    );
  }
  
function ProjectList({ All_Projects, onClickProject }) {
    return (
        <div className="container mt-2">
            <h4 className="mb-4">Previous Projects</h4>
            {All_Projects.map((project, i) => (
            <ProjectCard key={i} project={project}
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
