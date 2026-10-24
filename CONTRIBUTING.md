# Contributing to PulseEvent Engine

Thank you for your interest in contributing to **PulseEvent Engine**! As an open-source project powered by open-weight AI and the Notion design system, we welcome contributions from developers, designers, accessibility advocates, and event organizers.

---

## 🛠️ Development Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/core.git
   cd core
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local dev environment**:
   ```bash
   npm run dev
   ```

4. **Verify TypeScript and Linting**:
   ```bash
   npm run lint
   ```

---

## 📌 Guiding Principles

1. **Strict Zero Demo Data Policy**:
   - Never pre-populate the database or live feeds with mock, fake, or dummy images.
   - All state must initialize empty with descriptive empty-state placeholders.
2. **Notion Design System Fidelity**:
   - Preserve clean whitespace, subtle hairline borders (`#e9e9e7` / `#2c2c2c`), system sans-serif typography, and cozy card layouts.
   - Do not introduce loud neon gradients or flashy AI template styling.
3. **Accessibility (WCAG 2.1 AA)**:
   - Ensure every ingested media record generates or supports comprehensive alt-text.
   - Maintain high text contrast and keyboard navigability.
4. **Open-Weight Gemma 4 Architecture**:
   - Preserve local fallbacks and open-weight model compatibility so the engine remains useful in offline or private edge deployments.

---

## 🔄 Pull Request Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Commit your changes with clear, semantic commit messages:
   ```bash
   git commit -m "feat: add keyboard shortcut for quick stage capture"
   ```
3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request against `main`. Provide a concise summary and screenshots of the UI state in both Light and Dark modes.

---

## 💬 Community & Questions

For discussions or questions regarding Gemma 4 prompt tuning and pipeline extensions, please open an issue on GitHub or reach out to the project maintainers.
