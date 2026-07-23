import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "KSP SCRB AI Crime Analytics Engine" });
});

// 1. Analyze FIR / Incident Narrative for MO & Suspect Linkage
app.post("/api/gemini/analyze-mo", async (req, res) => {
  try {
    const { narrative, district, crimeCategory } = req.body;
    if (!narrative) {
      return res.status(400).json({ error: "Narrative text is required" });
    }

    const ai = getGeminiClient();
    const prompt = `
You are an expert Senior Criminologist and Intelligence Analyst at Karnataka State Police (KSP) State Crime Records Bureau (SCRB).
Analyze the following Crime Incident FIR narrative for District: "${district || "Karnataka"}", Category: "${crimeCategory || "General Crime"}".

Narrative:
"${narrative}"

Perform deep Modus Operandi (MO) extraction, behavioral profiling, and suspect linkage analysis.
Return your output in strict JSON format matching this schema:
{
  "extractedMO": "Concise summary of the Modus Operandi",
  "moTags": ["Array", "of", "4-6", "specific", "MO", "tags"],
  "suspectProfile": {
    "estimatedAgeGroup": "e.g., 20-30 years",
    "modusType": "e.g., Serial / Organized / Opportunistic",
    "probableVehicle": "e.g., Stolen Scooter / SUV / Foot",
    "keyBehavioralTraits": ["trait 1", "trait 2"]
  },
  "riskSeverity": "Low" | "Medium" | "High" | "Critical",
  "crossDistrictLinkages": [
    {
      "district": "e.g., Bengaluru Urban",
      "similarPastMO": "Reason why this resembles past incidents in that district",
      "confidenceScore": 85
    }
  ],
  "investigativeNextSteps": [
    "Step 1: Actionable police station task",
    "Step 2: CCTV / Digital forensic recommendation",
    "Step 3: Network mapping trigger"
  ],
  "anomalyDetected": true or false,
  "anomalyExplanation": "Explain if this departs from historical patterns"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text || "{}";
    const parsed = JSON.parse(resultText);
    res.json({ success: true, data: parsed });
  } catch (err: any) {
    console.error("Error in /api/gemini/analyze-mo:", err);
    res.status(500).json({
      error: "Failed to analyze MO narrative",
      details: err?.message || String(err),
    });
  }
});

// 2. Generate Executive SCRB Intelligence Report
app.post("/api/gemini/generate-report", async (req, res) => {
  try {
    const { district, timeRange, focusCategory, summaryStats } = req.body;

    const ai = getGeminiClient();
    const prompt = `
You are the Director General of Police (DGP) / Head of State Crime Records Bureau (SCRB), Karnataka State Police (KSP).
Draft an official, highly authoritative "Karnataka Crime Intelligence & Strategic Prevention Report".

Context:
- Target District / Scope: ${district || "State-wide Karnataka SCRB"}
- Time Window: ${timeRange || "Q3 2026"}
- Primary Focus Area: ${focusCategory || "Spatiotemporal Hotspots, Cyber Fraud & Organized Syndicates"}
- Key Dataset Stats: ${JSON.stringify(summaryStats || { totalIncidents: 142, hotspotsIdentified: 8, repeatOffenders: 18 })}

Structure your report into clear Markdown sections:
1. Executive Summary & State Risk Overview
2. Spatiotemporal Hotspot Analysis & Peak Time Vulnerabilities
3. Criminological Network & Gang Syndicate Linkages
4. Socio-Economic Drivers & Correlation Insights
5. Actionable Proactive Policing Deployment Recommendations (Police Station assignments, PCR vans, CCTV checkpoints)
6. Evidence-Based Prevention Strategy for SCRB

Keep the tone professional, authoritative, evidence-based, and actionable for superintendents and station house officers (SHOs).
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ success: true, report: response.text });
  } catch (err: any) {
    console.error("Error in /api/gemini/generate-report:", err);
    res.status(500).json({
      error: "Failed to generate SCRB report",
      details: err?.message || String(err),
    });
  }
});

// 3. AI Assistant Q&A Chat Endpoint
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, contextData } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    const prompt = `
You are KSP-AI, an intelligent Crime Analytics Assistant for Karnataka State Police (KSP) & SCRB.
You assist Police Officers, Sub-Inspectors, and Data Analysts in querying crime trends, suspect networks, MO patterns, and district risk scores across Karnataka.

Current Active Dataset Context:
${JSON.stringify(contextData || {})}

User Query: "${message}"

Provide a concise, direct, evidence-based answer with specific bullet points, district callouts, MO references, or recommended police tactical responses.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ success: true, reply: response.text });
  } catch (err: any) {
    console.error("Error in /api/gemini/chat:", err);
    res.status(500).json({
      error: "Chat request failed",
      details: err?.message || String(err),
    });
  }
});

async function startServer() {
  // Vite middleware for dev or static server for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.use((_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KSP Crime Analytics Platform server running on http://localhost:${PORT}`);
  });
}

startServer();
