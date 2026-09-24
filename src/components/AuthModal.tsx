import React, { useState } from 'react';
import { X, Mail, Lock, User, CheckCircle2, Bookmark, Headphones, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  onNavigateToProfile?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onNavigateToProfile }) => {
  const {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    authModalOpen,
    closeAuthModal,
    authModalMode,
    openAuthModal,
    favorites,
    subscriptions
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>(authModalMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sync mode with context
  React.useEffect(() => {
    setMode(authModalMode);
    setError('');
    setSuccessMsg('');
  }, [authModalMode, authModalOpen]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'signup' && !name) {
      setError('Please enter your name.');
      return;
    }

    try {
      if (mode === 'signup') {
        await signup(name, email, password);
        setSuccessMsg('Account created successfully! Welcome to Wander & Talk.');
      } else {
        await login(email, password);
        setSuccessMsg('Signed in successfully!');
      }
      setTimeout(() => {
        closeAuthModal();
      }, 800);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed. Please try again.';
      setError(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#FBF8F2] dark:bg-[#0D1520] rounded-2xl border border-[#EAE3D2] dark:border-[#223347] shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#6B85A6] hover:text-[#0F1B2B] dark:hover:text-white hover:bg-[#EAE3D2] dark:hover:bg-[#1C2D42] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isAuthenticated && user ? (
          /* Logged-In Profile Summary in Modal */
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || '/src/assets/images/creator_portrait_1790236082709.jpg'}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#E06D3B]"
              />
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0F1B2B] dark:text-white">
                  {user.name}
                </h3>
                <p className="text-xs text-[#6B85A6] dark:text-[#94A9C4]">{user.email}</p>
                <span className="text-[11px] font-mono text-[#E06D3B]">{user.joinedDate}</span>
              </div>
            </div>

            {/* Account Quick Stats */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#EAE3D2] dark:border-[#223347]">
              <div className="p-3 bg-white dark:bg-[#18283E] rounded-xl border border-[#EAE3D2] dark:border-[#243954] flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-[#E06D3B]" />
                <div>
                  <div className="text-base font-bold text-[#0F1B2B] dark:text-white">
                    {favorites.length}
                  </div>
                  <div className="text-[11px] text-[#6B85A6]">Saved Stories</div>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#18283E] rounded-xl border border-[#EAE3D2] dark:border-[#243954] flex items-center gap-3">
                <Headphones className="w-5 h-5 text-[#2B6E70] dark:text-[#39888B]" />
                <div>
                  <div className="text-base font-bold text-[#0F1B2B] dark:text-white">
                    {subscriptions.length}
                  </div>
                  <div className="text-[11px] text-[#6B85A6]">Episodes Saved</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {onNavigateToProfile && (
                <button
                  onClick={() => {
                    closeAuthModal();
                    onNavigateToProfile();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-[#2B6E70] dark:text-[#39888B] hover:underline"
                >
                  View Full Profile →
                </button>
              )}

              <button
                onClick={() => {
                  logout();
                  closeAuthModal();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors ml-auto"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login / Signup Form */
          <div className="space-y-5">
            <div className="text-center space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#E06D3B] font-bold">
                WANDER &amp; TALK CLUB
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0F1B2B] dark:text-white">
                {mode === 'login' ? 'Welcome Back Traveler' : 'Join Our Travel Community'}
              </h3>
              <p className="text-xs text-[#4A5E78] dark:text-[#94A9C4]">
                {mode === 'login'
                  ? 'Access your saved stories, field notes, and podcast playlists.'
                  : 'Bookmark stories, sync podcast favorites, and receive dispatch letters.'}
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex bg-[#EAE3D2] dark:bg-[#18283E] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-white dark:bg-[#0D1520] text-[#0F1B2B] dark:text-white shadow-xs'
                    : 'text-[#6B85A6] hover:text-[#0F1B2B] dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-[#0D1520] text-[#0F1B2B] dark:text-white shadow-xs'
                    : 'text-[#6B85A6] hover:text-[#0F1B2B] dark:hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="p-3 text-xs bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 rounded-xl border border-rose-200 dark:border-rose-900">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="p-3 text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#6B85A6] block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B85A6]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Al-Mansoor"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#18283E] rounded-xl border border-[#D8CEB9] dark:border-[#223347] focus:outline-none focus:border-[#E06D3B] text-[#0F1B2B] dark:text-white"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#6B85A6] block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B85A6]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="traveler@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#18283E] rounded-xl border border-[#D8CEB9] dark:border-[#223347] focus:outline-none focus:border-[#E06D3B] text-[#0F1B2B] dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#6B85A6] block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B85A6]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#18283E] rounded-xl border border-[#D8CEB9] dark:border-[#223347] focus:outline-none focus:border-[#E06D3B] text-[#0F1B2B] dark:text-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0F1B2B] dark:bg-[#E06D3B] hover:bg-[#1C2D42] dark:hover:bg-[#C75525] text-white font-semibold text-sm rounded-xl transition-all shadow-md active:scale-98"
              >
                {mode === 'login' ? 'Sign In to Account' : 'Create Free Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
