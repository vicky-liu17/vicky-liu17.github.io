// src/pages/ProjectDetail.js
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { projectsData } from './ProjectsData';
import { IoIosArrowBack } from 'react-icons/io';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useLang } from '../LanguageContext';
import { translations } from '../translations';
import './ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const { lang } = useLang();
  const t = translations[lang];

  // Find the base project (always from projectsData — source of truth for media)
  const baseProject = projectsData.find(p => p.id === parseInt(id));

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!baseProject) {
    return (
      <div className="page-wrapper-detail">
        <div className="content-card-detail">
          <h2>Project not found</h2>
          <Link to="/" className="back-link">{t.detail.back}</Link>
        </div>
      </div>
    );
  }

  // If a zh translation exists for this project, use its content array;
  // otherwise fall back to the English original.
  const zhProject = t.projectsContent?.[String(baseProject.id)];
  const project = {
    ...baseProject,
    title:    zhProject?.title    ?? baseProject.title,
    category: zhProject?.category ?? baseProject.category,
    date:     zhProject?.date     ?? baseProject.date,
    // Use translated content when available, else fall back to English
    content:  (lang === 'zh' && zhProject?.content) ? zhProject.content : baseProject.content,
  };

  // ── Block renderers ────────────────────────────────────────────────────────
  const renderBlock = (block, index) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={index} className="block-text markdown-content">
            <ReactMarkdown>{block.value}</ReactMarkdown>
          </div>
        );

      case 'image':
        return (
          <div key={index} className="block-image">
            <img src={block.src} alt={block.caption || 'Project visual'} />
            {block.caption && <span className="caption">{block.caption}</span>}
          </div>
        );

      case 'image-group':
        return (
          <div key={index} className="block-image-group">
            <div className="image-group-row">
              {block.images.map((imgSrc, i) => (
                <img key={i} src={imgSrc} alt={`Group visual ${i}`} />
              ))}
            </div>
            {block.caption && <span className="caption">{block.caption}</span>}
          </div>
        );

      case 'media-text':
        return (
          <div key={index} className="block-media-row">
            <div className="media-row-visual">
              <img src={block.src} alt="Visual content" />
            </div>
            <div className="media-row-text markdown-content">
              <ReactMarkdown>{block.value}</ReactMarkdown>
            </div>
          </div>
        );

      case 'card-gallery':
        return (
          <div key={index} className="block-cards-row">
            {block.items.map((item, i) => (
              <div key={i} className="card-item">
                <div className="card-image-wrapper">
                  <img src={item.src} alt={item.title} />
                </div>
                <div className="card-info">
                  <span className="card-title">{item.title}</span>
                  <p className="card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'image-link':
        return (
          <div key={index} className="block-image-link-wrapper">
            <a href={block.link} target="_blank" rel="noopener noreferrer" className="block-image-link">
              <div className="link-badge">
                <FaExternalLinkAlt /> Live Demo
              </div>
              <div className="image-container">
                <img src={block.src} alt={block.caption || 'External Link'} />
                <div className="image-link-overlay">
                  <span className="overlay-text">Click to Visit</span>
                </div>
                <div className="shine-effect"></div>
              </div>
              {block.caption && (
                <div className="link-caption-box">
                  <span className="caption-title">{block.caption}</span>
                  <span className="caption-arrow">→</span>
                </div>
              )}
            </a>
          </div>
        );

      case 'github-card':
        return (
          <div key={index} className="block-github-wrapper">
            <a href={block.link} target="_blank" rel="noopener noreferrer" className="github-card">
              <div className="github-icon-box">
                <FaGithub size={40} />
              </div>
              <div className="github-content">
                <span className="github-repo-name">{block.repoName}</span>
                <p className="github-desc">{block.desc}</p>
                <span className="github-link-text">View Code &rarr;</span>
              </div>
            </a>
          </div>
        );

      case 'youtube':
        return (
          <div key={index} className="block-video-wrapper">
            <div className="block-video">
              <iframe
                src={`https://www.youtube.com/embed/${block.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {block.caption && <span className="caption">{block.caption}</span>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-wrapper-detail">
      <div className="content-card-detail">

        <nav className="detail-nav">
          <Link to="/" className="back-link">
            <IoIosArrowBack /> {t.detail.back}
          </Link>
        </nav>

        <header className="detail-header">
          <span className="project-category">{project.category}</span>
          <h1 className="detail-title">{project.title}</h1>
          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">{t.detail.date}</span>
              <span className="meta-value">{project.date}</span>
            </div>
          </div>
        </header>

        <article className="detail-body">
          {project.content.map((block, index) => renderBlock(block, index))}
        </article>

        <footer className="detail-footer">
          <p>© 2025 Yujie Liu. {project.title}.</p>
        </footer>

      </div>
    </div>
  );
}

export default ProjectDetail;