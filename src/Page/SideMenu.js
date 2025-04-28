// LocalSideMenuMotion.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState,  useEffect, useRef } from "react";

const LocalSideMenuMotion = ({ visible, onClose, position = 'right', children, title, 
                              records, onSelectRecord = () => {}, selectedIndex, setSelectedIndex}) => {
  const isLeft = position === 'left';
  

  const variants = {
    hidden: { x: isLeft ? '-100%' : '100%' },
    visible: { x: 0 },
    exit: { x: isLeft ? '-100%' : '100%' },
  };

  const handleRecordClick = (index, record) => {
    setSelectedIndex(index);
    onSelectRecord(record, index); // 通知外部選到了哪個
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            className="backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'black',
              zIndex: 1,
            }}
          />

          {/* 側邊欄 */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '300px',
              height: '100vh',
              [isLeft ? 'left' : 'right']: 0,
              backgroundColor: '#222',
              color: '#fff',
              zIndex: 1000,
              padding: '20px',
              boxShadow: '2px 0 8px rgba(0,0,0,0.5)'
            }}
          >
            {/* Title 區塊 */}
            <div className="mb-4">
              <h4 className="fw-bold">{title}</h4>
              <hr style={{ borderTop: '1px solid #555' }} />
            </div>

            {/* 歷史紀錄 */}
            <div className="flex-grow-1">
              {records.length > 0 ? (
                <ul className="list-unstyled">
                  {records.map((record, index) => (
                    <li 
                      key={index}
                      className="py-3 px-3 mb-0 border-top border-bottom border-secondary"
                      style={{
                        cursor: 'pointer',
                        backgroundColor: selectedIndex === index ? '#444' : 'transparent',
                        fontSize: '1.1rem',
                        fontWeight: selectedIndex === index ? 'bold' : 'normal',
                        transition: '0.3s',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#333';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = selectedIndex === index ? '#444' : 'transparent';
                      }}
                      onClick={() => handleRecordClick(index, record)}
                    >
                      {record}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">暫無紀錄</p>
              )}
            </div>

            {children}

            <button className="btn btn-light btn-sm mt-3" onClick={onClose}>關閉</button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LocalSideMenuMotion;
