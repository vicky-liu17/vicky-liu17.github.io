import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiCircleInfo } from 'react-icons/ci';
import { LiaUniversitySolid } from 'react-icons/lia';
import { MdOutlineWorkOutline, MdDesignServices, MdBuild } from 'react-icons/md';
import { TfiWrite } from 'react-icons/tfi';
import './Homepage.css';

const personalData = {
  name: "Yujie Liu",
  // Removed role as requested
  // role: "Interactive Designer & Engineer", 
  contact: {
    email: "yujieliu@kth.se",
    phone: "(+86) 138-8847-6715",
    // Removed location as requested
    // location: "Stockholm / Shanghai"
  },
  intro: "I bridge the gap between engineering logic and aesthetic intuition. My work focuses on creating digital interfaces that are robust, accessible, and delight the user.",
  
  education: [
    {
      year: "2023 — Present",
      degree: "MSc Machine Learning",
      school: "KTH Royal Institute of Technology",
    },
    {
      year: "2016 — 2018",
      degree: "High School Diploma",
      school: "The University of Hong Kong"
    },
    {
      year: "2018 Fall Semester",
      degree: "Exchange Program",
      school: "Nanyang Technological University",
    }
  ],

  jobs: [
    { 
      period: "July 2026 — Present", 
      title: "Game Design Intern", 
      company: "NetEase, Inc.", 
      location: "Hangzhou, China",
      details: [
        "Lead Designer for <strong>Remnants of Love</strong>: Architected the world-building and AI-native gameplay in Unity, leading the project to secure 6 nominations (including Best Game & Best AI Application) in the NetEase Mini-game Competition.",
        "Narrative & Quest Designer for <strong>Sword of Justice</strong>: Scripted immersive storylines and atmospheric settings, handling technical implementation and asset integration within the Unity engine."
      ]
    },
    { 
      period: "2021 — 2022", 
      title: "Junior Developer", 
      company: "Web Solutions Co.", 
      location: "Stockholm",
      details: [
        "Collaborated with UX researchers to translate wireframes into responsive, pixel-perfect code.",
        "Developed internal dashboards using D3.js, improving data reporting efficiency by 50%."
      ]
    },
  ],

  skills: ["React / Next.js", "TypeScript", "WebGL / Three.js", "Interaction Design", "Node.js", "Figma"],

  portfolio: [
    {
      id: 1,
      image: "https://via.placeholder.com/600x400/333333/cccccc?text=Commerce+Core", 
      name: "Remnants of Love",
      cat: "AI-Native Game",
      desc: "A high-performance headless commerce solution."
    },
    {
      id: 2,
      image: "https://via.placeholder.com/600x400/333333/cccccc?text=Nebula+Vis",
      name: "Nebula Analytics",
      cat: "Data Vis",
      desc: "Real-time 3D financial data mapping dashboard."
    },
    {
      id: 3,
      image: "https://via.placeholder.com/600x400/333333/cccccc?text=Design+System",
      name: "Aurora UI Kit",
      cat: "Design System",
      desc: "A comprehensive component library for enterprise apps."
    },
    {
      id: 4,
      image: "https://via.placeholder.com/600x400/333333/cccccc?text=Mobile+App",
      name: "Social Connect",
      cat: "Mobile",
      desc: "Cross-platform social application tailored for creators."
    },
    {
      id: 5,
      image: "https://via.placeholder.com/600x400/333333/cccccc?text=ThreeJS+Exp",
      name: "3D Portfolio",
      cat: "Creative Coding",
      desc: "Experimental WebGL showcase site."
    },
  ],

  novel: {
    title: "Echoes of the Stars",
    genre: "Science Fiction",
    words: "200k+ words",
    desc: "A full-length novel exploring themes of consciousness transfer and interstellar ethics. Writing this honed my ability to structure complex narratives—a skill I apply directly to user journey mapping and product storytelling.",
    // Added cover image and link
    coverImage: "https://via.placeholder.com/200x300/333333/cccccc?text=Book+Cover",
    link: "https://www.qidian.com/book/1028336933/"
  }
};

