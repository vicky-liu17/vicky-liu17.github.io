import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import ProjectDetailPage from './ProjectDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the Main Homepage */}
          <Route path="/" element={<Homepage />} />
          
          {/* Dynamic Route for Project Details (captures the ID) */}
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          
          {/* Fallback Route for 404 */}
          <Route path="*" element={
            <div style={{textAlign: 'center', marginTop: '50px'}}>
              <h1>404 - Page Not Found</h1>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;