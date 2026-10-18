import React, { useState, useEffect } from 'react';

// Hardcoded featured projects with rich descriptions
const FEATURED_PROJECTS = [
  {
    id: 'feat-1',
    name: 'Riosa Voice AI',
    description:
      'Personal Voice AI Assistant built with Python. An intelligent voice-controlled assistant that understands and responds to natural language commands.',
    tech: ['Python', 'Speech Recognition', 'AI', 'NLP'],
    language: 'Python',
    stars: 5,
    forks: 2,
    repoUrl: 'https://github.com/Sagnikabhol/Riosa-Voice-AI',
    isFeatured: true,
  },
  {
    id: 'feat-2',
    name: 'Face Emotion Recognition',
    description:
      'Real-time facial expression recognition using TensorFlow, Keras and OpenCV. Detects and classifies emotions from live video feed.',
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
    language: 'Python',
    stars: 8,
    forks: 3,
    repoUrl: 'https://github.com/Sagnikabhol/Face-Emotion-Recognition',
    isFeatured: true,
  },
  {
    id: 'feat-3',
    name: 'Sales Analytics Dashboard',
    description:
      'Interactive data analytics dashboard built with Streamlit and Plotly. Visualizes sales data with dynamic charts and filters.',
    tech: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
    language: 'Python',
    stars: 4,
    forks: 1,
    repoUrl: 'https://github.com/Sagnikabhol/Sales-Analytics-Dashboard',
    isFeatured: true,
  },
  {
    id: 'feat-4',
    name: 'Vaccination Management System',
    description:
      'AI-powered smart vaccination management system using Java, JSP, Servlet, JDBC, MySQL.',
    tech: ['Java', 'JSP', 'MySQL', 'Tomcat', 'JDBC'],
    language: 'Java',
    stars: 3,
    forks: 1,
    repoUrl: 'https://github.com/Sagnikabhol/Vaccination-Management-System',
    isFeatured: true,
  },
  {
    id: 'feat-5',
    name: 'Image Classification',
    description:
      'Food-101 Image Classification using transfer learning with MobileNetV2. Classifies 101 food categories.',
    tech: ['Python', 'TensorFlow', 'Keras', 'MobileNetV2'],
    language: 'Python',
    stars: 6,
    forks: 2,
    repoUrl: 'https://github.com/Sagnikabhol/Food-101-Image-Classification',
    isFeatured: true,
  },
];

// Color mapping for language dots (GitHub-like)
const LANGUAGE_COLORS = {
  Python: '#3572A5',
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  'Jupyter Notebook': '#DA5B0B',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Default: '#a855f7',
};

// Tech badge color rotation (violet/purple theme)
const BADGE_COLORS = [
  'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800/40',
  'bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border-violet-200 dark:border-violet-800/40',
  'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/40',
  'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/60 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800/40',
];

