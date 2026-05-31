import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Logo } from "@/components/SiteHeader";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Welcome back!");
    router.navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-gradient-hero text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#667eea]/40 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#764ba2]/40 rounded-full blur-3xl animate-blob [animation-delay:3s]" />
        </div>
        <Logo className="relative text-white" />
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight">Welcome back, hunter.</h2>
          <p className="mt-4 text-white/70 max-w-md">Your matches are waiting. Let's see what landed in your inbox today.</p>
        </div>
        <p className="relative text-xs text-white/50">© {new Date().getFullYear()} JobHunter</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8">
          <div className="lg:hidden mb-6"><Logo /></div>
          <h1 className="text-2xl font-bold">Log in</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back to JobHunter.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <div className="flex justify-between">
                <Label>Password</Label>
                <a href="#" className="text-xs text-primary">Forgot?</a>
              </div>
              <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button disabled={loading} className="w-full bg-gradient-brand text-primary-foreground">{loading ? "Signing in..." : "Sign in"}</Button>
          </form>
          <p className="mt-6 text-sm text-center text-muted-foreground">
            New here? <Link to="/signup" className="text-primary font-medium">Create an account</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
