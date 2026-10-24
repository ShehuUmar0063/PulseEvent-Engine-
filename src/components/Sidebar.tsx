import React from 'react';
import {
  Activity,
  Archive,
  FileText,
  Settings,
  ChevronDown,
  LogOut,
  User,
  PanelLeftClose,
  Search,
  Sparkles,
  Github,
  Sun,
  Moon,
} from 'lucide-react';
import { ActiveView, UserSession, EventContext } from '../types';

interface SidebarProps {
  currentView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  user: UserSession;
  onLogout: () => void;
  vaultCount: number;
  isOpen: boolean;
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenGitHubModal: () => void;
  eventContext: EventContext;
  onContextChange: (ctx: EventContext) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  user,
  onLogout,
  vaultCount,
  isOpen,
  onToggleSidebar,
  isDarkMode,
  onToggleTheme,
  onOpenGitHubModal,
  eventContext,
  onContextChange,
}) => {
  if (!isOpen) return null;

  const navItems: { id: ActiveView; label: string; icon: React.ReactNode; count?: number }[] = [
    {
      id: 'feed',
      label: 'Live Feed',
      icon: <Activity className="w-4 h-4 opacity-75" />,
    },
    {
      id: 'vault',
      label: 'Asset Vault',
      icon: <Archive className="w-4 h-4 opacity-75" />,
      count: vaultCount,
    },
    {
      id: 'bulletin',
      label: 'Bulletin Generator',
      icon: <FileText className="w-4 h-4 opacity-75" />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4 opacity-75" />,
    },
  ];

  return (
    <aside
      className={`w-60 shrink-0 h-screen sticky top-0 flex flex-col justify-between border-r select-none z-30 transition-colors duration-150 ${
        isDarkMode
          ? 'bg-[#202020] border-[#2c2c2c] text-[#d4d4d4]'
          : 'bg-[#fbfbfa] border-[#e9e9e7] text-[#37352f]'
      }`}
    >
      {/* Top Workspace Bar */}
      <div>
        <div
          className={`px-3.5 py-3 flex items-center justify-between border-b ${
            isDarkMode ? 'border-[#2c2c2c]' : 'border-[#e9e9e7]'
          }`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <div
              className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold shrink-0 ${
                isDarkMode ? 'bg-[#2d2d2d] text-white' : 'bg-[#ecebe7] text-[#37352f]'
              }`}
            >
              ⚡
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-xs font-semibold truncate tracking-tight">
                PulseEvent Workspace
              </span>
              <ChevronDown className="w-3.5 h-3.5 opacity-50 shrink-0" />
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleSidebar}
            title="Collapse sidebar (Ctrl+\)"
            className={`p-1 rounded opacity-60 hover:opacity-100 transition-opacity cursor-pointer ${
              isDarkMode ? 'hover:bg-[#2c2c2c]' : 'hover:bg-[#ecebe7]'
            }`}
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace Quick Actions */}
        <div className="p-2 space-y-0.5">
          <div
            className={`px-2.5 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium cursor-pointer transition-colors ${
              isDarkMode
                ? 'hover:bg-[#282828] text-[#9b9b9b] hover:text-[#d4d4d4]'
                : 'hover:bg-[#efefed] text-[#787774] hover:text-[#37352f]'
            }`}
            onClick={onOpenGitHubModal}
          >
            <Github className="w-3.5 h-3.5" />
            <span className="flex-1 truncate">GitHub Repository</span>
            <span className="text-[10px] font-mono opacity-50">v1.0</span>
          </div>

          <div
            className={`px-2.5 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium cursor-pointer transition-colors ${
              isDarkMode
                ? 'hover:bg-[#282828] text-[#9b9b9b] hover:text-[#d4d4d4]'
                : 'hover:bg-[#efefed] text-[#787774] hover:text-[#37352f]'
            }`}
            onClick={onToggleTheme}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="flex-1 truncate">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="px-3 pt-3 pb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-45">
            Event Management
          </span>
        </div>

        {/* Navigation items */}
        <nav className="p-2 space-y-0.5">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors text-left cursor-pointer ${
                  isActive
                    ? isDarkMode
                      ? 'bg-[#2b2b2b] text-[#ffffff] font-semibold'
                      : 'bg-[#efefed] text-[#37352f] font-semibold'
                    : isDarkMode
                    ? 'hover:bg-[#282828] text-[#9b9b9b] hover:text-[#d4d4d4]'
                    : 'hover:bg-[#efefed] text-[#787774] hover:text-[#37352f]'
                }`}
              >
                {item.icon}
                <span className="flex-1 truncate">{item.label}</span>
                {item.count !== undefined && (
                  <span
                    className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                      isActive
                        ? isDarkMode
                          ? 'bg-[#383838] text-white'
                          : 'bg-[#e2e1de] text-[#37352f]'
                        : isDarkMode
                        ? 'bg-[#282828] text-[#777777]'
                        : 'bg-[#eae8e4] text-[#888886]'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Active Context Notion Card */}
        <div className="px-3 py-2 mt-2">
          <div
            className={`p-2 rounded-md border text-[11px] space-y-1.5 ${
              isDarkMode
                ? 'bg-[#1a1a1a] border-[#292929] text-[#888888]'
                : 'bg-[#ffffff] border-[#e9e9e7] text-[#787774]'
            }`}
          >
            <div className="flex items-center gap-1.5 font-semibold text-current opacity-90">
              <Sparkles className="w-3 h-3 text-cyan-500 shrink-0" />
              <span className="truncate">Active Context</span>
            </div>
            <select
              value={eventContext}
              onChange={(e) => onContextChange(e.target.value as EventContext)}
              className={`w-full text-[11px] font-medium p-1 rounded border outline-none cursor-pointer transition-colors ${
                isDarkMode
                  ? 'bg-[#222222] border-[#333333] text-[#d4d4d4] hover:bg-[#272727]'
                  : 'bg-[#f7f6f3] border-[#e2e1de] text-[#37352f] hover:bg-[#eae8e4]'
              }`}
            >
              <option value="Hacktoberfest / Tech Meetup">Hacktoberfest / Tech Meetup</option>
              <option value="Academic Conference">Academic Conference</option>
              <option value="Corporate Summit">Corporate Summit</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>
        </div>
      </div>

      {/* Footer User Profile & Logout */}
      <div
        className={`p-3 border-t ${
          isDarkMode ? 'border-[#2c2c2c] bg-[#1d1d1d]' : 'border-[#e9e9e7] bg-[#fbfbfa]'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                isDarkMode ? 'bg-[#333333] text-white' : 'bg-[#e0deda] text-[#37352f]'
              }`}
            >
              EV
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate leading-tight">{user.name}</p>
              <p className="text-[10px] opacity-50 truncate">Organizer</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            title="Log out / Switch workspace"
            className={`p-1.5 rounded opacity-60 hover:opacity-100 transition-colors cursor-pointer ${
              isDarkMode ? 'hover:bg-[#2b2b2b] text-neutral-300' : 'hover:bg-[#ecebe7] text-neutral-600'
            }`}
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
