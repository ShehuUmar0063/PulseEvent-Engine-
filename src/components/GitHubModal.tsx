import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Cpu, FileText, Layers, Eye } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cloneCommand = 'git clone https://github.com/pulseevent-engine/core.git';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-xl rounded-lg border shadow-2xl overflow-hidden ${
          isDarkMode
            ? 'bg-[#1e1e1e] border-[#303030] text-[#d4d4d4]'
            : 'bg-[#ffffff] border-[#e2e1de] text-[#37352f]'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-b ${
            isDarkMode ? 'border-[#2c2c2c] bg-[#181818]' : 'border-[#e9e9e7] bg-[#fbfbfa]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                isDarkMode ? 'bg-[#2a2a2a] text-white' : 'bg-[#e8e7e4] text-[#37352f]'
              }`}
            >
              📦
            </div>
            <div>
              <h3 className="text-xs font-semibold">pulseevent-engine / core</h3>
              <p className="text-[11px] opacity-60">Open-source Gemma 4 multimodal reporter</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Clone Command */}
          <div>
            <label className="block text-[11px] font-medium opacity-60 mb-1">
              Clone Repository
            </label>
            <div
              className={`flex items-center justify-between p-2 rounded border font-mono text-[11px] ${
                isDarkMode
                  ? 'bg-[#151515] border-[#2c2c2c] text-[#cccccc]'
                  : 'bg-[#f7f6f3] border-[#e8e7e4] text-[#37352f]'
              }`}
            >
              <span className="truncate">{cloneCommand}</span>
              <button
                onClick={copyToClipboard}
                className={`ml-2 p-1 rounded border flex items-center gap-1 transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#252525] border-[#333333] hover:bg-[#2b2b2b]'
                    : 'bg-[#ffffff] border-[#e0dfdc] hover:bg-[#efefed]'
                }`}
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Architecture Steps (Notion Block Style) */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider opacity-60 mb-2">
              Gemma 4 Multimodal Pipeline
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div
                className={`p-2.5 rounded border text-[11px] space-y-0.5 ${
                  isDarkMode
                    ? 'bg-[#171717] border-[#292929]'
                    : 'bg-[#fbfbfa] border-[#e9e9e7]'
                }`}
              >
                <div className="font-semibold text-current opacity-90">1. Vision Encoder</div>
                <p className="opacity-60 text-[10px]">
                  Extracts spatial patches and slide OCR coordinates.
                </p>
              </div>

              <div
                className={`p-2.5 rounded border text-[11px] space-y-0.5 ${
                  isDarkMode
                    ? 'bg-[#171717] border-[#292929]'
                    : 'bg-[#fbfbfa] border-[#e9e9e7]'
                }`}
              >
                <div className="font-semibold text-current opacity-90">2. &lt;|think|&gt; Trace</div>
                <p className="opacity-60 text-[10px]">
                  Visual reasoning resolves speaker identities and soundbites.
                </p>
              </div>

              <div
                className={`p-2.5 rounded border text-[11px] space-y-0.5 ${
                  isDarkMode
                    ? 'bg-[#171717] border-[#292929]'
                    : 'bg-[#fbfbfa] border-[#e9e9e7]'
                }`}
              >
                <div className="font-semibold text-current opacity-90">3. Schema Output</div>
                <p className="opacity-60 text-[10px]">
                  Emits structured JSON with WCAG AA alt-text.
                </p>
              </div>

              <div
                className={`p-2.5 rounded border text-[11px] space-y-0.5 ${
                  isDarkMode
                    ? 'bg-[#171717] border-[#292929]'
                    : 'bg-[#fbfbfa] border-[#e9e9e7]'
                }`}
              >
                <div className="font-semibold text-current opacity-90">4. Wire Releases</div>
                <p className="opacity-60 text-[10px]">
                  Assembles press bulletins and multi-network social posts.
                </p>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div
            className={`p-3 rounded border text-[11px] space-y-1.5 ${
              isDarkMode
                ? 'bg-[#171717] border-[#292929]'
                : 'bg-[#fbfbfa] border-[#e9e9e7]'
            }`}
          >
            <div className="flex justify-between">
              <span className="opacity-60">License:</span>
              <span className="font-mono">MIT Open Source</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Model:</span>
              <span className="font-mono">Gemma 4 (Apache-2.0 Weights)</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Accessibility:</span>
              <span>WCAG 2.1 AA Compliant</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-5 py-3 border-t flex justify-end ${
            isDarkMode ? 'border-[#2c2c2c] bg-[#181818]' : 'border-[#e9e9e7] bg-[#fbfbfa]'
          }`}
        >
          <button
            onClick={onClose}
            className={`px-3 py-1 rounded text-xs font-medium border cursor-pointer ${
              isDarkMode
                ? 'bg-[#252525] border-[#333333] hover:bg-[#2b2b2b]'
                : 'bg-[#ffffff] border-[#e0dfdc] hover:bg-[#efefed]'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
