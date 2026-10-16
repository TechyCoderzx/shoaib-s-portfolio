import { GitHubActivity } from "@/components/GitHubActivity";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BookOpen,
  Braces,
  Check,
  ChevronDown,
  CircleDot,
  Code2,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Network,
  Phone,
  Play,
  Send,
  Terminal,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import constellation from "../assets/neural-constellation.jpg";
import portraitAsset from "../assets/shoaib-portrait.png.asset.json";
import { HeroConstellation } from "../components/HeroConstellation";
import { ParticlePortrait } from "../components/ParticlePortrait";
import { MilestoneCarousel } from "../components/MilestoneCarousel";

const riptideSlides: { src: string; alt: string }[] = [];
import { ArrowUpRight } from "lucide-react";
import gdgCeremony from "../assets/gdg-award-ceremony.png.asset.json";
import wildlensPhoto from "../assets/wildlens-peafowl.jpg";
import gdgGroup from "../assets/gdg-group-photo.jpeg.asset.json";
import { isPlaceholder, portfolioConfig as profile } from "../lib/portfolio-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shoaib Junaid Khan — Computer Science Student & Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Shoaib Junaid Khan, a CSE undergraduate at SRM University–AP exploring software engineering, full-stack development, AI, and computer science research.",
      },
      {
        property: "og:title",
        content: "Shoaib Junaid Khan — Computer Science Student & Software Developer",
      },
      {
        property: "og:description",
        content:
          "Projects, experiments, and the software engineering journey of a CSE undergraduate at SRM University–AP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Achievements",
  "Education",
  "Contact",
];
const skillGroups = {
  Languages: ["C", "C++", "Java"],
  Development: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "FastAPI",
    "REST APIs",
    "Full-Stack Development",
  ],
  "Backend & Data": ["Supabase", "PostgreSQL", "API Development", "Data Validation"],
  "Computer Science": [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Problem Solving",
    "Software Design",
    "Computer Networks",
  ],
};
const architecture = [
  "DC Motor",
  "Sensors",
  "ESP32",
  "Wi-Fi",
  "FastAPI",
  "Validation & Processing",
  "Supabase",
  "Dashboard",
  "Trust / Explanation Layer",
];
const pulseTech = [
  "C++",
  "ESP32",
  "FastAPI",
  "Python",
  "Pydantic",
  "Supabase",
  "PostgreSQL",
  "HTML/CSS/JavaScript",
  "Sensor telemetry",
  "REST API",
];
const contributions = [
  "Backend development",
  "Frontend/dashboard development",
  "Database integration",
  "Telemetry API integration",
  "Data validation",
  "Dashboard implementation",
];

const builtProjects: Array<{
  title: string;
  category: string;
  status: string;
  accent: "pulse" | "wild" | "ascent";
  tagline?: string;
  description: string;
  tech: string[];
  links: Array<[string, string]>;
}> = [
  {
    title: "PulseTrust",
    category: "IoT / Sensor trust / Full-stack",
    status: "Prototype",
    accent: "pulse",
    description:
      "An industrial sensor-trust prototype exploring sensor reliability and monitoring through connected hardware and a live dashboard — ESP32 data collection, a FastAPI backend, Supabase storage, and a React dashboard.",
    tech: ["ESP32", "DS18B20", "MPU6050", "FastAPI", "Supabase", "React"],
    links: [
      ["GitHub", profile.pulseTrust.github],
      ["Video demo", profile.pulseTrust.demo],
    ],
  },
  {
    title: "WildLens",
    category: "AI / Computer vision / Nature",
    status: "Hackathon project",
    accent: "wild",
    tagline: "Discover the wild. Understand what you see.",
    description:
      "Identifies birds, insects, and plants from photographs, then shows supporting visual evidence, compares lookalike species, and suggests what to observe next — exploring open-weight models and privacy-conscious inference.",
    tech: ["Python", "FastAPI", "React", "Vite", "Ollama", "Open-weight vision", "ElevenLabs"],
    links: isPlaceholder(profile.wildLens.github) ? [] : [["GitHub", profile.wildLens.github]],
  },
  {
    title: "AscentOptima",
    category: "Systems engineering / Optimization",
    status: "Prototype",
    accent: "ascent",
    description:
      "An elevator-optimization project exploring how dispatching and scheduling strategies can improve elevator allocation, passenger waiting times, and overall system efficiency.",
    tech: [],
    links: [],
  },
];

