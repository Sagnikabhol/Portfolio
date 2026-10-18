import { useState, useEffect } from 'react';

/**
 * Navbar Component
 * Sticky transparent glassmorphism navbar with logo, nav links,
 * active section highlighting on scroll, dark/light mode toggle,
 * and responsive animated mobile drawer.
 *
 * @param {{ darkMode: boolean, setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void }} props
 */
export default function Navbar({ darkMode, setDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#tech-stack', id: 'tech-stack' },
    { name: 'Education & Training', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Detect scroll position for navbar styling & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar background glassmorphism shadow
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is currently visible
      const scrollPosition = window.scrollY + 200;
      const sections = ['hero', 'about', 'tech-stack', 'experience', 'projects', 'contact'];

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Smooth scroll click handler
  const handleScrollTo = (e, targetId, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navbarOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-purple-100/60 dark:border-purple-900/30 shadow-lg shadow-purple-500/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo 'SB' with Gradient Text */}
        <a
          href="#hero"
          onClick={(e) => handleScrollTo(e, 'hero', '#hero')}
          className="group relative flex items-center gap-2.5 focus:outline-none"
          aria-label="Sagnika Bhol Portfolio Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 p-[1.5px] shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
            <div className="w-full h-full bg-white dark:bg-gray-950 rounded-[10px] flex items-center justify-center transition-colors">
              <span className="font-extrabold text-base tracking-tighter bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                SB
              </span>
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-800 dark:text-slate-100 hidden sm:inline-block">
            Sagnika <span className="text-violet-600 dark:text-violet-400">Bhol</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-slate-100/70 dark:bg-gray-900/60 backdrop-blur-md border border-slate-200/60 dark:border-purple-950/50 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.id, link.href)}
                className={`relative px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-md shadow-purple-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-white/60 dark:hover:bg-gray-800/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Side Actions: Theme Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Mode Toggle Button */}
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="group relative p-2.5 rounded-xl bg-slate-100/80 dark:bg-gray-900/80 hover:bg-purple-100/80 dark:hover:bg-purple-950/60 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-purple-900/40 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 active:scale-95 cursor-pointer"
          >
            {darkMode ? (
              /* Sun Icon (shown in dark mode to switch to light) */
              <svg
                className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              /* Moon Icon (shown in light mode to switch to dark) */
              <svg
                className="w-5 h-5 text-violet-600 group-hover:-rotate-12 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2.5 rounded-xl bg-slate-100/80 dark:bg-gray-900/80 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-purple-900/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 active:scale-95 cursor-pointer"
          >
            {isMobileMenuOpen ? (
              /* Close (X) Icon */
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger 3-line Icon */
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu Drawer */}
      <div
        className={`md:hidden fixed inset-x-4 top-20 rounded-2xl overflow-hidden backdrop-blur-2xl bg-white/95 dark:bg-gray-950/95 border border-purple-200/70 dark:border-purple-900/50 shadow-2xl shadow-purple-500/20 transition-all duration-300 ease-out origin-top ${
          isMobileMenuOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="p-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.id, link.href)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-md shadow-purple-500/25'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-violet-600 dark:hover:text-violet-400'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
