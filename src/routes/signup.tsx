import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Logo } from "@/components/SiteHeader";
import { Check, X, ArrowRight, Upload } from "lucide-react";

export const Route = createFileRoute("/signup")({ component: Signup });

const TOTAL = 5;

function Signup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [summary, setSummary] = useState("");
  const [cvName, setCvName] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [titleQ, setTitleQ] = useState("");
  const [pool, setPool] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.from("title_pool").select("title").limit(100).then(({ data }) => {
      setPool((data ?? []).map((r: any) => r.title));
    });
  }, []);

  const toggleTitle = (t: string) => {
    setTitles((cur) => cur.includes(t) ? cur.filter(x => x !== t) : cur.length >= 5 ? (toast.error("Max 5 titles"), cur) : [...cur, t]);
  };

  const addCustom = () => {
    const t = titleQ.trim();
    if (!t) return;
    if (titles.length >= 5) { toast.error("Max 5 titles"); return; }
    if (!titles.includes(t)) setTitles([...titles, t]);
    setTitleQ("");
  };

  const filtered = pool.filter(t => t.toLowerCase().includes(titleQ.toLowerCase()) && !titles.includes(t)).slice(0, 12);

  const submit = async () => {
    if (titles.length === 0) { toast.error("Pick at least one title"); return; }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email, password, phone: phone || undefined,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` }
    });
    if (error || !data.user) { setLoading(false); toast.error(error?.message ?? "Signup failed"); return; }
    const uid = data.user.id;
    await supabase.from("profiles").upsert({ id: uid, email, phone, gender: gender || null, summary: summary || null });
    await supabase.from("user_titles").insert(titles.map(t => ({ user_id: uid, title: t })));
    // seed any custom titles
    for (const t of titles) {
      await supabase.from("title_pool").insert({ title: t }).then(() => {}, () => {});
    }
    setLoading(false);
    toast.success("Welcome to JobHunter!");
    router.navigate({ to: "/dashboard" });
  };

  const next = () => {
    if (step === 1 && (!email || !password)) { toast.error("Email and password required"); return; }
    if (step === 2 && !phone) { toast.error("Phone required"); return; }
    setStep(s => Math.min(TOTAL, s + 1));
  };
  const back = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center text-white mb-6">
          <Logo className="text-white" />
          <Link to="/" className="text-sm text-white/70 hover:text-white">Cancel</Link>
        </div>
        <Card className="p-8 shadow-elegant">
          <Progress step={step} total={TOTAL} />
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="mt-8">
              {step === 1 && (
                <Step title="Let's get you started" subtitle="Your email and password.">
                  <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" /></div>
                  <div><Label>Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" /></div>
                </Step>
              )}
              {step === 2 && (
                <Step title="What's your mobile?" subtitle="We'll send a verification SMS (UAE +971 default).">
                  <div><Label>Mobile number</Label><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+971 50 123 4567" /></div>
                  <div>
                    <Label className="mb-2 block">Gender (optional)</Label>
                    <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                      {["Male", "Female", "Prefer not to say"].map(g => (
                        <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                          <RadioGroupItem value={g} />{g}
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                </Step>
              )}
              {step === 3 && (
                <Step title="Tell us about yourself" subtitle="The more you share, the sharper your matches.">
                  <div>
                    <Label>Profile summary</Label>
                    <Textarea rows={6} value={summary} onChange={e => setSummary(e.target.value)} placeholder="Your experience, industries, what you're hunting for in the UAE market..." />
                    <p className="text-xs text-muted-foreground mt-1">Optional — but recommended for sharper AI matches.</p>
                  </div>
                  <div>
                    <Label>CV (optional)</Label>
                    <label className="mt-1 flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">{cvName || "Upload PDF or DOCX"}</span>
                      <input type="file" accept=".pdf,.docx" className="hidden" onChange={e => setCvName(e.target.files?.[0]?.name ?? "")} />
                    </label>
                  </div>
                </Step>
              )}
              {step === 4 && (
                <Step title="Pick your target roles" subtitle="Choose up to 5. Add custom ones if yours isn't listed.">
                  <div className="flex flex-wrap gap-2 mb-3 min-h-[2.5rem]">
                    {titles.map(t => (
                      <Badge key={t} className="bg-gradient-brand text-primary-foreground gap-1 pl-3">
                        {t}<button onClick={() => toggleTitle(t)} className="ml-1 hover:opacity-80"><X className="w-3 h-3" /></button>
                      </Badge>
                    ))}
                    {titles.length === 0 && <p className="text-xs text-muted-foreground">No titles selected yet</p>}
                  </div>
                  <div className="flex gap-2">
                    <Input value={titleQ} onChange={e => setTitleQ(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCustom())} placeholder="Search or add custom title" />
                    <Button type="button" onClick={addCustom} variant="outline">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                    {filtered.map(t => (
                      <button key={t} onClick={() => toggleTitle(t)} className="px-3 py-1 text-xs rounded-full border border-border hover:border-primary hover:bg-primary/5 transition">
                        + {t}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{titles.length}/5 selected</p>
                </Step>
              )}
              {step === 5 && (
                <Step title="Ready to hunt?" subtitle="We'll start scanning jobs and email your first matches within 24 hours.">
                  <div className="space-y-2 text-sm">
                    <Row label="Email" value={email} />
                    <Row label="Phone" value={phone} />
                    <Row label="Target titles" value={titles.join(", ") || "—"} />
                    <Row label="CV" value={cvName || "Not uploaded"} />
                  </div>
                </Step>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-between gap-3">
            <Button variant="ghost" onClick={back} disabled={step === 1}>Back</Button>
            {step < TOTAL ? (
              <Button onClick={next} className="bg-gradient-brand text-primary-foreground">Continue <ArrowRight className="ml-1 w-4 h-4" /></Button>
            ) : (
              <Button onClick={submit} disabled={loading} className="bg-gradient-brand text-primary-foreground">{loading ? "Creating account..." : "Start hunting"}</Button>
            )}
          </div>
        </Card>
        <p className="mt-6 text-center text-sm text-white/70">
          Already have an account? <Link to="/login" className="text-white font-medium underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

function Step({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-2 py-2 border-b border-border last:border-0"><span className="text-muted-foreground">{label}</span><span className="font-medium text-right">{value}</span></div>;
}

function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i < step ? "bg-gradient-brand" : "bg-muted"}`} />
      ))}
    </div>
  );
}
