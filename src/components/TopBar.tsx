import React from 'react';
import { PanelLeft, ChevronDown, Github, Cpu, ExternalLink } from 'lucide-react';
import { EventContext, ActiveView } from '../types';

interface TopBarProps {
  eventContext: EventContext;
  onContextChange: (ctx: EventContext) => void;
  activeView: ActiveView;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onOpenGitHubModal: () => void;
}

const VIEW_TITLES: Record<ActiveView, string> = {
  feed: 'Live Feed',
  vault: 'Asset Vault',
  bulletin: 'Bulletin Generator',
  settings: 'Workspace Settings',
};

const EVENT_TYPES: EventContext[] = [
  'Hacktoberfest / Tech Meetup',
  'Academic Conference',
  'Corporate Summit',
  'Workshop',
];

export const TopBar: React.FC<TopBarProps> = ({
  eventContext,
  onContextChange,
  activeView,
  isSidebarOpen,
  onToggleSidebar,
  isDarkMode,
  onOpenGitHubModal,
}) => {
  return (
    <header
      className={`h-12 w-full border-b sticky top-0 z-20 flex items-center justify-between px-4 text-xs transition-colors duration-150 ${
        isDarkMode
          ? 'bg-[#191919] border-[#2c2c2c] text-[#e6e6e6]'
          : 'bg-[#ffffff] border-[#e9e9e7] text-[#37352f]'
      }`}
    >
      {/* Left: Sidebar Toggle & Breadcrumb Navigation */}
      <div className="flex items-center gap-2 overflow-hidden">
        {!isSidebarOpen && (
          <button
            type="button"
            onClick={onToggleSidebar}
            title="Open sidebar"
            className={`p-1.5 rounded opacity-65 hover:opacity-100 transition-colors mr-1 cursor-pointer ${
              isDarkMode ? 'hover:bg-[#282828]' : 'hover:bg-[#f0efec]'
            }`}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}

        {/* Notion Breadcrumbs: Workspace > Current Event > Active View */}
        <div className="flex items-center gap-1.5 text-xs font-normal opacity-75 truncate">
          <span className="hover:underline cursor-pointer opacity-80">PulseEvent Workspace</span>
          <span className="opacity-40 select-none">/</span>
          <span className="hover:underline cursor-pointer opacity-80 hidden sm:inline">
            Current Event
          </span>
          <span className="opacity-40 select-none hidden sm:inline">/</span>
          <span className="font-medium opacity-100 text-current">{VIEW_TITLES[activeView]}</span>
        </div>
      </div>

      {/* Right: Event Type Dropdown & Open-Source Badge */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Event Type Dropdown */}
        <div className="relative inline-flex items-center">
          <select
            value={eventContext}
            onChange={(e) => onContextChange(e.target.value as EventContext)}
            className={`appearance-none text-xs font-medium pl-2.5 pr-7 py-1 rounded-md border outline-none cursor-pointer transition-colors ${
              isDarkMode
                ? 'bg-[#222222] border-[#333333] text-[#d4d4d4] hover:bg-[#272727]'
                : 'bg-[#f7f6f3] border-[#e2e1de] text-[#37352f] hover:bg-[#eae8e4]'
            }`}
          >
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 opacity-50 absolute right-2 pointer-events-none" />
        </div>

        {/* Gemma 4 Open-Weight Badge */}
        <div
          className={`hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono border ${
            isDarkMode
              ? 'bg-[#202020] border-[#303030] text-[#9b9b9b]'
              : 'bg-[#f7f6f3] border-[#eae9e6] text-[#787774]'
          }`}
        >
          <Cpu className="w-3 h-3 text-cyan-500" />
          <span>Powered by Gemma 4 (Open-Weight)</span>
        </div>

        {/* GitHub Link Button */}
        <button
          type="button"
          onClick={onOpenGitHubModal}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
            isDarkMode
              ? 'bg-[#202020] border-[#303030] text-[#d4d4d4] hover:bg-[#282828]'
              : 'bg-[#ffffff] border-[#e2e1de] text-[#37352f] hover:bg-[#f7f6f3]'
          }`}
        >
          <Github className="w-3.5 h-3.5 opacity-75" />
          <span className="hidden sm:inline">GitHub</span>
        </button>
      </div>
    </header>
  );
};
