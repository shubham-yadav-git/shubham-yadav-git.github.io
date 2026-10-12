import Masthead from './components/Masthead';
import About from './components/About';
import Resume from './components/Resume';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="page">
      <Masthead />
      <main>
        <About />
        <Resume />
        <Skills />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
