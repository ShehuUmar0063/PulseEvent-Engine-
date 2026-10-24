import React from 'react';
import { Terminal, Github, LogOut, User, Cpu } from 'lucide-react';
import { UserSession } from '../types';

interface HeaderProps {
  user: UserSession;
  onLogout: () => void;
  onOpenGitHubModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onOpenGitHubModal }) => {
  return (
    <header className="w-full bg-neutral-900 border-b border-neutral-800 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Title & Subtitle */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">
                PulseEvent Engine
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-800/60">
                <Cpu className="w-3 h-3 text-cyan-400" />
                Powered by Gemma 4 (Open-Weight)
              </span>
            </div>
            <p className="text-xs text-neutral-400 hidden md:block">
              Instant Multimodal Event Intelligence & Asset Vault
            </p>
          </div>
        </div>

        {/* Zone 2 & 3: GitHub Repo button & User Profile / Logout */}
        <div className="flex items-center gap-3 shrink-0">
          {/* GitHub Repository Button */}
          <button
            type="button"
            onClick={onOpenGitHubModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium border border-neutral-700/80 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Github className="w-4 h-4 text-neutral-300" />
            <span className="hidden sm:inline">GitHub Repository</span>
          </button>

          <div className="h-4 w-[1px] bg-neutral-800 hidden sm:block" />

          {/* User Profile Info */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-300">
            <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-neutral-200">{user.name}</span>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={onLogout}
            title="Sign out of event operations"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-rose-950/40 text-neutral-300 hover:text-rose-300 text-xs font-medium border border-neutral-800 hover:border-rose-900/50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
