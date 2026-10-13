import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = 'sagnikabhol@gmail.com';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare mailto link with encoded subject and body
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    // Emulate sending / opening mail client
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset submitted notification after 6 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    }, 600);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard?.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2500);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 dark:bg-violet-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-fuchsia-600/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200/80 dark:border-purple-700/50 mb-3 shadow-sm">
          {/* Chat Bubble Icon */}
          <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0h-2v2h2V9z"
              clipRule="evenodd"
            />
          </svg>
          Let's Talk
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Get In <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Touch</span>
        </h2>

        {/* Gradient Underline */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          <div className="h-1 w-10 bg-gradient-to-r from-transparent to-violet-500 rounded-full" />
          <div className="h-1.5 w-16 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 rounded-full shadow-sm shadow-purple-500/50" />
          <div className="h-1 w-10 bg-gradient-to-r from-fuchsia-500 to-transparent rounded-full" />
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Have a project in mind or want to collaborate? Let's connect!
        </p>
      </div>

      {/* Main Card-Based Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Information & Large Social Buttons (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card: Direct Contact Overview */}
          <div className="rounded-3xl p-6 sm:p-8 backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-purple-100/90 dark:border-purple-900/40 shadow-xl relative overflow-hidden">
            {/* Gradient accent strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Let's create something extraordinary
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              I am open to machine learning engineering opportunities, full-stack development, research collaborations, and freelance projects. Reach out via email or connect through social channels!
            </p>

            {/* Email Contact Box with Quick Copy */}
            <div className="mt-6 p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={copyEmailToClipboard}
                title="Copy email to clipboard"
                className="self-end sm:self-center px-3 py-1.5 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-300 bg-white dark:bg-zinc-800 border border-purple-200 dark:border-purple-700/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                {copiedEmail ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Status Pill */}
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Available for new projects & collaborations</span>
            </div>
          </div>

          {/* Large Social Icon Buttons */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
              Connect Across Platforms
            </h4>

            {/* LinkedIn Button */}
            <a
              href="https://www.linkedin.com/in/sagnikabhol/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-purple-100/90 dark:border-purple-900/40 hover:border-purple-400 dark:hover:border-purple-500 shadow-md hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    LinkedIn
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    linkedin.com/in/sagnikabhol
                  </p>
                </div>
              </div>

              <div className="text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/Sagnikabhol"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-purple-100/90 dark:border-purple-900/40 hover:border-purple-400 dark:hover:border-purple-500 shadow-md hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-slate-900 dark:bg-zinc-800 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    GitHub
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    github.com/Sagnikabhol
                  </p>
                </div>
              </div>

              <div className="text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form with Animated Focus States (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl p-6 sm:p-8 sm:py-10 backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-purple-100/90 dark:border-purple-900/40 shadow-xl relative overflow-hidden">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Send a Message
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Fill in the form below to directly start a conversation.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
                <div className="p-1 rounded-full bg-emerald-500 text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm">
                  <strong className="font-semibold">Ready to send!</strong> Opening your email client with your message prepared.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                >
                  Your Name <span className="text-purple-600">*</span>
                </label>
                {/* Animated gradient border on focus container */}
                <div className="relative group rounded-xl p-[1px] bg-slate-200 dark:bg-zinc-800 focus-within:bg-gradient-to-r focus-within:from-violet-500 focus-within:via-purple-500 focus-within:to-fuchsia-500 transition-all duration-300 shadow-2xs">
                  <div className="flex items-center rounded-xl bg-white dark:bg-zinc-900/90 px-3.5 py-2.5">
                    <svg className="w-4 h-4 text-slate-400 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors mr-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Sagnika Bhol"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                >
                  Your Email <span className="text-purple-600">*</span>
                </label>
                {/* Animated gradient border on focus container */}
                <div className="relative group rounded-xl p-[1px] bg-slate-200 dark:bg-zinc-800 focus-within:bg-gradient-to-r focus-within:from-violet-500 focus-within:via-purple-500 focus-within:to-fuchsia-500 transition-all duration-300 shadow-2xs">
                  <div className="flex items-center rounded-xl bg-white dark:bg-zinc-900/90 px-3.5 py-2.5">
                    <svg className="w-4 h-4 text-slate-400 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors mr-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                >
                  Your Message <span className="text-purple-600">*</span>
                </label>
                {/* Animated gradient border on focus container */}
                <div className="relative group rounded-xl p-[1px] bg-slate-200 dark:bg-zinc-800 focus-within:bg-gradient-to-r focus-within:from-violet-500 focus-within:via-purple-500 focus-within:to-fuchsia-500 transition-all duration-300 shadow-2xs">
                  <div className="rounded-xl bg-white dark:bg-zinc-900/90 p-3.5">
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell me about your project, idea, or questions..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Composing Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
                🔒 Your message is handled securely and opened directly in your email client.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
