// ChatWindow.js
import React from 'react';

function Chat({ messages }) {

    return (
      <div
      /*style={{
        height: '400px',
        border: '1px solid #ccc',
        padding: '10px',
        overflowY: 'auto',
        //backgroundColor: '#f9f9f9',
        borderRadius: '8px',
      }}*/
      >
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              padding: '5px 14px',
              borderRadius: '10px',
              backgroundColor: msg.sender === 'user' ? '#007bff' : '#e5e5ea',
              color: msg.sender === 'user' ? 'white' : 'black',
              maxWidth: '70%',
              wordWrap: 'break-word',
            }}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
