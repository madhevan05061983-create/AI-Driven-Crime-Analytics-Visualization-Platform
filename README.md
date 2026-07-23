# Karnataka State Police (KSP) Crime Analytics Platform

> **State Crime Records Bureau (SCRB) HQ • Intelligence & Predictive Analytics Engine**

An AI-driven, full-stack crime intelligence and visualization platform designed for the Karnataka State Police (KSP) State Crime Records Bureau (SCRB). The platform transitions law enforcement operations from reactive incident response to evidence-based, proactive deterrence through spatiotemporal clustering, cross-jurisdictional link analysis, socio-economic risk correlation, and server-side Google Gemini AI intelligence.

---

## 🌟 Key Features

### 1. 🗺️ Spatiotemporal Hotspot & Geographic Clustering
- **District-Level Heatmaps**: Visualizes registered crime volume, crime density per 100k citizens, and active hotspots across all 31 Karnataka districts.
- **Time-of-Day Analysis**: Filters incidents across 4 operational shifts: *Morning (06:00–12:00)*, *Afternoon (12:00–17:00)*, *Evening (17:00–22:00)*, and *Night (22:00–06:00)*.
- **High-Density Corridors**: Highlights critical corridors like Bengaluru Urban Indiranagar tech fraud zones, Belagavi NH-48 truck ambush routes, and Mangaluru coastal extortion hubs.

### 2. 🕸️ Criminological Network & Association Graph
- **Silo Reconciliation**: Links isolated police station records into a unified multi-station graph.
- **Node-Link Visualizer**: Graphically connects Suspects, FIR Incidents, Gangs/Syndicates, Modus Operandi (MO) tags, Vehicle Reg Numbers, and Mule Mobile Devices.
- **AI Hidden Link Discovery**: Auto-detects cross-district shared hardware (e.g., mule SIM cards used across Bengaluru and Hubballi) and syndicate crypto wallet routes.

### 3. 📈 Sociological Correlation & AI Predictive Risk Scoring
- **Socio-Economic Overlays**: Overlay youth unemployment rates, urbanization levels, literacy indices, and police-to-citizen ratios against crime incidence to identify root structural drivers.
- **7–30 Day Predictive Forecasting**: Forecasts upcoming high-risk jurisdictions with recommended police deployments (PCR van allocation, patrol windows, specific hotspot focus).
- **Behavioral Anomaly Detection**: AI flags spatial and temporal outliers that deviate significantly from baseline historical station patterns.

### 4. 🤖 Gemini AI Intelligence Engine
Powered by server-side **Google Gemini 3.6 Flash** via the modern `@google/genai` SDK:
- **Automated MO Extractor**: Converts raw FIR narrative statements and complainant inputs into structured MO signatures, suspect age estimates, probable vehicles, and historical cross-district matches.
- **SCRB Executive Report Generator**: Drafts official multi-section state crime intelligence briefs for DGPs, Inspector Generals, and Superintendents.
- **State Crime Query Assistant**: Real-time conversational AI assisting officers with suspect cross-referencing, syndicate profiling, and crime trend queries.

### 5. 🗄️ Database Architecture & Catalyst Service Specification
- **Relational ERD**: Complete entity specification for `districts`, `police_stations`, `crime_incidents`, `suspect_profiles`, `criminal_networks`, and `predictive_forecasts`.
- **Catalyst by Zoho Mapping**: Detailed platform capability matrix mapping KSP modules to Catalyst Data Store, AppSail, Zia AI, QuickML, and Event Listeners.
- **Prototype Brief**: Complete documentation covering Problem Statement, Solution Impact, Tech Stack, and Deployment Specs.

---

## 🏗️ Technology Stack

| Component | Technology / Library |
| :--- | :--- |
| **Frontend UI** | React 19, TypeScript, Tailwind CSS |
| **Data Visualization** | Recharts, Lucide Icons, SVG Graph Engines |
| **Backend API** | Express.js, Node.js |
| **AI SDK** | `@google/genai` (Google Gemini 3.6 Flash) |
| **Deployment Platform** | Catalyst by Zoho (AppSail / Slate) & Cloud Run |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and `npm`
- Gemini API Key (set as `GEMINI_API_KEY` in environment variables)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ksp-scrb/ai-crime-analytics-platform.git
   cd ai-crime-analytics-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📡 Backend API Endpoints

- `POST /api/gemini/analyze-mo`: Analyzes raw FIR narrative text to extract MO tags, suspect profile hints, and historical match scoring.
- `POST /api/gemini/generate-report`: Generates structured, confidential executive SCRB crime intelligence briefs in Markdown.
- `POST /api/gemini/chat`: Handles conversational officer queries against state crime database context.

---

## 🔐 Security & Governance

- All AI communications execute strictly on the server-side proxy (`/api/*`), ensuring API keys are never exposed to browser runtimes.
- Built-in audit trail and terminal tracking for State Crime Records Bureau HQ compliance.

---

## 📜 License & Compliance

Developed for the **Karnataka State Police (KSP)** State Crime Records Bureau (SCRB). Hosted on Catalyst by Zoho cloud infrastructure.
