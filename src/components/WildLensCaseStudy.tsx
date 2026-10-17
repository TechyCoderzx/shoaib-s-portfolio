import { ArrowRight, Check, Github, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioConfig } from "@/lib/portfolio-config";

const stages = [
  "User Photo / Camera Capture",
  "Image Validation & Processing",
  "Vision Model / Species Identification",
  "Evidence Extraction & Lookalike Analysis",
  "Observe Next Suggestions",
  "Interactive WildLens Interface",
];
const features = [
  ["Photo Identification", "Upload a photograph or capture one using a device camera to identify potential birds, insects, and plants."],
  ["Evidence-First Identification", "Present visible characteristics that support a suggested identification."],
  ["Lookalike Detective", "Explore similar species and understand the distinguishing features between them."],
  ["Observe Next", "Suggest additional characteristics or details users can inspect to learn more."],
  ["Camera & Upload Support", "Support photo selection, preview, replacement, and camera capture."],
  ["Privacy-Conscious AI", "Explore open-weight models and local inference where feasible."],
];
const contributions = [
  "Project concept and feature design",
  "Frontend development and responsive interface",
  "Backend API development and integration",
  "Vision-model integration for image identification",
  "Evidence-first identification and lookalike analysis features",
  "Camera capture and image-upload workflow",
  "Privacy-conscious, open-weight AI exploration",
  "Testing, integration, and project development",
];
const technologies = ["Python", "FastAPI", "React", "Vite", "JavaScript", "HTML/CSS", "Ollama", "Open-Weight Models", "ElevenLabs"];

export function WildLensCaseStudy({ onClose }: { onClose: () => void }) {
  return (
    <section id="wildlens-case-study" className="case-study wildlens-case" aria-label="WildLens case study">
      <div className="case-intro">
        <p className="eyebrow">WildLens / Case Study</p>
        <h3>Discover the wild. Understand what you see.</h3>
        <Button variant="ghost" size="icon" className="icon-button" onClick={onClose} aria-label="Close WildLens case study"><X /></Button>
        <p className="wildlens-case-summary">WildLens is an AI-powered nature exploration web application that helps users identify birds, insects, and plants from photographs. It goes beyond identification by presenting visible evidence, comparing lookalike species, and suggesting what users should observe next.</p>
        <p className="wildlens-case-summary">Built for the Hacktoberfest Open-Source AI Challenge, WildLens explores privacy-conscious, open-weight AI and local-first inference where feasible.</p>
      </div>
      <div className="case-grid">
        <div><span>01 — The Problem</span>
          <p>Identifying wildlife from a photograph can be difficult, especially when similar species share visual characteristics. Many identification tools provide a predicted name without adequately explaining which visible features support that prediction or how to distinguish it from similar species.</p>
          <p>WildLens addresses this by making nature exploration more evidence-focused and educational, helping users understand what they are seeing rather than simply receiving a label.</p>
        </div>
        <div><span>02 — The Idea</span>
          <p>WildLens combines AI-assisted species identification with evidence-based exploration.</p>
          <p>Users can upload a photograph or capture one using their device camera to explore a possible identification. The interface presents visible clues supporting the suggestion, highlights similarities and differences between lookalike species, and recommends additional details to observe.</p>
          <p>The project also explores a privacy-conscious, open-weight AI architecture, with local inference and offline capabilities where supported by the selected model and deployment environment.</p>
        </div>
      </div>
      <div className="architecture">
        <span>03 — Architecture</span>
        <div className="architecture-flow wildlens-flow">
          {stages.map((stage, i) => <div key={stage}><b>{stage}</b>{i < stages.length - 1 && <ArrowRight aria-hidden="true" />}</div>)}
        </div>
        <p className="wildlens-architecture-note">Open-weight models · Privacy-conscious design · Local inference where feasible</p>
      </div>
      <div className="case-grid lower">
        <div><span>04 — Key Features</span><ul className="wildlens-case-features">{features.map(([title, detail]) => <li key={title}><Check aria-hidden="true" /><div><b>{title}</b><p>{detail}</p></div></li>)}</ul></div>
        <div><span>05 — My Contribution</span><p>WildLens is my solo project. I developed the concept and implementation, including:</p><ul>{contributions.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div>
        <div><span>06 — Technology</span><div className="tag-list">{technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
        <div><span>07 — Repository</span><p>Explore the WildLens source code, implementation, and project development on GitHub.</p>
          <Button asChild variant="ghost" className="action-link"><a href={portfolioConfig.wildLens.github} target="_blank" rel="noopener noreferrer"><Github /> GitHub repository</a></Button>
        </div>
      </div>
    </section>
  );
}

export function WildLensVisualization() {
  return (
    <div className="engine-visual wildlens-visual" role="img" aria-label="WildLens abstract specimen-analysis visualization">
      <div className="wildlens-field">
        <div className="wildlens-field-header">WILDLENS / FIELD_OBSERVATION</div>
        <div className="wildlens-field-status"><span className="status-dot" /> SPECIES_ANALYSIS</div>
        <svg className="wildlens-specimen" viewBox="0 0 320 300" fill="none" aria-hidden="true">
          <g className="wildlens-rings"><circle cx="160" cy="150" r="114" /><circle cx="160" cy="150" r="91" strokeDasharray="3 8" /><path d="M160 18v25m0 214v25M28 150h25m214 0h25" /></g>
          <g className="wildlens-leaves"><path d="M160 239V74m0 101c-54 0-76-30-76-64 42 0 76 20 76 64Zm0 24c50 0 77-28 77-63-43 0-77 24-77 63Zm0-68c-31-17-37-50-18-76 29 18 40 46 18 76Z" /><path d="m160 175-57-48m57 72 57-48m-57-20-15-53" /></g>
          <g className="wildlens-markers"><circle cx="160" cy="175" r="4" /><circle cx="217" cy="151" r="3" /><path d="M74 77h18M83 68v18m149 132h18m-9-9v18" /></g>
        </svg>
        <div className="wildlens-indicators">{["IDENTIFICATION", "VISUAL EVIDENCE", "OBSERVE NEXT"].map((label) => <div key={label}><span>{label}</span><i aria-hidden="true" /></div>)}</div>
        <div className="wildlens-field-footer"><span>OPEN-WEIGHT VISION</span><span>LOCAL INFERENCE</span></div>
      </div>
    </div>
  );
}