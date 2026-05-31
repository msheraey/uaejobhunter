import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Logo } from "@/components/SiteHeader";
import { X, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/profile")({ component: Profile });

function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [full_name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [daily, setDaily] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.navigate({ to: "/login" }); return; }
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) { setName(data.full_name ?? ""); setPhone(data.phone ?? ""); setSummary(data.summary ?? ""); }
    });
    supabase.from("user_titles").select("title").eq("user_id", user.id).then(({ data }) => {
      setTitles((data ?? []).map((r: any) => r.title));
    });
  }, [user, loading, router]);

  const addTitle = async () => {
    const t = newTitle.trim();
    if (!t || !user) return;
    if (titles.length >= 5) { toast.error("Max 5 titles"); return; }
    if (titles.includes(t)) return;
    await supabase.from("user_titles").insert({ user_id: user.id, title: t });
    await supabase.from("title_pool").insert({ title: t }).then(() => {}, () => {});
    setTitles([...titles, t]); setNewTitle("");
  };

  const removeTitle = async (t: string) => {
    if (!user) return;
    await supabase.from("user_titles").delete().eq("user_id", user.id).eq("title", t);
    setTitles(titles.filter(x => x !== t));
  };

  const save = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update({ full_name, phone, summary, updated_at: new Date().toISOString() }).eq("id", user.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Profile saved");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <Button asChild variant="ghost" size="sm"><Link to="/dashboard"><ArrowLeft className="w-4 h-4 mr-1" />Dashboard</Link></Button>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Profile & Settings</h1>

        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Personal info</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Full name</Label><Input value={full_name} onChange={e => setName(e.target.value)} /></div>
            <div><Label>Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
          </div>
          <div><Label>Profile summary</Label><Textarea rows={5} value={summary} onChange={e => setSummary(e.target.value)} placeholder="What you do, industries, what you're hunting for..." /></div>
          <Button onClick={save} className="bg-gradient-brand text-primary-foreground">Save changes</Button>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Target job titles ({titles.length}/5)</h2>
          <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
            {titles.map(t => (
              <Badge key={t} className="bg-gradient-brand text-primary-foreground gap-1 pl-3">
                {t}<button onClick={() => removeTitle(t)}><X className="w-3 h-3 ml-1" /></button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Add a job title" onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTitle())} />
            <Button onClick={addTitle} variant="outline">Add</Button>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Notifications</h2>
          <div className="flex items-center justify-between">
            <div><p className="font-medium">Daily match digest</p><p className="text-sm text-muted-foreground">Get 60%+ matches emailed every morning.</p></div>
            <Switch checked={daily} onCheckedChange={setDaily} />
          </div>
        </Card>
      </div>
    </div>
  );
}
