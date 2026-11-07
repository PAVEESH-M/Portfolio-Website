import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import template from './portfolio-template.html?raw';
import GooeyNav from './components/GooeyNav.jsx';
import JellyRadio from './components/JellyRadio.jsx';
import HalftoneReveal from './components/HalftoneReveal.jsx';
import StarBorder from './components/StarBorder.jsx';
import AnimatedContent from './components/AnimatedContent.jsx';
import LetterGlitch from './components/LetterGlitch.jsx';
import Shuffle from './components/Shuffle.jsx';
import DecryptedText from './components/DecryptedText.jsx';
const Lanyard = lazy(() => import('./components/Lanyard.jsx'));
const PixelBlast = lazy(() => import('./components/PixelBlast.jsx'));

const bodyMarkup = template.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
const navItems = [
  { label: 'Work', href: '#', target: '#work' },
  { label: 'Journey', href: '#', target: '#journey' },
  { label: 'Achievements', href: '#', target: '#achievements' },
  { label: 'Contact', href: '#', target: '#contact' }
];

const skills = {
  Languages: ['Java', 'Python', 'C / C++', 'SQL', 'JavaScript'],
  'AI / ML': ['Machine learning', 'Deep learning', 'Agentic AI', 'scikit-learn', 'TensorFlow / Keras'],
  Engineering: ['React.js', 'Spring Boot', 'FastAPI', 'REST APIs'],
  'Tools & foundations': ['AWS', 'Docker', 'Linux', 'Git', 'Selenium', 'TestNG', 'DSA', 'OOP', 'DBMS']
};

const projects = {
  aether: {
    title: 'AETHER',
    kicker: 'AI · Talent intelligence',
    description: 'An agentic AI hiring platform that turns candidate screening into structured evaluation. Its multi-agent workflow reviews skills, experience, fairness, career alignment, and governance, with explainable output for recruiter decisions.',
    tags: ['Python', 'FastAPI', 'React', 'Agentic AI', 'Fairness review']
  },
  taskflow: {
    title: 'Task Flow',
    kicker: 'Full stack · Multi-tenant',
    description: 'A multi-tenant task management application with organization-level data isolation and role-based access. It supports task creation, assignment, updates, and tracking through JWT-protected endpoints.',
    tags: ['React', 'Spring Boot', 'SQL', 'REST APIs', 'JWT', 'RBAC']
  },
  timecapsule: {
    title: 'Time Capsule',
    kicker: 'AI · AWS Kiro',
    description: 'An AI-agent-powered Time Capsule application developed with AWS Kiro. The work translated requirements into an implementation through iterative prompting, code refinement, and architecture decisions.',
    tags: ['AWS Kiro', 'Agentic AI', 'Prototyping']
  }
};

function ContactBackdrop() {
  return <LetterGlitch className="contact-letter-glitch" glitchColors={['#78d7be', '#a8ead4']} baseColor="#83bca8" fontSize={13} spacing={0.65} density={0.52} baseOpacity={0.18} glitchAmount={0.22} speed={0.36} flow={0.22} edgeFade={0.3} centerFade={0.45} interactive={false} clickEffect="none" />;
}

function PortfolioAscii() {
  return <div className="portfolio-ascii-visual"><a className="portfolio-title-link" href="#home" aria-label="Enter Paveesh's portfolio"><DecryptedText text="PORTFOLIO" animateOn="inViewHover" effect="scramble" sequential revealDirection="start" speed={60} maxIterations={10} hoverRadius={100} scrambleColor="#2bb673" loop={false} loopDelay={2000} useOriginalCharsOnly={false} characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+" clickMode="once" parentClassName="portfolio-title-type" className="portfolio-title-glyph" encryptedClassName="portfolio-title-encrypted" /></a></div>;
}

function HeroHeading() {
  return <Shuffle tag="h1" text={'AI & software\nengineering\nstudent.'} className="hero-shuffle" textAlign="left" shuffleDirection="up" duration={0.58} maxDelay={0.24} ease="power3.out" threshold={0.18} rootMargin="-70px" shuffleTimes={1} stagger={0.027} effect="slide" triggerOnHover={false} />;
}

