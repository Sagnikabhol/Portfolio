/**
 * Footer Component
 * Responsive modern footer with a simple wave SVG divider, copyright 2026,
 * social links row (GitHub, LinkedIn), and 'Built with React & ❤️' text.
 */
export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '/');
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Sagnikabhol',
      icon: (
        <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sagnikabhol/',
      icon: (
        <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:sagnikabhol@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
    <footer className="relative mt-20 overflow-hidden bg-slate-50 dark:bg-gray-950 text-slate-700 dark:text-slate-300 transition-colors duration-300">
      {/* Simple Wave SVG Divider at Top */}
      <div className="w-full overflow-hidden leading-none text-slate-100 dark:text-gray-900/40">
        <svg
          className="relative block w-full h-8 sm:h-12 md:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-200/80 dark:border-purple-900/30">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-purple-600 p-[1.5px] shadow-md shadow-purple-500/20">
                <div className="w-full h-full bg-white dark:bg-gray-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-sm bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    SB
                  </span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Sagnika <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Bhol</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm">
              Software Engineer & AI/ML Developer passionate about machine learning, deep neural nets, and intelligent systems.
            </p>
          </div>

          {/* Social Links Row */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Connect With Me
            </span>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-purple-900/40 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 hover:border-transparent shadow-sm hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}

              {/* Back to top button */}
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/40 text-violet-600 dark:text-violet-400 hover:bg-violet-600 hover:text-white hover:border-transparent shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                title="Back to top"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright & 'Built with React & ❤️' */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
          <p>© 2026 Sagnika Bhol. All rights reserved.</p>

          <p className="inline-flex items-center gap-1.5 font-medium">
            <span>Built with</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">React</span>
            <span>&amp;</span>
            <span className="text-red-500 animate-pulse text-sm">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
