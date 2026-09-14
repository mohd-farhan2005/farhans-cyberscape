import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Download,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = ["About", "Skills", "Experience", "Education", "Contact"];
const roles = ["Full Stack Web Developer", "Laravel Developer", "WordPress Developer", "Web Design Trainer"];

const skillGroups = [
  { title: "Frameworks & CMS", skills: [["Laravel", 90], ["WordPress", 92], ["Theme Development", 88]] },
  { title: "Programming", skills: [["PHP / Core PHP", 90], ["JavaScript", 84], ["jQuery", 82]] },
  { title: "Frontend", skills: [["HTML5", 95], ["CSS3", 92], ["Responsive Design", 93]] },
  { title: "Data & Tools", skills: [["MySQL", 86], ["Git", 83], ["MS Office", 90]] },
  { title: "Design & Multimedia", skills: [["Illustrator", 88], ["Photoshop", 86], ["Premiere Pro", 78], ["Blender", 74], ["CorelDRAW", 84]] },
] as const;

const experience = [
  {
    role: "Laravel Developer",
    company: "ecraftz",
    date: "January 2025 — Present",
    points: [
      "Engineer scalable web applications using Laravel and MySQL",
      "Optimize application performance and architecture",
      "Develop custom WordPress themes and responsive interfaces",
      "Build Core PHP solutions for client requirements",
      "Collaborate across the full development lifecycle",
    ],
  },
  {
    role: "Web Design Trainer",
    company: "e-academy",
    date: "August 2024 — Present",
    points: [
      "Mentor aspiring web designers",
      "Teach HTML, CSS, JavaScript, and modern design principles",
      "Develop curriculum and training materials",
      "Guide students through real-world projects",
      "Foster creativity and practical learning",
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
            <Button variant="neon" size="lg" asChild><a href="#projects">View Projects <ArrowDown /></a></Button>
            <Button variant="outlineNeon" size="lg" asChild><a href="/muhammad-farhan-resume.txt" download>Resume <Download /></a></Button>
            <Button variant="ghost" size="lg" asChild><a href="#contact">Contact <ArrowUpRight /></a></Button>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-12 grid gap-3 border-t border-border pt-5 font-mono text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
          <a href="tel:+916282913275" className="contact-strip"><Phone /> +91 62829 13275</a>
          <a href="mailto:mohdfarhan170820054@gmail.com" className="contact-strip"><Mail /> Email me</a>
          <a href="https://linkedin.com/in/muhammad-farhan-69603a300" target="_blank" rel="noreferrer" className="contact-strip"><Linkedin /> LinkedIn</a>
          <span className="contact-strip"><MapPin /> Wayanad, Kerala</span>
        </motion.div>
      </div>
    </section>
  );
}

export function Portfolio() {
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); window.setTimeout(() => setSent(false), 4500); };

  return (
    <main className="selection:bg-primary selection:text-primary-foreground">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <CursorGlow />
      <Header />
      <Hero />

      <section id="about" className="section-shell">
        <SectionTitle index="01" label="About" title="Code with clarity. Design with purpose." />
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p>Passionate Full Stack Developer with hands-on experience in building robust web applications using <strong>Laravel and WordPress</strong>. Currently contributing to innovative projects at ecraftz while empowering the next generation of web designers as a trainer at e-academy.</p>
            <p>I transform complex problems into elegant, user-friendly solutions and write clean, maintainable code. My expertise bridges backend development and creative design—building applications that are as functional as they are visually compelling.</p>
          </Reveal>
          <Reveal delay={0.15} className="grid grid-cols-2 border border-border bg-card/50 backdrop-blur-md">
            {[["02", "Active roles"], ["15+", "Core skills"], ["100%", "Curiosity"], ["∞", "Ideas"]].map(([value, label]) => (
              <div key={label} className="border border-border p-6"><div className="mb-2 text-3xl font-semibold text-primary md:text-4xl">{value}</div><div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div></div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section-shell border-y border-border bg-secondary/20">
        <SectionTitle index="02" label="Selected work" title="Engineered for impact." />
        <Reveal>
          <div className="project-panel group">
            <div className="cyber-grid absolute inset-0 opacity-25" />
            <div className="relative z-10 max-w-2xl">
              <span className="eyebrow">Development focus</span>
              <h3 className="mt-5 text-3xl font-semibold md:text-5xl">Scalable digital experiences</h3>
              <p className="mt-5 max-w-xl text-muted-foreground">Laravel applications, bespoke WordPress themes, Core PHP solutions, and responsive interfaces built around real client needs.</p>
            </div>
            <Code2 className="relative z-10 size-20 text-primary transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 md:size-28" />
          </div>
        </Reveal>
      </section>

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
        <SectionTitle index="05" label="Education" title="Where craft met curiosity." />
        <div className="grid gap-4 md:grid-cols-2">
          {[["Diploma in Multimedia Design", "Vismayam College of Arts and Media"], ["Higher Secondary Education (+2)", "SJHSS Kallody"]].map(([degree, school], index) => (
            <Reveal key={degree} delay={index * 0.12}><article className="education-card"><GraduationCap className="size-8 text-primary" /><div><span className="eyebrow">Education 0{index + 1}</span><h3 className="mt-4 text-2xl font-semibold">{degree}</h3><p className="mt-2 text-muted-foreground">{school}</p></div></article></Reveal>
          ))}
        </div>
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
                <a className="contact-card" href="tel:+916282913275"><Phone /> <span><small>Call</small>+91 62829 13275</span><ArrowUpRight /></a>
                <a className="contact-card" href="mailto:mohdfarhan170820054@gmail.com"><Mail /> <span><small>Email</small>mohdfarhan170820054@gmail.com</span><ArrowUpRight /></a>
                <a className="contact-card" href="https://linkedin.com/in/muhammad-farhan-69603a300" target="_blank" rel="noreferrer"><Linkedin /> <span><small>LinkedIn</small>muhammad-farhan-69603a300</span><ArrowUpRight /></a>
              </div>
              <div className="mt-6 flex items-start gap-3 font-mono text-xs leading-relaxed text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" />Mundadathil(H), Tharuvana(P.O), Wayanad</div>
            </Reveal>
            <Reveal delay={0.1}>
              <form onSubmit={submit} className="contact-form">
                <div className="grid gap-5 sm:grid-cols-2"><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label></div>
                <label>Subject<input required name="subject" placeholder="Project enquiry" /></label>
                <label>Message<textarea required name="message" rows={5} placeholder="Tell me about your project..." /></label>
                <Button type="submit" variant="neon" size="lg" className="w-full sm:w-auto">{sent ? <><Check /> Message ready</> : <>Send message <Send /></>}</Button>
                {sent && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs text-primary">Thanks! I’ll get back to you soon.</motion.p>}
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-8 md:px-8"><div className="animated-line mb-8" /><div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-xs text-muted-foreground"><p className="min-w-0">© 2026 Muhammad Farhan. Built with intent.</p><Button variant="outlineNeon" size="icon" asChild><a href="#home" aria-label="Back to top"><ArrowUpRight className="-rotate-45" /></a></Button></div></footer>
    </main>
  );
}
