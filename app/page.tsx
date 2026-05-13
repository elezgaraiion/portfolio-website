"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = "home" | "about" | "education" | "projects" | "skills" | "contact";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS: { id: Section; label: string }[] = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const COURSE_GROUPS: { label: string; courses: string[]; current?: boolean }[] = [
  {
    label: "Mathematical Foundations",
    courses: [
      "Mathematical Analysis",
      "Algebra",
      "Discrete Mathematics",
      "Statistical Methods in Engineering",
      "Advanced Statistical Methods",
      "Signals and Systems",
      "Operations Research",
    ],
  },
  {
    label: "Programming & Systems",
    courses: [
      "Introduction to Programming",
      "Programming Methodology",
      "Modular Programming and Object Orientation",
      "Data Structures and Algorithms",
      "Parallel and Distributed Systems",
      "Introduction to Computer Architecture",
      "Introduction to Computer Networks and Operating Systems",
    ],
  },
  {
    label: "AI & Machine Learning",
    courses: [
      "Artificial Intelligence",
      "Machine Learning and Neural Networks",
      "Advanced Machine Learning",
      "Automated Reasoning",
      "Search Heuristics",
      "Data Mining",
      "Computer Vision",
      "Natural Language Processing",
      "Text Data Mining",
    ],
  },
  {
    label: "Data & Software",
    courses: [
      "Databases",
      "Database Design",
      "Software Engineering",
      "Big Data Application Development",
      "Infrastructures for Massive Data Processing",
    ],
  },
  {
    label: "4th Year — 1st Semester",
    courses: [
      "Deep Learning",
      "Planning and Reasoning",
      "Visual Analytics",
      "Web and Software Architecture",
      "Cybersecurity",
    ],
    current: true,
  },
];

