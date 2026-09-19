import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Youtube,
  Send,
  Copy,
  Check,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [inquiryType, setInquiryType] = useState('Full-Time Role');
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${inquiryType}] Connecting with Peeyush Kant Misra from ${senderOrg || 'Recruiting'}`);
    const body = encodeURIComponent(`Hi Peeyush,\n\nMy name is ${senderName}${senderOrg ? ` from ${senderOrg}` : ''}.\n\nMessage:\n${senderMessage}\n\nLooking forward to speaking with you!`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details & Availability */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
                <Mail className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </div>
              <h2
                id="contact-section-title"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
              >
                Let’s Discuss Data Science & Engineering
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Currently open to full-time Data Scientist, Machine Learning Engineer, and curriculum/teaching opportunities globally and remotely.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              {/* Email Card */}
              <div
                id="contact-email-card"
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Direct Email</div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                  className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div
                id="contact-phone-card"
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Mobile / WhatsApp</div>
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-600 transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                  className="p-2 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Channels Row */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center group hover:border-blue-500 transition-all shadow-xs"
                >
                  <Linkedin className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1.5">
                    LinkedIn
                  </span>
                </a>

                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center group hover:border-slate-900 dark:hover:border-white transition-all shadow-xs"
                >
                  <Github className="w-5 h-5 text-slate-800 dark:text-white group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1.5">
                    GitHub
                  </span>
                </a>

                <a
                  href={personalInfo.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center group hover:border-red-500 transition-all shadow-xs"
                >
                  <Youtube className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1.5">
                    YouTube
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Recruiter Message Builder */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Direct Recruiter & Collaborative Outreach
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Generate a tailored inquiry directly to Peeyush’s inbox with one click.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Opportunity Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Full-Time Role', 'Curriculum / Teaching', 'General Discussion'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInquiryType(type)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                        inquiryType === type
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Sarah Jenkins"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company or Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Tech Corp / University"
                    value={senderOrg}
                    onChange={(e) => setSenderOrg(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message / Role Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="We are impressed by your ML background and 25% error reduction at Cognizant. Would love to discuss our Senior Data Scientist position..."
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                id="contact-send-btn"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Email to Peeyush</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs text-center font-medium">
                  Opening your default email client with the customized inquiry!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
