import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, Target, Mail, FileText, Shield, MapPin, Zap, Check, Star, ArrowRight, TrendingUp, Users, Briefcase } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({ component: Landing });

function useCounter(target: number, duration = 2000) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <SiteFooter />
      <ChatbotWidget />
      <FeedbackWidget />
    </div>
  );
}

function Hero() {
  const jobs = useCounter(12000);
  const acc = useCounter(94);
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[#667eea]/30 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#764ba2]/40 blur-3xl animate-blob [animation-delay:3s]" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl animate-blob [animation-delay:6s]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Made for UAE professionals · Dubai · Abu Dhabi · Sharjah</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Stop searching.<br/>
            <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">Start matching.</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
            JobHunter's AI scans the best UAE job boards every day, scores every opening against <em>your</em> profile, and emails only the matches worth your time. Tailored CV in one click.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-[#3d1f6e] hover:bg-white/90 font-semibold shadow-elegant">
              <Link to="/signup">Get Started Free <ArrowRight className="ml-1 w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/5 border-white/30 text-white hover:bg-white/15">
              <a href="#how">How it works</a>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat value={`${jobs.toLocaleString()}+`} label="Jobs scanned" />
            <Stat value={`${acc}%`} label="Match accuracy" />
            <Stat value="5 sec" label="Tailored CV" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-elegant">
            <img src={heroImg} alt="JobHunter dashboard" width={1600} height={1200} className="w-full h-auto" />
          </div>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -left-6 top-10 glass rounded-2xl p-4 w-56 hidden sm:block">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400" /><span className="text-xs">New match · 92%</span></div>
            <p className="mt-1 text-sm font-semibold text-white">Senior Product Manager</p>
            <p className="text-xs text-white/60">Careem · Dubai</p>
          </motion.div>
          <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute -right-4 bottom-8 glass rounded-2xl p-4 w-52 hidden sm:block">
            <div className="flex items-center gap-2 text-amber-300"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
            <p className="mt-1 text-xs text-white/90">"Landed a role in 3 weeks"</p>
            <p className="text-xs text-white/60 mt-1">— Sara M., Dubai</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl sm:text-3xl font-bold">{value}</p>
      <p className="text-xs text-white/60 mt-1">{label}</p>
    </div>
  );
}

