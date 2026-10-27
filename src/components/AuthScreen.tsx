import React, { useState } from 'react';
import { ArrowRight, Lock, Sparkles, Check, FileText, UserPlus, LogIn, User, Mail, Shield } from 'lucide-react';
import { UserSession } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: UserSession) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, isDarkMode }) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupIdentifier, setSignupIdentifier] = useState('');
  const [signupRole, setSignupRole] = useState('Event Organizer');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Quick 1-click default organizer login
  const handleOrganizerContinue = () => {
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      const session: UserSession = {
        username: 'organizer',
        role: 'Workspace Lead & Organizer',
        name: 'Elena Vance',
        token: 'pe-org-' + Math.random().toString(36).substring(2, 9),
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem('pulseevent_session', JSON.stringify(session));
      onLoginSuccess(session);
    }, 250);
  };

  // Handle Login form
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const norm = loginIdentifier.trim().toLowerCase();

      // Check registered users in localStorage
      let registeredUsers: any[] = [];
      try {
        const stored = localStorage.getItem('pulseevent_registered_users');
        if (stored) registeredUsers = JSON.parse(stored);
      } catch (e) {
        registeredUsers = [];
      }

      const matchedUser = registeredUsers.find(
        (u) => (u.username.toLowerCase() === norm || u.email?.toLowerCase() === norm) && u.password === loginPassword
      );

      if (matchedUser) {
        const session: UserSession = {
          username: matchedUser.username,
          role: matchedUser.role || 'Event Organizer',
          name: matchedUser.name || matchedUser.username,
          token: 'pe-usr-' + Math.random().toString(36).substring(2, 9),
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem('pulseevent_session', JSON.stringify(session));
        onLoginSuccess(session);
        return;
      }

      // Default organizer credentials or standard valid password
      if ((norm === 'organizer' && loginPassword === 'password') || (norm.length >= 2 && loginPassword.length >= 3)) {
        const session: UserSession = {
          username: norm || 'organizer',
          role: 'Workspace Lead & Organizer',
          name: norm === 'organizer' ? 'Elena Vance' : loginIdentifier.trim(),
          token: 'pe-usr-' + Math.random().toString(36).substring(2, 9),
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem('pulseevent_session', JSON.stringify(session));
        onLoginSuccess(session);
      } else {
        setErrorMessage('Invalid credentials. Check your details or click "Continue as Organizer".');
        setIsLoading(false);
      }
    }, 300);
  };

  // Handle Signup form
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!signupName.trim() || !signupIdentifier.trim()) {
      setErrorMessage('Please fill in your name and email/username.');
      return;
    }

    if (signupPassword.length < 4) {
      setErrorMessage('Password should be at least 4 characters long.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Save new user to localStorage
      try {
        const stored = localStorage.getItem('pulseevent_registered_users');
        const users = stored ? JSON.parse(stored) : [];

        const existing = users.find(
          (u: any) => u.username.toLowerCase() === signupIdentifier.trim().toLowerCase()
        );
        if (existing) {
          setErrorMessage('An account with this email/username already exists. Please sign in.');
          setIsLoading(false);
          return;
        }

        const newUser = {
          name: signupName.trim(),
          username: signupIdentifier.trim(),
          role: signupRole,
          password: signupPassword,
          createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem('pulseevent_registered_users', JSON.stringify(users));

        // Auto login newly registered user
        const session: UserSession = {
          username: newUser.username,
          role: newUser.role,
          name: newUser.name,
          token: 'pe-reg-' + Math.random().toString(36).substring(2, 9),
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem('pulseevent_session', JSON.stringify(session));
        onLoginSuccess(session);
      } catch (err) {
        console.error('Signup error:', err);
        setErrorMessage('Could not complete registration. Please try again.');
        setIsLoading(false);
      }
    }, 350);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between transition-colors duration-150 ${
        isDarkMode ? 'bg-[#191919] text-[#e6e6e6]' : 'bg-[#ffffff] text-[#37352f]'
      }`}
    >
      {/* Top minimal header */}
      <header className="w-full max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded flex items-center justify-center font-bold text-sm shadow-xs ${
              isDarkMode
                ? 'bg-[#262626] border border-[#333333] text-[#ffffff]'
                : 'bg-[#f7f6f3] border border-[#e9e9e7] text-[#37352f]'
            }`}
          >
            ⚡
          </div>
          <span className="text-sm font-semibold tracking-tight">PulseEvent Workspace</span>
        </div>

        <div className="flex items-center gap-2 text-xs opacity-60 font-mono">
          <span>Gemma 4 Gateway</span>
          <span>&bull;</span>
          <span className="text-emerald-500 font-semibold">Active</span>
        </div>
      </header>

      {/* Center Notion-Style Auth Card */}
      <main className="w-full max-w-[400px] mx-auto px-6 py-8 flex-1 flex flex-col justify-center">
        <div>
          {/* Workspace Icon */}
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-4 shadow-xs ${
              isDarkMode
                ? 'bg-[#222222] border border-[#303030]'
                : 'bg-[#fbfbfa] border border-[#e9e9e7]'
            }`}
          >
            ⚡
          </div>

          <h1 className="text-xl font-bold tracking-tight mb-1">PulseEvent Engine</h1>
          <p className="text-xs opacity-70 leading-relaxed mb-5">
            Instant Multimodal Event Reporter & Asset Vault
          </p>

          {/* Notion Segmented Tab: Sign In vs Sign Up */}
          <div
            className={`flex items-center p-1 rounded-md border text-xs mb-5 ${
              isDarkMode ? 'bg-[#1e1e1e] border-[#2d2d2d]' : 'bg-[#f7f6f3] border-[#e9e9e7]'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-1.5 px-3 rounded font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'login'
                  ? isDarkMode
                    ? 'bg-[#2b2b2b] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#37352f] shadow-xs'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage('');
              }}
              className={`flex-1 py-1.5 px-3 rounded font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'signup'
                  ? isDarkMode
                    ? 'bg-[#2b2b2b] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#37352f] shadow-xs'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {/* MODE 1: LOGIN */}
          {authMode === 'login' && (
            <div>
              {/* Primary Action: Continue as Organizer */}
              <button
                type="button"
                onClick={handleOrganizerContinue}
                disabled={isLoading}
                className={`w-full py-2.5 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 ${
                  isDarkMode
                    ? 'bg-[#ffffff] text-[#191919] hover:bg-[#e6e6e6]'
                    : 'bg-[#2383e2] text-[#ffffff] hover:bg-[#1d6fc2]'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Entering Workspace...</span>
                  </span>
                ) : (
                  <>
                    <span>Continue as Organizer</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-5 flex items-center justify-center">
                <div
                  className={`w-full border-t ${
                    isDarkMode ? 'border-[#2d2d2d]' : 'border-[#e9e9e7]'
                  }`}
                />
                <span
                  className={`relative px-3 text-[11px] uppercase tracking-wider font-medium ${
                    isDarkMode ? 'bg-[#191919] text-[#777777]' : 'bg-[#ffffff] text-[#9b9b9b]'
                  }`}
                >
                  or sign in with password
                </span>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium opacity-80 mb-1">Email or username</label>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="organizer"
                    required
                    className={`w-full px-3 py-2 text-sm rounded-md border outline-none transition-all ${
                      isDarkMode
                        ? 'bg-[#222222] border-[#333333] text-[#ffffff] placeholder-[#666666] focus:border-[#555555]'
                        : 'bg-[#fbfbfa] border-[#e9e9e7] text-[#37352f] placeholder-[#a0a09e] focus:border-[#2383e2] focus:bg-[#ffffff]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-80 mb-1">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className={`w-full px-3 py-2 text-sm rounded-md border outline-none transition-all ${
                      isDarkMode
                        ? 'bg-[#222222] border-[#333333] text-[#ffffff] placeholder-[#666666] focus:border-[#555555]'
                        : 'bg-[#fbfbfa] border-[#e9e9e7] text-[#37352f] placeholder-[#a0a09e] focus:border-[#2383e2] focus:bg-[#ffffff]'
                    }`}
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-500 bg-rose-500/10 border border-rose-500/20 p-2 rounded">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2 px-3 text-xs font-medium rounded-md border transition-colors cursor-pointer disabled:opacity-50 ${
                    isDarkMode
                      ? 'bg-[#262626] border-[#333333] text-[#e6e6e6] hover:bg-[#303030]'
                      : 'bg-[#f7f6f3] border-[#e0dfdc] text-[#37352f] hover:bg-[#eae8e4]'
                  }`}
                >
                  {isLoading ? 'Verifying...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrorMessage('');
                  }}
                  className="text-xs opacity-70 hover:opacity-100 hover:underline cursor-pointer"
                >
                  Don't have an account? <span className="font-semibold text-cyan-500">Sign Up</span>
                </button>
              </div>
            </div>
          )}

          {/* MODE 2: SIGN UP */}
          {authMode === 'signup' && (
            <div>
              <form onSubmit={handleSignupSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium opacity-80 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Elena Vance"
                    required
                    className={`w-full px-3 py-1.5 text-sm rounded-md border outline-none transition-all ${
                      isDarkMode
                        ? 'bg-[#222222] border-[#333333] text-[#ffffff] placeholder-[#666666] focus:border-[#555555]'
                        : 'bg-[#fbfbfa] border-[#e9e9e7] text-[#37352f] placeholder-[#a0a09e] focus:border-[#2383e2] focus:bg-[#ffffff]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-80 mb-1">Email or Username</label>
                  <input
                    type="text"
                    value={signupIdentifier}
                    onChange={(e) => setSignupIdentifier(e.target.value)}
                    placeholder="organizer@event.org"
                    required
                    className={`w-full px-3 py-1.5 text-sm rounded-md border outline-none transition-all ${
                      isDarkMode
                        ? 'bg-[#222222] border-[#333333] text-[#ffffff] placeholder-[#666666] focus:border-[#555555]'
                        : 'bg-[#fbfbfa] border-[#e9e9e7] text-[#37352f] placeholder-[#a0a09e] focus:border-[#2383e2] focus:bg-[#ffffff]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-80 mb-1">Organizer Role</label>
                  <select
                    value={signupRole}
                    onChange={(e) => setSignupRole(e.target.value)}
                    className={`w-full px-3 py-1.5 text-xs rounded-md border outline-none cursor-pointer transition-all ${
                      isDarkMode
                        ? 'bg-[#222222] border-[#333333] text-[#ffffff] focus:border-[#555555]'
                        : 'bg-[#fbfbfa] border-[#e9e9e7] text-[#37352f] focus:border-[#2383e2]'
                    }`}
                  >
                    <option value="Event Organizer">Event Organizer & Producer</option>
                    <option value="Press & Media Lead">Press & Media Lead</option>
                    <option value="Developer Advocate">Developer Advocate (DevRel)</option>
                    <option value="Academic Chair">Academic / Symposium Chair</option>
                    <option value="Community Lead">Community & NGO Coordinator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-80 mb-1">Password</label>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="At least 4 characters"
                    required
                    className={`w-full px-3 py-1.5 text-sm rounded-md border outline-none transition-all ${
                      isDarkMode
                        ? 'bg-[#222222] border-[#333333] text-[#ffffff] placeholder-[#666666] focus:border-[#555555]'
                        : 'bg-[#fbfbfa] border-[#e9e9e7] text-[#37352f] placeholder-[#a0a09e] focus:border-[#2383e2] focus:bg-[#ffffff]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-80 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    required
                    className={`w-full px-3 py-1.5 text-sm rounded-md border outline-none transition-all ${
                      isDarkMode
                        ? 'bg-[#222222] border-[#333333] text-[#ffffff] placeholder-[#666666] focus:border-[#555555]'
                        : 'bg-[#fbfbfa] border-[#e9e9e7] text-[#37352f] placeholder-[#a0a09e] focus:border-[#2383e2] focus:bg-[#ffffff]'
                    }`}
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-500 bg-rose-500/10 border border-rose-500/20 p-2 rounded">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full mt-2 py-2.5 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 ${
                    isDarkMode
                      ? 'bg-[#ffffff] text-[#191919] hover:bg-[#e6e6e6]'
                      : 'bg-[#2383e2] text-[#ffffff] hover:bg-[#1d6fc2]'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </span>
                  ) : (
                    <>
                      <span>Create Account & Enter</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMessage('');
                  }}
                  className="text-xs opacity-70 hover:opacity-100 hover:underline cursor-pointer"
                >
                  Already have an account? <span className="font-semibold text-cyan-500">Sign In</span>
                </button>
              </div>
            </div>
          )}

          {/* Minimal Notion Callout for Zero-Demo Policy */}
          <div
            className={`mt-6 p-3 rounded-md border text-xs leading-relaxed flex items-start gap-2.5 ${
              isDarkMode
                ? 'bg-[#202020] border-[#2e2e2e] text-[#9b9b9b]'
                : 'bg-[#fbfbfa] border-[#eae9e6] text-[#787774]'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0 mt-0.5 opacity-70" />
            <div>
              <span className="font-semibold text-current opacity-90 block mb-0.5">
                Zero Demo Data Workspace
              </span>
              <span>
                All asset vaults and press tables initialize completely empty until you ingest your first live capture.
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full max-w-4xl mx-auto px-6 py-5 flex items-center justify-between text-xs opacity-50">
        <span>PulseEvent Engine &bull; Notion Design System</span>
        <span>Open-Source (MIT)</span>
      </footer>
    </div>
  );
};
