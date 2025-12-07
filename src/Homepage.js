import React from 'react';
import { Link } from 'react-router-dom';
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
      year: "2018 — 2022",
      degree: "B.S. Computer Science",
      school: "University of Technology",
      note: "Specialized in Human-Computer Interaction"
    },
    {
      year: "2015 — 2018",
      degree: "High School Diploma",
      school: "City Science High School",
      note: "Focus on Physics and Mathematics"
    },
    {
      year: "2015 — 2018",
      degree: "High School Diploma",
      school: "City Science High School",
      note: "Focus on Physics and Mathematics"
    }
  ],

  jobs: [
    { 
      period: "2022 — Present", 
      title: "Senior Frontend Engineer", 
      company: "Tech Innovation Inc.", 
      location: "Shanghai",
      details: [
        "Led the UI overhaul of the flagship SaaS product, directly contributing to a 15% increase in user session time.",
        "Architected a scalable design system (React/TypeScript) adopted by 3 cross-functional teams.",
        "Optimized WebGL rendering performance for large-scale data visualization modules."
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
      name: "The Commerce Engine",
      cat: "Web Application",
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

  return (
    <div className="page-wrapper">
      <div className="content-card">
        
        <header className="site-header">
          <h1 className="name">{name}</h1>
          {/* Role removed */}
          <div className="contact-row">
            <span>{contact.email}</span>
            <span className="dot">·</span>
            <span>{contact.phone}</span>
            {/* Location removed */}
          </div>
        </header>

        <section className="intro-block">
          <p>{intro}</p>
        </section>

        <hr className="divider" />

        <main>
          <section className="section-container">
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

          <section className="section-container">
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
                      {job.details.map((d, idx) => <li key={idx}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="divider" />

          <section className="section-container">
            <div className="heading-wrapper">
              <h2 className="section-heading">Selected Works</h2>
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

          <section className="section-container">
            <h2 className="section-heading">Technical Skills</h2>
            <div className="skills-cloud">
              {skills.map((skill, i) => (
                <span key={i} className="skill-pill">{skill}</span>
              ))}
            </div>
          </section>

          <hr className="divider" />

          <section className="section-container">
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