import React from 'react';
import { Layers, Calendar, ChevronDown } from 'lucide-react';
import { EventContext } from '../types';

interface EventWorkspaceSelectorProps {
  currentContext: EventContext;
  onContextChange: (newContext: EventContext) => void;
  vaultCount: number;
}

const CONTEXT_OPTIONS: { id: EventContext; label: string; desc: string }[] = [
  {
    id: 'Hacktoberfest / Tech Meetup',
    label: 'Hacktoberfest / Tech Meetup',
    desc: 'Optimized for developer slides, code snippets, and architecture whiteboards.',
  },
  {
    id: 'Academic Conference',
    label: 'Academic Conference',
    desc: 'Tuned for research papers, mathematical formulas, and citation extraction.',
  },
  {
    id: 'Corporate Summit',
    label: 'Corporate Summit',
    desc: 'Configured for executive keynotes, strategic roadmaps, and press briefings.',
  },
  {
    id: 'Workshop',
    label: 'Workshop',
    desc: 'Structured for collaborative boards, breakout sessions, and civic initiatives.',
  },
];

export const EventWorkspaceSelector: React.FC<EventWorkspaceSelectorProps> = ({
  currentContext,
  onContextChange,
  vaultCount,
}) => {
  const currentObj = CONTEXT_OPTIONS.find((c) => c.id === currentContext) || CONTEXT_OPTIONS[0];

  return (
    <div className="w-full border-b px-4 py-2 text-xs">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 opacity-60" />
          <span className="opacity-60">Event Context:</span>
          <select
            value={currentContext}
            onChange={(e) => onContextChange(e.target.value as EventContext)}
            className="rounded border px-2 py-0.5 outline-none font-medium text-xs cursor-pointer"
          >
            {CONTEXT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="opacity-50 text-[11px] hidden md:inline">&bull; {currentObj.desc}</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] opacity-60">
          <span>Vault:</span>
          <span className="font-semibold tabular-nums">{vaultCount}</span>
        </div>
      </div>
    </div>
  );
};
