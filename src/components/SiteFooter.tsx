import { Link } from "@tanstack/react-router";
import { Logo } from "./SiteHeader";
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2 space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-sm">
            AI-powered job matching for the UAE. Stop scrolling job boards — get hand-picked matches and tailored CVs in your inbox.
          </p>
          <form className="flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="you@email.com" type="email" />
            <Button className="bg-gradient-brand text-primary-foreground">Subscribe</Button>
          </form>
        </div>
        <FooterCol title="Product" links={[["How it works","/#how"],["Features","/#features"],["Pricing","/#pricing"],["FAQ","/#faq"]]} />
        <FooterCol title="Company" links={[["About","#"],["Blog","#"],["Careers","#"],["Contact","#"]]} />
        <FooterCol title="Legal" links={[["Privacy","/privacy"],["Terms","/terms"],["Cookies","/cookies"]]} />
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} JobHunter. Built for the UAE.</p>
          <div className="flex gap-3 text-muted-foreground">
            {[Twitter, Linkedin, Instagram, Facebook].map((I, i) => (
              <a key={i} href="#" className="hover:text-foreground transition"><I className="w-4 h-4" /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map(([label, href]) => (
          <li key={label}>
            {href.startsWith("/") && !href.startsWith("/#") ? (
              <Link to={href} className="hover:text-foreground transition">{label}</Link>
            ) : (
              <a href={href} className="hover:text-foreground transition">{label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
