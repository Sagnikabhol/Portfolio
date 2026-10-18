import React, { useState, useEffect, useRef } from 'react';

/**
 * TechStack Component
 * Displays categorized technical skills with glassmorphic cards,
 * interactive pills with icons, hover glow effects, and staggered scroll animations.
 */
export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCards, setVisibleCards] = useState({});
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Technical skills categorized as requested
  const categories = [
    {
      id: 'languages',
      title: 'Languages',
      badge: 'Core Programming',
      icon: '💻',
      description: 'Foundational programming and querying languages for application development and backend systems.',
      skills: [
        { name: 'Python', icon: '🐍' },
        { name: 'Java', icon: '☕' },
        { name: 'SQL', icon: '🗄️' },
        { name: 'HTML/CSS', icon: '🎨' },
        { name: 'JavaScript', icon: '⚡' },
      ],
    },
    {
      id: 'ai-ml',
      title: 'AI / Machine Learning',
      badge: 'Deep Learning & Vision',
      icon: '🧠',
      description: 'Specialized neural networks, computer vision models, and predictive frameworks.',
      skills: [
        { name: 'TensorFlow', icon: '🤖' },
        { name: 'Keras', icon: '🔬' },
        { name: 'PyTorch', icon: '🔥' },
        { name: 'OpenCV', icon: '👁️' },
        { name: 'Scikit-learn', icon: '📊' },
      ],
    },
    {
      id: 'data-analytics',
      title: 'Data & Analytics',
      badge: 'Data Science & Viz',
      icon: '📈',
      description: 'High-performance data manipulation, exploratory analysis, and interactive dashboarding.',
      skills: [
        { name: 'Pandas', icon: '🐼' },
        { name: 'NumPy', icon: '🔢' },
        { name: 'Matplotlib', icon: '📊' },
        { name: 'Plotly', icon: '📉' },
        { name: 'Streamlit', icon: '🎈' },
      ],
    },
    {
      id: 'tools-platforms',
      title: 'Tools & Platforms',
      badge: 'DevOps & Tooling',
      icon: '🛠️',
      description: 'Modern developer workflow tools, version control, environments, and containerization.',
      skills: [
        { name: 'Git', icon: '🌿' },
        { name: 'GitHub', icon: '🐙' },
        { name: 'VS Code', icon: '💻' },
        { name: 'Jupyter', icon: '🪐' },
        { name: 'Docker', icon: '🐳' },
      ],
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      badge: 'Modern Frontend',
      icon: '🌐',
      description: 'Responsive user interfaces, semantic architecture, and modern utility-first styling.',
      skills: [
        { name: 'React', icon: '⚛️' },
        { name: 'HTML5', icon: '🌐' },
        { name: 'CSS3', icon: '🎨' },
        { name: 'Tailwind CSS', icon: '💨' },
      ],
    },
    {
      id: 'databases',
      title: 'Databases',
      badge: 'Storage & Models',
      icon: '🗄️',
      description: 'Reliable relational and document-based databases for scalable data persistence.',
      skills: [
        { name: 'MySQL', icon: '🐬' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'SQLite', icon: '🗃️' },
      ],
    },
  ];

  // IntersectionObserver to animate cards and skills when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-card-index');
            if (index !== null) {
              setVisibleCards((prev) => ({
                ...prev,
                [index]: true,
              }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Filter categories if user clicks on quick filter tabs
  const filteredCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter((cat) => cat.id === activeCategory);

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-slate-800 dark:text-slate-100"
    >
      {/* Decorative ambient background gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[350px] bg-gradient-to-tr from-violet-600/15 via-purple-500/10 to-fuchsia-500/15 blur-3xl rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 right-10 -z-10 w-[400px] h-[300px] bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-transparent blur-3xl rounded-full"
      />

      {/* Section Header */}
      <div className="text-center mb-14">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 mb-4 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
          Technical Capabilities
        </div>

        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Tech{' '}
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            Stack
          </span>
        </h2>

        {/* Gradient Underline Decoration */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-1 w-10 sm:w-16 rounded-full bg-gradient-to-r from-transparent to-violet-500 opacity-70" />
          <div className="h-1.5 w-20 sm:w-28 rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 shadow-md shadow-purple-500/40" />
          <div className="h-1 w-10 sm:w-16 rounded-full bg-gradient-to-r from-fuchsia-500 to-transparent opacity-70" />
        </div>

        {/* Section Description */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          A modern, battle-tested repertoire of programming languages, deep learning architectures,
          data analysis ecosystems, and development frameworks.
        </p>

        {/* Quick Filter Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-500/30 scale-105'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
            }`}
          >
            All Skills ({categories.reduce((acc, cat) => acc + cat.skills.length, 0)})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-500/30 scale-105'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredCategories.map((category, catIdx) => {
          const isCardVisible = visibleCards[catIdx] ?? false;

          return (
            <div
              key={category.id}
              ref={(el) => {
                cardRefs.current[catIdx] = el;
              }}
              data-card-index={catIdx}
              className={`group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-700 ease-out
                bg-white/70 dark:bg-slate-900/70
                backdrop-blur-xl
                border border-purple-100/80 dark:border-purple-900/30
                shadow-xl shadow-purple-500/5 dark:shadow-purple-950/20
                hover:border-purple-300 dark:hover:border-purple-500/50
                hover:shadow-2xl hover:shadow-purple-500/15
                hover:-translate-y-1.5
                ${
                  isCardVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              style={{
                transitionDelay: `${catIdx * 75}ms`,
              }}
            >
              {/* Subtle top-corner gradient sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 via-fuchsia-500/5 to-transparent rounded-tr-2xl"
              />

              <div>
                {/* Category Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br from-violet-500/15 to-purple-600/20 text-purple-600 dark:text-purple-300 border border-purple-500/20 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                        {category.title}
                      </h3>
                      <span className="text-xs font-semibold text-purple-600/90 dark:text-purple-400 tracking-wider uppercase">
                        {category.badge}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/40">
                    {category.skills.length} skills
                  </span>
                </div>

                {/* Category Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Subtle Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-200/80 dark:via-purple-800/40 to-transparent mb-6" />

                {/* Skills Pill Badges with Staggered Fade-in */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIdx) => {
                    const skillDelay = (catIdx * 70) + (skillIdx * 45);

                    return (
                      <div
                        key={skill.name}
                        className={`group/pill inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium
                          bg-slate-100/90 dark:bg-slate-800/80
                          text-slate-700 dark:text-slate-200
                          border border-slate-200/80 dark:border-slate-700/70
                          shadow-sm
                          cursor-default select-none
                          transition-all duration-300
                          hover:scale-105 hover:-translate-y-0.5
                          hover:bg-white dark:hover:bg-slate-800
                          hover:border-purple-400 dark:hover:border-purple-400
                          hover:text-purple-700 dark:hover:text-purple-300
                          hover:shadow-[0_0_16px_rgba(168,85,247,0.35)]
                          ${
                            isCardVisible
                              ? 'opacity-100 translate-y-0 scale-100'
                              : 'opacity-0 translate-y-3 scale-95'
                          }`}
                        style={{
                          transitionDelay: `${skillDelay}ms`,
                        }}
                      >
                        {/* Skill Icon */}
                        <span
                          className="text-base group-hover/pill:scale-125 transition-transform duration-200"
                          role="img"
                          aria-label={skill.name}
                        >
                          {skill.icon}
                        </span>

                        {/* Skill Name */}
                        <span className="font-semibold tracking-tight">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Card Accent Bar */}
              <div className="mt-6 pt-4 border-t border-purple-100/50 dark:border-purple-900/20 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active Skillset
                </span>
                <span className="font-mono text-[11px] text-purple-600 dark:text-purple-400">
                  #ready-to-deploy
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