const SKILL_GROUPS = [
  {
    label: "Programming",
    items: ["Python", "SQL", "Java"],
  },
  {
    label: "Data Science / AI",
    items: [
      "pandas",
      "NumPy",
      "PyTorch",
      "Transformers",
      "scikit-learn",
      "Weights & Biases",
      "Apache Kafka",
      "Apache Spark",
      "Hadoop",
      "MongoDB",
    ],
  },
  {
    label: "Tools",
    items: ["Git", "Linux", "Docker", "Jupyter", "VSCode"],
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useActiveSection() {
  const [active, setActive] = useState<Section>("home");
  useEffect(() => {
    const ids: Section[] = ["home", "about", "education", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as Section);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

// ─── Ambient elements ─────────────────────────────────────────────────────────

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }}
    />
  );
}

function GridLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 h-6 w-6 rounded-full border border-white/20 transition-transform duration-75 ease-out mix-blend-difference"
    />
  );
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function NavDot({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-block h-1 rounded-full transition-all duration-300 ${active ? "w-6 bg-white" : "w-1 bg-white/30"
        }`}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl">{children}</h2>
  );
}

function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block rounded border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${className}`}
    >
      {children}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg className="ml-auto shrink-0 text-white/20" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center px-6 pb-20 pt-20 sm:px-12 lg:px-24"
    >
      <div className="max-w-4xl">

        <h1 className="mb-8 text-[clamp(3rem,9vw,7rem)] font-thin leading-none tracking-tighter text-white">
          Jon
          <br />
          <span className="italic text-white/40">Elezgarai</span>
          <br />
          Miguel
        </h1>

        <div className="mt-12 flex flex-wrap gap-4">
          {[
            { label: "View Projects", href: "#projects", primary: true },
            { label: "GitHub", href: "https://github.com/elezgaraiion", primary: false },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/jon-elezgarai-miguel-a812883a6", primary: false },
            { label: "Download CV", href: "/cv.pdf", primary: false },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target={btn.href.startsWith("http") ? "_blank" : undefined}
              rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`rounded-full border px-6 py-2.5 text-sm font-light transition-all duration-200 ${btn.primary
                ? "border-white bg-white text-black hover:bg-white/90"
                : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                }`}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-t border-white/[0.07] px-6 py-28 sm:px-12 lg:px-24"
    >
      <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
        <div>
          <SectionLabel>About me</SectionLabel>
        </div>

        <div className="space-y-6 font-light leading-relaxed text-[15px] text-white/50">
          <p>
            I'm a final-year{" "}
            <span className="text-white/80">Artificial Intelligence student at UPV/EHU</span>,
            originally from{" "}
            <span className="text-white/80">Mutriku, Gipuzkoa</span>.
            My background spans mathematics, statistics, machine learning, NLP,
            computer vision, and large-scale data processing.
          </p>
          <p>
            I spent part of my degree abroad on{" "}
            <span className="text-white/80">Erasmus at La Sapienza in Rome</span>, taking
            courses from both the ACSAI bachelor's and the AI Master's programme — an experience
            that sharpened my technical depth and my ability to adapt quickly to new
            environments and challenges.
          </p>
          <p>
            My goal is to build a career in{" "}
            <span className="text-white/80">data science and machine learning</span>, applying
            these tools to domains where data can genuinely change how decisions are made.
          </p>
          <p>
            My current thesis focuses on{" "}
            <span className="text-white/80">spatial reasoning in multimodal models</span> —
            comparing image-only, text-only, and multimodal systems to understand where each
            modality truly adds value. I'm also a lifelong sports fan and I'm drawn to the
            way data is quietly reshaping how teams analyse performance — though I'm equally
            excited to work on hard problems wherever the impact is real.
          </p>
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <section
      id="education"
      className="relative border-t border-white/[0.07] px-6 py-28 sm:px-12 lg:px-24"
    >
      <SectionLabel>Education</SectionLabel>
      <div className="mt-2 grid gap-16 lg:grid-cols-[1fr_2fr]">
        <SectionHeading>
          Academic
          <br />
          background
        </SectionHeading>

        <div className="space-y-10">
          {/* BSc */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-lg font-light text-white">BSc in Artificial Intelligence</p>
                <p className="mt-1 text-sm text-white/40">
                  University of the Basque Country — UPV/EHU · Donostia-San Sebastián
                </p>
              </div>
              <Tag className="border-white/20 text-white/40">2022 — present</Tag>
            </div>
            <p className="text-[13px] leading-relaxed text-white/40 max-w-2xl">
              Four-year degree spanning the full AI stack — from mathematical foundations
              and algorithms to deep learning, NLP, computer vision, and large-scale
              data systems. The curriculum is research-oriented and heavily project-based,
              combining rigorous theory with hands-on implementation in Python, Java, and SQL.
            </p>
          </div>

          {/* Erasmus */}
          <div className="rounded-2xl border border-sky-400/15 bg-sky-400/[0.02] p-7">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[15px] font-light text-white">Erasmus Exchange — Rome</p>
                <p className="mt-1 text-sm text-white/40">
                  Università degli Studi di Roma La Sapienza · Italy
                </p>
              </div>
              <Tag className="border-sky-400/30 bg-sky-400/5 text-sky-400/70">2025 — 2026 · First semester</Tag>
            </div>
            <p className="text-[13px] leading-relaxed text-white/40 max-w-2xl">
              Spent the first semester of the 2025/26 academic year at La Sapienza taking
              third-year courses from the{" "}
              <span className="text-white/60">ACSAI degree</span>{" "}
              (Applied Computer Science and Artificial Intelligence) alongside graduate-level
              courses from the{" "}
              <span className="text-white/60">MSc in Artificial Intelligence</span>. This mix gave
              me exposure to advanced AI research topics — planning, reasoning, and multimodal
              systems — in an international environment alongside students from across Europe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative border-t border-white/[0.07] px-6 py-28 sm:px-12 lg:px-24"
    >
      <SectionLabel>Projects</SectionLabel>
      <SectionHeading>Current work</SectionHeading>

      <div className="mt-12 space-y-6">
        {/* Football analytics project */}
        <article className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.02] p-7 transition-colors hover:border-emerald-400/30">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-white/20">01</span>
              <h3 className="text-lg font-light text-white">
                Finding Undervalued Football Players Using Data
              </h3>
            </div>
            <Tag className="border-emerald-400/30 bg-emerald-400/5 text-emerald-400/80">
              Sports Analytics
            </Tag>
          </div>

          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-white/40">
            An end-to-end ML pipeline that predicts players' fair market value from{" "}
            <span className="text-white/60">30+ engineered features</span> — per-90 stats,
            composite role indices, non-linear age curves — and surfaces{" "}
            <span className="text-white/60">market inefficiencies</span> by scoring the gap
            between predicted and actual value. Four regression models compared via 5-fold CV;
            XGBoost achieved R² ≈ 0.84. Results visualised through an interactive{" "}
            <span className="text-white/60">Streamlit dashboard</span>.
          </p>


          <div className="mt-5 flex flex-wrap gap-2">
            {["Python", "XGBoost", "scikit-learn", "pandas", "Streamlit", "FBref"].map((s) => (
              <span
                key={s}
                className="rounded border border-white/[0.07] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-white/40"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://github.com/elezgaraiion/sports-analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[12px] font-mono text-white/30 transition-colors hover:text-white/60"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8c0 2.87 1.86 5.3 4.44 6.16.32.06.44-.14.44-.31v-1.09c-1.8.39-2.18-.87-2.18-.87-.3-.75-.72-1-.72-1-.59-.4.04-.39.04-.39.65.05 1 .67 1 .67.58 1 1.52.71 1.89.54.06-.42.23-.71.41-.87-1.44-.16-2.95-.72-2.95-3.2 0-.71.25-1.29.67-1.74-.07-.17-.29-.82.06-1.71 0 0 .55-.18 1.8.67.52-.14 1.08-.22 1.63-.22.55 0 1.11.07 1.63.22 1.25-.85 1.8-.67 1.8-.67.35.89.13 1.54.06 1.71.42.45.67 1.03.67 1.74 0 2.49-1.52 3.04-2.96 3.2.23.2.44.59.44 1.19v1.77c0 .17.12.37.44.31C12.64 13.3 14.5 10.87 14.5 8c0-3.59-2.91-6.5-6.5-6.5z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </article>

        {/* Thesis */}
        <article className="rounded-2xl border border-sky-400/20 bg-sky-400/[0.03] p-7 transition-colors hover:border-sky-400/30">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-white/20">02</span>
              <h3 className="text-lg font-light text-white">
                Spatial Reasoning in Multimodal Models
              </h3>
            </div>
            <Tag className="border-sky-400/40 bg-sky-400/5 text-sky-400">Thesis · In progress</Tag>
          </div>

          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-white/40">
            A comparative evaluation of{" "}
            <span className="text-white/60">image-only</span>,{" "}
            <span className="text-white/60">text-only</span>, and{" "}
            <span className="text-white/60">multimodal</span> models on spatial reasoning tasks.
            The goal is to identify where each modality genuinely adds value and where the
            fusion of information actually outperforms unimodal approaches.
          </p>
        </article>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative border-t border-white/[0.07] px-6 py-28 sm:px-12 lg:px-24"
    >
      <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
        <div>
          <SectionLabel>Skills</SectionLabel>
          <SectionHeading>
            Technical
            <br />
            stack
          </SectionHeading>
        </div>

        <div className="space-y-8">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-white/25">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[13px] font-light text-white/60 transition-colors hover:border-white/20 hover:text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Languages */}
          <div className="border-t border-white/[0.07] pt-8">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-white/25">
              Languages
            </p>
            <div className="flex flex-wrap gap-8">
              {[
                { lang: "Spanish", level: "Native", opacity: "text-white/70" },
                { lang: "Basque", level: "Native", opacity: "text-white/70" },
                { lang: "English", level: "B2", opacity: "text-white/50" },
              ].map((l) => (
                <div key={l.lang}>
                  <p className={`text-[14px] ${l.opacity}`}>{l.lang}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-white/25">{l.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const links = [
    {
      label: "Email",
      value: "elezgaraiion@gmail.com",
      href: "mailto:elezgaraiion@gmail.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M1.5 4.5L8 9L14.5 4.5M1.5 3.5H14.5V12.5H1.5V3.5Z"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: "+34 688 855 772",
      href: "tel:+34688855772",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 2.5h2.5l1 3-1.5 1a9 9 0 003.5 3.5l1-1.5 3 1V13A1.5 1.5 0 0111 14.5 11.5 11.5 0 011.5 5 1.5 1.5 0 013 3.5v-1z"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/jon-elezgarai-miguel",
      href: "https://www.linkedin.com/in/jon-elezgarai-miguel-a812883a6",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1" />
          <path d="M4 6.5v5M4 4.5v.5M7 11.5V9c0-1.1.9-2 2-2s2 .9 2 2v2.5M7 6.5v5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/elezgaraiion",
      href: "https://github.com/elezgaraiion",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8c0 2.87 1.86 5.3 4.44 6.16.32.06.44-.14.44-.31v-1.09c-1.8.39-2.18-.87-2.18-.87-.3-.75-.72-1-.72-1-.59-.4.04-.39.04-.39.65.05 1 .67 1 .67.58 1 1.52.71 1.89.54.06-.42.23-.71.41-.87-1.44-.16-2.95-.72-2.95-3.2 0-.71.25-1.29.67-1.74-.07-.17-.29-.82.06-1.71 0 0 .55-.18 1.8.67.52-.14 1.08-.22 1.63-.22.55 0 1.11.07 1.63.22 1.25-.85 1.8-.67 1.8-.67.35.89.13 1.54.06 1.71.42.45.67 1.03.67 1.74 0 2.49-1.52 3.04-2.96 3.2.23.2.44.59.44 1.19v1.77c0 .17.12.37.44.31C12.64 13.3 14.5 10.87 14.5 8c0-3.59-2.91-6.5-6.5-6.5z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "Location",
      value: "Mutriku, Gipuzkoa",
      href: null,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1.5a5 5 0 015 5c0 3.5-5 9-5 9s-5-5.5-5-9a5 5 0 015-5zm0 3a2 2 0 100 4 2 2 0 000-4z"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative border-t border-white/[0.07] px-6 py-28 sm:px-12 lg:px-24"
    >
      <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
        <div>
          <SectionLabel>Contact</SectionLabel>
          <SectionHeading>Let's talk</SectionHeading>
        </div>

        <div className="space-y-6">
          <p className="text-[15px] font-light leading-relaxed text-white/40">
            Open to conversations about master's programmes, internships, and opportunities
            in data science and machine learning. Always happy to connect with people working
            on interesting problems with data.
          </p>

          <div className="space-y-3">
            {links.map((link) => {
              const inner = (
                <>
                  <span className="text-white/30">{link.icon}</span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-white/25">
                      {link.label}
                    </p>
                    <p className="text-[14px] text-white/60">{link.value}</p>
                  </div>
                  {link.href && <ArrowIcon />}
                </>
              );

              const cls =
                "flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition-colors hover:border-white/10 hover:bg-white/[0.04]";

              return link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <div key={link.label} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-6 py-8 sm:px-12 lg:px-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-xs text-white/20">Jon Elezgarai Miguel — 2026</span>
      </div>
    </footer>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ active }: { active: Section }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 sm:px-12 lg:px-24">
      <div className="absolute inset-0 bg-[#060608]/80 backdrop-blur-md" aria-hidden />

      <span className="relative font-mono text-xs tracking-widest text-white/40">JEM</span>

      <nav className="relative hidden items-center gap-8 md:flex" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-colors duration-200 ${active === link.id ? "text-white" : "text-white/30 hover:text-white/60"
              }`}
          >
            <NavDot active={active === link.id} />
            {link.label}
          </a>
        ))}
      </nav>

      <button
        className="relative md:hidden text-white/40 hover:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
        aria-expanded={menuOpen}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          {menuOpen ? (
            <path
              d="M4 4L16 16M16 4L4 16"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 6H17M3 10H17M3 14H17"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 border-t border-white/[0.07] bg-[#060608]/95 px-6 py-6 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`font-mono text-sm uppercase tracking-widest transition-colors ${active === link.id ? "text-white" : "text-white/30"
                  }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const active = useActiveSection();

  return (
    <main className="relative min-h-screen bg-[#060608] text-white antialiased selection:bg-white/20">
      <GrainOverlay />
      <GridLines />
      <Cursor />

      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -left-32 h-[600px] w-[600px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle at center, #38bdf8 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-48 -right-48 h-[800px] w-[800px] rounded-full opacity-5"
        style={{ background: "radial-gradient(circle at center, #818cf8 0%, transparent 70%)" }}
      />

      <Navbar active={active} />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}