import { useState, useRef, useEffect } from 'react';

/**
 * AIChatbot Component
 * Floating AI chatbot assistant for Sagnika Bhol's portfolio website.
 * Powered by Google Gemini 2.0 Flash API with glassmorphism UI & responsive design.
 */
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: "Hi! 👋 I'm Sagnika's AI assistant. Ask me anything about her academic journey, skills, or projects!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickQuestions = [
    'What are her skills?',
    'Tell me about her projects',
    'What is her education?',
  ];

  // System context prompt for Gemini
  const SYSTEM_PROMPT =
    "You are an AI assistant on Sagnika Bhol's portfolio website. Sagnika is an aspiring Software Engineer specializing in Python, Java, and AI/ML. She is currently undergoing professional training in Python Full Stack Development at KodNest (In Progress). She completed her Master of Computer Applications (MCA) at C. V. Raman Global University, Odisha (2024–2026, 8.40 CGPA), and her B.Sc. in Computer Science Honours at Nigamananda Mahila Mahavidyalaya (2021–2024, 8.17 CGPA). She did her Higher Secondary (+2 Science) from Regional Higher Secondary School, CHSE Odisha (2021) and Class 10 from Trilochaneswar Nodal High School, BSE Odisha (2019). She has a solid grounding in Computer Science fundamentals (DBMS, Operating Systems, Computer Networks, Web Technologies, Software Engineering) and hands-on projects like Riosa Voice AI, Face Emotion Recognition, and Sales Analytics Dashboard. She is skilled in Python, Full-Stack Web Development, TensorFlow, Keras, OpenCV, PyTorch, SQL, Git, and Java, and is seeking Associate Software Engineer / SDE and AI/ML roles. Answer questions about her academic journey, skills, and projects enthusiastically, honestly, professionally, and concisely.";

  // Scroll to bottom when messages update or loading starts
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input field when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasInteracted(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  // Keyboard shortcut: close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (customMessage = null) => {
    const textToSend = typeof customMessage === 'string' ? customMessage : inputMessage;
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMessageTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: userMessageTime,
    };

    // Add user message to conversation
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Helper for local knowledge-base fallback response if API is unavailable or rate-limited
    const getLocalFallbackAnswer = (query) => {
      const q = query.toLowerCase();
      if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('framework')) {
        return "Sagnika's core technical stack includes:\n- **Languages**: Python, Java, JavaScript, SQL, HTML/CSS\n- **Full-Stack Training**: Python Full Stack Development at KodNest (In Progress)\n- **AI & ML**: TensorFlow, Keras, OpenCV, PyTorch, Scikit-learn\n- **Data Analytics**: Pandas, NumPy, Matplotlib, Plotly, Streamlit\n- **Tools**: Git, GitHub, VS Code, Linux";
      }
      if (q.includes('training') || q.includes('kodnest') || q.includes('course')) {
        return "Sagnika is currently undergoing professional training:\n- **Program**: Python Full Stack Development\n- **Institute**: KodNest\n- **Status**: In Progress\n- **Focus**: Python programming, full-stack web development, and hands-on application building.";
      }
      if (q.includes('project') || q.includes('work') || q.includes('build') || q.includes('portfolio') || q.includes('repo')) {
        return "Sagnika has built several featured projects:\n1. **Riosa Voice AI**: Intelligent voice-controlled desktop assistant built with Python.\n2. **Face Emotion Recognition**: Real-time facial expression classifier using TensorFlow, Keras, and OpenCV.\n3. **Sales Analytics Dashboard**: Dynamic data dashboard with Streamlit and Plotly.\n4. **Smart Vaccination Management**: Java/JSP-based management system.\n5. **Food Image Classification**: MobileNetV2 transfer learning model.\n\nCheck out the Projects section above for live repository links!";
      }
      if (q.includes('education') || q.includes('study') || q.includes('college') || q.includes('school') || q.includes('university') || q.includes('mca') || q.includes('degree') || q.includes('academic') || q.includes('cgpa') || q.includes('10th') || q.includes('12th')) {
        return "Here is Sagnika's complete education & training background:\n\n1. **Python Full Stack Development (Training - In Progress)**\n   - **Institute**: KodNest\n   - **Focus**: Python programming & application building\n\n2. **Master of Computer Applications (MCA)** (2024–2026)\n   - **University**: C. V. Raman Global University, Odisha\n   - **CGPA**: 8.40 (Completed)\n\n3. **Bachelor of Science in Computer Science Honours (B.Sc.)** (2021–2024)\n   - **College**: Nigamananda Mahila Mahavidyalaya\n   - **CGPA**: 8.17\n\n4. **Higher Secondary (+2 Science)** (2019–2021)\n   - **School**: Regional Higher Secondary School\n   - **Board**: Council of Higher Secondary Education, Odisha (CHSE Odisha)\n\n5. **Secondary School Certificate (Class 10)** (2019)\n   - **School**: Trilochaneswar Nodal High School\n   - **Board**: Board of Secondary Education, Odisha (BSE Odisha)";
      }
      if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('linkedin') || q.includes('github')) {
        return "You can get in touch with Sagnika directly:\n- **Email**: [sagnikariana@gmail.com](mailto:sagnikariana@gmail.com)\n- **LinkedIn**: [linkedin.com/in/sagnika-bhol](https://www.linkedin.com/in/sagnika-bhol)\n- **GitHub**: [github.com/Sagnikabhol](https://github.com/Sagnikabhol)";
      }
      if (q.includes('experience') || q.includes('fresher') || q.includes('role') || q.includes('job')) {
        return "Sagnika is a qualified graduate with an **MCA (8.40 CGPA)** and **B.Sc. in Computer Science Honours (8.17 CGPA)**, currently undergoing **Python Full Stack Development training at KodNest**, and actively seeking **Associate Software Engineer / SDE** and **AI/ML** roles.";
      }
      return "Sagnika holds an MCA from C. V. Raman Global University (8.40 CGPA) and B.Sc. in Computer Science Honours from Nigamananda Mahila Mahavidyalaya (8.17 CGPA), currently training in Python Full Stack Development at KodNest. Feel free to ask about her skills, projects, or education!";
    };

    // If API key is missing, use intelligent local fallback
    if (!apiKey) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: getLocalFallbackAnswer(trimmed),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsLoading(false);
      }, 400);
      return;
    }

    try {
      // Build conversation turns starting strictly with user turn as required by Gemini API
      const conversationTurns = [];
      for (const msg of [...messages, userMessage]) {
        if (msg.id === 'welcome-msg') continue;
        if (msg.sender === 'user') {
          conversationTurns.push({
            role: 'user',
            parts: [{ text: msg.text }],
          });
        } else if (msg.sender === 'bot' && conversationTurns.length > 0) {
          conversationTurns.push({
            role: 'model',
            parts: [{ text: msg.text }],
          });
        }
      }

      if (conversationTurns.length === 0) {
        conversationTurns.push({
          role: 'user',
          parts: [{ text: trimmed }],
        });
      }

      // Candidate models in order of availability and responsiveness
      const candidateModels = [
        'gemini-3.1-flash-lite',
        'gemini-3.8-flash',
        'gemini-3.5-flash-lite',
        'gemini-flash-latest',
      ];

      let botResponseText = null;

      for (const modelName of candidateModels) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                systemInstruction: {
                  parts: [{ text: SYSTEM_PROMPT }],
                },
                contents: conversationTurns,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 600,
                },
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              botResponseText = text;
              break;
            }
          }
        } catch {
          // If this model fails, continue to next candidate
        }
      }

      // If all API models are temporarily unavailable or rate-limited, use local knowledge base
      if (!botResponseText) {
        botResponseText = getLocalFallbackAnswer(trimmed);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: getLocalFallbackAnswer(trimmed),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (question) => {
    handleSendMessage(question);
  };

  // Helper function to render text with basic markdown (bold, lists, newlines)
  const renderFormattedText = (content) => {
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
      const textToParse = isBullet ? line.trim().substring(2) : line;

      // Match **bold text**
      const segments = textToParse.split(/(\*\*.*?\*\*)/g);
      const parsedElements = segments.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="font-semibold text-violet-900 dark:text-violet-200">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={lineIdx} className="ml-4 list-disc text-inherit my-0.5">
            {parsedElements}
          </li>
        );
      }

      if (line.trim() === '') {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <p key={lineIdx} className="my-0.5 leading-relaxed">
          {parsedElements}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end select-text">
      {/* Chat Window */}
      <div
        className={`w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[520px] max-h-[82vh] mb-3 rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-violet-200/50 dark:border-violet-800/40 backdrop-blur-xl bg-white/95 dark:bg-zinc-900/95 transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto shadow-violet-500/10 dark:shadow-purple-950/40'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="AI Chatbot"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-4 py-3.5 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-base border border-white/30">
                🤖
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-violet-600 rounded-full" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-wide flex items-center gap-1.5 leading-tight">
                Chat with AI Assistant 🤖
              </h2>
              <p className="text-[11px] text-violet-200 font-medium">
                Sagnika Bhol&apos;s Portfolio
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Close Chat Window"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm bg-gradient-to-b from-violet-50/40 via-transparent to-purple-50/30 dark:from-zinc-950/30 dark:to-zinc-900/50 scroll-smooth">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              } transition-all duration-200 animate-fadeIn`}
            >
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm break-words ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-tr-xs'
                    : msg.isError
                    ? 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-tl-xs'
                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 rounded-tl-xs border border-gray-200/50 dark:border-zinc-700/60'
                }`}
              >
                {msg.sender === 'bot' ? renderFormattedText(msg.text) : msg.text}
              </div>
              <span className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start animate-fadeIn">
              <div className="px-4 py-3 rounded-2xl rounded-tl-xs bg-gray-100 dark:bg-zinc-800 border border-gray-200/50 dark:border-zinc-700/60 text-gray-500 dark:text-zinc-400 shadow-sm flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              </div>
              <span className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1 px-1">
                Thinking...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Buttons (Preset Questions) */}
        <div className="px-3 pt-2 pb-1 border-t border-gray-100 dark:border-zinc-800/80 bg-gray-50/70 dark:bg-zinc-900/60">
          <div className="text-[11px] font-medium text-gray-400 dark:text-zinc-500 mb-1.5 flex items-center gap-1">
            <span>✨ Suggestions:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {quickQuestions.map((question, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickAction(question)}
                disabled={isLoading}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-violet-100/70 hover:bg-violet-200 dark:bg-violet-950/60 dark:hover:bg-violet-900 text-violet-700 dark:text-violet-300 border border-violet-200/70 dark:border-violet-800/50 transition-all duration-150 whitespace-nowrap active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Field and Send Button */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about Sagnika's experience..."
            disabled={isLoading}
            className="flex-1 bg-gray-100/80 dark:bg-zinc-800/80 text-gray-800 dark:text-zinc-100 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-transparent focus:border-violet-400 dark:focus:border-violet-600 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all placeholder-gray-400 dark:placeholder-zinc-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md shadow-violet-500/25 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all focus:outline-none focus:ring-2 focus:ring-violet-400"
            aria-label="Send Message"
          >
            <svg
              className="w-4 h-4 transform rotate-45 -translate-y-0.5 translate-x-[-1px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>

      {/* Floating Chat Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open AI chat assistant'}
        aria-expanded={isOpen}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-xl shadow-violet-500/30 hover:shadow-violet-600/50 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-800"
      >
        {/* Pulsing attention ring (active when closed) */}
        {!isOpen && (
          <>
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 opacity-60 blur-sm animate-pulse pointer-events-none" />
            {!hasInteracted && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-violet-500 border-2 border-white dark:border-zinc-900" />
              </span>
            )}
          </>
        )}

        {/* Chat bubble icon / Close icon */}
        <div className="relative z-10 transition-transform duration-200">
          {isOpen ? (
            <svg
              className="w-6 h-6 transform rotate-0 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 transform transition-transform group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
