import Preloader from './components/Preloader.jsx';
import Background3D from './three/Background3D.jsx';
import { useStageScroll } from './three/useStageScroll.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

function App() {
  
  useStageScroll();

  return (
    <>
      <Preloader />
      <Background3D />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
