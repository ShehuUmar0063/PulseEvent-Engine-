# PulseEvent Engine — Instant Multimodal Event Reporter & Asset Vault

> **Instant Multimodal Event Intelligence & Asset Vault powered by Gemma 4 open weights and Notion-grade UX.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Model: Gemma 4](https://img.shields.io/badge/Model-Gemma%204%20(Open--Weight)-cyan.svg)](https://ai.google.dev/gemma)
[![UI: Notion Design](https://img.shields.io/badge/UI-Notion%20Design%20System-black.svg)](https://notion.so)
[![Zero Demo Data](https://img.shields.io/badge/Data%20Policy-Strict%20Zero%20Mock-emerald.svg)](#zero-demo-data-policy)

---

## ⚡ Overview

**PulseEvent Engine** is a production-ready, open-source web application designed for developer meetups, academic symposia, corporate conferences, and community workshops. It transforms transient stage moments (speaker slides, whiteboards, breakout cards, schedules) into structured, durable knowledge archives and distribution-ready press bulletins in real time.

Operating under a strict **Zero Demo Data Policy**, the workspace initializes completely empty, enabling organizers to ingest live media without mock data contamination.

---

## 🎯 Key Features

- **Gemma 4 Multimodal Reasoning Engine**:
  - Live `<|think|>` execution trace showcasing token-level vision analysis and OCR segmentation.
  - Automatic extraction of Session Name, Speaker & Credentials, Key Highlights & Quotes, Accessibility Alt-Text, and Sentiment Index.
- **Notion Design System**:
  - Minimalist typography, subtle borders, workspace navigation sidebar, cozy card structures, and high-density database views.
  - Seamless toggle between **Notion Clean Light** and **Notion Dark**.
- **Dynamic Bulletin Generator**:
  - Automatically compiles ingested media into broadcast-ready wire releases and platform-specific social posts (X / Twitter, LinkedIn, Mastodon).
  - One-click export of archival JSON and markdown bundles.
- **Interactive Asset Vault Database**:
  - Switch between **Table View** (with typed property headers: `Aa Session Name`, `👤 Speaker`, `🏷️ Category`, `📈 Sentiment`, `🕒 Created`) and **Gallery View**.
  - Deep-dive record inspector with full-resolution media, OCR extractions, and delete/export controls.
- **Zero Demo Data Guarantee**:
  - No seeded dummy rows, pre-loaded images, or fake schedules. Every vaulted asset originates from genuine user ingestion.
- **Multimodal Capture Pipeline**:
  - Drag-and-drop file ingestion (JPG, PNG, WebP).
  - Global clipboard paste (`⌘V` / `Ctrl+V`).
  - WebRTC live camera viewfinder with snapshot canvas.
  - Contextual synthetic stage slide generator for rapid testing in hermetic or headless sandboxes.

---

## 🏗️ Architecture

```
                                  [ User Media Ingestion ]
                        (Drag & Drop / Camera Frame / Clipboard)
                                            │
                                            ▼
                           [ Gemma 4 Multimodal Pipeline ]
                     ┌──────────────────────────────────────────────┐
                     │ 1. Patch Tokenization & Spatial OCR          │
                     │ 2. <|think|> Visual Reasoning Stream         │
                     │ 3. Entity Resolution (Speaker, Thesis, Quote)│
                     │ 4. WCAG AA Alt-Text & Sentiment Synthesis    │
                     └──────────────────────┬───────────────────────┘
                                            │
                        ┌───────────────────┴───────────────────┐
                        ▼                                       ▼
             [ Notion Asset Database ]              [ Instant Bulletin Engine ]
        ┌────────────────────────────────┐     ┌───────────────────────────────────┐
        │ • Real-time Table View         │     │ • Wire Press Releases (AP/Reuters)│
        │ • Gallery Cards View           │     │ • Social Posts (X, LinkedIn)      │
        │ • JSON & Markdown Archival     │     │ • Syndication Media Kits (.json)  │
        └────────────────────────────────┘     └───────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm or bun

### 1. Clone the repository

```bash
git clone https://github.com/pulseevent-engine/core.git
cd core
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables (Optional)

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

If you wish to use server-side Gemini Cloud acceleration alongside the local Gemma 4 open-weight engine, provide your `GEMINI_API_KEY`:

```env
GEMINI_API_KEY="your-api-key-here"
PORT=3000
```

*Note: PulseEvent Engine includes autonomous open-weight Gemma 4 reasoning fallbacks and runs smoothly even without an external API key.*

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Authentication & Default Credentials

PulseEvent Engine starts on a secure, gated login screen. You can unlock the workspace via:

- **1-Click Organizer Login**: Click the primary `Continue as Organizer` button.
- **Manual Credentials**:
  - **Username**: `organizer`
  - **Password**: `password`

---

## 📋 Event Context Presets

Organizers can switch the active context directly in the sidebar or settings to tune Gemma 4's extraction biases:

| Context Preset | Optimization Focus |
| :--- | :--- |
| **Hacktoberfest / Tech Meetup** | Code snippets, architectural whiteboards, dev slides, lightning talk highlights. |
| **Academic Conference** | Research formulas, formal symposium titles, academic citations, methodology notes. |
| **Corporate Summit** | Executive roadmaps, investor metrics, enterprise governance, strategic milestones. |
| **Workshop** | Civic collaboration boards, participant feedback stickies, grassroots project plans. |

---

## 🛡️ Open Source Community Standards

- [License (MIT)](LICENSE)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)

---

## 📄 License

PulseEvent Engine is licensed under the [MIT License](LICENSE).
Copyright (c) 2026 PulseEvent Engine Contributors.
