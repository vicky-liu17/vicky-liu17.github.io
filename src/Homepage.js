import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCircleInfo } from 'react-icons/ci';
import { MdOutlineWorkOutline, MdDesignServices, MdSchool, MdWork } from 'react-icons/md';
import './Homepage.css';

const personalData = {
  name: "Yujie Liu",
  contact: {
    email: "yujieliu@kth.se",
    phone: "(+86) 138-8847-6715",
  },
  intro: "I am a creative technologist and ML researcher bridging the gap between generative AI and human-centric interaction. Currently completing my MSc at KTH, I combine robust engineering logic with aesthetic intuition to transform complex algorithms into intuitive, tangible digital experiences.",
  // Journey Data: Oldest (Left) -> Newest (Right)
  journey: [
    {
      type: 'edu',
      period: "2016 — 2020",
      title: "BEng in Computer Science",
      place: "The University of Hong Kong",
      location: "Hong Kong"
    },
    {
      type: 'edu',
      period: "Fall 2018",
      title: "Exchange Program",
      place: "Nanyang Tech. Univ.",
      location: "Singapore"
    },
    {
      type: 'work',
      period: "June 2019 — Aug 2019",
      title: "Software Dev Intern",
      place: "Alibaba Group",
      location: "Hangzhou"
    },
    {
      type: 'work',
      period: "Sept 2020 — Oct 2021",
      title: "Software Engineer",
      place: "Alibaba Group (Fliggy)",
      location: "Hangzhou"
    },
    {
      type: 'edu',
      period: "2023 — Present",
      title: "MSc in Machine Learning",
      place: "KTH Royal Institute",
      location: "Stockholm"
    },
    {
      type: 'work',
      period: "June 2024 — Aug 2024",
      title: "AI R&D Intern",
      place: "Ericsson",
      location: "Stockholm"
    },
    {
      type: 'work',
      period: "July 2025 — Dec 2025",
      title: "Game Design Intern",
      place: "NetEase, Inc.",
      location: "Hangzhou"
    }
  ],

  portfolio: [
    {
      id: 1,
      image: "/heart.png",
      name: "Remnants of Love",
      cat: "AI-Native Game",
      desc: "Exploring LLM-driven semantic interaction in generative gaming."
    },
    {
      id: 2,
      image: "/banner.png",
      name: "AI Piano Evaluator",
      cat: "HAI & MUSIC TECH",
      desc: "Exploring algorithm-driven visual feedback in interactive music education."
    },
    {
      id: 3,
      image: "/law-concept.png",
      name: "Access Our Community",
      cat: "Web Platform / HCI",
      desc: "A real-time pro bono matching platform connecting lawyers with NGOs."
    }
  ],

  skills: [
  "PyTorch / LLMs", 
  "React / TypeScript", 
  "Flutter / Mobile Dev", 
  "Three.js / WebGL", 
  "FastAPI / Docker", 
  "Human-AI Interaction"
],
};

function Homepage() {
  const { name, contact, intro, journey, skills, portfolio } = personalData;
  const [activeSection, setActiveSection] = useState('about');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHamburgerMenu, setIsHamburgerMenu] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 20, behavior: 'smooth' });
    }
  };

  const toggleNav = () => setIsCollapsed(!isCollapsed);
  const toggleHamburgerMenu = () => setHamburgerMenuOpen(!hamburgerMenuOpen);

  useEffect(() => {
    const checkWindowSize = () => setIsHamburgerMenu(window.innerWidth < 1024);
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    return () => window.removeEventListener('resize', checkWindowSize);
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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const sections = document.querySelectorAll('section');
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const navItems = [
    { id: 'about', icon: <CiCircleInfo />, label: 'About' },
    { id: 'works', icon: <MdDesignServices />, label: 'Portfolios' },
    { id: 'journey', icon: <MdOutlineWorkOutline />, label: 'My Journey' },
  ];

  return (
    <div className="page-wrapper">
      {/* Navigation Logic */}
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
              <h1 className="name">{name}</h1>
              <div className="contact-row">
                <span>{contact.email}</span>
                <span className="dot">·</span>
                <span>{contact.phone}</span>
              </div>
              <div className="intro-block">
                <p>{intro}</p>
                <div className="compact-skills-wrapper">
                  <span className="skills-label">Tech Stack:</span>
                  {skills.map((skill, i) => (
                    <span key={i} className="compact-skill-pill">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="profile-photo">
              <img src="/personal-photo.png" alt="Profile" />
            </div>
          </header>
        </section>

        <main>
          {/* 2. Portfolio (Grid Layout) */}
          <section id="works" className="section-container">
            <div className="heading-wrapper">
              <h2 className="section-heading">Selected Works</h2>
            </div>

            <div className="works-grid">
              {portfolio.map((work) => (
                <Link to={`/projects/${work.id}`} key={work.id} className="work-item">
                  <div className="work-img-container">
                    <img src={work.image} alt={work.name} />
                  </div>
                  <div className="work-info">
                    <span className="work-cat">{work.cat}</span>
                    <h4 className="work-title">{work.name}</h4>
                    <p className="work-desc">{work.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 3. Combined Journey (Spaced Out) */}
          <section id="journey" className="section-container">
            <h2 className="section-heading">My Journey</h2>

            <div className="journey-timeline">
              <div className="journey-track"></div>

              {journey.map((item, i) => (
                <div key={i} className={`journey-node ${item.type === 'edu' ? 'node-up' : 'node-down'}`}>
                  {/* The Dot */}
                  <div className="journey-marker">
                    <span className="node-icon">
                      {item.type === 'edu' ? <MdSchool /> : <MdWork />}
                    </span>
                  </div>

                  {/* The Content Card */}
                  <div className="journey-card">
                    <span className="j-period">{item.period}</span>
                    <h3 className="j-title">{item.title}</h3>
                    <div className="j-place">{item.place}</div>
                    <span className="j-loc">{item.location}</span>
                  </div>

                  {/* Connector */}
                  <div className="journey-line-connector"></div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <p>© 2025 Yujie Liu.</p>
        </footer>
      </div>
    </div>
  );
}

export default Homepage;