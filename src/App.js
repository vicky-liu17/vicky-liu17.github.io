import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import ProjectDetail from './ pages/ProjectDetail'; // 确认路径正确
import { LanguageProvider } from './LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
          <LanguageSwitcher />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;