import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Page/Home';
import MoreInfo from './Page/MoreInfo';
import Login from './Page/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

function IndexApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more-info" element={<MoreInfo />} />
        <Route path="/log-in" element={<Login />} />
      </Routes>
    </Router>
  );
}

root.render(
  <IndexApp/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
