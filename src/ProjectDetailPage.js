import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetailPage.css';

function ProjectDetailPage() {
  const { id } = useParams();

  return (
    <div className="page-wrapper-detail">
      <div className="content-card-detail">
        <nav className="detail-nav">
          <Link to="/" className="back-link">← Back to Home</Link>
        </nav>

        <header className="detail-header">
          <span className="project-id">Project Case Study #{id}</span>
          <h1 className="detail-title">Enterprise Commerce System</h1>
          <div className="detail-meta">
            <span><strong>Role:</strong> Lead Frontend</span>
            <span><strong>Year:</strong> 2024</span>
            <span><strong>Tech:</strong> React, GraphQL</span>
          </div>
        </header>

        <div className="detail-image-box">
          <div className="placeholder-text">[ Project Hero Image Here ]</div>
        </div>

        <article className="detail-body">
          <p className="intro-text">
            This project required a complete rethinking of how users interact with complex data tables. 
            The goal was to reduce the "time to action" by streamlining the UI flow.
          </p>

          <h2>The Challenge</h2>
          <p>
            Legacy systems were slow and unresponsive on mobile devices. 
            Our task was to migrate the entire frontend to a modern React architecture 
            without disrupting ongoing business operations.
          </p>

          <h2>The Solution</h2>
          <ul>
            <li>Implemented <strong>Server-Side Rendering</strong> for SEO and initial load speed.</li>
            <li>Created a custom <strong>Design System</strong> to ensure UI consistency.</li>
            <li>Optimized data fetching using <strong>GraphQL</strong>, reducing payload size by 40%.</li>
          </ul>

          <p>
            The outcome was a robust, future-proof platform that received high praise from stakeholders 
            for its speed and intuitive design.
          </p>
        </article>
      </div>
    </div>
  );
}

export default ProjectDetailPage;