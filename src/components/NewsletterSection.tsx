import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const NewsletterSection: React.FC = () => {
  const { subscribeNewsletter, newsletterEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(!!newsletterEmail);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    subscribeNewsletter(email);
    setSubmitted(true);
  };

  return (
    <section className="rounded-2xl bg-gradient-to-br from-[#18283E] to-[#0F1B2B] text-white p-8 sm:p-12 border border-[#243954] shadow-lg relative overflow-hidden">
      {/* Subtle background circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E06D3B]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2B6E70]/15 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E9865A] bg-[#243954]/60 px-3 py-1 rounded-full border border-[#E06D3B]/20">
          <Sparkles className="w-3 h-3 text-[#E06D3B]" />
          <span>Fortnightly Field Dispatch</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
          Join 8,400+ curious travelers &amp; audio listeners
        </h2>

        <p className="text-sm sm:text-base text-[#B8C8DB] leading-relaxed">
          Every other Sunday, receive raw field recordings, secret map coordinates, photography notes, and unfiltered overland stories straight to your inbox. No spam, ever.
        </p>

        {submitted ? (
          <div className="p-4 bg-[#142D33] border border-[#2B6E70] rounded-xl flex items-center justify-center gap-3 text-emerald-300 animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span className="text-sm font-medium">
              You&apos;re on the list! Check your inbox for the Mleiha sunrise soundscape pack.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2 pt-2">
            <div className="flex flex-col sm:flex-row gap-2.5 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B85A6]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 bg-[#142030] text-white placeholder-[#6B85A6] border border-[#243954] rounded-lg text-sm focus:outline-none focus:border-[#E06D3B] focus:ring-1 focus:ring-[#E06D3B] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#E06D3B] hover:bg-[#C75525] text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shrink-0 shadow-sm"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <p className="text-xs text-rose-400 font-medium text-center">{error}</p>
            )}

            <p className="text-[11px] text-[#6B85A6] pt-1">
              Unsubscribe anytime with 1-click. We respect your attention.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
