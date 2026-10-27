import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Cpu, FileText, Layers, Eye, Shield, BookOpen, HeartHandshake, GitPullRequest } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

type TabType = 'overview' | 'deploy' | 'readme' | 'license' | 'conduct' | 'contributing';

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cloneCommand = 'git clone https://github.com/pulseevent-engine/core.git';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-2xl rounded-lg border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${
          isDarkMode
            ? 'bg-[#1e1e1e] border-[#303030] text-[#d4d4d4]'
            : 'bg-[#ffffff] border-[#e2e1de] text-[#37352f]'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-b shrink-0 ${
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
              <p className="text-[11px] opacity-60">Open-Source Gemma 4 Multimodal Event Intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notion Tabs */}
        <div
          className={`px-4 pt-2 border-b flex items-center gap-1 shrink-0 overflow-x-auto text-xs ${
            isDarkMode ? 'border-[#2c2c2c] bg-[#1a1a1a]' : 'border-[#e9e9e7] bg-[#fbfbfa]'
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? isDarkMode
                  ? 'border-white text-white'
                  : 'border-[#2383e2] text-[#2383e2]'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('deploy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'deploy'
                ? isDarkMode
                  ? 'border-white text-white'
                  : 'border-[#2383e2] text-[#2383e2]'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Deploy (Vercel & Pages)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('readme')}
            className={`flex items-center gap-1.5 px-3 py-1.5 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'readme'
                ? isDarkMode
                  ? 'border-white text-white'
                  : 'border-[#2383e2] text-[#2383e2]'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>README.md</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('license')}
            className={`flex items-center gap-1.5 px-3 py-1.5 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'license'
                ? isDarkMode
                  ? 'border-white text-white'
                  : 'border-[#2383e2] text-[#2383e2]'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>LICENSE</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('conduct')}
            className={`flex items-center gap-1.5 px-3 py-1.5 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'conduct'
                ? isDarkMode
                  ? 'border-white text-white'
                  : 'border-[#2383e2] text-[#2383e2]'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Code of Conduct</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contributing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'contributing'
                ? isDarkMode
                  ? 'border-white text-white'
                  : 'border-[#2383e2] text-[#2383e2]'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Contributing</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 text-xs space-y-4">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
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
                  <span className="opacity-60">Zero Demo Data:</span>
                  <span className="text-emerald-500 font-medium">Strict Enforced</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Accessibility:</span>
                  <span>WCAG 2.1 AA Compliant</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEPLOY (VERCEL & GITHUB PAGES) */}
          {activeTab === 'deploy' && (
            <div className="space-y-4">
              {/* Vercel Card */}
              <div
                className={`p-4 rounded border space-y-2.5 ${
                  isDarkMode ? 'bg-[#161616] border-[#292929]' : 'bg-[#fbfbfa] border-[#e9e9e7]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">▲</span>
                    <h4 className="font-semibold text-xs">Deploy to Vercel (1-Click & Recommended)</h4>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    vercel.json ready
                  </span>
                </div>
                <p className="opacity-75 text-[11px] leading-relaxed">
                  PulseEvent Engine includes a root <code className="font-mono">vercel.json</code> and serverless functions in <code className="font-mono">/api</code>.
                </p>
                <div className="space-y-1 text-[11px] opacity-80 list-decimal pl-4">
                  <p>1. Push your repository to GitHub.</p>
                  <p>2. Import the repo at <strong>vercel.com/new</strong>.</p>
                  <p>3. Framework is detected as <strong>Vite</strong> with output directory <strong>dist</strong>.</p>
                  <p>4. Click <strong>Deploy</strong> to launch with serverless API and client fallback.</p>
                </div>
                <div
                  className={`p-2 rounded font-mono text-[10px] flex items-center justify-between border ${
                    isDarkMode ? 'bg-[#111111] border-[#252525]' : 'bg-[#ffffff] border-[#e0dfdc]'
                  }`}
                >
                  <span>npm install -g vercel &amp;&amp; vercel</span>
                </div>
              </div>

              {/* GitHub Pages Card */}
              <div
                className={`p-4 rounded border space-y-2.5 ${
                  isDarkMode ? 'bg-[#161616] border-[#292929]' : 'bg-[#fbfbfa] border-[#e9e9e7]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🐙</span>
                    <h4 className="font-semibold text-xs">Deploy to GitHub Pages / Custom Domain</h4>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                    workflow active
                  </span>
                </div>
                <p className="opacity-75 text-[11px] leading-relaxed">
                  The automated GitHub Action <code className="font-mono">.github/workflows/deploy-pages.yml</code> automatically builds and publishes upon push to <code className="font-mono">main</code>.
                </p>
                <div className="space-y-1 text-[11px] opacity-80 list-decimal pl-4">
                  <p>1. In your GitHub repository, open <strong>Settings &gt; Pages</strong>.</p>
                  <p>2. Set <strong>Build and deployment &gt; Source</strong> to <strong>GitHub Actions</strong>.</p>
                  <p>3. Push to <code className="font-mono">main</code>. The site deploys to <code className="font-mono">https://username.github.io/repo/</code>.</p>
                  <p>4. Custom domains and SPA page reloads are supported via the included <code className="font-mono">public/404.html</code>.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: README.MD */}
          {activeTab === 'readme' && (
            <div
              className={`p-4 rounded border font-mono text-[11px] leading-relaxed space-y-3 whitespace-pre-wrap ${
                isDarkMode ? 'bg-[#161616] border-[#292929]' : 'bg-[#fbfbfa] border-[#e9e9e7]'
              }`}
            >
              <div className="font-bold text-sm"># PulseEvent Engine — Multimodal Reporter & Vault</div>
              <p className="opacity-75">
                Instant Multimodal Event Intelligence & Asset Vault powered by Gemma 4 open weights and Notion-grade UX.
              </p>
              <div className="border-t border-current/10 pt-2 font-semibold text-xs">## Core Features</div>
              <p className="opacity-75">
                • Gemma 4 Multimodal Reasoning with live &lt;|think|&gt; execution trace
                • Notion Design System with light/dark fidelity
                • Instant wire press release generation and social posts
                • Zero Demo Data: starts completely clean without dummy records
                • Multimodal pipeline: drag-and-drop, clipboard paste, live camera stream
              </p>
              <div className="border-t border-current/10 pt-2 font-semibold text-xs">## Quick Start</div>
              <p className="opacity-75">
                $ git clone https://github.com/pulseevent-engine/core.git
                $ npm install
                $ npm run dev
              </p>
            </div>
          )}

          {/* TAB 3: LICENSE */}
          {activeTab === 'license' && (
            <div
              className={`p-4 rounded border font-mono text-[11px] leading-relaxed space-y-3 ${
                isDarkMode ? 'bg-[#161616] border-[#292929]' : 'bg-[#fbfbfa] border-[#e9e9e7]'
              }`}
            >
              <div className="font-bold text-xs">MIT License</div>
              <p className="opacity-70">Copyright (c) 2026 PulseEvent Engine Contributors</p>
              <p className="opacity-80">
                Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
              </p>
              <p className="opacity-80">
                The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
              </p>
              <p className="opacity-80">
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
              </p>
            </div>
          )}

          {/* TAB 4: CODE OF CONDUCT */}
          {activeTab === 'conduct' && (
            <div
              className={`p-4 rounded border text-[11px] leading-relaxed space-y-3 ${
                isDarkMode ? 'bg-[#161616] border-[#292929]' : 'bg-[#fbfbfa] border-[#e9e9e7]'
              }`}
            >
              <div className="font-bold text-xs">Contributor Covenant Code of Conduct (v2.1)</div>
              <div>
                <span className="font-semibold block mb-1">Our Pledge</span>
                <p className="opacity-75">
                  We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, disability, ethnicity, gender identity, nationality, or sexual orientation.
                </p>
              </div>
              <div>
                <span className="font-semibold block mb-1">Our Standards</span>
                <p className="opacity-75">
                  • Demonstrating empathy and kindness toward other people
                  • Respectful of differing viewpoints and constructive feedback
                  • Focusing on what is best for the overall open-source community
                </p>
              </div>
              <div>
                <span className="font-semibold block mb-1">Enforcement</span>
                <p className="opacity-75">
                  Instances of abusive behavior may be reported to conduct@pulseevent-vault.org. All reports are reviewed and investigated promptly and fairly.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: CONTRIBUTING */}
          {activeTab === 'contributing' && (
            <div
              className={`p-4 rounded border text-[11px] leading-relaxed space-y-3 ${
                isDarkMode ? 'bg-[#161616] border-[#292929]' : 'bg-[#fbfbfa] border-[#e9e9e7]'
              }`}
            >
              <div className="font-bold text-xs">Contributing Guidelines</div>
              <p className="opacity-75">
                We welcome contributions to PulseEvent Engine! Please keep the following architectural guidelines in mind:
              </p>
              <div>
                <span className="font-semibold block mb-0.5">1. Strict Zero Demo Data</span>
                <p className="opacity-75">Never pre-load mock images or dummy database rows.</p>
              </div>
              <div>
                <span className="font-semibold block mb-0.5">2. Notion Design System</span>
                <p className="opacity-75">Preserve subtle borders, quiet typography, and avoid neon AI gradients.</p>
              </div>
              <div>
                <span className="font-semibold block mb-0.5">3. Pull Request Steps</span>
                <p className="opacity-75">Fork, create a feature branch, run `npm run lint`, and submit your PR.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`px-5 py-3 border-t flex items-center justify-between shrink-0 text-xs ${
            isDarkMode ? 'border-[#2c2c2c] bg-[#181818]' : 'border-[#e9e9e7] bg-[#fbfbfa]'
          }`}
        >
          <span className="opacity-50 text-[11px]">Open-Source Repository Hub</span>
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
