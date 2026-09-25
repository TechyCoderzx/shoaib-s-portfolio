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
  MessageCircle,
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

const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Education", "Contact"];
const skillGroups = {
  Languages: ["C", "C++", "Java", "Python", "JavaScript"],
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
  Tools: ["Git", "GitHub", "VS Code", "Figma", "Linux"],
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
  ) : (
    <a
      className={`action-link ${className}`}
      href={value}
      target="_blank"
      rel="noreferrer"
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
          <SmartLink value={profile.resumeUrl} className="nav-resume">
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
            <SmartLink value={profile.resumeUrl}>
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
          title="Tools I use. Areas I’m growing into."
          copy="No percentages or inflated proficiency — just the technologies and fundamentals shaping what I build next."
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
                <Play /> Live demo
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
        <article className="secondary-project reveal">
          <div className="project-body">
            <div className="project-number">PROJECT / 002</div>
            <div className="status-label building">
              <span className="status-dot" /> Building
            </div>
            <h3>
              C++ Multiplayer
              <br />
              Game Engine
            </h3>
            <p>
              A C++-based multiplayer game engine project focused on understanding networking, game
              architecture, object-oriented design, and real-time systems.
            </p>
            <p className="honest-note">
              <CircleDot /> Under construction — capabilities will be documented as they are
              implemented.
            </p>
            <div className="tag-list">
              {[
                "C++",
                "Object-Oriented Programming",
                "Networking",
                "Game Architecture",
                "Data Structures",
                "Real-Time Systems",
              ].map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
          <div className="engine-visual">
            <div className="engine-window">
              <div className="window-bar">
                <i />
                <i />
                <i />
                <span>engine.cpp</span>
              </div>
              <pre>
                <code>{`class MultiplayerEngine {\n  NetworkLayer network;\n  WorldState world;\n\n  void build() {\n    // learning in progress_\n  }\n};`}</code>
              </pre>
              <div className="construction-line">
                <span /> BUILDING / NO RELEASE YET
              </div>
            </div>
            <small>GAME_ENGINE_IMAGE_HERE</small>
          </div>
        </article>
      </section>

      <section className="page-section next-section">
        <SectionHeading index="04" eyebrow="In the queue" title="What’s next." />
        <div className="next-list reveal">
          {[
            [
              "01",
              "Multiplayer game engine",
              "Building",
              "Networking, real-time systems, C++ architecture",
            ],
            [
              "02",
              "Applied AI experiments",
              "Exploring",
              "Small tools that make complex information more useful",
            ],
            [
              "03",
              "Computer science research",
              "Planned",
              "Finding a focused question worth investigating deeply",
            ],
          ].map(([num, name, status, detail]) => (
            <div key={name}>
              <span>{num}</span>
              <h3>{name}</h3>
              <p>{detail}</p>
              <b>{status}</b>
            </div>
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

      <section id="education" className="page-section education-section">
        <SectionHeading index="06" eyebrow="Education" title="Foundations first." />
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
          index="07"
          eyebrow="Developer activity"
          title="The work continues between releases."
          copy="A live activity feed can be connected once a verified GitHub profile is provided. No contribution numbers are guessed here."
        />
        <div className="activity-panel reveal">
          <div className="activity-copy">
            <Github />
            <div>
              <h3>GitHub profile</h3>
              <p>Repositories, experiments, and progress will live here.</p>
            </div>
          </div>
          <div className="contribution-placeholder" aria-label="Decorative contribution grid">
            {Array.from({ length: 84 }).map((_, i) => (
              <i
                key={i}
                className={i % 11 === 0 || i % 17 === 0 ? "hot" : i % 5 === 0 ? "warm" : ""}
              />
            ))}
          </div>
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
              { Icon: Mail, label: "Primary email", value: profile.primaryEmail },
              { Icon: Mail, label: "Alternate email", value: profile.alternateEmail },
              { Icon: Phone, label: "Phone", value: profile.phone },
              { Icon: Github, label: "GitHub", value: profile.github },
              { Icon: Linkedin, label: "LinkedIn", value: profile.linkedin },
              { Icon: MessageCircle, label: "Discord", value: profile.discord },
              { Icon: Instagram, label: "Instagram", value: profile.instagram },
            ].map(({ Icon, label, value }) => (
              <div className="contact-row" key={label}>
                <Icon size={18} />
                <div>
                  <span>{label}</span>
                  <strong>{value}</strong>
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
                  <SmartLink value={value}>
                    <ExternalLink />
                  </SmartLink>
                )}
              </div>
            ))}
            <SmartLink value={profile.resumeUrl} className="resume-wide">
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
