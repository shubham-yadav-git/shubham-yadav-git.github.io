import { useState } from 'react';
import useActiveSection from './hooks/useActiveSection';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <div className="layout">
      <Sidebar
        activeSection={activeSection}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div className="main-content">
        <Hero />
        <About />
        <Skills />
        <Resume />
        <Projects />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
