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
function AnimatedCounter({ target, suffix = '', duration = 1600, startAnimation, decimals = 0 }) {
  const [count, setCount] = useState(decimals > 0 ? (0).toFixed(decimals) : 0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTimestamp = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Cubic ease-out curve for smooth decelerating counter
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * target;
      setCount(decimals > 0 ? current.toFixed(decimals) : Math.floor(current));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(decimals > 0 ? target.toFixed(decimals) : target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [startAnimation, target, duration, decimals]);

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
      value: 8.40,
      decimals: 2,
      suffix: '',
      label: 'MCA CGPA',
      sublabel: 'C. V. Raman Global University',
      icon: (
        <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      ),
    },
    {
      value: 16,
      decimals: 0,
      suffix: '+',
      label: 'Projects',
      sublabel: 'Academic & Self-Built',
      icon: (
        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      value: 10,
      decimals: 0,
      suffix: '+',
      label: 'Technologies',
      sublabel: 'Languages, ML & Tools',
      icon: (
        <svg className="w-6 h-6 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
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
            A glimpse into my academic background, technical foundation, and learning journey as a fresher.
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
                Hello! I'm <strong className="font-semibold text-slate-950 dark:text-white">Sagnika Bhol</strong>, an aspiring{' '}
                <span className="font-semibold text-violet-600 dark:text-violet-400">Software Engineer</span> with a completed{' '}
                <span className="font-semibold text-purple-600 dark:text-purple-400">Master of Computer Applications (MCA)</span> from{' '}
                <strong className="text-slate-950 dark:text-white font-medium">C. V. Raman Global University, Odisha</strong> (CGPA: <strong className="text-violet-600 dark:text-violet-400 font-semibold">8.40</strong>) and a foundational degree in{' '}
                <span className="font-semibold text-fuchsia-600 dark:text-fuchsia-400">B.Sc. in Computer Science Honours</span> from{' '}
                <strong className="text-slate-950 dark:text-white font-medium">Nigamananda Mahila Mahavidyalaya</strong>.
              </p>

              <p>
                Currently, I am undergoing professional training in{' '}
                <strong className="text-slate-950 dark:text-white font-semibold">Python Full Stack Development at KodNest</strong>, honing hands-on skills in Python programming, full-stack application development, and software engineering workflows.
              </p>

              <p>
                Throughout my academic journey, I have built strong foundations in core Computer Science principles—including{' '}
                <strong className="text-slate-900 dark:text-white font-medium">Database Management Systems (DBMS), Operating Systems, Computer Networks, Web Technologies, and Software Engineering</strong>.
                I bridge academic knowledge with practical engineering by building independent software and AI/ML applications using frameworks like{' '}
                <code className="px-2 py-0.5 rounded text-sm font-mono bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  TensorFlow
                </code>
                ,{' '}
                <code className="px-2 py-0.5 rounded text-sm font-mono bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  OpenCV
                </code>
                , Python, and Java.
              </p>

              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base pt-1">
                I am an energetic, quick learner eager to take on an <strong className="text-purple-600 dark:text-purple-400 font-semibold">Associate Software Engineer / SDE</strong> or <strong className="text-violet-600 dark:text-violet-400 font-semibold">AI/ML role</strong>, where I can apply my problem-solving abilities, learn from experienced mentors, and contribute to meaningful products.
              </p>
            </div>

            {/* Quick Core Strengths Pills */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-2.5">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-600 dark:text-slate-400 mr-2">
                Core Strengths:
              </span>
              {[
                'Python Full Stack (KodNest)',
                'Software Engineering & OOP',
                'Python & Java Development',
                'Deep Learning / TensorFlow',
                'DBMS & SQL',
                'Quick Learner & Fresher',
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
                    decimals={stat.decimals || 0}
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
              Areas of Study &amp; Focus
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">
              Core academic and technical domains where I concentrate my coursework, software engineering, and project building.
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
