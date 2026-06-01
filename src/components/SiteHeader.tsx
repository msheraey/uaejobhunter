import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Target, Moon, Sun, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-bold text-xl ${light ? "text-white" : ""} ${className}`}>
      <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-gradient-brand shadow-glow">
        <Target className="w-5 h-5 text-white" strokeWidth={2.5} />
      </span>
      <span className="tracking-tight">
        Job<span className={light ? "text-amber-300" : "text-gradient-brand"}>Hunter</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme") === "dark";
    setDark(stored);
    document.documentElement.classList.toggle("dark", stored);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Over-hero (not scrolled) → light text. Scrolled → normal theme text.
  const overHero = !scrolled;
  const navText = overHero ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground";
  const iconBtn = overHero ? "text-white hover:bg-white/10 hover:text-white" : "";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/60" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo light={overHero} />
        <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${overHero ? "text-white/80" : "text-muted-foreground"}`}>
          <a href="/#how" className={navText.replace(/^text-\S+\s/, "")}>How it works</a>
          <a href="/#features" className={navText.replace(/^text-\S+\s/, "")}>Features</a>
          <a href="/#pricing" className={navText.replace(/^text-\S+\s/, "")}>Pricing</a>
          <a href="/#faq" className={navText.replace(/^text-\S+\s/, "")}>FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDark} aria-label="Toggle theme" className={iconBtn}>
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          {user ? (
            <>
              <Button variant="ghost" asChild className={`hidden sm:inline-flex ${iconBtn}`}><Link to="/dashboard">Dashboard</Link></Button>
              <Button variant={overHero ? "outline" : "outline"} className={overHero ? "bg-white/5 border-white/30 text-white hover:bg-white/15 hover:text-white" : ""} onClick={async () => { await signOut(); router.navigate({ to: "/" }); }}>Sign out</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className={`hidden sm:inline-flex ${iconBtn}`}><Link to="/login">Login</Link></Button>
              <Button asChild className={overHero ? "bg-white text-[#3d1f6e] hover:bg-white/90 font-semibold shadow-elegant" : "bg-gradient-brand hover:opacity-90 shadow-elegant text-primary-foreground"}>
                <Link to="/signup">Get Started Free</Link>
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className={`md:hidden ${iconBtn}`} onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/60 px-6 py-4 flex flex-col gap-3 text-sm">
          <a href="/#how" onClick={() => setOpen(false)}>How it works</a>
          <a href="/#features" onClick={() => setOpen(false)}>Features</a>
          <a href="/#pricing" onClick={() => setOpen(false)}>Pricing</a>
          <a href="/#faq" onClick={() => setOpen(false)}>FAQ</a>
          {!user && <Link to="/login" onClick={() => setOpen(false)}>Login</Link>}
        </div>
      )}
    </header>
  );
}
