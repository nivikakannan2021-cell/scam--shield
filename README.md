# ScamShield AI 🛡️

> **"Detect. Understand. Stay Safe."**  
> *Protect yourself before you click.*

ScamShield AI is a modern AI-assisted scam detection SaaS web application engineered to protect digital citizens from deceptive messages, phishing vectors, and social engineering attacks.

---

## ✨ Features

- **📸 Screenshot & Image Upload Analysis (NEW)**: Upload or drag & drop screenshots of SMS alerts, phishing emails, or fake banking portals with client-side OCR text extraction and computer vision spoofing detection.
- **🛡️ AI-Assisted Scam Detection**: Real-time pattern detection analyzing urgency triggers, credential solicitation, and spoofed domains.
- **📊 Calibrated Risk Scoring (0–100)**: Multi-signal risk assessment with circular gauge visualization and accessible status badges (LOW, MEDIUM, HIGH).
- **💡 Transparent Explainability**: Translates complex NLP heuristics into clear explanations detailing *why* a message is malicious.
- **🏷️ Scam Taxonomy Classification**: Automatically classifies threats (e.g., Fake Verification Scam, Delivery Smishing, Advance-Fee Prize Fraud, Credential Harvesting).
- **⚠️ Suspicious Indicators Breakdown**: Pinpoints exact manipulative phrases and assigns severity ratings.
- **🔒 Actionable Safety Recommendations**: Tailored defensive directives (e.g., *"Never share OTP, PIN, CVV or passwords"*).
- **📈 Security Operations Dashboard**: Interactive CSS/SVG risk distribution charts and metrics tracking.
- **📜 Scan History & JSON Export**: Local audit log of past evaluations with search and filtering by text or screenshot.
- **🔌 Plug-and-Play API Ready**: Clean abstraction layer in `src/services/scamAnalyzer.js` designed for direct connection to future Python / FastAPI / PyTorch backends without rewriting frontend code.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Language**: JavaScript (ESNext)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS Design System with Cyber SaaS Dark Mode

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/nivikakannan2021-cell/scam--shield.git
cd scam--shield
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🗺️ Application Architecture

```
scamshield-ai/
├── src/
│   ├── assets/              # Static branding and icons
│   ├── components/
│   │   ├── common/          # CircularGauge, RiskBadge
│   │   ├── dashboard/       # StatCard, RiskChart
│   │   └── layout/          # PublicNavbar, PublicFooter, AppLayout, AppSidebar, AppHeader
│   ├── context/
│   │   ├── AuthContext.jsx       # Mock SaaS authentication & session state
│   │   └── AnalysisContext.jsx   # Threat analysis engine state & history
│   ├── pages/
│   │   ├── app/             # Authenticated SaaS routes (Dashboard, Analyze, Result, History, Settings)
│   │   └── public/          # Public routes (Splash, Home, How It Works, About, Login, Signup)
│   ├── services/
│   │   ├── mockData.js      # Baseline metrics, pre-seeded analyses, text & screenshot samples
│   │   └── scamAnalyzer.js  # Multi-modal NLP & Computer Vision OCR simulation
│   ├── App.jsx              # Application router
│   ├── index.css            # Global CSS theme & cyber design tokens
│   └── main.jsx             # Entry point
```

---

## 📄 License
MIT License © 2026 ScamShield AI
