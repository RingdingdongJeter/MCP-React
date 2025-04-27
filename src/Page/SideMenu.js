// LocalSideMenuMotion.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LocalSideMenuMotion = ({ visible, onClose, position = 'right', children }) => {
  const isLeft = position === 'left';

  const variants = {
    hidden: { x: isLeft ? '-100%' : '100%' },
    visible: { x: 0 },
    exit: { x: isLeft ? '-100%' : '100%' },
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
            {children}
            <button className="btn btn-light btn-sm mt-3" onClick={onClose}>關閉</button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LocalSideMenuMotion;
