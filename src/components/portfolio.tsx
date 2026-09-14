import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { gsap } from "gsap";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Crown,
  Download,
  ExternalLink,
  Globe,
  GraduationCap,
  Laptop,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquare,
  Phone,
  Search,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectsData, type ProjectItem } from "@/data/projects";

const navItems = ["About", "Projects", "Skills", "Experience", "Education", "Contact"];
const roles = ["Full Stack Web Developer", "Laravel Developer", "WordPress Developer", "Web Design Faculty"];

const skillGroups = [
  { title: "Frameworks & CMS", skills: [["Laravel", 90], ["WordPress", 92], ["Theme Development", 88]] },
  { title: "Programming", skills: [["PHP / Core PHP", 90], ["JavaScript", 84], ["jQuery", 82]] },
  { title: "Frontend", skills: [["HTML5", 95], ["CSS3", 92], ["Responsive Design", 93]] },
  { title: "Data & Tools", skills: [["MySQL", 86], ["Git", 83], ["MS Office", 90]] },
  { title: "Design & Multimedia", skills: [["Illustrator", 88], ["Photoshop", 86], ["Premiere Pro", 78], ["Blender", 74], ["CorelDRAW", 84]] },
] as const;

const experience = [
  {
    role: "Web Design Faculty",
    company: "Alpha Digital Academy",
    date: "February 2026 — Present",
    points: [
      "Mentor aspiring web designers in HTML, CSS, JavaScript, and modern design principles",
      "Develop curriculum and practical hands-on training materials",
      "Guide students through real-world web design projects and responsive interfaces",
      "Foster creativity, design thinking, and practical learning",
    ],
  },
  {
    role: "Laravel Developer",
    company: "ecraftz",
    date: "January 2025 — February 2026",
    points: [
      "Engineered scalable web applications using Laravel and MySQL",
      "Optimized application performance and architecture",
      "Developed custom WordPress themes and responsive interfaces",
      "Built Core PHP solutions for client requirements",
      "Collaborated across the full development lifecycle",
    ],
  },
  {
    role: "Web Design Trainer",
    company: "e-academy",
    date: "August 2024 — February 2026",
    points: [
      "Mentored aspiring web designers",
      "Taught HTML, CSS, JavaScript, and modern design principles",
      "Developed curriculum and training materials",
      "Guided students through real-world projects",
      "Fostered creativity and practical learning",
    ],
  },
];

