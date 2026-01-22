import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import profileData from './profile.json';
import projectData from './projects.json';

/* --- ICONS --- */
const MenuIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const XIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const MoonIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const SunIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const ArrowRight = () => <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
const DownloadIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const GithubIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>;
const LinkedinIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>;
const MailIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

/* --- HELPER COMPONENTS --- */

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const SectionHeading = ({ id, children }) => (
  <h2 id={id} className="scroll-mt-28 text-xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-4 tracking-tight border-b border-slate-200 dark:border-slate-800 pb-2">
    {children}
  </h2>
);

const Badge = ({ text }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 mr-2 mb-2 border border-slate-200 dark:border-slate-700">
    {text}
  </span>
);

/* --- LAYOUT & NAVIGATION --- */

const Layout = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  // Handle Escape Key to close menu
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const handleScrollNav = (sectionId) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#020617] text-[#e5e7eb]' : 'bg-[#f8fafc] text-[#020617]'}`}>
      
      {/* HEADER BAR */}
      <nav className="fixed w-full z-40 bg-white/95 dark:bg-[#020617]/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="text-lg font-bold tracking-tight text-slate-900 dark:text-white z-50">
            {profileData.name} <span className="text-blue-600 dark:text-blue-400">/ Cloud</span>
          </Link>
          
          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <button onClick={() => handleScrollNav('hero')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Profile</button>
            <button onClick={() => handleScrollNav('about')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</button>
            <button onClick={() => handleScrollNav('skills')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Skills</button>
            <button onClick={() => handleScrollNav('projects')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Projects</button>
            <button onClick={() => handleScrollNav('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</button>
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-200">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsDark(!isDark)} className="p-2 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full transition">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-slate-900 dark:text-white">
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* --- SLIDE-IN MOBILE MENU --- */}
      
      {/* 1. Backdrop (Click to close) */}
      <div 
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Side Panel (Slide from Right) */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-[65%] sm:w-[50%] bg-white dark:bg-[#020617] shadow-xl border-l border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
             <span className="font-bold text-slate-900 dark:text-white truncate pr-2">{profileData.name}</span>
             <button 
               onClick={() => setIsMenuOpen(false)} 
               className="p-2 -mr-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition"
             >
                <XIcon />
             </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4 flex flex-col">
            {[
              { id: 'hero', label: 'Profile' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => handleScrollNav(item.id)} 
                className="w-full text-left px-6 py-4 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Footer (Social Links) */}
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-900/50">
             <div className="flex gap-4 items-center">
                <a href={profileData.socials.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                  <GithubIcon />
                </a>
                <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                  <LinkedinIcon />
                </a>
             </div>
             <p className="mt-4 text-xs text-slate-400">© {new Date().getFullYear()} {profileData.name}</p>
          </div>
        </div>
      </div>

      <main className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
        {children}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} {profileData.name}. Enterprise Cloud Portfolio.</p>
      </footer>
    </div>
  );
};

/* --- HOME PAGE --- */

const HomePage = () => (
  <div className="space-y-24 animate-fade-in">
    {/* Hero */}
    <section id="hero" className="scroll-mt-32 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
        Building resilient, scalable <br />
        <span className="text-blue-600 dark:text-blue-400">Cloud Infrastructure.</span>
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
        {profileData.bio}
      </p>
      <div className="flex gap-4 pt-2">
        <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth'}); }} className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded hover:opacity-90 transition">
          View Projects
        </a>
      </div>
    </section>

    {/* About Me */}
    <section id="about" className="scroll-mt-24 max-w-4xl mx-auto">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">About Me</h3>
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
        <p>
          I am a technical problem solver with a deep focus on AWS ecosystems. 
          My approach to infrastructure is rooted in reliability and automation. 
          Whether it's migrating legacy monoliths or architecting greenfield serverless apps, 
          I prioritize security, cost-efficiency, and maintainability.
        </p>
      </div>
    </section>

    {/* Skills */}
    <section id="skills" className="scroll-mt-24 max-w-4xl mx-auto">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Technical Arsenal</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {profileData.skills.map((group, idx) => (
          <div key={idx} className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
            <h4 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">{group.category}</h4>
            <div className="flex flex-wrap">
              {group.items.map((skill) => (
                <Badge key={skill} text={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Projects Preview */}
    <section id="projects" className="scroll-mt-24 max-w-4xl mx-auto">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Selected Work</h3>
      <div className="grid gap-6">
        {projectData.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="group block p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 max-w-2xl">
                  {project.summary}
                </p>
              </div>
              <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
                <ArrowRight />
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map(tag => <Badge key={tag} text={tag} />)}
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* CONTACT & RESUME CARD */}
    <section id="contact" className="scroll-mt-24 max-w-4xl mx-auto">
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Let's Connect</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
          I'm currently looking for new opportunities in Cloud Engineering. 
          Download my resume or reach out directly.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a 
            href="/resume.pdf" 
            target="_blank" 
            className="w-full md:w-auto flex items-center justify-center px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition transform active:scale-95 shadow-lg"
          >
            <DownloadIcon />
            Download Resume
          </a>

          <div className="flex gap-4 w-full md:w-auto justify-center">
            <a 
              href={profileData.socials.github} 
              target="_blank" 
              rel="noreferrer" 
              className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition shadow-sm"
            >
              <GithubIcon />
            </a>
            <a 
              href={profileData.socials.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition shadow-sm"
            >
              <LinkedinIcon />
            </a>
            <a 
              href={`mailto:${profileData.socials.email}`} 
              className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition shadow-sm"
            >
              <MailIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

/* --- PROJECT DETAIL --- */

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectData.find(p => p.id === id);
  const [activeSection, setActiveSection] = useState('overview');

  if (!project) return <div className="text-center py-20">Project not found</div>;
  const { details } = project;

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Problem' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'services', label: 'Services' },
    { id: 'security', label: 'Security' },
    { id: 'implementation', label: 'Steps' },
    { id: 'iac', label: 'Code' },
    { id: 'monitoring', label: 'Monitoring' },
    { id: 'cost', label: 'Cost' },
    { id: 'outcome', label: 'Outcome' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <div className="animate-fade-in relative">
      <Link to="/" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">← Back to Overview</Link>
      
      {/* Mobile Sticky TOC with Separators */}
      <div className="lg:hidden sticky top-16 -mx-6 px-6 py-3 bg-white border-b border-slate-200 dark:bg-[#020617] dark:border-slate-800 z-30 overflow-x-auto whitespace-nowrap mb-8 shadow-sm flex items-center">
         <span className="text-xs font-bold text-slate-400 uppercase mr-3">Jump:</span>
         {sections.map((section, idx) => (
           <React.Fragment key={section.id}>
             <button 
               onClick={() => scrollTo(section.id)}
               className={`text-sm font-medium transition-colors ${activeSection === section.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}
             >
               {section.label}
             </button>
             {/* SEPARATOR: Pipe */}
             {idx < sections.length - 1 && (
               <span className="mx-3 text-slate-300 dark:text-slate-700">|</span>
             )}
           </React.Fragment>
         ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Desktop Sidebar TOC */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Contents</h4>
            <ul className="space-y-3 border-l-2 border-slate-200 dark:border-slate-800">
              {sections.map(section => (
                <li key={section.id} className="-ml-[2px]">
                  <button
                    onClick={() => scrollTo(section.id)}
                    className={`block pl-4 text-sm text-left transition-colors border-l-2 -ml-[2px] ${
                      activeSection === section.id 
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content Column */}
        <article className="flex-1 min-w-0 prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
          <header id="overview" className="scroll-mt-28 mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">{project.title}</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">{project.summary}</p>
            <div className="mt-6 flex flex-wrap">
              {project.tags.map(tag => <Badge key={tag} text={tag} />)}
            </div>
          </header>

          <SectionHeading id="problem">Problem Statement</SectionHeading>
          <p>{details.problem}</p>

          <SectionHeading id="architecture">Architecture Design</SectionHeading>
          <p>{details.architecture}</p>

          <SectionHeading id="services">AWS Services Used</SectionHeading>
          <ul className="list-disc pl-5 space-y-2">
            {details.aws_services.map((service, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: service.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-slate-100">$1</strong>') }} />
            ))}
          </ul>

          <SectionHeading id="security">Networking & Security</SectionHeading>
          <p>{details.networking_security}</p>

          <SectionHeading id="implementation">Implementation Steps</SectionHeading>
          <ul className="list-decimal pl-5 space-y-2">
            {details.implementation.map((step, i) => <li key={i}>{step}</li>)}
          </ul>

          <SectionHeading id="iac">Infrastructure as Code</SectionHeading>
          <div className="bg-[#0f172a] rounded-lg p-4 overflow-x-auto border border-slate-800 not-prose">
            <pre className="text-sm font-mono text-blue-100">
              <code>{details.iac_code}</code>
            </pre>
          </div>
          
          <SectionHeading id="monitoring">Monitoring & Observability</SectionHeading>
          <p>{details.monitoring}</p>

          <SectionHeading id="cost">Cost Optimization</SectionHeading>
          <p>{details.cost}</p>

          <SectionHeading id="outcome">Final Outcome</SectionHeading>
          <p>{details.outcome}</p>
        </article>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}