function SkillsPanel() {
  const [selected, setSelected] = useState('Languages');
  const categories = Object.keys(skills);
  return (
    <div className="skills-widget">
      <JellyRadio
        items={categories.map(value => ({ value, label: value }))}
        value={selected}
        onChange={setSelected}
        chipColor="#18211f"
        activeColor="#78d7be"
        textColor="#d1d9d5"
        activeTextColor="#0b1011"
        size="md"
        gap={8}
        radius={7}
        swell={0.16}
        barge={3}
        ariaLabel="Choose a skills category"
        className="skills-radio"
      />
      <div className="skill-items" aria-live="polite" aria-label={`${selected} skills`}>
        {skills[selected].map(skill => <span key={skill}>{skill}</span>)}
      </div>
    </div>
  );
}

function ProfilePhoto() {
  return (
    <div className="profile-photo-frame" role="img" aria-label="Profile portrait of Paveesh M">
      <HalftoneReveal
        src="/images/paveesh-profile.jpeg"
        fit="cover"
        mode="mono"
        shape="dot"
        cellSize={6}
        inkColor="#14211c"
        accentColor="#78d7be"
        paperColor="#f4f7f5"
        revealRadius={132}
        softness={0.58}
        linger={0.9}
        clickBurst
        intro
        className="paveesh-halftone"
      />
      <span className="profile-photo-caption">Paveesh M</span>
    </div>
  );
}

function LanyardCard() {
  const [nearView, setNearView] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 680px)').matches);
  const stageRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 680px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearView(true);
        observer.disconnect();
      }
    }, { rootMargin: '160px 0px' });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lanyard-stage" ref={stageRef}>
      {nearView ? <Suspense fallback={<img className="lanyard-still" src="/images/paveesh-student-card.png" alt="Paveesh M student profile card" />}>
        <Lanyard
          frontImage="/images/paveesh-student-card.png"
          imageFit="cover"
          cardColor="#ffffff"
          orientation="portrait"
          finish="matte"
          cornerRadius={0.18}
          size={isMobile ? 0.76 : 0.67}
          anchor="center"
          strapLength={0.54}
          strapColor="#496c5e"
          strapWidth={0.48}
          metal="silver"
          gravity={0.85}
          damping={0.58}
          elasticity={0.45}
          breeze={0.15}
          interactive
          intro
          className="paveesh-lanyard"
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense> : <img className="lanyard-still" src="/images/paveesh-profile.jpeg" alt="Paveesh M" />}
      <span className="lanyard-hint">Drag the ID card</span>
    </div>
  );
}

function GithubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .3Z"/></svg>;
}

function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.78C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0Z"/></svg>;
}

function SocialButtons() {
  return (
    <div className="star-links">
      <StarBorder as="a" href="mailto:paveeshm638@gmail.com" className="social-star" color="#b9f3df" trailColor="#78d7be" duration={5.5} radius={8} glow={0.45} theme="dark">
        <span className="mail-label">paveeshm638@gmail.com</span><span aria-hidden="true">↗</span>
      </StarBorder>
      <StarBorder as="a" href="https://github.com/PAVEESH-M" target="_blank" rel="noreferrer" className="social-star social-icon" color="#d9f8ed" trailColor="#78d7be" duration={4.6} radius={8} glow={0.45} theme="dark">
        <GithubIcon /><span>GitHub</span>
      </StarBorder>
      <StarBorder as="a" href="https://linkedin.com/in/paveesh-m-620936331" target="_blank" rel="noreferrer" className="social-star social-icon" color="#d9f8ed" trailColor="#78d7be" duration={5} radius={8} glow={0.45} theme="dark">
        <LinkedInIcon /><span>LinkedIn</span>
      </StarBorder>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onToggle = event => setOpen(Boolean(event.detail?.open));
    window.addEventListener('portfolio-mobile-nav', onToggle);
    return () => window.removeEventListener('portfolio-mobile-nav', onToggle);
  }, []);
  return (
    <div className={`mobile-navigation${open ? ' is-open' : ''}`} aria-hidden={!open}>
      {navItems.map(item => <a key={item.href} href={item.href} tabIndex={open ? 0 : -1}>{item.label}</a>)}
    </div>
  );
}

