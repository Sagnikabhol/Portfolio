import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for smooth scroll-reveal animations using IntersectionObserver.
 * Triggers once when the target element enters the viewport.
 */
function useScrollReveal(options = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options]);

  return [ref, isVisible];
}

/**
 * Animated number counter component that counts up to the target value
 * when triggered by the IntersectionObserver.
 */
function AnimatedCounter({ target, suffix = '', duration = 1600, startAnimation }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTimestamp = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Cubic ease-out curve for smooth decelerating counter
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [startAnimation, target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [bioRef, bioVisible] = useScrollReveal({ threshold: 0.2 });
  const [statsRef, statsVisible] = useScrollReveal({ threshold: 0.25 });
  const [servicesRef, servicesVisible] = useScrollReveal({ threshold: 0.15 });

  const stats = [
    {
      value: 16,
      suffix: '+',
      label: 'Projects',
      sublabel: 'Completed & Deployed',
      icon: (
        <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      value: 6,
      suffix: '+',
      label: 'Technologies',
      sublabel: 'Languages & Frameworks',
      icon: (
        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      value: 2,
      suffix: '+',
      label: 'Years Learning',
      sublabel: 'Continuous Growth & Code',
      icon: (
        <svg className="w-6 h-6 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const whatIDoCards = [
    {
      emoji: '🤖',
      title: 'AI & Machine Learning',
      subtitle: 'Intelligent Systems & Neural Models',
      description:
        'Building intelligent systems with TensorFlow, Keras, and deep learning. Designing robust neural network architectures, predictive classifiers, and automation models engineered for precision and real-world impact.',
      skills: ['TensorFlow', 'Keras', 'Deep Learning', 'PyTorch', 'Model Optimization', 'Computer Vision'],
      gradientFrom: 'from-violet-500',
      gradientTo: 'to-indigo-500',
      accentColor: 'text-violet-500 dark:text-violet-400',
      accentBg: 'bg-violet-500/10 dark:bg-violet-500/20',
      badgeBorder: 'border-violet-200 dark:border-violet-800/60',
    },
    {
      emoji: '📊',
      title: 'Data Analytics',
      subtitle: 'Insights & Visual Intelligence',
      description:
        'Creating insightful dashboards and data-driven solutions. Transforming complex, multi-dimensional datasets into clean visual narratives, exploratory data analyses (EDA), and automated statistical reporting.',
      skills: ['Pandas & NumPy', 'Data Visualization', 'SQL', 'Exploratory Analysis', 'Statistical Modeling'],
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-fuchsia-500',
      accentColor: 'text-purple-500 dark:text-purple-400',
      accentBg: 'bg-purple-500/10 dark:bg-purple-500/20',
      badgeBorder: 'border-purple-200 dark:border-purple-800/60',
    },
    {
      emoji: '💻',
      title: 'Software Development',
      subtitle: 'Scalable Full-Stack Engineering',
      description:
        'Full-stack applications with Python, Java, and modern web technologies. Architecting resilient RESTful APIs, clean modular code, responsive interfaces, and seamless integration between backend services and user experiences.',
      skills: ['Python & Java', 'React.js', 'REST APIs', 'FastAPI / Flask', 'Tailwind CSS', 'Git & CI/CD'],
      gradientFrom: 'from-fuchsia-500',
      gradientTo: 'to-pink-500',
      accentColor: 'text-fuchsia-500 dark:text-fuchsia-400',
      accentBg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/20',
      badgeBorder: 'border-fuchsia-200 dark:border-fuchsia-800/60',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#8b5cf6_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.07] dark:opacity-[0.12]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header with Gradient Underline */}
        <div
          ref={headerRef}
          className={`text-center space-y-3 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60">
            <span>Discover</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>

          {/* Gradient Underline */}
          <div className="flex items-center justify-center gap-1 pt-1">
            <div className="w-4 h-1.5 rounded-full bg-violet-400 dark:bg-violet-600" />
            <div className="w-20 sm:w-28 h-1.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-sm" />
            <div className="w-4 h-1.5 rounded-full bg-fuchsia-400 dark:bg-fuchsia-600" />
          </div>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 pt-2">
            A glimpse into my background, core expertise, and engineering philosophy.
          </p>
        </div>

        {/* Professional Bio Section */}
        <div
          ref={bioRef}
          className={`mt-14 max-w-4xl mx-auto transition-all duration-700 delay-100 ease-out ${
            bioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative p-6 sm:p-10 rounded-3xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md shadow-xl shadow-purple-500/5">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="space-y-5 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
              <p>
                Hello! I'm <strong className="font-semibold text-slate-950 dark:text-white">Sagnika Bhol</strong>, a dedicated{' '}
                <span className="font-semibold text-violet-600 dark:text-violet-400">Software Engineer</span> with a deep passion for{' '}
                <span className="font-semibold text-purple-600 dark:text-purple-400">Artificial Intelligence</span>,{' '}
                <span className="font-semibold text-fuchsia-600 dark:text-fuchsia-400">Machine Learning</span>, and modern{' '}
                <span className="font-semibold text-slate-950 dark:text-white">Python development</span>. I thrive on the boundary between theoretical concepts and practical, high-impact software solutions.
              </p>

              <p>
                Over the past several years, I have focused on architecting and training real-world applications using frameworks like{' '}
                <code className="px-2 py-0.5 rounded text-sm font-mono bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  TensorFlow
                </code>{' '}
                and{' '}
                <code className="px-2 py-0.5 rounded text-sm font-mono bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Keras
                </code>
                , creating intelligent data analytics pipelines, and building clean, modular full-stack applications. Whether it's structuring intuitive user interfaces, tuning deep learning models, or wrangling multidimensional data, I emphasize scalable code, performance, and craftsmanship.
              </p>

              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base pt-1">
                When I'm not writing code or experimenting with neural nets, you can find me exploring cutting-edge AI research papers, collaborating on open-source initiatives, and solving challenging algorithmic puzzles.
              </p>
            </div>

            {/* Quick Core Strengths Pills */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-2.5">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-600 dark:text-slate-400 mr-2">
                Core Strengths:
              </span>
              {[
                'Python & OOP',
                'Deep Learning / TensorFlow',
                'Data Visualization',
                'Full-Stack Architecture',
                'Clean Code Practices',
                'Continuous Learning',
              ].map((strength) => (
                <span
                  key={strength}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  ✓ {strength}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Stats Row */}
        <div
          ref={statsRef}
          className={`mt-14 max-w-5xl mx-auto transition-all duration-700 delay-200 ease-out ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative p-6 sm:p-8 rounded-3xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 text-center"
              >
                {/* Subtle top indicator on hover */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-b opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="inline-flex p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>

                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={1500 + index * 200}
                    startAnimation={statsVisible}
                  />
                </div>

                <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                  {stat.label}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 'What I Do' Subsection */}
        <div
          ref={servicesRef}
          className={`mt-24 transition-all duration-700 delay-300 ease-out ${
            servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Subsection Title */}
          <div className="text-center space-y-2 mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              What I Do
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">
              Specialized domains where I craft innovative, high-performance software solutions.
            </p>
          </div>

          {/* 3 Cards with Hover Effects and Gradient Borders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatIDoCards.map((card) => (
              <div
                key={card.title}
                className="group relative p-[1.5px] rounded-3xl bg-gradient-to-b from-slate-200 via-slate-200 to-slate-200 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 transition-all duration-500 shadow-md hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-2"
              >
                {/* Glow layer behind card on hover */}
                <div
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Inner Card Content */}
                <div className="relative h-full flex flex-col justify-between p-7 sm:p-8 rounded-[22px] bg-white dark:bg-slate-950 transition-colors duration-300">
                  <div>
                    {/* Emoji Header & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                        <span role="img" aria-label={card.title}>
                          {card.emoji}
                        </span>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${card.accentBg} ${card.accentColor} border ${card.badgeBorder}`}>
                        Expertise
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                      {card.title}
                    </h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mt-1 mb-4">
                      {card.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Skills / Tech Tags */}
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900">
                    <div className="text-xs uppercase font-bold tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                      Key Technologies:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {card.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80 group-hover:border-purple-500/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