export default function Projects() {
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'featured', 'python', 'ai'

  useEffect(() => {
    let isMounted = true;

    async function fetchRepos() {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.github.com/users/Sagnikabhol/repos?sort=updated&per_page=10'
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted && Array.isArray(data)) {
          // Normalize names of featured projects for deduplication
          const featuredNames = FEATURED_PROJECTS.map((p) =>
            p.name.toLowerCase().replace(/[^a-z0-9]/g, '')
          );

          // Filter out repos that match hardcoded featured projects
          const uniqueFetched = data
            .filter((repo) => {
              const cleanRepoName = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '');
              const matchesFeatured = featuredNames.some(
                (feat) => cleanRepoName.includes(feat) || feat.includes(cleanRepoName)
              );
              return !matchesFeatured && !repo.fork;
            })
            .map((repo) => {
              // Extract tags from topics or language
              const tags = [
                repo.language,
                ...(repo.topics || []).slice(0, 3),
              ].filter(Boolean);

              return {
                id: `gh-${repo.id}`,
                name: repo.name.replace(/[-_]/g, ' '),
                description:
                  repo.description ||
                  'Open source software project developed by Sagnika Bhol.',
                tech: tags.length > 0 ? tags : [repo.language || 'Software'],
                language: repo.language || 'Code',
                stars: repo.stargazers_count ?? 0,
                forks: repo.forks_count ?? 0,
                repoUrl: repo.html_url,
                isFeatured: false,
              };
            });

          setGithubRepos(uniqueFetched);
          setFetchError(false);
        }
      } catch (err) {
        console.warn('Could not fetch dynamic GitHub repositories:', err);
        if (isMounted) {
          setFetchError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  // Hardcoded featured projects always appear first, followed by fetched repositories
  const allProjects = [...FEATURED_PROJECTS, ...githubRepos];

  // Filtering logic
  const filteredProjects = allProjects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.isFeatured;
    if (filter === 'python')
      return (
        project.language?.toLowerCase() === 'python' ||
        project.tech.some((t) => t.toLowerCase().includes('python'))
      );
    if (filter === 'ai')
      return project.tech.some((t) =>
        ['ai', 'tensorflow', 'keras', 'opencv', 'nlp', 'machine learning'].some(
          (k) => t.toLowerCase().includes(k)
        )
      );
    return true;
  });

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-500/10 dark:bg-violet-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200/80 dark:border-purple-700/50 mb-3 shadow-sm">
          {/* Sparkles Icon */}
          <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
          </svg>
          Portfolio & Showcase
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Featured <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Projects</span>
        </h2>

        {/* Gradient Underline */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          <div className="h-1 w-10 bg-gradient-to-r from-transparent to-violet-500 rounded-full" />
          <div className="h-1.5 w-16 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 rounded-full shadow-sm shadow-purple-500/50" />
          <div className="h-1 w-10 bg-gradient-to-r from-fuchsia-500 to-transparent rounded-full" />
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explore cutting-edge AI systems, interactive analytics tools, and open-source applications built with modern engineering practices.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'featured', label: '⭐ Featured Only' },
            { id: 'ai', label: '🧠 AI & ML' },
            { id: 'python', label: '🐍 Python' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-500/30 scale-105'
                  : 'bg-white/80 dark:bg-zinc-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-700/60 hover:border-purple-400 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => {
          const langColor =
            LANGUAGE_COLORS[project.language] || LANGUAGE_COLORS.Default;

          return (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-2 backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-purple-100/90 dark:border-purple-900/40 hover:border-purple-400/80 dark:hover:border-purple-500/60 shadow-lg hover:shadow-2xl hover:shadow-purple-500/15"
            >
              {/* Hover Glow Background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Header: Status / Star badge & GitHub link */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    {project.isFeatured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm shadow-purple-500/30">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Featured
                      </span>
                    )}

                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block shadow-sm"
                        style={{ backgroundColor: langColor }}
                        title={project.language}
                      />
                      <span>{project.language}</span>
                    </div>
                  </div>

                  {/* GitHub Action Button */}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.name} on GitHub`}
                    className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </a>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    {project.name}
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags Pills */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tech.map((tag, idx) => {
                    const colorClass = BADGE_COLORS[idx % BADGE_COLORS.length];
                    return (
                      <span
                        key={idx}
                        className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border shadow-2xs ${colorClass}`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer: Stars, Forks & Direct Repo Link */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  {/* Star count */}
                  <span className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                    <svg className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{project.stars}</span>
                  </span>

                  {/* Fork count */}
                  {project.forks > 0 && (
                    <span className="flex items-center gap-1 hover:text-purple-500 transition-colors">
                      <svg className="w-3.5 h-3.5 fill-none stroke-currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="18" r="3" />
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="18" cy="6" r="3" />
                        <path d="M6 9v1a3 3 0 003 3h6a3 3 0 003-3V9m-6 4v2" />
                      </svg>
                      <span>{project.forks}</span>
                    </span>
                  )}
                </div>

                {/* View Code link */}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 inline-flex items-center gap-1 transition-colors"
                >
                  Code
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}

        {/* Loading Skeletons */}
        {loading &&
          [1, 2, 3].map((item) => (
            <div
              key={`skeleton-${item}`}
              className="rounded-2xl p-6 backdrop-blur-md bg-white/50 dark:bg-zinc-900/40 border border-purple-100/60 dark:border-purple-900/20 shadow-md animate-pulse flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-5 w-20 bg-slate-200 dark:bg-zinc-800 rounded-full" />
                  <div className="h-6 w-6 bg-slate-200 dark:bg-zinc-800 rounded-lg" />
                </div>
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-zinc-800 rounded mb-3" />
                <div className="h-4 w-full bg-slate-200 dark:bg-zinc-800 rounded mb-2" />
                <div className="h-4 w-5/6 bg-slate-200 dark:bg-zinc-800 rounded mb-4" />
                <div className="flex gap-2">
                  <div className="h-5 w-14 bg-slate-200 dark:bg-zinc-800 rounded-full" />
                  <div className="h-5 w-16 bg-slate-200 dark:bg-zinc-800 rounded-full" />
                  <div className="h-5 w-12 bg-slate-200 dark:bg-zinc-800 rounded-full" />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-between">
                <div className="h-4 w-12 bg-slate-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-16 bg-slate-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>
          ))}
      </div>

      {/* Notice if dynamic fetch failed or rate limited */}
      {fetchError && (
        <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          Showing curated featured projects. Additional GitHub repositories available directly on profile.
        </div>
      )}

      {/* View All on GitHub Button */}
      <div className="mt-16 text-center">
        <a
          href="https://github.com/Sagnikabhol"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300 group"
        >
          {/* GitHub Icon */}
          <svg className="w-5 h-5 fill-currentColor transition-transform group-hover:rotate-12 duration-300" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>View All on GitHub</span>
          {/* Arrow */}
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
