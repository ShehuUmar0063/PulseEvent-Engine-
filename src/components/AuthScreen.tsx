import React, { useState } from 'react';
import { ArrowRight, Lock, Sparkles, Check, FileText } from 'lucide-react';
import { UserSession } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: UserSession) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, isDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOrganizerContinue = () => {
    setIsLoading(true);
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const norm = username.trim().toLowerCase();
      if ((norm === 'organizer' && password === 'password') || (norm.length >= 2 && password.length >= 3)) {
        const session: UserSession = {
          username: norm || 'organizer',
          role: 'Workspace Lead & Organizer',
          name: norm === 'organizer' ? 'Elena Vance' : username.trim(),
          token: 'pe-user-' + Math.random().toString(36).substring(2, 9),
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem('pulseevent_session', JSON.stringify(session));
        onLoginSuccess(session);
      } else {
        setErrorMessage('Invalid credentials. Click "Continue as Organizer" for 1-click access.');
        setIsLoading(false);
      }
    }, 250);
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

      {/* Center Notion-Style Login Box */}
      <main className="w-full max-w-[380px] mx-auto px-6 py-8 flex-1 flex flex-col justify-center">
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
          <p className="text-xs opacity-70 leading-relaxed mb-6">
            Instant Multimodal Event Reporter & Asset Vault
          </p>

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
          <div className="relative my-6 flex items-center justify-center">
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

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium opacity-80 mb-1">Email or username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="organizer"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
              Sign In
            </button>
          </form>

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
