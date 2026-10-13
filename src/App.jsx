import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIChatbot from './components/AIChatbot';
import Footer from './components/Footer';

/**
 * Main App Component
 * Features dark/light mode toggle synchronized with localStorage,
 * smooth scroll navigation, and sequential layout composition:
 * Navbar, Hero, About, TechStack, Experience, Projects, Contact, AIChatbot, Footer.
 */
export default function App() {
  // Initialize dark mode from localStorage, defaulting to true (dark theme by default)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) {
        return stored === 'dark';
      }
      return true; // Default dark mode
    }
    return true;
  });

  // Synchronize dark mode class on root HTML element and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-950 bg-white text-slate-900 dark:text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Portfolio Sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Floating Interactive AI Chatbot Assistant */}
      <AIChatbot />

      {/* Modern Wave Footer */}
      <Footer />
    </div>
  );
}