function PulsePreview() {
  const points = [30, 34, 31, 38, 36, 42, 40, 39, 45, 43, 47, 44];
  const path = points.map((v, i) => `${i === 0 ? "M" : "L"}${i * 18} ${60 - v}`).join(" ");
  return (
    <div className="bp-pulse">
      <div className="bp-pulse-chips">
        <span>ESP32</span>
        <span>DS18B20</span>
        <span>MPU6050</span>
      </div>
      <svg viewBox="0 0 200 60" preserveAspectRatio="none">
        <path d={path} />
      </svg>
      <div className="bp-pulse-stats">
        <div>
          <small>Temp</small>
          <b>--.- °C</b>
        </div>
        <div>
          <small>Motion</small>
          <b>x / y / z</b>
        </div>
        <div>
          <small>Trust</small>
          <b>score</b>
        </div>
      </div>
    </div>
  );
}

function AscentPreview() {
  const floors = [6, 5, 4, 3, 2, 1];
  const cars = [4, 1, 6];
  return (
    <div className="bp-ascent">
      <div className="bp-floors">
        {floors.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
      {cars.map((pos, i) => (
        <div key={i} className="bp-shaft">
          <i style={{ bottom: `${((pos - 1) / 6) * 100}%` }} />
        </div>
      ))}
      <div className="bp-dispatch">
        <small>Dispatch queue</small>
        <span>F3 ↑ → Car B</span>
        <span>F5 ↓ → Car A</span>
      </div>
    </div>
  );
}

function SmartLink({
  value,
  children,
  className = "",
  download = false,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
  download?: boolean;
}) {
  const unavailable = isPlaceholder(value) || value.startsWith("/assets/");
  const isDirect = value.startsWith("mailto:") || value.startsWith("tel:");
  return unavailable ? (
    <button
      className={`action-link is-disabled ${className}`}
      type="button"
      aria-label={`${String(children)} — awaiting details`}
      title="Link will be added soon"
    >
      {children}
      <span className="availability">Soon</span>
    </button>
  ) : isDirect ? (
    <a className={`action-link ${className}`} href={value}>
      {children}
    </a>
  ) : (
    <a
      className={`action-link ${className}`}
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      download={download}
    >
      {children}
    </a>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
  copy,
}: {
  index: string;
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="section-heading reveal">
      <div>
        <span className="index">{index}</span>
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <div>
        <h2>{title}</h2>
        {copy && <p className="section-copy">{copy}</p>}
      </div>
    </header>
  );
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [skillTab, setSkillTab] = useState("Languages");
  const [caseOpen, setCaseOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formNotice, setFormNotice] = useState("");

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const firstCharacter = entry.target.id.charAt(0);
          if (entry.isIntersecting && firstCharacter)
            setActive(firstCharacter.toUpperCase() + entry.target.id.slice(1));
        }),
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );
    navItems.forEach((item) => {
      const el = document.getElementById(item.toLowerCase());
      if (el) sectionObserver.observe(el);
    });
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const scrollTo = (name: string) => {
    document.getElementById(name.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const activeSkills = useMemo(() => skillGroups[skillTab as keyof typeof skillGroups], [skillTab]);
  const copyPlaceholder = async () => {
    await navigator.clipboard.writeText(profile.primaryEmail);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormNotice("This form is ready to connect, but messages are not being sent yet.");
  };

  return (
    <main>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <nav className="nav-shell" aria-label="Main navigation">
        <button className="brand" onClick={() => scrollTo("Home")} aria-label="Go to home">
          <span className="brand-mark">
            <span />
          </span>
          <span className="nav-signature">
            SJK<span className="accent-dot">.</span>
          </span>
        </button>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <button
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => scrollTo(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <SmartLink value={profile.resumeUrl} className="nav-resume" download>
            <Download /> Resume
          </SmartLink>
        </div>
      </nav>

      <section id="home" className="hero">
        <HeroConstellation imageSrc={constellation} />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="hero-kicker">
            <span className="status-dot" /> Available to learn, build & collaborate
          </div>
          <h1>Shoaib Junaid Khan</h1>
          <div className="hero-bottom">
            <div className="hero-role">
              <p>Computer Science Undergraduate</p>
              <p>& Aspiring Software Engineer</p>
            </div>
            <div className="hero-intro">
              <p>Currently turning caffeine, curiosity, and questionable ideas into projects.</p>
              <p className="muted">
                Exploring software engineering, full-stack development, AI, and computer science
                research.
              </p>
            </div>
          </div>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => scrollTo("Projects")}>
              View projects <ArrowDown />
            </button>
            <SmartLink value={profile.github}>
              <Github /> GitHub
            </SmartLink>
            <SmartLink value={profile.resumeUrl} download>
              <Download /> Resume
            </SmartLink>
            <button className="action-link" onClick={() => scrollTo("Contact")}>
              <Mail /> Contact
            </button>
          </div>
        </div>
        <div className="hero-meta">
          <span>SRM University–AP</span>
          <span>Andhra Pradesh, India</span>
        </div>
      </section>

      <section id="about" className="page-section">
        <SectionHeading
          index="01"
          eyebrow="A little context"
          title="I’m learning how good software gets built — then building it."
        />
        <div className="about-grid reveal">
          <ParticlePortrait imageSrc={portraitAsset.url} />
          <div className="about-copy">
            <p className="large-copy">
              I am pursuing a Bachelor’s degree in Computer Science and Engineering at SRM
              University–AP. I enjoy understanding how software works, shaping ideas into projects,
              and exploring the choices that make systems thoughtful, reliable, and useful.
            </p>
            <p>
              I’m currently strengthening my foundations in C++, Java, data structures and
              algorithms while growing through full-stack development, artificial intelligence, and
              computer science research.
            </p>
            <blockquote>
              “I’m particularly interested in the intersection of strong software fundamentals,
              practical development, and research-driven problem solving.”
            </blockquote>
          </div>
        </div>
      </section>

      <section id="skills" className="page-section skills-section">
        <SectionHeading
          index="02"
          eyebrow="Working knowledge"
          title="The Direction Ahead."
          copy="Exploring technologies and ideas that shape what comes next."
        />
        <div className="skill-interface reveal">
          <div className="skill-tabs" role="tablist" aria-label="Skill categories">
            {Object.keys(skillGroups).map((tab, i) => (
              <button
                key={tab}
                role="tab"
                aria-selected={skillTab === tab}
                onClick={() => setSkillTab(tab)}
              >
                <span>0{i + 1}</span>
                {tab}
              </button>
            ))}
          </div>
          <div className="skill-display" role="tabpanel">
            <p className="terminal-label">
              <Terminal /> /knowledge/{skillTab.toLowerCase().replaceAll(" ", "-")}
            </p>
            <div className="skill-list">
              {activeSkills.map((skill, i) => (
                <div className="skill-row" key={skill}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{skill}</strong>
                  <small>
                    {["React", "FastAPI", "Supabase", "PostgreSQL", "Computer Networks"].includes(
                      skill,
                    )
                      ? "Exploring"
                      : "Building with"}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="page-section">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title="Things I’ve built."
          copy="Projects, experiments, and ideas I’m turning into working software."
        />
        <article className="featured-project reveal">
          <div className="project-visual placeholder-visual">
            <div className="visual-grid" />
            <div className="monitor-panel">
              <div>
                <span className="status-dot" /> TELEMETRY_STREAM
              </div>
              <strong>TRUST / 0.––</strong>
              <div className="signal-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <small>PULSETRUST_IMAGE_HERE</small>
            </div>
          </div>
          <div className="project-body">
            <div className="project-number">PROJECT / 001</div>
            <div className="status-label">
              <span className="status-dot" /> Team project
            </div>
            <h3>PulseTrust_</h3>
            <p className="project-thesis">
              Don’t just show what the machine says. Show how much you can trust what it says — and
              why.
            </p>
            <p>
              An intelligent industrial monitoring platform designed to evaluate real-time machine
              sensor data, detect anomalies, provide evidence for decisions, and explain findings.
            </p>
            <div className="tag-list">
              {pulseTech.slice(0, 7).map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="project-actions">
              <SmartLink value={profile.pulseTrust.github}>
                <Github /> GitHub
              </SmartLink>
              <SmartLink value={profile.pulseTrust.demo}>
                <Play /> Video demo
              </SmartLink>
              <button
                className="primary-button"
                onClick={() => setCaseOpen(!caseOpen)}
                aria-expanded={caseOpen}
              >
                Case study <ChevronDown className={caseOpen ? "rotate" : ""} />
              </button>
            </div>
          </div>
        </article>
        {caseOpen && (
          <div className="case-study">
            <div className="case-intro">
              <p className="eyebrow">PulseTrust_ / Case study</p>
              <h3>From raw readings to reasoned trust.</h3>
              <button
                className="icon-button"
                onClick={() => setCaseOpen(false)}
                aria-label="Close case study"
              >
                <X />
              </button>
            </div>
            <div className="case-grid">
              <div>
                <span>01 — The Problem</span>
                <p>
                  Industrial decisions often rely on raw sensor readings without clearly
                  communicating whether those readings are reliable. A value can look precise while
                  the underlying signal is unstable, inconsistent, or anomalous.
                </p>
              </div>
              <div>
                <span>02 — The Idea</span>
                <p>
                  PulseTrust_ explores a more useful question: not only “what does the sensor
                  report?” but “how much should we trust it, and what evidence supports that
                  assessment?”
                </p>
              </div>
            </div>
            <div className="architecture">
              <span>03 — Architecture</span>
              <div className="architecture-flow">
                {architecture.map((item, i) => (
                  <div key={item}>
                    <b>{item}</b>
                    {i < architecture.length - 1 && <ArrowRight />}
                  </div>
                ))}
              </div>
            </div>
            <div className="case-grid lower">
              <div>
                <span>04 — My Contribution</span>
                <ul>
                  {contributions.map((item) => (
                    <li key={item}>
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span>05 — Technology</span>
                <div className="tag-list">
                  {pulseTech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <span>06 — Demo</span>
                <div className="media-placeholder">
                  <Play />
                  <p>PULSETRUST_VIDEO_HERE</p>
                </div>
              </div>
              <div>
                <span>07 — Repository</span>
                <p>
                  The project repository is shared by the team. Its verified URL will be added here.
                </p>
                <SmartLink value={profile.pulseTrust.github}>
                  <Github /> Shared repository
                </SmartLink>
              </div>
            </div>
          </div>
        )}
        <article className="secondary-project wildlens-project reveal">
          <div className="project-body">
            <div className="project-number">PROJECT / 002</div>
            <div className="status-label wildlens-status">
              <span className="status-dot" /> Hackathon project / Built
            </div>
            <div className="wildlens-category">AI / Nature exploration</div>
            <h3>WildLens</h3>
            <p className="wildlens-tagline">Discover the wild. Understand what you see.</p>
            <p>
              WildLens transforms nature photography into an interactive learning experience.
              Identify birds, insects, and plants, explore the visual evidence behind predictions,
              compare similar species, and discover what to observe next. Built around open-weight
              AI and privacy-conscious inference, WildLens makes exploring the natural world more
              informative and accessible.
            </p>
            <p className="wildlens-context">Built for the Hacktoberfest Open-Source AI Challenge.</p>
            <ul className="wildlens-features">
              {[
                ["Evidence-first identification", "Shows the visual clues behind a suggestion."],
                ["Lookalike Detective", "Explore similar species and how they differ."],
                ["Observe Next", "Details to inspect to learn more about the subject."],
                ["Privacy-conscious AI", "Open-weight models with local inference where supported."],
              ].map(([title, detail]) => (
                <li key={title}>
                  <b>{title}</b>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <div className="tag-list">
              {[
                "AI / Computer Vision",
                "Python",
                "FastAPI",
                "React",
                "Vite",
                "Ollama",
                "Open-Weight Models",
                "ElevenLabs",
              ].map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="project-actions">
              <SmartLink value={profile.wildLens.github}>
                <Github /> GitHub
              </SmartLink>
            </div>
          </div>
          <div className="engine-visual wildlens-visual" aria-label="Illustrative WildLens interface preview">
            <div className="wl-app">
              <div className="window-bar">
                <i />
                <i />
                <i />
                <span>wildlens / identify</span>
              </div>
              <div className="wl-photo">
                <img src={wildlensPhoto} alt="Indian Peafowl perched on a branch" loading="lazy" />
                <div className="wl-upload">
                  <span>Upload photo</span>
                  <span>Camera</span>
                </div>
              </div>
              <div className="wl-result">
                <div className="wl-id">
                  <small>Suggested identification</small>
                  <strong>Indian Peafowl</strong>
                  <em>Pavo cristatus · Bird</em>
                </div>
                <div className="wl-evidence">
                  <small>Visual evidence</small>
                  {[
                    ["Blue neck & breast", 88],
                    ["Fan-shaped crest", 74],
                    ["Eyespot train", 62],
                  ].map(([clue, w]) => (
                    <div key={clue as string}>
                      <span>{clue}</span>
                      <i style={{ width: `${w}%` }} />
                    </div>
                  ))}
                </div>
                <div className="wl-cards">
                  <div>
                    <small>Fact</small>
                    <p>National bird of India; often seen near forest edges and farmland.</p>
                  </div>
                  <div>
                    <small>Lookalike Detective</small>
                    <p>Green Peafowl — green neck, upright crest.</p>
                  </div>
                  <div>
                    <small>Observe next</small>
                    <p>Check the crest shape and the colour of the neck feathers.</p>
                  </div>
                </div>
              </div>
            </div>
            <small>Illustrative preview</small>
          </div>
        </article>
      </section>

      <section className="page-section next-section built-section">
        <SectionHeading
          index="04"
          eyebrow="Selected work / 2026"
          title="Things I’ve built."
          copy="A collection of experiments, engineering projects, and ideas turned into working prototypes."
        />
        <div className="built-grid reveal">
          {builtProjects.map((project, i) => (
            <article key={project.title} className={`built-card built-${project.accent}`}>
              <div className="built-meta">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{project.category}</span>
              </div>
              <div className="built-preview" aria-hidden="true">
                {project.accent === "pulse" && <PulsePreview />}
                {project.accent === "wild" && (
                  <div className="bp-wild">
                    <img src={wildlensPhoto} alt="" loading="lazy" />
                    <div className="bp-wild-tag">
                      <small>Suggested ID</small>
                      <b>Indian Peafowl</b>
                      <i />
                    </div>
                  </div>
                )}
                {project.accent === "ascent" && <AscentPreview />}
                <em>Illustrative preview</em>
              </div>
              <div className="built-body">
                <div className="built-status">
                  <span className="status-dot" /> {project.status}
                </div>
                <h3>{project.title}</h3>
                {project.tagline && <p className="built-tagline">{project.tagline}</p>}
                <p>{project.description}</p>
                {project.tech.length > 0 && (
                  <div className="tag-list">
                    {project.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                )}
                {project.links.length > 0 && (
                  <div className="built-links">
                    {project.links.map(([label, url]) => (
                      <a key={label} href={url} target="_blank" rel="noopener noreferrer">
                        {label} <ArrowUpRight />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="page-section">
        <SectionHeading
          index="05"
          eyebrow="Experience so far"
          title="Learning in public. Building with others."
        />
        <div className="experience-grid reveal">
          <article className="hackathon">
            <div className="event-mark">
              <span>BB</span>
            </div>
            <div>
              <p className="eyebrow">Hackathons & Events</p>
              <h3>BharatBuilds</h3>
              <p className="event-by">WeMakeDevs × AWS · Bengaluru · 2026</p>
              <p>
                My first hackathon experience, where our team developed PulseTrust_ and worked
                through the practical challenges of connecting industrial telemetry, backend
                validation, a database, and a usable dashboard.
              </p>
              <div className="tag-list">
                <span>First hackathon</span>
                <span>Team project</span>
                <span>PulseTrust_</span>
              </div>
            </div>
          </article>
          <div className="timeline">
            <div className="timeline-line" />
            <article>
              <span>2026</span>
              <h3>BharatBuilds</h3>
              <p>Hackathon project · PulseTrust_</p>
            </article>
            <article className="timeline-future">
              <span>Now</span>
              <h3>Looking forward</h3>
              <p>
                Currently exploring projects, research opportunities, and software engineering
                experiences.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="achievements" className="page-section">
        <SectionHeading
          index="06"
          eyebrow="Achievements"
          title="Milestones worth marking."
        />
        <div className="achievements-grid achievements-two reveal">
          <article className="achievement-card is-verified achievement-feature">
            <div className="achievement-top">
              <span className="achievement-index">01</span>
            </div>
            <p className="eyebrow">Achievement</p>
            <MilestoneCarousel
              slides={[
                { src: gdgCeremony.url, alt: "Award ceremony at the Google Solution Hunt Challenge" },
                { src: gdgGroup.url, alt: "Team Techbros holding the 3rd prize cheque" },
              ]}
            />
            <h3>3rd Place — Google Solution Hunt Challenge by GDG</h3>
            <a
              className="milestone-proof"
              href="https://lnkd.in/p/d4kQwZuJ"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Proof <ArrowUpRight />
            </a>
          </article>
          <article className="achievement-card is-verified achievement-feature">
            <div className="achievement-top">
              <span className="achievement-index">02</span>
            </div>
            <p className="eyebrow">Achievement</p>
            {/* Add RIPTIDE photos here: { src: asset.url, alt: "..." } */}
            {riptideSlides.length > 0 && <MilestoneCarousel slides={riptideSlides} />}
            <h3>2nd Place — AWS Student Builder Group SRM-AP</h3>
            <p>
              <strong>RIPTIDE — 60-Minute Build Sprint.</strong> Secured 2nd place in RIPTIDE, a
              60-minute build sprint organized by the AWS Student Builder Group at SRM-AP on 30
              September 2026.
            </p>
            <a
              className="milestone-proof"
              href="https://www.linkedin.com/posts/awssbg-srm_riptide-our-60-minute-build-sprint-went-activity-7512047889284698113-tGKT"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Proof <ArrowUpRight />
            </a>
          </article>
        </div>
      </section>

      <section id="education" className="page-section education-section">
        <SectionHeading index="07" eyebrow="Education" title="Foundations first." />
        <div className="education-card reveal">
          <div className="university-mark">
            <GraduationCap />
          </div>
          <div>
            <span className="eyebrow">Current education</span>
            <h3>SRM University–AP</h3>
            <p>Bachelor of Technology</p>
            <p>Computer Science and Engineering</p>
          </div>
          <div className="cgpa">
            <span>Current CGPA</span>
            <strong>8.31</strong>
            <small>/ 10</small>
          </div>
        </div>
        <div className="milestones reveal">
          <p className="eyebrow">Verified milestones</p>
          <div>
            {[
              "Pursuing B.Tech CSE",
              "Built PulseTrust_ with a team",
              "Participated in BharatBuilds 2026",
              "Building a C++ multiplayer game engine",
            ].map((m, i) => (
              <span key={m}>
                <b>0{i + 1}</b>
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section developer-section">
        <SectionHeading
          index="08"
          eyebrow="Developer activity"
          title="The work continues between releases."
          copy="Live public activity from my GitHub profile. Activity updates automatically from GitHub."
        />
        <div className="activity-panel reveal">
          <div className="activity-copy">
            <Github />
            <div>
              <h3>GitHub profile</h3>
              <p>Repositories, experiments, and progress will live here.</p>
            </div>
          </div>
          <GitHubActivity />
          <SmartLink value={profile.github}>
            Open GitHub <ExternalLink />
          </SmartLink>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-heading reveal">
          <p className="eyebrow">Let’s connect</p>
          <h2>
            Have an idea worth building<span className="accent-dot">?</span>
          </h2>
          <p>
            If you’re working on an interesting project, have an opportunity, want to collaborate,
            or simply want to talk about technology, feel free to reach out.
          </p>
        </div>
        <div className="contact-grid reveal">
          <div className="contact-links">
            <h3>Find me here</h3>
            {[
              {
                Icon: Mail,
                label: "Primary email",
                value: profile.primaryEmail,
                href: `mailto:${profile.primaryEmail}`,
              },
              {
                Icon: Mail,
                label: "Alternate email",
                value: profile.alternateEmail,
                href: `mailto:${profile.alternateEmail}`,
              },
              {
                Icon: Phone,
                label: "Phone",
                value: profile.phone,
                href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
              },
              { Icon: Github, label: "GitHub", value: profile.github, href: profile.github },
              {
                Icon: Linkedin,
                label: "LinkedIn",
                value: profile.linkedin,
                href: profile.linkedin,
              },
              {
                Icon: Instagram,
                label: "Instagram",
                value: profile.instagram,
                href: profile.instagram,
              },
            ].map(({ Icon, label, value, href }) => {
              const isDirect = href.startsWith("mailto:") || href.startsWith("tel:");
              return (
                <div className="contact-row" key={label}>
                  <Icon size={18} />
                  <div>
                    <span>{label}</span>
                    <strong>
                      {isPlaceholder(href) ? (
                        value
                      ) : (
                        <a
                          className="contact-value-link"
                          href={href}
                          {...(isDirect ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          {value}
                        </a>
                      )}
                    </strong>
                  </div>
                  {label === "Primary email" ? (
                    <button
                      className="icon-button"
                      onClick={copyPlaceholder}
                      aria-label="Copy primary email"
                    >
                      {copied ? <Check /> : <Copy />}
                    </button>
                  ) : (
                    <SmartLink value={href}>
                      <ExternalLink />
                    </SmartLink>
                  )}
                </div>
              );
            })}
            <SmartLink value={profile.resumeUrl} className="resume-wide" download>
              <Download /> Download resume
            </SmartLink>
          </div>
          <form onSubmit={submitForm}>
            <div className="form-head">
              <h3>Send a note</h3>
              <span>Connection pending</span>
            </div>
            <label>
              Name
              <input name="name" autoComplete="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me what you're thinking..."
              />
            </label>
            <button className="primary-button" type="submit">
              Send message <Send />
            </button>
            {formNotice && (
              <p className="form-notice" role="status">
                {formNotice}
              </p>
            )}
          </form>
        </div>
      </section>

      <footer>
        <div>
          <button className="brand" onClick={() => scrollTo("Home")}>
            <span className="brand-mark">
              <span />
            </span>
            SJK<span className="accent-dot">.</span>
          </button>
          <p>Building, learning, and occasionally breaking things.</p>
          <div className="social-links">
            {[
              { Icon: Github, label: "GitHub", href: profile.github },
              { Icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
              { Icon: Instagram, label: "Instagram", href: profile.instagram },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                className="social-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-links">
          {navItems.slice(1).map((item) => (
            <button onClick={() => scrollTo(item)} key={item}>
              {item}
            </button>
          ))}
        </div>
        <div className="footer-end">
          <p>© 2026 Shoaib Junaid Khan</p>
          <button className="back-top" onClick={() => scrollTo("Home")} aria-label="Back to top">
            <ArrowUp />
          </button>
        </div>
      </footer>
    </main>
  );
}