const strengths = ["Problem Solving", "Critical Thinking", "Time Management", "Team Collaboration", "Creativity", "Adaptability", "Continuous Learning"];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-primary">
        <span>{index}</span><span className="h-px w-10 bg-primary" />{label}
      </div>
      <h2 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h2>
    </Reveal>
  );
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (ref.current) ref.current.style.transform = `translate3d(${event.clientX - 12}px, ${event.clientY - 12}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 md:h-20 md:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="Muhammad Farhan home">
          <span className="grid size-9 shrink-0 place-items-center border border-primary font-mono text-xs font-bold text-primary shadow-neon">MF</span>
          <span className="truncate text-sm font-semibold uppercase tracking-[0.16em]">Muhammad Farhan</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>)}
        </nav>
        <Button className="md:hidden" size="icon" variant="ghost" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="border-t border-border bg-background px-5 py-6 md:hidden">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="block border-b border-border py-4 text-lg">{item}</a>)}
        </motion.nav>
      )}
    </header>
  );
}

function Hero() {
  const [role, setRole] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => setRole((current) => (current + 1) % roles.length), 2500);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-12 pt-28 md:px-8">
      <div className="cyber-grid absolute inset-0 opacity-40" />
      <div className="hero-glow absolute inset-0" />
      <div className="particles absolute inset-0" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</div>
      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-primary">
          <span className="status-dot" /> Available for select projects
        </motion.div>
        <h1 className="max-w-6xl text-[clamp(3.7rem,10vw,9rem)] font-semibold leading-[0.82] tracking-normal">
          <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} className="block">MUHAMMAD</motion.span>
          <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="outline-text block">FARHAN.</motion.span>
        </h1>
        <div className="mt-8 grid gap-7 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <div className="mb-4 h-8 overflow-hidden font-mono text-sm text-primary md:text-base">
              <motion.p key={roles[role]} initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -28, opacity: 0 }}>{`> ${roles[role]}_`}</motion.p>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">Building powerful web experiences with clean code, creative design, and modern technologies.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button variant="neon" size="lg" asChild><a href="#projects">View Projects</a></Button>
            <Button variant="outlineNeon" size="lg" asChild><a href="/muhammad-farhan-resume.txt" download>Resume <Download /></a></Button>
            <Button variant="ghost" size="lg" asChild><a href="#contact">Contact</a></Button>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-12 grid gap-3 border-t border-border pt-5 font-mono text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
          <a href="tel:+916282913275" className="contact-strip"><Phone /> +91 62829 13275</a>
          <a href="mailto:mohdfarhan17082005@gmail.com" className="contact-strip"><Mail /> Email me</a>
          <a href="https://linkedin.com/in/muhammad-farhan-69603a300" target="_blank" rel="noreferrer" className="contact-strip"><Linkedin /> LinkedIn</a>
          <span className="contact-strip"><MapPin /> Wayanad, Kerala</span>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = [
    { label: "All Projects", value: "All", count: projectsData.length },
    { label: "Premium Websites", value: "Premium Websites", count: projectsData.filter((p) => p.category === "Premium Websites").length },
    { label: "Websites", value: "Websites", count: projectsData.filter((p) => p.category === "Websites").length },
    { label: "Software & CRM", value: "Software", count: projectsData.filter((p) => p.category === "Software").length },
  ];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="section-shell border-y border-border bg-secondary/10">
      <SectionTitle index="02" label="Selected Work" title="Featured Selection (100+ Websites Built)" />

      {/* Featured Overview Banner */}
      <Reveal className="mb-12">
        <div className="project-panel group relative overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-8 backdrop-blur-md md:p-12">
          <div className="cyber-grid absolute inset-0 opacity-20" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <span className="eyebrow flex items-center gap-2 text-primary">
                <Crown className="size-4 text-amber-400" />
                Commercial Client Portfolio (100+ Projects Completed)
              </span>
              <h3 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
                Websites, Premium Portals & Enterprise Software
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Having built <strong>100+ websites and web applications</strong> for diverse clients, here is a curated showcase of 20 live production projects engineered across <strong>Laravel, WordPress, PHP, and modern web tech</strong>.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 font-mono text-center sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-primary/50 bg-primary/10 p-3 shadow-neon">
                <div className="text-2xl font-bold text-primary md:text-3xl">100+</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Total Built</div>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-3">
                <div className="text-2xl font-bold text-foreground md:text-3xl">20</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Showcased</div>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-3">
                <div className="text-2xl font-bold text-emerald-400 md:text-3xl">11</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Websites</div>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-3">
                <div className="text-2xl font-bold text-amber-400 md:text-3xl">7</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Premium</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Filter Tabs & Search */}
      <Reveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground shadow-neon font-bold"
                  : "border border-border/80 bg-card/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  activeCategory === cat.value ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border/80 bg-card/60 py-2 pl-9 pr-4 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground">
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </Reveal>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, idx) => (
          <Reveal key={project.id} delay={idx * 0.04}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-neon">
              {/* Browser Window Frame Header */}
              <div className="flex items-center justify-between border-b border-border/80 bg-secondary/40 px-3.5 py-2.5 font-mono text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-500/80" />
                  <span className="size-2.5 rounded-full bg-yellow-500/80" />
                  <span className="size-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1 truncate text-[10px] text-muted-foreground/70 max-w-[170px]">
                  <Globe className="size-3 shrink-0" />
                  <span className="truncate">{project.url.replace(/^https?:\/\//, "")}</span>
                </div>
                {project.category === "Premium Websites" && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400" title="Premium Website">
                    <Crown className="size-3" />
                  </span>
                )}
                {project.category === "Software" && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-cyan-400" title="Software Platform">
                    <Laptop className="size-3" />
                  </span>
                )}
                {project.category === "Websites" && <span className="size-3" />}
              </div>

              {/* Website Preview Image Container */}
              <div
                className="relative aspect-[16/10] overflow-hidden bg-secondary/30 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={`/projects/${project.id}.jpg`}
                  alt={`${project.title} screenshot`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                    const parent = (e.target as HTMLElement).parentElement;
                    if (parent) {
                      parent.classList.add("flex", "items-center", "justify-center", "bg-gradient-to-br", "from-secondary", "to-card");
                    }
                  }}
                />

                {/* Overlay Badge */}
                <div className="absolute left-3 top-3 z-10">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase font-semibold backdrop-blur-md ${
                      project.category === "Premium Websites"
                        ? "border-amber-500/40 bg-amber-950/70 text-amber-300"
                        : project.category === "Software"
                        ? "border-cyan-500/40 bg-cyan-950/70 text-cyan-300"
                        : "border-primary/40 bg-background/80 text-primary"
                    }`}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full border border-primary bg-primary/20 px-4 py-2 font-mono text-xs font-semibold text-primary shadow-neon">
                    View Details
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h4 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h4>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-secondary/30 text-muted-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    title={`Visit ${project.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>

                <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <Button variant="outlineNeon" size="sm" className="mt-auto w-full justify-center gap-2 font-mono text-xs" asChild>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    <span>Visit Live Site</span>
                  </a>
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-primary">{selectedProject.category}</span>
                <h3 className="text-xl font-bold">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="rounded-full border border-border p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6">
              <div className="mb-6 overflow-hidden rounded-xl border border-border bg-black">
                <img
                  src={`/projects/${selectedProject.id}.jpg`}
                  alt={selectedProject.title}
                  className="w-full object-contain max-h-[50vh]"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
                <div>
                  <h4 className="mb-2 text-sm font-mono uppercase tracking-wider text-muted-foreground">About the Project</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{selectedProject.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-secondary/20 p-5">
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase">Category</span>
                      <span className="font-semibold text-foreground">{selectedProject.category}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase">Badge</span>
                      <span className="font-semibold text-primary">{selectedProject.badge}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase">Live Address</span>
                      <a href={selectedProject.url} target="_blank" rel="noreferrer" className="text-primary underline truncate block">
                        {selectedProject.url}
                      </a>
                    </div>
                  </div>

                  <Button variant="neon" size="lg" className="mt-6 w-full justify-center gap-2 font-mono text-xs" asChild>
                    <a href={selectedProject.url} target="_blank" rel="noreferrer">
                      <span>Launch Live Website</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}



export function Portfolio() {
  const [sent, setSent] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [lastJson, setLastJson] = useState<string | null>(null);
  const pageRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>, targetMethod: "both" | "whatsapp" | "email" = "both") => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const subject = (formData.get("subject") as string) || "";
    const message = (formData.get("message") as string) || "";

    const payload = {
      recipient: "Muhammad Farhan",
      whatsappNumber: "+916282913275",
      recipientEmail: "mohdfarhan17082005@gmail.com",
      senderName: name,
      senderEmail: email,
      subject: subject,
      message: message,
      timestamp: new Date().toISOString(),
    };

    const jsonFormatted = JSON.stringify(payload, null, 2);
    setLastJson(jsonFormatted);

    // Format WhatsApp message text
    const whatsappText = `📥 *NEW PORTFOLIO INQUIRY*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📌 *Subject:* ${subject}\n\n💬 *Message:*\n${message}`;
    const whatsappUrl = `https://wa.me/916282913275?text=${encodeURIComponent(whatsappText)}`;

    // Format Email mailto URL
    const mailSubject = `[Portfolio Inquiry] ${subject || "New Message"}`;
    const mailBody = `📥 NEW PORTFOLIO INQUIRY\n\n👤 Name: ${name}\n📧 Email: ${email}\n📌 Subject: ${subject}\n\n💬 Message:\n${message}`;
    const mailtoUrl = `mailto:mohdfarhan17082005@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    if (targetMethod === "whatsapp") {
      window.open(whatsappUrl, "_blank");
    } else if (targetMethod === "email") {
      window.location.href = mailtoUrl;
    } else {
      window.open(whatsappUrl, "_blank");
      window.setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
    }

    setSent(true);
    window.setTimeout(() => setSent(false), 7000);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 900);
    const onMove = (event: MouseEvent) => {
      const grid = pageRef.current?.querySelector(".map-grid");
      if (grid) gsap.to(grid, { x: (event.clientX / window.innerWidth - 0.5) * 16, y: (event.clientY / window.innerHeight - 0.5) * 16, duration: 1.2, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => { window.clearTimeout(timer); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <main ref={pageRef} className="selection:bg-primary selection:text-primary-foreground">
      {!loaded && <motion.div className="loading-screen" exit={{ opacity: 0 }}><motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>MF<span>.</span></motion.span><div className="loading-line"><i /></div></motion.div>}
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <CursorGlow />
      <Header />
      <Hero />

      <section id="about" className="section-shell">
        <SectionTitle index="01" label="About" title="Code with clarity. Design with purpose." />
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p>Passionate Full Stack Developer with hands-on experience in building robust web applications using <strong>Laravel and WordPress</strong>. Currently empowering the next generation of web designers as a <strong>Web Design Faculty at Alpha Digital Academy</strong>.</p>
            <p>I transform complex problems into elegant, user-friendly solutions and write clean, maintainable code. My expertise bridges backend development and creative design—building applications that are as functional as they are visually compelling.</p>
          </Reveal>
          <Reveal delay={0.15} className="grid grid-cols-2 border border-border bg-card/50 backdrop-blur-md">
            {[["100+", "Websites Built"], ["20", "Showcased"], ["15+", "Tech Skills"], ["100%", "Quality & Code"]].map(([value, label]) => (
              <div key={label} className="border border-border p-6"><div className="mb-2 text-3xl font-semibold text-primary md:text-4xl">{value}</div><div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div></div>
            ))}
          </Reveal>
        </div>
      </section>

      <ProjectsSection />

      <section id="skills" className="section-shell">
        <SectionTitle index="03" label="Capabilities" title="A full-stack creative toolkit." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 0.06} className={groupIndex === 4 ? "md:col-span-2 xl:col-span-2" : ""}>
              <article className="skill-card h-full">
                <div className="mb-7 flex items-center justify-between"><h3 className="text-lg font-semibold">{group.title}</h3><span className="font-mono text-xs text-primary">0{groupIndex + 1}</span></div>
                <div className="space-y-5">{group.skills.map(([name, value]) => (
                  <div key={name}>
                    <div className="mb-2 flex justify-between font-mono text-[11px] uppercase tracking-[0.1em]"><span>{name}</span><span className="text-muted-foreground">{value}%</span></div>
                    <div className="h-px bg-border"><motion.div className="h-px bg-primary shadow-neon" initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.2 }} /></div>
                  </div>
                ))}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="experience" className="section-shell border-y border-border bg-secondary/20">
        <SectionTitle index="04" label="Experience" title="Building, teaching, evolving." />
        <div className="relative ml-3 border-l border-primary/40 pl-8 md:ml-32 md:pl-16">
          {experience.map((item, index) => (
            <Reveal key={item.role} className="relative mb-16 last:mb-0">
              <span className="timeline-node" />
              <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between"><div><span className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{item.company}</span><h3 className="mt-2 text-2xl font-semibold md:text-4xl">{item.role}</h3></div><span className="font-mono text-xs text-muted-foreground">{item.date}</span></div>
              <ul className="grid gap-3 text-muted-foreground md:grid-cols-2">{item.points.map((point) => <li key={point} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-primary" />{point}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="education" className="section-shell">
        <SectionTitle index="05" label="Education" title="Professional Academic Qualification." />
        <Reveal>
          <article className="education-card border border-primary/40 bg-card/60 backdrop-blur-md p-8 rounded-2xl relative overflow-hidden">
            <div className="cyber-grid absolute inset-0 opacity-15" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="p-4 rounded-xl border border-primary/50 bg-primary/10 text-primary shadow-neon">
                  <GraduationCap className="size-10" />
                </div>
                <div>
                  <span className="eyebrow text-primary font-mono text-xs">Primary Qualification</span>
                  <h3 className="mt-2 text-2xl md:text-3xl font-semibold">Diploma in Multimedia Design</h3>
                  <p className="mt-1 text-base text-muted-foreground">Vismayam College of Arts and Media</p>
                </div>
              </div>
              <div className="font-mono text-xs text-primary border border-primary/40 bg-primary/10 px-4 py-2 rounded-full self-start md:self-center">
                Multimedia & Web Design
              </div>
            </div>
          </article>
        </Reveal>
      </section>

      <section className="section-shell border-y border-border bg-secondary/20">
        <SectionTitle index="06" label="Strengths" title="Human skills. Technical mindset." />
        <div className="flex flex-wrap gap-3">{strengths.map((strength, index) => <Reveal key={strength} delay={index * 0.04}><div className="strength-pill"><Sparkles />{strength}</div></Reveal>)}</div>
        <Reveal className="mt-14 border-t border-border pt-10">
          <p className="eyebrow mb-6">Languages</p>
          <div className="flex flex-wrap gap-4"><div className="language-badge"><strong>Malayalam</strong><span>Native</span></div><div className="language-badge"><strong>English</strong><span>Professional working proficiency</span></div></div>
        </Reveal>
      </section>

      <section id="contact" className="section-shell relative overflow-hidden">
        <div className="map-grid absolute inset-0 opacity-30" /><div className="relative z-10">
          <SectionTitle index="07" label="Contact" title="Let’s build something remarkable." />
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <Reveal>
              <p className="mb-8 max-w-md text-lg text-muted-foreground">Have a project, role, or idea in mind? Send a note and let’s start a conversation.</p>
              <div className="space-y-3">
                <a className="contact-card" href="tel:+916282913275"><Phone /> <span><small>Call</small>+91 62829 13275</span></a>
                <a className="contact-card" href="mailto:mohdfarhan17082005@gmail.com"><Mail /> <span><small>Email</small>mohdfarhan17082005@gmail.com</span></a>
                <a className="contact-card" href="https://linkedin.com/in/muhammad-farhan-69603a300" target="_blank" rel="noreferrer"><Linkedin /> <span><small>LinkedIn</small>muhammad-farhan-69603a300</span></a>
              </div>
              <div className="mt-6 flex items-start gap-3 font-mono text-xs leading-relaxed text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" />Mundadathil(H), Tharuvana(P.O), Wayanad</div>
            </Reveal>
            <Reveal delay={0.1}>
              <form onSubmit={(e) => handleFormSubmit(e, "both")} className="contact-form">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label>Name<input required name="name" placeholder="Your name" /></label>
                  <label>Email<input required type="email" name="email" placeholder="you@company.com" /></label>
                </div>
                <label>Subject<input required name="subject" placeholder="Project enquiry" /></label>
                <label>Message<textarea required name="message" rows={5} placeholder="Tell me about your project..." /></label>

                {/* Dispatch Choice Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button type="submit" variant="neon" size="lg" className="flex-1 gap-2 font-mono text-xs">
                    <Send className="size-4" />
                    <span>Send to Both (WhatsApp + Email)</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outlineNeon"
                    size="lg"
                    className="gap-2 font-mono text-xs border-emerald-500/50 text-emerald-400 hover:bg-emerald-950/40"
                    onClick={(e) => {
                      const form = e.currentTarget.closest("form");
                      if (form && form.checkValidity()) {
                        handleFormSubmit({ preventDefault: () => {}, currentTarget: form } as any, "whatsapp");
                      } else if (form) {
                        form.reportValidity();
                      }
                    }}
                  >
                    <MessageCircle className="size-4 text-emerald-400" />
                    <span>WhatsApp Only</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outlineNeon"
                    size="lg"
                    className="gap-2 font-mono text-xs"
                    onClick={(e) => {
                      const form = e.currentTarget.closest("form");
                      if (form && form.checkValidity()) {
                        handleFormSubmit({ preventDefault: () => {}, currentTarget: form } as any, "email");
                      } else if (form) {
                        form.reportValidity();
                      }
                    }}
                  >
                    <Mail className="size-4" />
                    <span>Email Only</span>
                  </Button>
                </div>

                {sent && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-xl border border-primary/40 bg-card/80 p-4 font-mono text-xs text-primary space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Check className="size-4 text-primary" />
                      <span>Inquiry Dispatched Successfully!</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      Your message has been formatted and sent directly to WhatsApp (+91 62829 13275) and Email (mohdfarhan17082005@gmail.com).
                    </p>
                  </motion.div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-8 md:px-8"><div className="animated-line mb-8" /><div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-xs text-muted-foreground"><p className="min-w-0">© 2026 Muhammad Farhan. Built with intent.</p><Button variant="outlineNeon" size="icon" asChild><a href="#home" aria-label="Back to top"><ArrowUpRight className="-rotate-45" /></a></Button></div></footer>
    </main>
  );
}
