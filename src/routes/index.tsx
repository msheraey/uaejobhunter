import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Mail, FileText, Shield, MapPin, Zap, Check, Star, ArrowRight, TrendingUp, Users, Briefcase, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({ component: Landing });

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
            <span>Made for professionals across the UAE</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Stop searching.<br/>
            <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">Start matching.</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
            JobHunter's AI scans trusted UAE job sources every day, scores every opening against <em>your</em> profile, and emails only the matches worth your time. Tailored CV in one click.
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
            <Stat value="5" label="Trusted UAE job sources" />
            <Stat value="AI-powered" label="Match scoring" />
            <Stat value="Seconds" label="Tailored CV" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-elegant">
            <img src={heroImg} alt="JobHunter dashboard preview" width={1600} height={1200} className="w-full h-auto" />
          </div>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -left-6 top-10 glass rounded-2xl p-4 w-56 hidden sm:block">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400" /><span className="text-xs">New match · 92%</span></div>
            <p className="mt-1 text-sm font-semibold text-white">Senior Product Manager</p>
            <p className="text-xs text-white/60">Example match preview</p>
          </motion.div>
          <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute -right-4 bottom-8 glass rounded-2xl p-4 w-52 hidden sm:block">
            <div className="flex items-center gap-2 text-amber-300"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
            <p className="mt-1 text-xs text-white/90">Tailored CV delivered</p>
            <p className="text-xs text-white/60 mt-1">in under a minute</p>
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
  return (
    <section className="py-12 border-y border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Quality over noise</p>
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-brand-soft border border-primary/20">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">Trusted sources only — no spam boards</span>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Target, title: "Tell us your targets", desc: "Pick up to 5 roles you're hunting, paste your CV, add a short summary." },
    { icon: Zap, title: "AI scans daily", desc: "We pull jobs from trusted UAE job sources every morning." },
    { icon: TrendingUp, title: "Get scored matches", desc: "Only jobs scoring 60%+ against your profile land in your inbox. No spam." },
    { icon: FileText, title: "One-click tailored CV", desc: "Generate a job-specific CV and cover letter and apply with confidence." },
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
    { icon: FileText, title: "Tailored CV & Cover Letter", desc: "One click rewrites your CV and cover letter for the specific role, emailed in under a minute." },
    { icon: Shield, title: "Trusted Sources Only", desc: "We aggregate only reputable UAE job sources and filter out spam and low-quality boards." },
    { icon: MapPin, title: "UAE-Focused", desc: "Built specifically for the UAE market — roles across the Emirates." },
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
    { persona: "Mid-career professional", outcome: "Lands a senior role faster", quote: "Stops scrolling job boards for hours. Wakes up to a curated list of 80%+ matches and applies with a tailored CV in minutes." },
    { persona: "Recently-relocated expat", outcome: "Cuts through the noise", quote: "New to the UAE market, doesn't know which boards to trust. Gets only vetted roles across the Emirates without the spam." },
    { persona: "Senior leader", outcome: "Discreet, ongoing search", quote: "Always-on background scanning surfaces standout opportunities, with company insights and tailored applications ready in one click." },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="What success looks like" title="The kind of wins JobHunter is built for" />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {t.map((x, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="p-6 h-full relative">
                <Badge variant="outline" className="absolute top-4 right-4 text-[10px] uppercase tracking-wider">Example</Badge>
                <div className="flex gap-1 mb-3 text-amber-400">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-foreground leading-relaxed mb-6">"{x.quote}"</p>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-sm">{x.persona}</p>
                  <p className="text-xs text-muted-foreground mt-1">{x.outcome}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Illustrative examples. JobHunter is newly launched — real success stories coming soon.
        </p>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Job Seeker", tagline: "Free", price: "AED 0", popular: false, cta: "Start free", ctaTo: "/signup" as const, comingSoon: false,
      features: [
        "Up to 3 target job titles",
        "Daily match digest (60%+ matches)",
        "Dashboard with match scores",
        "View / Apply on all jobs",
        "3 tailored CVs + cover letters per month",
        "Trusted sources only",
        "AI assistant",
      ],
    },
    {
      name: "Career Accelerator", tagline: "Pro", price: "AED 39", popular: true, cta: "Coming soon", ctaTo: null, comingSoon: true,
      features: [
        "Up to 10 target job titles",
        "Twice-daily match refresh",
        "Unlimited tailored CVs + cover letters",
        "Salary benchmarking on every job",
        "Company insights panel",
        "Full application tracking",
        "LinkedIn optimization tips",
      ],
    },
    {
      name: "Job Hunter Pro", tagline: "Premium", price: "AED 89", popular: false, cta: "Coming soon", ctaTo: null, comingSoon: true,
      features: [
        "Everything in Pro",
        "Unlimited target job titles",
        "Company reputation & red-flag checks",
        "AI interview prep (role & company-specific)",
        "Hiring-signal news alerts",
        "WhatsApp notifications",
        "Early access to new features",
      ],
    },
  ];
  return (
    <section id="pricing" className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="Pricing" title="Free to start. Upgrade when you're ready." />
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {tiers.map((t) => (
            <Card key={t.name} className={`p-8 relative flex flex-col ${t.popular ? "border-2 border-primary/40 bg-gradient-brand-soft md:scale-[1.03] shadow-elegant" : ""}`}>
              {t.popular && (
                <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-brand text-white text-xs font-semibold">Most Popular</span>
              )}
              <p className="text-xs uppercase tracking-widest text-primary font-semibold">{t.tagline}</p>
              <h3 className="font-bold text-xl mt-1">{t.name}</h3>
              <p className="mt-6"><span className="text-5xl font-bold">{t.price}</span><span className="text-muted-foreground">/mo</span></p>
              <ul className="mt-6 space-y-3 text-sm flex-1">
                {t.features.map((x) => (
                  <li key={x} className="flex gap-2"><Check className="w-4 h-4 text-success mt-0.5 shrink-0" /><span>{x}</span></li>
                ))}
              </ul>
              {t.comingSoon ? (
                <Button disabled className="w-full mt-8 bg-gradient-brand text-primary-foreground opacity-70 cursor-not-allowed">{t.cta}</Button>
              ) : (
                <Button asChild className={`w-full mt-8 ${t.popular ? "bg-gradient-brand text-primary-foreground" : ""}`} variant={t.popular ? "default" : "outline"}>
                  <Link to={t.ctaTo!}>{t.cta}</Link>
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items: [string, string][] = [
    ["Which job boards do you scan?", "We aggregate only trusted, reputable UAE job sources and filter out spam and low-quality aggregator sites."],
    ["How does the match score work?", "Our AI compares each job against your profile, CV, and target roles, scoring it 0–100%. You only get matches scoring 60% or higher."],
    ["Is my data private?", "Yes. Your profile, CV, and contact details are private to your account and never shared or sold. We back this with proper database security."],
    ["Do I need to be in the UAE?", "No, but JobHunter is built specifically for jobs located in the UAE — across the Emirates."],
    ["What happens when I click 'Create CV + Cover Letter'?", "Our AI rewrites your CV and writes a cover letter tailored to that specific job, then emails it to you in under a minute."],
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
            <p className="mt-4 text-white/80 max-w-xl mx-auto">Let AI do the boring work. Free forever to start.</p>
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