function TrustBar() {
  const boards = ["LinkedIn", "Indeed", "Bayt", "Naukrigulf", "GulfTalent"];
  return (
    <section className="py-12 border-y border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Aggregating only trusted UAE job sources</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {boards.map((b) => (
            <span key={b} className="text-lg sm:text-xl font-bold text-muted-foreground/70 hover:text-foreground transition">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Target, title: "Tell us your targets", desc: "Pick up to 5 roles you're hunting, paste your CV, add a short summary." },
    { icon: Zap, title: "AI scans daily", desc: "We pull jobs from LinkedIn, Indeed, Bayt, Naukrigulf and GulfTalent every morning." },
    { icon: TrendingUp, title: "Get scored matches", desc: "Only jobs scoring 60%+ against your profile land in your inbox. No spam." },
    { icon: FileText, title: "One-click tailored CV", desc: "Generate a job-specific CV and cover letter in seconds and apply with confidence." },
  ];
  return (
    <section id="how" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="How it works" title="From scrolling to shortlisted in 4 steps" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="relative p-6 h-full hover:shadow-elegant transition group">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-brand text-white grid place-items-center text-sm font-bold">{i+1}</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-brand-soft grid place-items-center mb-4 group-hover:scale-110 transition">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { icon: Target, title: "AI Match Scoring", desc: "Every job is scored 0–100% against your profile. Only see what's worth applying to." },
    { icon: Mail, title: "Daily Email Digest", desc: "Wake up to a clean list of 60%+ matches in your inbox. No noise, no clutter." },
    { icon: FileText, title: "Tailored CV & Cover Letter", desc: "One click generates a CV and cover letter rewritten for the specific role." },
    { icon: Shield, title: "Trusted Sources Only", desc: "We only pull from LinkedIn, Indeed, Bayt, Naukrigulf, GulfTalent. Zero spam boards." },
    { icon: MapPin, title: "UAE-Focused", desc: "Built for the local market — Dubai, Abu Dhabi, Sharjah and across the Emirates." },
    { icon: Users, title: "Shared Smart Pool", desc: "Our job pool grows with every user. Faster scraping, broader coverage, fresher leads." },
  ];
  return (
    <section id="features" className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="Features" title="Everything you need to win the UAE job market" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feats.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="p-6 h-full hover:-translate-y-1 hover:shadow-elegant transition">
                <div className="w-12 h-12 rounded-xl bg-gradient-brand grid place-items-center mb-4 shadow-glow">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { name: "Sara M.", role: "Landed Regional Manager in 3 weeks", quote: "Stopped wasting 2 hours a day on LinkedIn. The match scores are scary accurate." },
    { name: "Ahmed R.", role: "Senior Engineer at a Dubai startup", quote: "The tailored CV feature alone is worth it. Every interview I got, the CV was already on point." },
    { name: "Priya K.", role: "Marketing Director in Abu Dhabi", quote: "Felt like a recruiter quietly working in the background. Five offers in six weeks." },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="Success stories" title="UAE professionals already winning" />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {t.map((x, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="p-6 h-full">
                <div className="flex gap-1 mb-3 text-gold">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-foreground leading-relaxed mb-6">"{x.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand grid place-items-center text-white font-semibold">{x.name[0]}</div>
                  <div>
                    <p className="font-semibold text-sm">{x.name}</p>
                    <p className="text-xs text-muted-foreground">{x.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[["3,400+","Happy hunters"],["28,000+","Matches sent"],["1,200+","Offers landed"],["4.9","Avg rating"]].map(([v, l]) => (
            <div key={l as string} className="p-6 rounded-2xl bg-gradient-brand-soft">
              <p className="text-3xl font-bold text-gradient-brand">{v}</p>
              <p className="text-xs text-muted-foreground mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="Pricing" title="Free to start. Premium when you're ready." />
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="p-8">
            <h3 className="font-semibold text-xl">Free</h3>
            <p className="text-muted-foreground text-sm mt-1">Everything you need to land your next role</p>
            <p className="mt-6"><span className="text-5xl font-bold">AED 0</span><span className="text-muted-foreground">/mo</span></p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Up to 5 target titles","Daily match digest","Up to 30 tailored CVs / month","All 5 trusted job boards","AI assistant"].map((x) => (
                <li key={x} className="flex gap-2"><Check className="w-4 h-4 text-success mt-0.5" /><span>{x}</span></li>
              ))}
            </ul>
            <Button asChild className="w-full mt-8" variant="outline"><Link to="/signup">Start free</Link></Button>
          </Card>
          <Card className="p-8 relative border-2 border-primary/40 bg-gradient-brand-soft">
            <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-brand text-white text-xs font-semibold">Most Popular</span>
            <h3 className="font-semibold text-xl">Premium</h3>
            <p className="text-muted-foreground text-sm mt-1">For serious job hunters who want every edge</p>
            <p className="mt-6"><span className="text-5xl font-bold">AED 79</span><span className="text-muted-foreground">/mo</span></p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Unlimited target titles","Real-time match alerts","Unlimited tailored CVs","Priority AI model","Interview prep assistant","Salary insights"].map((x) => (
                <li key={x} className="flex gap-2"><Check className="w-4 h-4 text-success mt-0.5" /><span>{x}</span></li>
              ))}
            </ul>
            <Button asChild className="w-full mt-8 bg-gradient-brand text-primary-foreground"><Link to="/signup">Coming soon</Link></Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    ["Which job boards do you scan?", "LinkedIn, Indeed, Bayt, Naukrigulf and GulfTalent — the 5 most trusted sources for UAE roles. We deliberately exclude low-quality boards to keep your matches clean."],
    ["How does the match score work?", "Our AI compares each job description against your profile summary, CV and target titles, weighing skills, seniority, industry and location. Only jobs scoring 60%+ get emailed to you."],
    ["Is my data private?", "Always. Your profile and CV are encrypted, never sold and never shared with employers without your action."],
    ["Do I need to be in the UAE?", "No — many of our users are expats applying from abroad. JobHunter is built around the UAE market specifically."],
    ["What happens when I click 'Create CV + Cover Letter'?", "The AI rewrites your CV and crafts a cover letter tailored to that specific role and company, then emails both to you as a PDF in under a minute."],
  ];
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHead eyebrow="FAQ" title="Common questions" />
        <Accordion type="single" collapsible className="mt-10">
          {items.map(([q, a], i) => (
            <AccordionItem key={i} value={`i${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl bg-gradient-hero text-white p-12 sm:p-16 text-center overflow-hidden shadow-elegant">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#667eea]/30 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl animate-blob [animation-delay:3s]" />
          </div>
          <div className="relative">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-amber-300" />
            <h2 className="text-3xl sm:text-5xl font-extrabold">Your next UAE role is waiting.</h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">Join thousands of professionals letting AI do the boring work. Free forever to start.</p>
            <Button asChild size="lg" className="mt-8 bg-white text-[#3d1f6e] hover:bg-white/90 font-semibold shadow-elegant">
              <Link to="/signup">Get Started Free <ArrowRight className="ml-1 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-primary font-semibold">{eyebrow}</p>
      <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}
