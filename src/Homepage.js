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
  { id: 1, image: `${process.env.PUBLIC_URL}/follo-poster.png` },
  { id: 2, image: `${process.env.PUBLIC_URL}/heart.png` },
  { id: 3, image: `${process.env.PUBLIC_URL}/banner.png` },
  { id: 4, image: `${process.env.PUBLIC_URL}/law-concept.png` }
];

const journeyMeta = [
  { type: 'work' }, // 2026年3月 — 至今 (HCI科研实习生)
  { type: 'work' }, // 2025年7月 — 12月 (游戏设计实习生)
  { type: 'work' }, // 2024年6月 — 8月 (ML科研实习生)
  { type: 'edu' },  // 2023 — 至今 (机器学习硕士)
  { type: 'work' }, // 2020年9月 — 2021年10月 (软件工程师)
  { type: 'work' }, // 2019年6月 — 8月 (软件开发实习生)
  { type: 'edu' },  // 2018年秋 (交换生项目)
  { type: 'edu' }   // 2016 — 2020 (计算机科学学士)
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
              <img src={`${process.env.PUBLIC_URL}/personal-photo2.png`} alt="Profile" />
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
            
            <div className="vertical-timeline">
              <div className="v-track"></div>
              
              {journeyMeta.map((meta, i) => {
                const item = t.journey[i];
                // 偶数排左边，奇数排右边
                const isLeft = i % 2 === 0; 
                
                return (
                  <div key={i} className={`v-node ${isLeft ? 'v-left' : 'v-right'}`}>
                    <div className="v-marker">
                      {meta.type === 'edu' ? <MdSchool /> : <MdWork />}
                    </div>
                    
                    <div className="v-card">
                      <span className="v-period">{item.period}</span>
                      <h3 className="v-title">{item.title}</h3>
                      <div className="v-place">{item.place}</div>
                      <span className="v-loc">{item.location}</span>
                      {/* 如果未来你想在 translations.js 里加描述，直接在这里取消注释即可： */}
                      {/* {item.desc && <p className="v-desc">{item.desc}</p>} */}
                    </div>
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