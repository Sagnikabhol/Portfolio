import { useState, useEffect } from 'react';

export default function Hero() {
  const roles = [
    'Associate Software Engineer',
    'Software Engineer',
    'AI / ML Engineer',
    'Python & Java Developer',
    'Full-Stack Developer',
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect using pure useState and useEffect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentRole) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${sectionId}`;
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Sagnika24',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sagnika-bhol',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:sagnikabhol@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-4 sm:px-6 lg:px-12 py-20 transition-colors duration-300"
    >
      {/* Embedded CSS Keyframes for self-contained smooth animations */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(3deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(16px) rotate(-3deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.08); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .anim-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .anim-float-reverse {
          animation: floatReverse 7s ease-in-out infinite;
        }
        .anim-pulse-glow {
          animation: pulseGlow 8s ease-in-out infinite;
        }
        .gradient-text-animated {
          background-size: 200% auto;
          animation: gradientShift 4s ease infinite;
        }
      `}</style>

      {/* Background Animated Gradient Blobs & Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft radial ambient glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-500/20 dark:bg-violet-600/20 rounded-full blur-3xl anim-pulse-glow" />
        <div
          className="absolute -bottom-40 -right-32 w-[32rem] h-[32rem] bg-purple-500/20 dark:bg-purple-600/25 rounded-full blur-3xl anim-pulse-glow"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-fuchsia-500/10 dark:bg-fuchsia-600/10 rounded-full blur-3xl anim-pulse-glow"
          style={{ animationDelay: '4s' }}
        />

        {/* Subtle study/tech grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1.25px,transparent_1.25px)] [background-size:28px_28px] opacity-[0.14] dark:opacity-[0.22]" />

        {/* Floating Geometric Shapes */}
        <div
          className="absolute top-[18%] left-[10%] w-12 h-12 border-2 border-violet-400/40 dark:border-violet-400/30 rounded-2xl rotate-12 anim-float-slow hidden sm:block"
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className="absolute top-[28%] right-[12%] w-16 h-16 border-2 border-purple-400/40 dark:border-purple-400/30 rounded-full anim-float-reverse hidden sm:block"
          style={{ animationDelay: '1.2s' }}
        />
        <div
          className="absolute bottom-[24%] left-[15%] w-10 h-10 border border-fuchsia-400/40 dark:border-fuchsia-400/30 rotate-45 anim-float-slow hidden md:block"
          style={{ animationDelay: '2.5s' }}
        />
        <div
          className="absolute bottom-[18%] right-[16%] w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-500/20 to-purple-500/20 backdrop-blur-sm rotate-12 anim-float-reverse hidden md:block"
          style={{ animationDelay: '3s' }}
        />

        {/* Floating study & computer science particles */}
        <span
          className="absolute top-[14%] right-[28%] font-mono text-xs sm:text-sm text-violet-500/50 dark:text-violet-400/50 select-none anim-float-slow hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-500/5 dark:bg-violet-400/10 border border-violet-500/15"
          style={{ animationDelay: '1s' }}
        >
          <span>💻</span>
          <span>Python &amp; Java</span>
        </span>
        <span
          className="absolute bottom-[22%] left-[24%] font-mono text-xs sm:text-sm text-purple-500/50 dark:text-purple-400/50 select-none anim-float-reverse hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/5 dark:bg-purple-400/10 border border-purple-500/15"
          style={{ animationDelay: '2s' }}
        >
          <span>🎓</span>
          <span>MCA 2024–2026</span>
        </span>
        <span
          className="absolute top-[68%] right-[22%] font-mono text-xs sm:text-sm text-fuchsia-500/50 dark:text-fuchsia-400/50 select-none anim-float-slow hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-fuchsia-500/5 dark:bg-fuchsia-400/10 border border-fuchsia-500/15"
          style={{ animationDelay: '3.5s' }}
        >
          <span>⚡</span>
          <span>Web &amp; AI Apps</span>
        </span>
        <span
          className="absolute top-[38%] left-[6%] font-mono text-xs text-indigo-500/40 dark:text-indigo-400/40 select-none anim-float-reverse hidden xl:block"
          style={{ animationDelay: '4.2s' }}
        >
          {'def build():'}
        </span>
      </div>

      {/* Floating Social Icons on Desktop Side */}
      <aside
        aria-label="Social media links"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-4"
      >
        <div className="flex flex-col gap-3 p-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-purple-500/5">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="group relative p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-white hover:bg-gradient-to-br hover:from-violet-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              {social.icon}
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-2.5 py-1 text-xs font-medium text-white bg-slate-900 dark:bg-slate-800 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                {social.name}
              </span>
            </a>
          ))}
        </div>
        <div className="w-[2px] h-16 bg-gradient-to-b from-purple-500/60 to-transparent rounded-full" />
      </aside>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Greeting, Role Typewriter, Tagline & CTAs */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-violet-100/80 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200/80 dark:border-violet-800/80 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Associate Software Engineer &amp; AI/ML Roles</span>
            </div>

            {/* Large Animated Greeting */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-slate-700 dark:text-slate-300">
                Hi, I'm
              </h2>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none">
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent gradient-text-animated inline-block pb-2">
                  Sagnika Bhol
                </span>
              </h1>
            </div>

            {/* Typewriter Effect Container */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <div className="inline-flex items-center text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200">
                <span className="text-violet-600 dark:text-violet-400 font-mono text-lg sm:text-xl mr-2">
                  &lt;role&gt;
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-300 dark:to-purple-300">
                  {displayText}
                </span>
                <span
                  className="w-[3px] h-7 sm:h-8 bg-purple-600 dark:bg-purple-400 ml-1 inline-block animate-pulse"
                  aria-hidden="true"
                />
                <span className="text-violet-600 dark:text-violet-400 font-mono text-lg sm:text-xl ml-2">
                  &lt;/role&gt;
                </span>
              </div>
            </div>

            {/* Brief Tagline */}
            <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mx-auto lg:mx-0">
              Actively seeking <span className="text-violet-600 dark:text-violet-300 font-semibold">Associate Software Engineer</span> and <span className="text-purple-600 dark:text-purple-300 font-semibold">AI/ML</span> roles. Grounded in <span className="text-fuchsia-600 dark:text-fuchsia-300 font-semibold">Computer Science fundamentals</span>, modern frameworks, and practical software engineering.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {/* View My Work */}
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
              >
                <span>View My Work</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              {/* Download Resume */}
              <a
                href="/Sagnika_bhol_Associate_Software_Engineer.pdf"
                download="Sagnika_bhol_Associate_Software_Engineer.pdf"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 hover:border-purple-500 dark:hover:border-purple-400 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
              >
                <svg
                  className="w-4 h-4 text-purple-600 dark:text-purple-400 transition-transform duration-200 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Download Resume</span>
              </a>
            </div>

            {/* Mobile / Tablet Social Links Row */}
            <div className="flex xl:hidden items-center justify-center lg:justify-start gap-4 pt-4">
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-600 dark:text-slate-400">
                Connect:
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 transition-all duration-200 shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Avatar with Animated Gradient Border & Floating Animation */}
          <div className="relative flex items-center justify-center">
            {/* Glowing Backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-full blur-2xl opacity-40 dark:opacity-50 anim-pulse-glow" />

            {/* Floating Frame */}
            <div className="relative anim-float-slow">
              {/* Animated Gradient Border Ring */}
              <div className="p-1.5 sm:p-2 rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-purple-600 shadow-2xl shadow-purple-500/30">
                {/* Inner Border Ring */}
                <div className="p-1 rounded-full bg-white dark:bg-slate-950">
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src="https://avatars.githubusercontent.com/u/206706019?v=4"
                      alt="Sagnika Bhol"
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Top Left */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg backdrop-blur-md flex items-center gap-2 transform -rotate-3 hover:rotate-0 transition-transform">
                <span className="text-base sm:text-lg">🐍</span>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 leading-none">
                    Core Stack
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Python & AI/ML
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Right */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg backdrop-blur-md flex items-center gap-2 transform rotate-3 hover:rotate-0 transition-transform">
                <span className="text-base sm:text-lg">🎓</span>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 leading-none">
                    Education
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    MCA (2024–2026)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
            aria-label="Scroll to About section"
            className="flex flex-col items-center group cursor-pointer"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
              Scroll Down
            </span>
            <div className="w-5 h-9 rounded-full border-2 border-slate-300 dark:border-slate-700 group-hover:border-purple-500 flex items-start justify-center p-1 transition-colors">
              <span className="w-1.5 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
