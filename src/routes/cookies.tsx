import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [
    { title: "Cookie Policy — JobHunter" },
    { name: "description", content: "How JobHunter uses cookies and similar storage." },
  ]}),
  component: Cookies,
});

function Cookies() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-8 space-y-6 text-foreground/90 leading-relaxed">
          <Section title="What we use">
            <p>JobHunter uses essential cookies and local browser storage to keep you signed in, remember your theme preference, and operate the service. We do not use third-party advertising or cross-site tracking cookies.</p>
          </Section>
          <Section title="Analytics">
            <p>We may use privacy-friendly product analytics to understand which features are used. Any analytics data is aggregated and does not identify you personally.</p>
          </Section>
          <Section title="Managing cookies">
            <p>You can clear cookies and local storage from your browser settings at any time. Doing so will sign you out and reset preferences.</p>
          </Section>
          <p className="text-sm text-muted-foreground italic">JobHunter is newly launched. This is a starter Cookie Policy — our full, legally-reviewed version is being finalized and will be published here shortly.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}
