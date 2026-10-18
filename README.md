# 🚀 Sagnika Bhol — Developer Portfolio

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.0_Flash-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://aistudio.google.com/)

A modern, high-performance, and responsive developer portfolio showcasing software engineering projects, artificial intelligence / machine learning implementations, core computer science credentials, and technical skills. Built with **React 19**, **Vite**, **Tailwind CSS v4**, and an embedded conversational **AI Assistant** powered by **Google Gemini 2.0 Flash**.

---

## 🌟 Key Features

- **⚡ Modern Glassmorphic Design**: Sleek purple/violet aesthetic with backdrop blur effects, responsive fluid typography, and ambient gradient glows.
- **✨ Hero Section with Typewriter Effect**: Dynamic headline cycling through target roles (*Associate Software Engineer, Software Engineer, AI/ML Engineer, Python & Java Developer, Full-Stack Developer*) alongside quick social links and resume access.
- **📊 About Me & Animated Metrics**: Academic journey and core values featuring scroll-triggered counting animations (MCA CGPA: **8.40**, 15+ Core Technologies, Computer Science Foundations).
- **🛠️ Categorized Tech Stack**: Interactive skill matrix spanning 6 domains (*Core Languages, AI / Machine Learning, Data & Analytics, Tools & Platforms, Web Development, Databases*) with tag filters and animated skill pills.
- **🎓 Education & Professional Training Timeline**: Alternating vertical timeline highlighting:
  - **KodNest**: Python Full Stack Development Training (*In Progress*)
  - **C. V. Raman Global University**: Master of Computer Applications (MCA) — **8.40 CGPA** (*2024–2026*)
  - **Nigamananda Mahila Mahavidyalaya**: B.Sc. in Computer Science Honours — **8.17 CGPA** (*2021–2024*)
  - **Regional Higher Secondary School**: Higher Secondary (+2 Science), CHSE Odisha (*2019–2021*)
  - **Trilochaneswar Nodal High School**: Secondary Education (Class 10), BSE Odisha (*2019*)
- **💼 Dynamic Projects Showcase**:
  - Live repository synchronization via the **GitHub REST API** with curated offline fallback data.
  - Interactive category filtering (*All, Featured, Python, AI/ML*).
  - GitHub stars and forks counters with direct repository and live demo links.
- **🤖 Gemini-Powered AI Chatbot**:
  - Floating, interactive conversational assistant powered by the **Google Gemini 2.0 Flash API**.
  - Contextual knowledge of Sagnika's academic credentials, technical skills, projects, and contact info.
  - Features quick-prompt starter chips, responsive chat modal, and graceful fallback handling.
- **📬 Interactive Contact Section**: Direct communication via contact form with mailto generation, one-click email clipboard copy, and verified social profiles.
- **🌓 Persistent Dark / Light Mode**: Instant theme switching with automatic `localStorage` persistence and system preference detection.

---

## 🛠️ Tech Stack & Architecture

### Core Technologies
- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool & Bundler**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **Linter**: [Oxlint](https://oxc.rs/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/) (`gemini-2.0-flash`)

### Featured Engineering Skills
- **Languages**: Python, Java, SQL, JavaScript, HTML5/CSS3
- **AI & Machine Learning**: TensorFlow, Keras, PyTorch, OpenCV, Scikit-learn, MobileNetV2
- **Data & Analytics**: Pandas, NumPy, Matplotlib, Plotly, Streamlit
- **Web & Backend**: React, Tailwind CSS, REST APIs, Java Servlets, JSP, JDBC
- **Databases**: MySQL, MongoDB, SQLite
- **Tools & Platforms**: Git, GitHub, VS Code, Jupyter Notebook, Docker, Linux

---

## 📂 Featured Projects

| Project | Description | Tech Stack | Repository |
| :--- | :--- | :--- | :--- |
| **Riosa Voice AI** | Intelligent personal voice assistant capable of natural language commands and speech interaction. | Python, Speech Recognition, AI, NLP | [GitHub](https://github.com/Sagnikabhol/Riosa-Voice-AI) |
| **Face Emotion Recognition** | Real-time facial emotion detection and classification system running on live webcam feeds. | Python, TensorFlow, Keras, OpenCV | [GitHub](https://github.com/Sagnikabhol/Face-Emotion-Recognition) |
| **Sales Analytics Dashboard** | High-performance interactive dashboard visualising commercial metrics with dynamic filters. | Python, Pandas, Plotly, Streamlit | [GitHub](https://github.com/Sagnikabhol/Sales-Analytics-Dashboard) |
| **Vaccination Management System** | Healthcare web application for tracking immunization schedules and appointment bookings. | Java, JSP, MySQL, JDBC, Tomcat | [GitHub](https://github.com/Sagnikabhol/Vaccination-Management-System) |
| **Food-101 Image Classification** | Computer vision image classifier utilizing transfer learning with MobileNetV2 to classify 101 food categories. | Python, TensorFlow, Keras, MobileNetV2 | [GitHub](https://github.com/Sagnikabhol/Food-101-Image-Classification) |

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js) or another package manager (yarn / pnpm)
- [Git](https://git-scm.com/)
- *(Optional)* [Google Gemini API Key](https://aistudio.google.com/apikey) for the AI Chatbot assistant

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sagnikabhol/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional for AI Chatbot):**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   > **Note:** If no API key is configured, the chatbot will display a prompt guiding visitors or fallback safely without interrupting navigation.

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local URL (typically `http://localhost:5173/`).

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and optimizes assets into the `dist/` directory for production. |
| `npm run preview` | Locally serves the production build from `dist/` for verification. |
| `npm run lint` | Runs [Oxlint](https://oxc.rs/) to check code quality and catch errors quickly. |

---

## 📁 Project Structure

```text
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Images, SVGs, and resume PDF
│   ├── components/         # Modular React UI components
│   │   ├── About.jsx       # Bio, animated metrics, and core focus areas
│   │   ├── AIChatbot.jsx   # Gemini 2.0 Flash AI conversational assistant
│   │   ├── Contact.jsx     # Contact form, email clipboard copy, and socials
│   │   ├── Experience.jsx  # Education & Training vertical timeline
│   │   ├── Footer.jsx      # Footer with wave SVG and copyright
│   │   ├── Hero.jsx        # Typewriter role intro, bio, and CTAs
│   │   ├── Navbar.jsx      # Sticky navbar with theme toggle and mobile menu
│   │   ├── Projects.jsx    # Project cards with GitHub API sync and filter tabs
│   │   └── TechStack.jsx   # Categorized interactive technical skill grid
│   ├── App.css             # Component and layout styles
│   ├── App.jsx             # Main application component & theme management
│   ├── index.css           # Tailwind CSS imports and utility layer
│   └── main.jsx            # Application entry point
├── .env.example            # Environment variables template
├── .oxlintrc.json          # Oxlint configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## 📬 Contact & Connect

- **Author**: Sagnika Bhol
- **GitHub**: [@Sagnikabhol](https://github.com/Sagnikabhol)
- **LinkedIn**: [Sagnika Bhol](https://www.linkedin.com/in/sagnikabhol/)
- **Email**: [sagnikariana@gmail.com](mailto:sagnikariana@gmail.com)
