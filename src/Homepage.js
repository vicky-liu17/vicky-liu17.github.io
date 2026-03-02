// src/Homepage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCircleInfo } from 'react-icons/ci';
import { MdOutlineWorkOutline, MdDesignServices, MdSchool, MdWork } from 'react-icons/md';
import { useLang } from './LanguageContext';
import { translations } from './translations';
import './Homepage.css';

// Static data that does NOT change with language (ids, images, types)
const portfolioMeta = [
  { id: 1, image: '/heart.png' },
  { id: 2, image: '/banner.png' },
  { id: 3, image: '/get-planned.png' },
  { id: 4, image: '/law-concept.png' },
];

const journeyMeta = [
  { type: 'edu' },
  { type: 'edu' },
  { type: 'work' },
  { type: 'work' },
  { type: 'edu' },
  { type: 'work' },
  { type: 'work' },
];

function Homepage() {
  const { lang } = useLang();
  const t = translations[lang];

  const [activeSection, setActiveSection] = useState('about');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHamburgerMenu, setIsHamburgerMenu] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) window.scrollTo({ top: section.offsetTop - 20, behavior: 'smooth' });
  };

  const toggleNav = () => setIsCollapsed(!isCollapsed);
  const toggleHamburgerMenu = () => setHamburgerMenuOpen(!hamburgerMenuOpen);

  useEffect(() => {
    const check = () => setIsHamburgerMenu(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isHamburgerMenu) document.body.classList.add('hamburger-active');
    else document.body.classList.remove('hamburger-active');
  }, [isHamburgerMenu]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'works', 'journey'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const sections = document.querySelectorAll('section');
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const navItems = [
    { id: 'about',   icon: <CiCircleInfo />,          label: t.nav.about },
    { id: 'works',   icon: <MdDesignServices />,       label: t.nav.portfolios },
    { id: 'journey', icon: <MdOutlineWorkOutline />,   label: t.nav.journey },
  ];

  return (
    <div className="page-wrapper">
      {/* Navigation */}
      {isHamburgerMenu ? (
        <div className="hamburger-nav">
          <button className="hamburger-btn" onClick={toggleHamburgerMenu}>
            <span className="hamburger-icon">
              <span className={`hamburger-line ${hamburgerMenuOpen ? 'line1' : ''}`}></span>
              <span className={`hamburger-line ${hamburgerMenuOpen ? 'line2' : ''}`}></span>
              <span className={`hamburger-line ${hamburgerMenuOpen ? 'line3' : ''}`}></span>
            </span>
          </button>
          {hamburgerMenuOpen && <div className="hamburger-overlay" onClick={toggleHamburgerMenu}></div>}
          <div className={`hamburger-menu ${hamburgerMenuOpen ? 'open' : ''}`}>
            <ul className="hamburger-list">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    className={`hamburger-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => { scrollToSection(item.id); setHamburgerMenuOpen(false); }}
                  >
                    {item.icon} <span className="hamburger-text">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <nav className={`drawer-nav ${isCollapsed ? 'collapsed' : ''}`}>
          <button className="toggle-btn" onClick={toggleNav}>
            <span className="toggle-icon">{isCollapsed ? '→' : '←'}</span>
          </button>
          <ul className="nav-list">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="content-card">
        {/* 1. Header & Intro */}
        <section id="about" className="intro-section">
          <header className="site-header">
            <div className="header-content">
              <h1 className="name">{t.name}</h1>
              <div className="contact-row">
                <span>{t.contact.email}</span>
                <span className="dot">·</span>
                <span>{t.contact.phone}</span>
              </div>
              <div className="intro-block">
                <p>{t.intro}</p>
                <div className="compact-skills-wrapper">
                  <span className="skills-label">{t.skillsLabel}</span>
                  {t.skills.map((skill, i) => (
                    <span key={i} className="compact-skill-pill">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="profile-photo">
              <img src="/personal-photo2.png" alt="Profile" />
            </div>
          </header>
        </section>

        <main>
          {/* 2. Portfolio */}
          <section id="works" className="section-container">
            <div className="heading-wrapper">
              <h2 className="section-heading">{t.sectionWorks}</h2>
            </div>
            <div className="works-grid">
              {portfolioMeta.map((meta, i) => {
                const work = t.portfolio[i];
                return (
                  <Link to={`/projects/${meta.id}`} key={meta.id} className="work-item">
                    <div className="work-img-container">
                      <img src={meta.image} alt={work.name} />
                    </div>
                    <div className="work-info">
                      <span className="work-cat">{work.cat}</span>
                      <h4 className="work-title">{work.name}</h4>
                      <p className="work-desc">{work.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* 3. Journey */}
          <section id="journey" className="section-container">
            <h2 className="section-heading">{t.sectionJourney}</h2>
            <div className="journey-timeline">
              <div className="journey-track"></div>
              {journeyMeta.map((meta, i) => {
                const item = t.journey[i];
                return (
                  <div key={i} className={`journey-node ${meta.type === 'edu' ? 'node-up' : 'node-down'}`}>
                    <div className="journey-marker">
                      <span className="node-icon">
                        {meta.type === 'edu' ? <MdSchool /> : <MdWork />}
                      </span>
                    </div>
                    <div className="journey-card">
                      <span className="j-period">{item.period}</span>
                      <h3 className="j-title">{item.title}</h3>
                      <div className="j-place">{item.place}</div>
                      <span className="j-loc">{item.location}</span>
                    </div>
                    <div className="journey-line-connector"></div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <p>{t.footer}</p>
        </footer>
      </div>
    </div>
  );
}

export default Homepage;