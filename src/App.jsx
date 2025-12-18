import React, { useEffect, useState } from 'react';
import Layout from './components/Layout.jsx';
import Hero from './components/Hero.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import TimelineSection from './components/TimelineSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import AuthSection from './components/AuthSection.jsx';
import VoidDashboardSection from './components/VoidDashboardSection.jsx';
import CalibrationsSection from './components/CalibrationsSection.jsx';
import ClassifiedFilesSection from './components/ClassifiedFilesSection.jsx';
import MemosSection from './components/MemosSection.jsx';
import LogoutSection from './components/LogoutSection.jsx';
import OrbitalNav from './components/OrbitalNav.jsx';
import CanvasBackground from './components/CanvasBackground.jsx';

const publicSections = [
  { id: 'hero', label: 'The Void' },
  { id: 'projects', label: 'Featured Nothing' },
  { id: 'timeline', label: 'About Nothing' },
  { id: 'auth', label: 'Access' },
  { id: 'contact', label: 'Transmit' }
];

const privateSections = [
  { id: 'console', label: 'Dashboard' },
  { id: 'lab', label: 'Lab' },
  { id: 'files', label: 'Files' },
  { id: 'memos', label: 'Memos' },
  { id: 'logout', label: 'Exit' }
];

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [authUser, setAuthUser] = useState(null);
  const [easterEgg, setEasterEgg] = useState(null);

  useEffect(() => {
    // 9. Console Easter Egg
    console.log('%cUniverse status: empty', 'color: #94a3b8; font-size: 20px;');
    console.log('%cPlease do not attempt to fix this.', 'color: #64748b; font-size: 14px;');

    // 15. First-Time Visit Message
    const hasVisited = window.localStorage.getItem('voidVisited');
    if (!hasVisited) {
      setEasterEgg({
        text: 'Welcome. It gets emptier from here.',
        type: 'arrival'
      });
      window.localStorage.setItem('voidVisited', 'true');
    } else {
      // 34. Forgotten Save State
      setEasterEgg({
        text: 'You were last here. The universe did not store that.',
        type: 'return'
      });
    }

    // 11. Reload Message
    if (window.performance && window.performance.navigation.type === 1) {
      setTimeout(() => {
        setEasterEgg({ text: 'Reloading did not help.', type: 'reload' });
      }, 1000);
    }

    // 40. Final Non-Final Message (Rare)
    if (Math.random() < 0.05) {
      setTimeout(() => {
        setEasterEgg({
          text: 'If you are reading this, you stayed longer than expected. Expectations have been adjusted.',
          type: 'rare'
        });
      }, 5000);
    }

    const stored = window.localStorage.getItem('voidAuthUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setAuthUser(parsed);
        }
      } catch {
        window.localStorage.removeItem('voidAuthUser');
      }
    }
  }, []);

  useEffect(() => {
    // 3. Scroll Too Far Message
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPos = window.scrollY + clientHeight;

      if (scrollPos > scrollHeight + 100) {
        setEasterEgg({ text: 'You have scrolled beyond the known universe. Please stop.', type: 'scroll' });
      }
    };

    // 4. Idle Timeout Message / 39. Observer Effect
    let idleTimer;
    const resetTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setEasterEgg({
          text: 'The universe noticed your inactivity. It is proud of you.',
          type: 'idle'
        });
      }, 30000);
    };

    // 17. Mouse Leave Event
    const handleMouseLeave = () => {
      setEasterEgg({ text: 'Space is outside the window too.', type: 'leave' });
    };

    // 37. Wrong Perspective (Resize)
    const handleResize = () => {
      setEasterEgg({ text: 'From this angle, nothing looks the same. It still is.', type: 'resize' });
    };

    // 14. Hidden Keyboard Shortcut (Ctrl+Shift+V)
    const handleKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        setEasterEgg({ text: 'You unlocked a secret. The secret is disappointment.', type: 'shortcut' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('keydown', handleKey);
    window.addEventListener('pointerleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    resetTimer();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('pointerleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      clearTimeout(idleTimer);
    };
  }, []);

  useEffect(() => {
    const allSections = [...publicSections, ...(authUser ? privateSections : [])];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    allSections.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [authUser]);

  const scrollToSection = id => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top;

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 700;
    let start;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 0.5 * (1 - Math.cos(Math.PI * progress));
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  };

  const handleAuth = user => {
    setAuthUser(user);
    window.localStorage.setItem('voidAuthUser', JSON.stringify(user));
    // 7. Successful Login Message
    setEasterEgg({ text: 'Authentication successful. Access granted to nothing important.', type: 'auth-success' });
  };

  const handleLogout = () => {
    setAuthUser(null);
    window.localStorage.removeItem('voidAuthUser');
    // 16. Last-Time Visit Message (Ejected)
    setEasterEgg({ text: 'You left. The void remained.', type: 'logout' });
  };

  const navSections = [...publicSections, ...(authUser ? privateSections : [])];

  return (
    <Layout>
      <CanvasBackground />
      <OrbitalNav
        sections={navSections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      {easterEgg && (
        <div className="easter-egg-toast" onAnimationEnd={() => setEasterEgg(null)}>
          {easterEgg.text}
        </div>
      )}
      <main>
        <Hero id="hero" />
        <ProjectsSection id="projects" />
        <TimelineSection id="timeline" />
        <AuthSection 
          id="auth" 
          onAuth={handleAuth} 
          isAuthed={!!authUser} 
          onError={() => setEasterEgg({ text: 'Authentication failed. This outcome also changes nothing.', type: 'auth-fail' })}
        />
        {authUser && (
          <>
            <VoidDashboardSection id="console" />
            <CalibrationsSection id="lab" />
            <ClassifiedFilesSection id="files" />
            <MemosSection id="memos" />
            <LogoutSection id="logout" onLogout={handleLogout} />
          </>
        )}
        <ContactSection id="contact" />
      </main>
    </Layout>
  );
}

export default App;


