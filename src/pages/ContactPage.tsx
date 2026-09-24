import React, { useState } from 'react';
import {
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  Instagram,
  Twitter,
  Youtube,
  Radio,
  MapPin,
  Sparkles
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'General Feedback',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const topics = [
    'General Feedback',
    'Podcast Guest or Field Story Pitch',
    'Photography Print & Licensing',
    'Destination Tip or Correction',
    'Student Travel Collaboration'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message of at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      
      {/* Header */}
      <div className="space-y-4 max-w-2xl border-b border-[#EAE3D2] dark:border-[#223347] pb-8">
        <span className="text-xs font-mono tracking-widest uppercase text-[#E06D3B] font-semibold">
          GET IN TOUCH
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
          Say Hello or Pitch a Story
        </h1>
        <p className="text-base sm:text-lg text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed">
          Have a secret desert campsite, an ancient market recommendation, or feedback on a podcast episode? We read every note between travels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#142030] p-6 sm:p-8 rounded-2xl border border-[#EAE3D2] dark:border-[#223347] shadow-sm">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F1B2B] dark:text-white">
                Message Dispatched!
              </h3>
              <p className="text-sm text-[#4A5E78] dark:text-[#94A9C4] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, <strong className="text-[#0F1B2B] dark:text-white">{formData.name}</strong>. We will reply to <span className="text-[#E06D3B]">{formData.email}</span> as soon as we return from the field.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', topic: 'General Feedback', message: '' });
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0F1B2B] dark:bg-[#E06D3B] text-white"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[#4A5E78] dark:text-[#94A9C4]">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Layla Vance"
                  className={`w-full px-4 py-2.5 bg-[#FBF8F2] dark:bg-[#0F1B2B] text-sm rounded-lg border focus:outline-none transition-colors ${
                    errors.name
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-[#D8CEB9] dark:border-[#243954] focus:border-[#E06D3B]'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[#4A5E78] dark:text-[#94A9C4]">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-2.5 bg-[#FBF8F2] dark:bg-[#0F1B2B] text-sm rounded-lg border focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-[#D8CEB9] dark:border-[#243954] focus:border-[#E06D3B]'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
              </div>

              {/* Topic Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[#4A5E78] dark:text-[#94A9C4]">
                  Inquiry Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FBF8F2] dark:bg-[#0F1B2B] text-sm rounded-lg border border-[#D8CEB9] dark:border-[#243954] focus:outline-none focus:border-[#E06D3B] text-[#0F1B2B] dark:text-white"
                >
                  {topics.map((t) => (
                    <option key={t} value={t} className="bg-white dark:bg-[#142030]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[#4A5E78] dark:text-[#94A9C4]">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  className={`w-full px-4 py-2.5 bg-[#FBF8F2] dark:bg-[#0F1B2B] text-sm rounded-lg border focus:outline-none transition-colors ${
                    errors.message
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-[#D8CEB9] dark:border-[#243954] focus:border-[#E06D3B]'
                  }`}
                />
                {errors.message && <p className="text-xs text-rose-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#E06D3B] hover:bg-[#C75525] text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Send Dispatch</span>
              </button>

            </form>
          )}
        </div>

        {/* Sidebar: Socials & FAQ */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Channels */}
          <div className="p-6 rounded-2xl bg-[#F4EFE6] dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0F1B2B] dark:text-white">
              Connect Across the Web
            </h3>

            <div className="space-y-3 text-sm">
              <a
                href="mailto:contact@wanderandtalk.fm"
                className="flex items-center gap-3 text-[#4A5E78] dark:text-[#94A9C4] hover:text-[#E06D3B] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#E06D3B]" />
                <span>contact@wanderandtalk.fm</span>
              </a>

              <div className="flex items-center gap-3 text-[#4A5E78] dark:text-[#94A9C4]">
                <MapPin className="w-4 h-4 text-[#2B6E70] dark:text-[#39888B]" />
                <span>University City, Sharjah, UAE</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D8CEB9] dark:border-[#223347] flex items-center gap-3">
              <a
                href="#instagram"
                className="p-2 bg-white dark:bg-[#18283E] text-[#0F1B2B] dark:text-white hover:text-[#E06D3B] rounded-lg border border-[#EAE3D2] dark:border-[#243954] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="p-2 bg-white dark:bg-[#18283E] text-[#0F1B2B] dark:text-white hover:text-[#E06D3B] rounded-lg border border-[#EAE3D2] dark:border-[#243954] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="p-2 bg-white dark:bg-[#18283E] text-[#0F1B2B] dark:text-white hover:text-[#E06D3B] rounded-lg border border-[#EAE3D2] dark:border-[#243954] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#podcast"
                onClick={() => onNavigate('podcast')}
                className="p-2 bg-white dark:bg-[#18283E] text-[#0F1B2B] dark:text-white hover:text-[#E06D3B] rounded-lg border border-[#EAE3D2] dark:border-[#243954] transition-colors"
                aria-label="Podcast"
              >
                <Radio className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* FAQ snippet */}
          <div className="p-6 rounded-2xl bg-[#F4EFE6] dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#0F1B2B] dark:text-white">
              Can I use your field recordings?
            </h4>
            <p className="text-xs text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed">
              All audio recorded on Wander &amp; Talk is licensed under Creative Commons (CC-BY-NC 4.0) for educational and non-commercial creators. Just mention the podcast!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
