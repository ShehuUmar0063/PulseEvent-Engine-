import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  Archive,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { BulletinPackage, ExtractedMetadata } from '../types';

interface BulletinGeneratorProps {
  metadata: ExtractedMetadata | null;
  bulletin: BulletinPackage | null;
  isProcessing: boolean;
  onCommitToVault: () => void;
  isAlreadyVaulted: boolean;
  isDarkMode: boolean;
}

export const BulletinGenerator: React.FC<BulletinGeneratorProps> = ({
  metadata,
  bulletin,
  isProcessing,
  onCommitToVault,
  isAlreadyVaulted,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'press' | 'social' | 'markdown'>('press');
  const [socialPlatform, setSocialPlatform] = useState<'x' | 'linkedin'>('x');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied!`);
  };

  const handleDownloadPackage = () => {
    if (!metadata || !bulletin) return;
    const bundle = {
      workspace: 'PulseEvent Engine',
      exportedAt: new Date().toISOString(),
      metadata,
      bulletin,
    };
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pulseevent_press_kit_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Press Kit downloaded (.json)');
  };

  return (
    <div
      className={`p-5 rounded-lg border transition-colors flex flex-col h-full relative ${
        isDarkMode
          ? 'bg-[#1e1e1e] border-[#2c2c2c] text-[#d4d4d4]'
          : 'bg-[#ffffff] border-[#e9e9e7] text-[#37352f]'
      }`}
    >
      {/* Toast */}
      {toastMessage && (
        <div
          className={`absolute top-4 right-4 z-20 px-3 py-1.5 rounded text-xs font-medium border shadow-lg flex items-center gap-1.5 animate-in fade-in ${
            isDarkMode
              ? 'bg-[#2a2a2a] border-[#3d3d3d] text-white'
              : 'bg-[#37352f] border-[#2f2e2a] text-white'
          }`}
        >
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-500" />
          <h3 className="text-sm font-semibold tracking-tight">Instant Bulletin Generator</h3>
        </div>

        {bulletin && !isAlreadyVaulted && (
          <button
            type="button"
            onClick={onCommitToVault}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-[#222222] border-[#333333] hover:bg-[#282828] text-emerald-400'
                : 'bg-[#f7f6f3] border-[#e0dfdc] hover:bg-[#ecebe7] text-emerald-600'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Add to Vault</span>
          </button>
        )}
      </div>

      {/* Case 1: Empty state */}
      {!bulletin && !isProcessing && (
        <div
          className={`flex-1 flex flex-col items-center justify-center p-8 rounded-lg border border-dashed text-center ${
            isDarkMode
              ? 'border-[#2d2d2d] bg-[#1a1a1a]/40 text-[#888888]'
              : 'border-[#e8e7e4] bg-[#fbfbfa] text-[#787774]'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-md flex items-center justify-center mb-2.5 opacity-60 ${
              isDarkMode ? 'bg-[#252525]' : 'bg-[#efefed]'
            }`}
          >
            <FileText className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-semibold mb-1 opacity-90">Awaiting Processed Captures</h4>
          <p className="text-[11px] max-w-xs leading-relaxed opacity-70">
            Ingest an event asset to compile an immediate wire press release and platform social dispatches.
          </p>
        </div>
      )}

      {/* Case 2: Processing */}
      {isProcessing && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-2.5">
          <span className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin opacity-60" />
          <p className="text-xs font-mono opacity-80">Drafting wire press bulletin...</p>
        </div>
      )}

      {/* Case 3: Populated Dynamic Bulletin */}
      {bulletin && !isProcessing && (
        <div className="flex-1 flex flex-col space-y-3">
          {/* Notion Tabs */}
          <div
            className={`flex items-center gap-1 p-1 rounded-md border text-xs ${
              isDarkMode ? 'bg-[#181818] border-[#2c2c2c]' : 'bg-[#f7f6f3] border-[#e9e9e7]'
            }`}
          >
            <button
              onClick={() => setActiveTab('press')}
              className={`flex-1 py-1 px-2.5 rounded font-medium transition-colors cursor-pointer ${
                activeTab === 'press'
                  ? isDarkMode
                    ? 'bg-[#2b2b2b] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#37352f] shadow-xs'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              Press Release
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`flex-1 py-1 px-2.5 rounded font-medium transition-colors cursor-pointer ${
                activeTab === 'social'
                  ? isDarkMode
                    ? 'bg-[#2b2b2b] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#37352f] shadow-xs'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              Social Post
            </button>
            <button
              onClick={() => setActiveTab('markdown')}
              className={`flex-1 py-1 px-2.5 rounded font-medium transition-colors cursor-pointer ${
                activeTab === 'markdown'
                  ? isDarkMode
                    ? 'bg-[#2b2b2b] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#37352f] shadow-xs'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              Package (.json)
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => copyToClipboard(bulletin.pressRelease, 'Press Release')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-[#222222] border-[#333333] hover:bg-[#282828]'
                  : 'bg-[#f7f6f3] border-[#e0dfdc] hover:bg-[#ecebe7]'
              }`}
            >
              <Copy className="w-3.5 h-3.5 opacity-70" />
              <span>Copy Release</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('social');
                const text = bulletin.socialPosts[socialPlatform];
                copyToClipboard(text, `${socialPlatform.toUpperCase()} Snippet`);
              }}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-[#222222] border-[#333333] hover:bg-[#282828]'
                  : 'bg-[#f7f6f3] border-[#e0dfdc] hover:bg-[#ecebe7]'
              }`}
            >
              <Share2 className="w-3.5 h-3.5 opacity-70" />
              <span>Copy Social</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPackage}
              className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-[#222222] border-[#333333] hover:bg-[#282828]'
                  : 'bg-[#f7f6f3] border-[#e0dfdc] hover:bg-[#ecebe7]'
              }`}
              title="Download Press Package (.json)"
            >
              <Download className="w-4 h-4 opacity-75" />
            </button>
          </div>

          {/* Tab 1: Press Release */}
          {activeTab === 'press' && (
            <div
              className={`flex-1 p-3.5 rounded-md border overflow-hidden flex flex-col ${
                isDarkMode
                  ? 'bg-[#171717] border-[#2c2c2c]'
                  : 'bg-[#fbfbfa] border-[#e9e9e7]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono opacity-50 pb-2 border-b border-current/10 mb-2">
                <span>WIRE FORMAT DRAFT</span>
                <span>{new Date(bulletin.generatedAt).toLocaleTimeString()}</span>
              </div>
              <textarea
                readOnly
                value={bulletin.pressRelease}
                rows={11}
                className="w-full flex-1 bg-transparent text-xs font-mono leading-relaxed resize-none outline-none opacity-90"
              />
            </div>
          )}

          {/* Tab 2: Social Posts */}
          {activeTab === 'social' && (
            <div
              className={`flex-1 p-3.5 rounded-md border flex flex-col space-y-2.5 ${
                isDarkMode
                  ? 'bg-[#171717] border-[#2c2c2c]'
                  : 'bg-[#fbfbfa] border-[#e9e9e7]'
              }`}
            >
              <div className="flex items-center gap-2 border-b border-current/10 pb-2">
                <button
                  type="button"
                  onClick={() => setSocialPlatform('x')}
                  className={`px-2 py-0.5 rounded text-xs font-medium cursor-pointer ${
                    socialPlatform === 'x'
                      ? isDarkMode
                        ? 'bg-[#2b2b2b] text-white'
                        : 'bg-[#efefed] text-[#37352f]'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  X / Twitter
                </button>
                <button
                  type="button"
                  onClick={() => setSocialPlatform('linkedin')}
                  className={`px-2 py-0.5 rounded text-xs font-medium cursor-pointer ${
                    socialPlatform === 'linkedin'
                      ? isDarkMode
                        ? 'bg-[#2b2b2b] text-white'
                        : 'bg-[#efefed] text-[#37352f]'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  LinkedIn
                </button>
                <span className="ml-auto text-[10px] font-mono opacity-50">
                  {bulletin.socialPosts[socialPlatform].length} chars
                </span>
              </div>

              <textarea
                readOnly
                value={bulletin.socialPosts[socialPlatform]}
                rows={9}
                className="w-full flex-1 bg-transparent text-xs font-mono leading-relaxed resize-none outline-none opacity-90"
              />
            </div>
          )}

          {/* Tab 3: Package (.json) */}
          {activeTab === 'markdown' && metadata && (
            <div
              className={`flex-1 p-3.5 rounded-md border overflow-y-auto space-y-2 text-xs font-mono ${
                isDarkMode
                  ? 'bg-[#171717] border-[#2c2c2c] text-[#bbbbbb]'
                  : 'bg-[#fbfbfa] border-[#e9e9e7] text-[#444444]'
              }`}
            >
              <div className="text-[11px] font-semibold opacity-90">
                # {metadata.sessionTitle}
              </div>
              <p className="opacity-70">Speaker: {metadata.presenterName}</p>
              <p className="opacity-70">Category: {metadata.category}</p>
              <p className="opacity-70">
                Sentiment: {(metadata.sentimentScore * 100).toFixed(0)}%
              </p>
              <p className="opacity-70">Alt Text: {metadata.altText}</p>
              <p className="opacity-70">Tags: {metadata.tags.join(', ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
