import React from 'react';
import { Sliders, Cpu, Database, Trash2, Download, CheckCircle, Github } from 'lucide-react';
import { EventContext, UserSession } from '../types';

interface SettingsViewProps {
  user: UserSession;
  eventContext: EventContext;
  vaultCount: number;
  onClearVault: () => void;
  onExportVault: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenGitHubModal: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  eventContext,
  vaultCount,
  onClearVault,
  onExportVault,
  isDarkMode,
  onToggleTheme,
  onOpenGitHubModal,
}) => {
  return (
    <div className="max-w-3xl space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-1">Workspace Settings</h2>
        <p className="text-xs opacity-60">
          Configure PulseEvent Engine parameters, open-weight model gateway, and vault archives.
        </p>
      </div>

      {/* Section 1: General Workspace */}
      <div
        className={`p-5 rounded-lg border space-y-4 ${
          isDarkMode
            ? 'bg-[#1e1e1e] border-[#2c2c2c] text-[#d4d4d4]'
            : 'bg-[#ffffff] border-[#e9e9e7] text-[#37352f]'
        }`}
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60">
          Workspace Profile
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-current/10">
            <span className="opacity-70">Workspace Name</span>
            <span className="font-semibold">PulseEvent Workspace</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-current/10">
            <span className="opacity-70">Active Organizer</span>
            <span className="font-medium">{user.name} ({user.role})</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-current/10">
            <span className="opacity-70">Current Event Context</span>
            <span className="font-medium">{eventContext}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="opacity-70">Appearance Theme</span>
            <button
              type="button"
              onClick={onToggleTheme}
              className={`px-3 py-1 rounded border text-xs font-medium cursor-pointer ${
                isDarkMode
                  ? 'bg-[#252525] border-[#333333] hover:bg-[#2c2c2c]'
                  : 'bg-[#f7f6f3] border-[#e0dfdc] hover:bg-[#ecebe7]'
              }`}
            >
              {isDarkMode ? 'Dark Theme (Notion Dark)' : 'Light Theme (Notion Clean)'}
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Gemma 4 Model Pipeline */}
      <div
        className={`p-5 rounded-lg border space-y-3.5 ${
          isDarkMode
            ? 'bg-[#1e1e1e] border-[#2c2c2c] text-[#d4d4d4]'
            : 'bg-[#ffffff] border-[#e9e9e7] text-[#37352f]'
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-500" />
            <span>Gemma 4 Multimodal Intelligence Gateway</span>
          </h3>
          <span className="text-[11px] font-mono text-emerald-500 font-medium">Ready</span>
        </div>

        <div className="text-xs space-y-2 opacity-80 leading-relaxed">
          <p>
            The intelligence engine runs on Google Gemma 4 open weights. Visual tokens are extracted from ingested media and channeled through the <code className="px-1 py-0.5 rounded bg-current/10 text-[11px]">&lt;|think|&gt;</code> visual reasoning trace to synthesize structured entities and WCAG AA alt-text.
          </p>
        </div>

        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenGitHubModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border cursor-pointer ${
              isDarkMode
                ? 'bg-[#252525] border-[#333333] hover:bg-[#2c2c2c]'
                : 'bg-[#f7f6f3] border-[#e0dfdc] hover:bg-[#ecebe7]'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>View Architecture & Repository</span>
          </button>
        </div>
      </div>

      {/* Section 3: Open Source Docs & Legal */}
      <div
        className={`p-5 rounded-lg border space-y-3.5 ${
          isDarkMode
            ? 'bg-[#1e1e1e] border-[#2c2c2c] text-[#d4d4d4]'
            : 'bg-[#ffffff] border-[#e9e9e7] text-[#37352f]'
        }`}
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60">
          Open Source Documentation & Governance
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <button
            type="button"
            onClick={onOpenGitHubModal}
            className={`p-2.5 rounded border text-left space-y-1 transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-[#171717] border-[#292929] hover:bg-[#202020]'
                : 'bg-[#fbfbfa] border-[#e9e9e7] hover:bg-[#f2f1ee]'
            }`}
          >
            <div className="font-semibold text-[11px]">README.md</div>
            <p className="opacity-60 text-[10px]">Architecture, setup & features</p>
          </button>

          <button
            type="button"
            onClick={onOpenGitHubModal}
            className={`p-2.5 rounded border text-left space-y-1 transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-[#171717] border-[#292929] hover:bg-[#202020]'
                : 'bg-[#fbfbfa] border-[#e9e9e7] hover:bg-[#f2f1ee]'
            }`}
          >
            <div className="font-semibold text-[11px]">LICENSE</div>
            <p className="opacity-60 text-[10px]">MIT Open Source</p>
          </button>

          <button
            type="button"
            onClick={onOpenGitHubModal}
            className={`p-2.5 rounded border text-left space-y-1 transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-[#171717] border-[#292929] hover:bg-[#202020]'
                : 'bg-[#fbfbfa] border-[#e9e9e7] hover:bg-[#f2f1ee]'
            }`}
          >
            <div className="font-semibold text-[11px]">Code of Conduct</div>
            <p className="opacity-60 text-[10px]">Contributor Covenant v2.1</p>
          </button>

          <button
            type="button"
            onClick={onOpenGitHubModal}
            className={`p-2.5 rounded border text-left space-y-1 transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-[#171717] border-[#292929] hover:bg-[#202020]'
                : 'bg-[#fbfbfa] border-[#e9e9e7] hover:bg-[#f2f1ee]'
            }`}
          >
            <div className="font-semibold text-[11px]">CONTRIBUTING</div>
            <p className="opacity-60 text-[10px]">PR workflow & guidelines</p>
          </button>
        </div>
      </div>

      {/* Section 4: Data & Storage */}
      <div
        className={`p-5 rounded-lg border space-y-4 ${
          isDarkMode
            ? 'bg-[#1e1e1e] border-[#2c2c2c] text-[#d4d4d4]'
            : 'bg-[#ffffff] border-[#e9e9e7] text-[#37352f]'
        }`}
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60">
          Vault Database Operations
        </h3>

        <div className="flex items-center justify-between py-1 text-xs border-b border-current/10">
          <span className="opacity-70">Indexed Captures</span>
          <span className="font-mono tabular-nums font-semibold">{vaultCount} Assets</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onExportVault}
            disabled={vaultCount === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border cursor-pointer disabled:opacity-40 ${
              isDarkMode
                ? 'bg-[#252525] border-[#333333] hover:bg-[#2c2c2c]'
                : 'bg-[#f7f6f3] border-[#e0dfdc] hover:bg-[#ecebe7]'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Complete Vault (.json)</span>
          </button>

          <button
            type="button"
            onClick={onClearVault}
            disabled={vaultCount === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border text-rose-500 cursor-pointer disabled:opacity-40 ${
              isDarkMode
                ? 'bg-[#252525] border-[#333333] hover:bg-rose-950/20'
                : 'bg-[#f7f6f3] border-[#e0dfdc] hover:bg-rose-50'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Vault Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
