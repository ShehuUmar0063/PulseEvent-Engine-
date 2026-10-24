import React, { useState } from 'react';
import {
  Terminal,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Edit2,
  Quote,
  User,
  Tag,
  Smile,
  FileText,
  Eye,
  Sliders,
} from 'lucide-react';
import { ExtractedMetadata } from '../types';

interface GemmaReasoningPanelProps {
  metadata: ExtractedMetadata | null;
  thinkReasoning: string[];
  isProcessing: boolean;
  onUpdateMetadata: (updated: ExtractedMetadata) => void;
  isDarkMode: boolean;
}

export const GemmaReasoningPanel: React.FC<GemmaReasoningPanelProps> = ({
  metadata,
  thinkReasoning,
  isProcessing,
  onUpdateMetadata,
  isDarkMode,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showRawTrace, setShowRawTrace] = useState(true);
  const [copiedTrace, setCopiedTrace] = useState(false);

  // Edit fields
  const [editTitle, setEditTitle] = useState('');
  const [editSpeaker, setEditSpeaker] = useState('');
  const [editAltText, setEditAltText] = useState('');

  const handleStartEdit = () => {
    if (!metadata) return;
    setEditTitle(metadata.sessionTitle);
    setEditSpeaker(metadata.presenterName);
    setEditAltText(metadata.altText);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!metadata) return;
    onUpdateMetadata({
      ...metadata,
      sessionTitle: editTitle,
      presenterName: editSpeaker,
      altText: editAltText,
    });
    setIsEditing(false);
  };

  const handleCopyTrace = () => {
    const text = `<|think|>\n${thinkReasoning.join('\n')}\n</|think|>`;
    navigator.clipboard.writeText(text);
    setCopiedTrace(true);
    setTimeout(() => setCopiedTrace(false), 2000);
  };

  return (
    <div
      className={`p-5 rounded-lg border transition-colors flex flex-col h-full ${
        isDarkMode
          ? 'bg-[#1e1e1e] border-[#2c2c2c] text-[#d4d4d4]'
          : 'bg-[#ffffff] border-[#e9e9e7] text-[#37352f]'
      }`}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-500" />
          <h3 className="text-sm font-semibold tracking-tight">Gemma 4 Multimodal Reasoning</h3>
        </div>

        {thinkReasoning.length > 0 && (
          <button
            type="button"
            onClick={handleCopyTrace}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-[#252525] border-[#333333] hover:bg-[#2b2b2b] text-[#cccccc]'
                : 'bg-[#f7f6f3] border-[#e0dfdc] hover:bg-[#eae8e4] text-[#555555]'
            }`}
          >
            {copiedTrace ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            <span>{copiedTrace ? 'Copied' : 'Copy <|think|>'}</span>
          </button>
        )}
      </div>

      {/* Case 1: Ingesting / Live processing trace */}
      {isProcessing && (
        <div className="space-y-3 flex-1 flex flex-col justify-center py-6">
          <div
            className={`p-4 rounded-md font-mono text-xs border space-y-2 ${
              isDarkMode
                ? 'bg-[#161616] border-[#2d2d2d] text-[#e0e0e0]'
                : 'bg-[#f7f6f3] border-[#e8e7e4] text-[#37352f]'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] opacity-60 border-b pb-2 border-current/15">
              <span>Gemma-4-9B-Vision-IT &bull; Execution Trace</span>
              <span className="font-semibold text-cyan-500">&lt;|think|&gt; streaming</span>
            </div>

            <div className="space-y-1.5 pt-1 text-[11px]">
              {thinkReasoning.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="opacity-40 select-none">&gt;</span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-cyan-500 animate-pulse pt-1">
                <span className="select-none">&gt;</span>
                <span className="inline-block w-2 h-3.5 bg-cyan-500" />
                <span className="text-[11px] opacity-75">Decoding vision tokens into structured properties...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Case 2: Zero Demo Data Idle Placeholder */}
      {!isProcessing && !metadata && (
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
            <Terminal className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-semibold mb-1 opacity-90">Reasoning Engine Idle</h4>
          <p className="text-[11px] max-w-xs leading-relaxed opacity-70">
            Upload an event photo or schedule whiteboard to stream Gemma 4 visual tokens and output structured properties.
          </p>
        </div>
      )}

      {/* Case 3: Structured Property Table Output (Notion Style) */}
      {!isProcessing && metadata && (
        <div className="space-y-4 flex-1 overflow-y-auto pr-1">
          {/* Notion Code Block: <|think|> Trace */}
          <div
            className={`rounded-md border overflow-hidden text-xs font-mono ${
              isDarkMode
                ? 'bg-[#161616] border-[#2c2c2c] text-[#cccccc]'
                : 'bg-[#f7f6f3] border-[#e8e7e4] text-[#37352f]'
            }`}
          >
            <div
              onClick={() => setShowRawTrace(!showRawTrace)}
              className="flex items-center justify-between px-3 py-2 cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
            >
              <div className="flex items-center gap-2 text-[11px]">
                <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                <span className="font-semibold">&lt;|think|&gt; Visual Reasoning Trace</span>
                <span className="text-[10px] opacity-60">({metadata.thinkReasoning.length} steps)</span>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-[10px] opacity-60">{showRawTrace ? 'Hide' : 'Expand'}</span>
                {showRawTrace ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>
            </div>

            {showRawTrace && (
              <div className="px-3 pb-3 pt-1 text-[11px] space-y-1 border-t border-current/10 max-h-40 overflow-y-auto">
                {metadata.thinkReasoning.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 opacity-85 leading-relaxed">
                    <span className="opacity-40 select-none">&bull;</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Structured Properties Table (Notion Database Page Properties Layout) */}
          <div
            className={`p-4 rounded-md border text-xs space-y-3.5 ${
              isDarkMode
                ? 'bg-[#1b1b1b] border-[#2c2c2c]'
                : 'bg-[#fbfbfa] border-[#e9e9e7]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-current/10">
              <span className="text-[11px] font-semibold uppercase tracking-wider opacity-60">
                Extracted Event Properties
              </span>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="flex items-center gap-1 text-[11px] text-cyan-500 hover:underline cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit Properties</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-[11px] opacity-60 hover:opacity-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#2383e2] text-white cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            {/* Property 1: Session Name */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-start">
              <span className="sm:col-span-3 text-[11px] opacity-60 flex items-center gap-1.5 font-medium">
                <FileText className="w-3.5 h-3.5 opacity-70" />
                <span>Session Name</span>
              </span>
              <div className="sm:col-span-9">
                {isEditing ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-2 py-1 text-xs rounded border outline-none bg-transparent border-current/25"
                  />
                ) : (
                  <span className="font-semibold text-current opacity-95">
                    {metadata.sessionTitle}
                  </span>
                )}
              </div>
            </div>

            {/* Property 2: Speaker */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-start">
              <span className="sm:col-span-3 text-[11px] opacity-60 flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 opacity-70" />
                <span>Speaker</span>
              </span>
              <div className="sm:col-span-9">
                {isEditing ? (
                  <input
                    type="text"
                    value={editSpeaker}
                    onChange={(e) => setEditSpeaker(e.target.value)}
                    className="w-full px-2 py-1 text-xs rounded border outline-none bg-transparent border-current/25"
                  />
                ) : (
                  <span className="opacity-90">{metadata.presenterName}</span>
                )}
              </div>
            </div>

            {/* Property 3: Sentiment Score */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <span className="sm:col-span-3 text-[11px] opacity-60 flex items-center gap-1.5 font-medium">
                <Smile className="w-3.5 h-3.5 opacity-70" />
                <span>Sentiment</span>
              </span>
              <div className="sm:col-span-9 flex items-center gap-2 font-mono text-[11px]">
                <span className="font-semibold text-emerald-500 tabular-nums">
                  {(metadata.sentimentScore * 100).toFixed(0)}%
                </span>
                <span className="opacity-60 font-sans">({metadata.sentimentLabel})</span>
              </div>
            </div>

            {/* Property 4: Key Quotes */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-start">
              <span className="sm:col-span-3 text-[11px] opacity-60 flex items-center gap-1.5 font-medium">
                <Quote className="w-3.5 h-3.5 opacity-70" />
                <span>Key Quotes</span>
              </span>
              <div className="sm:col-span-9 space-y-1.5">
                {metadata.keyQuotes.map((q, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded text-[11px] italic leading-relaxed border ${
                      isDarkMode
                        ? 'bg-[#151515] border-[#292929] text-[#c0c0c0]'
                        : 'bg-[#ffffff] border-[#e8e7e4] text-[#555555]'
                    }`}
                  >
                    &ldquo;{q.replace(/^“|”$/g, '')}&rdquo;
                  </div>
                ))}
              </div>
            </div>

            {/* Property 5: Generated Alt-Text */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-start">
              <span className="sm:col-span-3 text-[11px] opacity-60 flex items-center gap-1.5 font-medium">
                <Eye className="w-3.5 h-3.5 opacity-70" />
                <span>Alt-Text</span>
              </span>
              <div className="sm:col-span-9">
                {isEditing ? (
                  <textarea
                    value={editAltText}
                    onChange={(e) => setEditAltText(e.target.value)}
                    rows={2}
                    className="w-full px-2 py-1 text-xs rounded border outline-none bg-transparent border-current/25"
                  />
                ) : (
                  <p className="opacity-80 leading-relaxed text-[11px]">{metadata.altText}</p>
                )}
              </div>
            </div>

            {/* Tags Property */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center pt-1 border-t border-current/10">
              <span className="sm:col-span-3 text-[11px] opacity-60 flex items-center gap-1.5 font-medium">
                <Tag className="w-3.5 h-3.5 opacity-70" />
                <span>Tags</span>
              </span>
              <div className="sm:col-span-9 flex flex-wrap gap-1.5">
                {metadata.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                      isDarkMode
                        ? 'bg-[#252525] border-[#333333] text-[#9b9b9b]'
                        : 'bg-[#f0efed] border-[#e2e1de] text-[#666664]'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
