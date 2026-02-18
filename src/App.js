// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import ProjectDetail from './ pages/ProjectDetail';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* 首页 */}
          <Route path="/" element={<Homepage />} />
          
          {/* 详情页，:id 是动态参数 */}
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;