function Homepage() {
  const { name, contact, intro, jobs, education, skills, portfolio, novel } = personalData;
  const [activeSection, setActiveSection] = React.useState('about');
  // State for left drawer navigation collapse/expand
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  // State for navigation mode (drawer or hamburger)
  const [isHamburgerMenu, setIsHamburgerMenu] = React.useState(false);
  // State for hamburger menu open/close
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = React.useState(false);

  // Handle smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  };

  // Toggle left drawer collapse/expand
  const toggleNav = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle hamburger menu
  const toggleHamburgerMenu = () => {
    setHamburgerMenuOpen(!hamburgerMenuOpen);
  };

  // Check window size to determine navigation mode
  const checkWindowSize = () => {
    // Get viewport width
    const viewportWidth = window.innerWidth;
    // Set hamburger menu when viewport is too small for drawer
    // Make hamburger menu appear on wider screens (1024px) for better mobile experience
    setIsHamburgerMenu(viewportWidth < 1024); // Adjust threshold as needed
  };

  // Initialize and listen for window resize
  React.useEffect(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    return () => window.removeEventListener('resize', checkWindowSize);
  }, []);

  // Update body class based on hamburger menu state
  React.useEffect(() => {
    if (isHamburgerMenu) {
      document.body.classList.add('hamburger-active');
    } else {
      document.body.classList.remove('hamburger-active');
    }
  }, [isHamburgerMenu]);


  // Update active section based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'education', 'experience', 'works', 'skills', 'writing'];
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
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Cleanup
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="page-wrapper">
      {/* Navigation - Drawer or Hamburger Menu */}
      {isHamburgerMenu ? (
        /* Hamburger Menu */
        <div className="hamburger-nav">
          {/* Hamburger Menu Button */}
          <button className="hamburger-btn" onClick={toggleHamburgerMenu} aria-label={hamburgerMenuOpen ? 'Close menu' : 'Open menu'}>
            <span className="hamburger-icon">
              {/* Three lines for hamburger icon */}
              <span className={`hamburger-line ${hamburgerMenuOpen ? 'line1' : ''}`}></span>
              <span className={`hamburger-line ${hamburgerMenuOpen ? 'line2' : ''}`}></span>
              <span className={`hamburger-line ${hamburgerMenuOpen ? 'line3' : ''}`}></span>
            </span>
          </button>
          
          {/* Hamburger Menu Overlay */}
          {hamburgerMenuOpen && (
            <div className="hamburger-overlay" onClick={toggleHamburgerMenu}></div>
          )}
          
          {/* Hamburger Menu Content */}
          <div className={`hamburger-menu ${hamburgerMenuOpen ? 'open' : ''}`}>
            <ul className="hamburger-list">
              <li>
                <button 
                  className={`hamburger-item ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={() => {
                    scrollToSection('about');
                    setHamburgerMenuOpen(false);
                  }}
                  aria-label="About section"
                >
                  <CiCircleInfo className="hamburger-icon-item" />
                  <span className="hamburger-text">About</span>
                </button>
              </li>
              <li>
                <button 
                  className={`hamburger-item ${activeSection === 'education' ? 'active' : ''}`}
                  onClick={() => {
                    scrollToSection('education');
                    setHamburgerMenuOpen(false);
                  }}
                  aria-label="Education section"
                >
                  <LiaUniversitySolid className="hamburger-icon-item" />
                  <span className="hamburger-text">Education</span>
                </button>
              </li>
              <li>
                <button 
                  className={`hamburger-item ${activeSection === 'experience' ? 'active' : ''}`}
                  onClick={() => {
                    scrollToSection('experience');
                    setHamburgerMenuOpen(false);
                  }}
                  aria-label="Experience section"
                >
                  <MdOutlineWorkOutline className="hamburger-icon-item" />
                  <span className="hamburger-text">Experience</span>
                </button>
              </li>
              <li>
                <button 
                  className={`hamburger-item ${activeSection === 'works' ? 'active' : ''}`}
                  onClick={() => {
                    scrollToSection('works');
                    setHamburgerMenuOpen(false);
                  }}
                  aria-label="Works section"
                >
                  <MdDesignServices className="hamburger-icon-item" />
                  <span className="hamburger-text">Works</span>
                </button>
              </li>
              <li>
                <button 
                  className={`hamburger-item ${activeSection === 'skills' ? 'active' : ''}`}
                  onClick={() => {
                    scrollToSection('skills');
                    setHamburgerMenuOpen(false);
                  }}
                  aria-label="Skills section"
                >
                  <MdBuild className="hamburger-icon-item" />
                  <span className="hamburger-text">Skills</span>
                </button>
              </li>
              <li>
                <button 
                  className={`hamburger-item ${activeSection === 'writing' ? 'active' : ''}`}
                  onClick={() => {
                    scrollToSection('writing');
                    setHamburgerMenuOpen(false);
                  }}
                  aria-label="Writing section"
                >
                  <TfiWrite className="hamburger-icon-item" />
                  <span className="hamburger-text">Writing</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        /* Left Drawer Navigation */
        <nav className={`drawer-nav ${isCollapsed ? 'collapsed' : ''}`}>
          {/* Toggle Collapse/Expand Button */}
          <button className="toggle-btn" onClick={toggleNav} aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}>
            <span className="toggle-icon">{isCollapsed ? '→' : '←'}</span>
          </button>
          
          {/* Navigation Menu */}
          <ul className="nav-list">
            <li>
              <button 
                className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => scrollToSection('about')}
                aria-label="About section"
              >
                <CiCircleInfo className="nav-icon" />
                <span className="nav-text">About</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeSection === 'education' ? 'active' : ''}`}
                onClick={() => scrollToSection('education')}
                aria-label="Education section"
              >
                <LiaUniversitySolid className="nav-icon" />
                <span className="nav-text">Education</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`}
                onClick={() => scrollToSection('experience')}
                aria-label="Experience section"
              >
                <MdOutlineWorkOutline className="nav-icon" />
                <span className="nav-text">Experience</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeSection === 'works' ? 'active' : ''}`}
                onClick={() => scrollToSection('works')}
                aria-label="Works section"
              >
                <MdDesignServices className="nav-icon" />
                <span className="nav-text">Portfolios</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={() => scrollToSection('skills')}
                aria-label="Skills section"
              >
                <MdBuild className="nav-icon" />
                <span className="nav-text">Skills</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeSection === 'writing' ? 'active' : ''}`}
                onClick={() => scrollToSection('writing')}
                aria-label="Writing section"
              >
                <TfiWrite className="nav-icon" />
                <span className="nav-text">Writing</span>
              </button>
            </li>
          </ul>
        </nav>
      )}

      <div className="content-card">
        
        {/* About Section */}
        <section id="about">
          <header className="site-header">
            <div className="header-content">
              <h1 className="name">{name}</h1>
              {/* Role removed */}
              <div className="contact-row">
                <span>{contact.email}</span>
                <span className="dot">·</span>
                <span>{contact.phone}</span>
                {/* Location removed */}
              </div>
              <section className="intro-block">
                <p>{intro}</p>
              </section>
            </div>
            <div className="profile-photo">
              <img src="/personal-photo.png" alt="Profile" />
            </div>
          </header>
        </section>

        <hr className="divider" />

        <main>
          {/* Education Section */}
          <section id="education" className="section-container">
            <h2 className="section-heading">Education</h2>
            <div className="education-grid">
              {education.map((edu, i) => (
                <div key={i} className="edu-card">
                  <span className="edu-year">{edu.year}</span>
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <div className="edu-school">{edu.school}</div>
                  <p className="edu-note">{edu.note}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* Experience Section */}
          <section id="experience" className="section-container">
            <h2 className="section-heading">Professional Experience</h2>
            <div className="timeline-list">
              {jobs.map((job, i) => (
                <div key={i} className="timeline-entry">
                  <div className="timeline-left">
                    <span className="time-period">{job.period}</span>
                    <span className="location">{job.location}</span>
                  </div>
                  <div className="timeline-right">
                    <h3 className="entry-title">{job.title}</h3>
                    <div className="entry-company">{job.company}</div>
                    <ul className="entry-details">
                      {job.details.map((d, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: d }}></li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* Works Section */}
          <section id="works" className="section-container">
            <div className="heading-wrapper">
              <h2 className="section-heading"> Portfolios
              </h2>
              <span className="scroll-hint">Scroll for more →</span>
            </div>
            
            <div className="works-scroll-container">
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

          <hr className="divider" />

          {/* Skills Section */}
          <section id="skills" className="section-container">
            <h2 className="section-heading">Technical Skills</h2>
            <div className="skills-cloud">
              {skills.map((skill, i) => (
                <span key={i} className="skill-pill">{skill}</span>
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* Writing Section */}
          <section id="writing" className="section-container">
            <h2 className="section-heading">Narrative & Writing</h2>
            {/* Made the entire card a link */}
            <a href={novel.link} target="_blank" rel="noopener noreferrer" className="novel-link">
              <div className="novel-card">
                {/* Added cover image */}
                <div className="novel-cover">
                  <img src={novel.coverImage} alt={novel.title} />
                </div>
                <div className="novel-content">
                  <div className="novel-meta">
                    <span className="novel-genre">{novel.genre}</span>
                    <span className="novel-words">{novel.words}</span>
                  </div>
                  <h3 className="novel-title">{novel.title} ➔</h3>
                  <p className="novel-desc">{novel.desc}</p>
                </div>
              </div>
            </a>
          </section>

        </main>

        <footer className="site-footer">
          <p>© 2025 Yujie Liu. Resume & Portfolio.</p>
        </footer>
      </div>
    </div>
  );
}

export default Homepage;