import React, { useState, useEffect, useRef } from 'react';

/**
 * Experience Component
 * Displays a vertical timeline of experience and education with alternating
 * left/right cards on desktop, glassmorphism styling, violet/purple gradient line,
 * and scroll-triggered IntersectionObserver animations.
 */
export default function Experience() {
  const [visibleEntries, setVisibleEntries] = useState({});
  const entryRefs = useRef([]);

  // Timeline entries focused on education and academic journey for a fresher
  // Authentic educational qualifications & professional training timeline
  const experiences = [
    {
      id: 'training-kodnest',
      icon: '🐍',
      role: 'Python Full Stack Development',
      subtitle: 'KodNest',
      period: 'In Progress',
      badge: 'Training',
      badgeColor: 'from-emerald-500 to-teal-600',
      description:
        'Undergoing specialized technical training in Python full-stack engineering, scalable application architecture, and modern software development practices.',
      highlights: [
        'Currently developing Python programming and full-stack development skills',
        'Learning concepts relevant to software development and application building',
        'Hands-on implementation of responsive web interfaces, backend APIs, and database integration',
      ],
      tags: ['Python', 'Full Stack Development', 'KodNest', 'Web Development', 'In Progress'],
    },
    {
      id: 'mca',
      icon: '🎓',
      role: 'Master of Computer Applications (MCA)',
      subtitle: 'C. V. Raman Global University, Odisha',
      period: '2024 - 2026',
      badge: 'CGPA: 8.40',
      badgeColor: 'from-violet-500 to-indigo-600',
      description:
        'Completed Master of Computer Applications with distinction, specializing in core computer science, software engineering principles, and applied development.',
      highlights: [
        'Academic Excellence: Achieved an 8.40 CGPA in MCA',
        'University: C. V. Raman Global University, Odisha (Status: Completed)',
        'Core Focus: Database Management Systems (DBMS), Operating Systems, Computer Networks, and Software Engineering',
      ],
      tags: ['MCA', 'CGPA: 8.40', 'C. V. Raman Global University', 'Java', 'Python', 'DBMS', 'Software Engineering'],
    },
    {
      id: 'bsc',
      icon: '💻',
      role: 'B.Sc. in Computer Science Honours',
      subtitle: 'Nigamananda Mahila Mahavidyalaya',
      period: '2021 - 2024',
      badge: 'CGPA: 8.17',
      badgeColor: 'from-purple-500 to-fuchsia-600',
      description:
        'Three-year undergraduate degree with Honours in Computer Science, building rigorous foundations in programming, relational databases, and computational logic.',
      highlights: [
        'Graduated with 8.17 CGPA (Computer Science Honours)',
        'College: Nigamananda Mahila Mahavidyalaya (2021–2024)',
        'Built strong foundation in Object-Oriented Programming (OOP), Relational Databases, and Computer Science concepts',
      ],
      tags: ['B.Sc. CS Hons', 'CGPA: 8.17', 'Nigamananda Mahila Mahavidyalaya', 'Computer Science', 'OOP', 'SQL'],
    },
    {
      id: 'higher-secondary',
      icon: '🔬',
      role: 'Higher Secondary Education (+2 Science)',
      subtitle: 'Regional Higher Secondary School • CHSE Odisha',
      period: '2019 - 2021',
      badge: 'CHSE Odisha',
      badgeColor: 'from-fuchsia-500 to-pink-600',
      description:
        'Completed Higher Secondary Certificate (+2) in the Science stream under the Council of Higher Secondary Education, Odisha.',
      highlights: [
        'Stream: Science (Higher Secondary / Class 12)',
        'School: Regional Higher Secondary School',
        'Board: Council of Higher Secondary Education, Odisha (CHSE Odisha) • Year: 2021',
      ],
      tags: ['Class 12', 'Science Stream', 'CHSE Odisha', 'Regional Higher Secondary School'],
    },
    {
      id: 'secondary',
      icon: '🏫',
      role: 'Secondary School Certificate (Class 10)',
      subtitle: 'Trilochaneswar Nodal High School • BSE Odisha',
      period: '2019',
      badge: 'BSE Odisha',
      badgeColor: 'from-pink-500 to-rose-600',
      description:
        'Completed Secondary School Certificate examination under the Board of Secondary Education, Odisha.',
      highlights: [
        'Qualification: Secondary School Certificate / Class 10',
        'School: Trilochaneswar Nodal High School',
        'Board: Board of Secondary Education, Odisha (BSE Odisha) • Year: 2019',
      ],
      tags: ['Class 10', 'BSE Odisha', 'Trilochaneswar Nodal High School', 'Secondary Education'],
    },
  ];

  // IntersectionObserver to trigger animations when each milestone scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-timeline-index');
            if (index !== null) {
              setVisibleEntries((prev) => ({
                ...prev,
                [index]: true,
              }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '0px 0px -70px 0px',
        threshold: 0.15,
      }
    );

    entryRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-slate-800 dark:text-slate-100"
    >
      {/* Decorative ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-10 -z-10 w-[500px] h-[400px] bg-gradient-to-tr from-purple-600/10 via-violet-600/10 to-transparent blur-3xl rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-10 -z-10 w-[450px] h-[450px] bg-gradient-to-bl from-fuchsia-600/10 via-purple-600/10 to-transparent blur-3xl rounded-full"
      />

      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 mb-4 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
          Education &amp; Professional Training
        </div>

        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Education &amp;{' '}
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            Training
          </span>
        </h2>

        {/* Gradient Underline Decoration */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-1 w-10 sm:w-16 rounded-full bg-gradient-to-r from-transparent to-violet-500 opacity-70" />
          <div className="h-1.5 w-24 sm:w-32 rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 shadow-md shadow-purple-500/40" />
          <div className="h-1 w-10 sm:w-16 rounded-full bg-gradient-to-r from-fuchsia-500 to-transparent opacity-70" />
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          My technical training, academic qualifications, and continuous learning journey in software development.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative">
        {/* Central Vertical Timeline Line (gradient) */}
        {/* Mobile: positioned at left-6, Desktop: centered at left-1/2 */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-1 bg-gradient-to-b from-violet-600 via-purple-600 to-fuchsia-600 rounded-full shadow-sm shadow-purple-500/30"
        />

        {/* Ambient glow surrounding the timeline line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-4 bottom-4 left-6 md:left-1/2 md:-translate-x-1/2 w-3 -translate-x-1/2 bg-purple-500/20 blur-sm rounded-full"
        />

        {/* Timeline Entries */}
        <div className="space-y-12 sm:space-y-16">
          {experiences.map((item, index) => {
            const isEven = index % 2 === 0;
            const isVisible = visibleEntries[index] ?? false;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  entryRefs.current[index] = el;
                }}
                data-timeline-index={index}
                className="relative flex flex-col md:flex-row items-center"
              >
                {/* Center Node / Pin Icon on Timeline */}
                <div
                  className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center
                    w-11 h-11 sm:w-13 sm:h-13 rounded-full
                    bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600
                    text-white text-xl shadow-lg shadow-purple-600/35
                    ring-4 ring-white dark:ring-slate-900
                    transition-all duration-700 ease-out
                    ${isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'}`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <span role="img" aria-label={item.role}>
                    {item.icon}
                  </span>
                </div>

                {/* Left Side Content Container (Desktop) */}
                <div
                  className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                    isEven ? 'md:pr-14 md:text-right' : 'md:order-2 md:pl-14 md:text-left'
                  }`}
                >
                  {/* Card with Glassmorphism and Hover Effects */}
                  <article
                    className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-700 ease-out
                      bg-white/75 dark:bg-slate-900/75
                      backdrop-blur-xl
                      border border-purple-100/90 dark:border-purple-900/40
                      shadow-xl shadow-purple-500/5 dark:shadow-purple-950/20
                      hover:border-purple-300 dark:hover:border-purple-500/50
                      hover:shadow-2xl hover:shadow-purple-500/20
                      hover:-translate-y-1
                      ${
                        isVisible
                          ? 'opacity-100 translate-x-0'
                          : isEven
                          ? 'opacity-0 md:-translate-x-12 translate-x-8'
                          : 'opacity-0 md:translate-x-12 translate-x-8'
                      }`}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* Corner gradient glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-tr-2xl"
                    />

                    {/* Header Row: Badge & Period */}
                    <div
                      className={`flex flex-wrap items-center gap-2 mb-3 ${
                        isEven ? 'md:justify-end justify-start' : 'justify-start'
                      }`}
                    >
                      {/* Period Badge */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100/80 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-300/50 dark:border-purple-800/50">
                        <svg
                          className="w-3.5 h-3.5 text-purple-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {item.period}
                      </span>

                      {/* Category Label */}
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${item.badgeColor} shadow-sm`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                      {item.role}
                    </h3>

                    {/* Subtitle / Focus area */}
                    <h4 className="text-sm font-medium text-purple-600 dark:text-purple-400 mt-1 mb-3">
                      {item.subtitle}
                    </h4>

                    {/* Main Description */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Bullet Highlights */}
                    <ul
                      className={`space-y-2 mb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 ${
                        isEven ? 'md:text-right text-left' : 'text-left'
                      }`}
                    >
                      {item.highlights.map((highlight, hIdx) => (
                        <li
                          key={hIdx}
                          className={`flex items-start gap-2 ${
                            isEven ? 'md:flex-row-reverse flex-row' : 'flex-row'
                          }`}
                        >
                          <span className="text-purple-500 mt-0.5 shrink-0 font-bold">
                            ✦
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skill Tags */}
                    <div
                      className={`flex flex-wrap gap-2 pt-4 border-t border-purple-100/60 dark:border-purple-900/30 ${
                        isEven ? 'md:justify-end justify-start' : 'justify-start'
                      }`}
                    >
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 transition-colors group-hover:border-purple-300 dark:group-hover:border-purple-600/40"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>

                {/* Desktop Spacer / Empty Column on the other side */}
                <div
                  className={`hidden md:block w-1/2 ${
                    isEven ? 'order-2 pl-14' : 'order-1 pr-14'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
