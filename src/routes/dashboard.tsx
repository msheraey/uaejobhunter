import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Logo } from "@/components/SiteHeader";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { Search, RefreshCw, ExternalLink, FileText, Mail, Briefcase, TrendingUp, Sparkles, MapPin, Settings, LogOut } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

type Job = {
  id: string; title: string; company: string; location: string; platform: string;
  url: string; salary: string | null; posted_at: string | null; match_score: number;
};

const DEMO: Job[] = [
  { id: "1", title: "Senior Product Manager", company: "Example Co.", location: "UAE", platform: "Trusted source", url: "#", salary: "AED 35,000 / mo", posted_at: "2d ago", match_score: 94 },
  { id: "2", title: "Marketing Director — MENA", company: "Example Co.", location: "UAE", platform: "Trusted source", url: "#", salary: "AED 40,000 / mo", posted_at: "1d ago", match_score: 88 },
  { id: "3", title: "Data Scientist", company: "Example Co.", location: "UAE", platform: "Trusted source", url: "#", salary: null, posted_at: "5h ago", match_score: 82 },
  { id: "4", title: "Regional Sales Manager", company: "Example Co.", location: "UAE", platform: "Trusted source", url: "#", salary: "AED 28,000 / mo", posted_at: "3d ago", match_score: 76 },
  { id: "5", title: "UX Designer", company: "Example Co.", location: "UAE", platform: "Trusted source", url: "#", salary: null, posted_at: "1d ago", match_score: 71 },
  { id: "6", title: "Customer Success Lead", company: "Example Co.", location: "UAE", platform: "Trusted source", url: "#", salary: "AED 22,000 / mo", posted_at: "4h ago", match_score: 65 },
  { id: "7", title: "Junior Accountant", company: "Example Co.", location: "UAE", platform: "Trusted source", url: "#", salary: null, posted_at: "1w ago", match_score: 54 },
];

function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [jobs] = useState<Job[]>(DEMO);
  const [filter, setFilter] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [q, setQ] = useState("");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fullName, setFullName] = useState("Hunter");

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.navigate({ to: "/login" }); return; }
    supabase.from("profiles").select("full_name,email").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data?.full_name) setFullName(data.full_name);
      else if (data?.email) setFullName(data.email.split("@")[0]);
    });
  }, [user, authLoading, router]);

  const runMatches = () => {
    setRunning(true); setProgress(0);
    const iv = setInterval(() => setProgress(p => {
      const n = p + Math.random() * 15;
      if (n >= 100) { clearInterval(iv); setRunning(false); toast.success("Matches refreshed!"); return 100; }
      return n;
    }), 200);
  };

  const tailorCV = (job: Job) => {
    toast.success(`Tailored CV for ${job.title} is on its way to your inbox ✨`);
  };

  const filtered = useMemo(() => jobs
    .filter(j => filter === "all" || (filter === "80" ? j.match_score >= 80 : j.match_score >= 60))
    .filter(j => platform === "all" || j.platform === platform)
    .filter(j => !q || `${j.title} ${j.company}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.match_score - a.match_score), [jobs, filter, platform, q]);

  if (authLoading || !user) return <div className="min-h-screen grid place-items-center"><Skeleton className="w-64 h-12" /></div>;

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-card border-b border-border sticky top-0 z-30 backdrop-blur-xl bg-card/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm"><Link to="/profile"><Settings className="w-4 h-4 mr-1" />Profile</Link></Button>
            <Button variant="outline" size="sm" onClick={async () => { await signOut(); router.navigate({ to: "/" }); }}><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {fullName} 👋</h1>
            <p className="text-sm text-muted-foreground mt-1">Your matches will appear shortly — popular roles are ready instantly, new ones may take a little time to gather.</p>
          </div>
          <Button onClick={runMatches} disabled={running} size="lg" className="bg-gradient-brand text-primary-foreground shadow-elegant">
            <RefreshCw className={`w-4 h-4 mr-2 ${running ? "animate-spin" : ""}`} />
            {running ? "Hunting..." : "Run / Refresh Matches"}
          </Button>
        </motion.div>

        {running && <Progress value={progress} className="h-2" />}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Briefcase} label="Total matches" value={jobs.length} tint="from-[#667eea] to-[#764ba2]" />
          <StatCard icon={TrendingUp} label="80%+ matches" value={jobs.filter(j => j.match_score >= 80).length} tint="from-green-500 to-emerald-600" />
          <StatCard icon={Sparkles} label="New today" value={3} tint="from-amber-400 to-orange-500" />
          <StatCard icon={Mail} label="Applications sent" value={0} tint="from-pink-500 to-rose-600" />
        </div>

        <Card className="p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search title or company..." value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All scores</SelectItem>
              <SelectItem value="80">80%+</SelectItem>
              <SelectItem value="60">60%+</SelectItem>
            </SelectContent>
          </Select>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All platforms</SelectItem>
              {["LinkedIn","Indeed","Bayt","Naukrigulf","GulfTalent"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </Card>

        <div className="p-3 rounded-xl bg-gradient-brand-soft border border-primary/20 text-sm flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          <span>Matches scoring 60%+ are also emailed to you automatically every morning.</span>
        </div>

        <div className="grid gap-4">
          {filtered.map((j, i) => (
            <motion.div key={j.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <JobCard job={j} onTailor={tailorCV} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <Card className="p-12 text-center text-muted-foreground">No jobs match your filters yet — try widening the score or platform.</Card>
          )}
        </div>
      </div>
      <ChatbotWidget />
      <FeedbackWidget />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tint }: { icon: any; label: string; value: number; tint: string }) {
  return (
    <Card className="p-5 relative overflow-hidden">
      <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br ${tint} opacity-20 blur-xl`} />
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tint} grid place-items-center text-white mb-3`}><Icon className="w-5 h-5" /></div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </Card>
  );
}

function JobCard({ job, onTailor }: { job: Job; onTailor: (j: Job) => void }) {
  const score = job.match_score;
  const tone = score >= 80 ? "bg-success/15 text-success border-success/30" : score >= 60 ? "bg-warning/15 text-warning border-warning/40" : "bg-muted text-muted-foreground border-border";
  return (
    <Card className="p-5 hover:shadow-elegant transition group">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Badge variant="outline" className="text-xs">{job.platform}</Badge>
            <span className="text-xs text-muted-foreground">· {job.posted_at}</span>
          </div>
          <h3 className="text-lg font-semibold group-hover:text-primary transition">{job.title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
            {job.salary && <span className="font-medium text-foreground">{job.salary}</span>}
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2">
          <div className={`px-3 py-1.5 rounded-full text-sm font-bold border ${tone}`}>{score}% match</div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm"><a href={job.url} target="_blank" rel="noreferrer"><ExternalLink className="w-3 h-3 mr-1" />Apply</a></Button>
            <Button size="sm" onClick={() => onTailor(job)} className="bg-gradient-brand text-primary-foreground"><FileText className="w-3 h-3 mr-1" />Tailored CV</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