function initPortfolioInteractions(shell) {
  const closeMobileNav = () => {
    document.body.classList.remove('mobile-nav-open');
    const toggle = shell.querySelector('.menu-toggle');
    toggle?.setAttribute('aria-expanded', 'false');
    window.dispatchEvent(new CustomEvent('portfolio-mobile-nav', { detail: { open: false } }));
  };

  const handleClick = event => {
    const menuButton = event.target.closest('.menu-toggle');
    if (menuButton) {
      const open = !document.body.classList.contains('mobile-nav-open');
      document.body.classList.toggle('mobile-nav-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      window.dispatchEvent(new CustomEvent('portfolio-mobile-nav', { detail: { open } }));
      return;
    }

    const mobileLink = event.target.closest('.mobile-navigation a');
    if (mobileLink) closeMobileNav();

    const filter = event.target.closest('.filter-chip');
    if (filter) {
      shell.querySelectorAll('.filter-chip').forEach(button => button.classList.toggle('active', button === filter));
      shell.querySelectorAll('.project-card').forEach(card => {
        card.classList.toggle('hidden', filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter);
      });
    }

    const card = event.target.closest('.project-card');
    if (card) {
      const project = projects[card.dataset.project];
      if (!project) return;
      const dialog = shell.querySelector('.project-dialog');
      shell.querySelector('#dialog-title').textContent = project.title;
      shell.querySelector('#dialog-kicker').textContent = project.kicker;
      shell.querySelector('#dialog-description').textContent = project.description;
      shell.querySelector('#dialog-tags').replaceChildren(...project.tags.map(tag => {
        const chip = document.createElement('span');
        chip.textContent = tag;
        return chip;
      }));
      dialog.showModal();
    }

    if (event.target.closest('.dialog-close')) shell.querySelector('.project-dialog').close();
    if (event.target === shell.querySelector('.project-dialog')) shell.querySelector('.project-dialog').close();

    if (event.target.closest('.motion-toggle')) {
      const toggle = event.target.closest('.motion-toggle');
      const paused = toggle.getAttribute('aria-pressed') !== 'true';
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.querySelector('span:last-child').textContent = paused ? 'Play motion' : 'Pause motion';
      shell.querySelector('.hero-art').classList.toggle('motion-paused', paused);
      window.dispatchEvent(new CustomEvent('portfolio-motion', { detail: { paused } }));
    }
  };

  const handleKeydown = event => {
    if (event.key === 'Escape') closeMobileNav();
    const card = event.target.closest?.('.project-card');
    if (card && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      card.click();
    }
  };

  shell.addEventListener('click', handleClick);
  shell.addEventListener('keydown', handleKeydown);
  return () => {
    shell.removeEventListener('click', handleClick);
    shell.removeEventListener('keydown', handleKeydown);
  };
}

export default function App() {
  const shellRef = useRef(null);

  useEffect(() => {
    const shell = shellRef.current;
    const roots = [];
    let removeInteractions = () => {};
    let navTimer;
    let cancelled = false;
    const revealSection = selector => {
      const target = shell.querySelector(selector);
      if (!target) return;
      const markup = target.innerHTML;
      const root = createRoot(target);
      roots.push(root);
      root.render(
        <AnimatedContent className="scroll-content" distance={30} duration={0.78} ease="power3.out" blur={2} threshold={0.16} once stagger={0.04}>
          <div dangerouslySetInnerHTML={{ __html: markup }} />
        </AnimatedContent>
      );
    };
    ['.intro-band', '.work-section', '.journey-section', '.skills-section', '.achievement-section', '.contact-section'].forEach(revealSection);

    const handleGooeyNavigation = event => {
      const entry = event.target.closest?.('.portfolio-title-link');
      if (entry && !shell.classList.contains('is-entered')) {
        event.preventDefault();
        shell.classList.add('is-entered');
        shell.querySelector('.portfolio-gate')?.setAttribute('aria-hidden', 'true');
        const home = shell.querySelector('.portfolio-home');
        home?.removeAttribute('aria-hidden');
        home?.removeAttribute('inert');
        window.history.replaceState(null, '', '#home');
        window.scrollTo(0, 0);
        const pixelMount = shell.querySelector('#home-pixel-blast-mount');
        if (pixelMount) {
          const pixelRoot = createRoot(pixelMount);
          pixelRoot.render(<Suspense fallback={null}><PixelBlast className="home-pixel-blast-effect" variant="square" pixelSize={4} color="#78d7be" accentColor="#b0f2da" patternScale={2.5} patternDensity={0.8} enableRipples hoverEffect="reveal" hoverRadius={150} speed={0.22} drift={0.08} twinkle={0.14} glow={0.18} noiseAmount={0.03} transparent autoPauseOffscreen /></Suspense>);
          roots.push(pixelRoot);
        }
        return;
      }
      const link = event.target.closest?.('#gooey-nav-mount .gooey-nav__link');
      if (!link) return;
      event.preventDefault();
      const index = Number(link.closest('.gooey-nav__item')?.dataset.gooeyIndex);
      const destination = navItems[index]?.target;
      if (!destination) return;
      window.clearTimeout(navTimer);
      navTimer = window.setTimeout(() => {
        const target = shell.querySelector(destination);
        if (!target) return;
        window.history.replaceState(null, '', destination);
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      }, 760);
    };

    const mountWidgets = () => {
      if (cancelled) return;
      const mount = (id, component) => {
        const target = shell.querySelector(`#${id}`);
        if (!target) return;
        const root = createRoot(target);
        root.render(component);
        roots.push(root);
      };
      mount('gooey-nav-mount', <AnimatedContent className="gooey-nav-entry" trigger="mount" distance={16} duration={0.85} ease="power3.out" blur={2}><GooeyNav items={navItems} initialActiveIndex={0} theme="dark" color="#78d7be" activeTextColor="#0b1011" size="md" frame={false} animationTime={760} particleCount={16} timeVariance={160} spread={48} gooeyness={0.58} /></AnimatedContent>);
      mount('ascii-intro-mount', <PortfolioAscii />);
      mount('hero-shuffle-mount', <HeroHeading />);
      mount('contact-backdrop-mount', <ContactBackdrop />);
      mount('jelly-skills-mount', <SkillsPanel />);
      mount('halftone-mount', <ProfilePhoto />);
      mount('lanyard-mount', <LanyardCard />);
      mount('star-links-mount', <SocialButtons />);
      mount('mobile-nav-mount', <MobileMenu />);
      shell.addEventListener('click', handleGooeyNavigation, true);
      removeInteractions = initPortfolioInteractions(shell);
      requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    };
    const revealObserver = new MutationObserver(() => {
      const ready = ['.intro-band', '.work-section', '.journey-section', '.skills-section', '.achievement-section', '.contact-section']
        .every(selector => shell.querySelector(`${selector} > .scroll-content`));
      if (!ready || cancelled) return;
      revealObserver.disconnect();
      mountWidgets();
    });
    revealObserver.observe(shell, { childList: true, subtree: true });
    if (['.intro-band', '.work-section', '.journey-section', '.skills-section', '.achievement-section', '.contact-section']
      .every(selector => shell.querySelector(`${selector} > .scroll-content`))) {
      revealObserver.disconnect();
      mountWidgets();
    }

    return () => {
      cancelled = true;
      revealObserver.disconnect();
      removeInteractions();
      window.clearTimeout(navTimer);
      shell.removeEventListener('click', handleGooeyNavigation, true);
      [...roots].reverse().forEach(root => root.unmount());
    };
  }, []);

  return <div ref={shellRef} className="portfolio-shell" dangerouslySetInnerHTML={{ __html: bodyMarkup }} />;
}
