import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms of Service — JobHunter" },
    { name: "description", content: "Terms governing your use of JobHunter." },
  ]}),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-8 space-y-6 text-foreground/90 leading-relaxed">
          <Section title="Acceptance">
            <p>By creating an account you agree to these Terms. JobHunter is a UAE-focused job matching service that helps you discover, score, and apply to job openings using AI.</p>
          </Section>
          <Section title="Your account">
            <p>You must provide accurate information, keep your credentials secure, and use JobHunter only for your own genuine job search. You agree not to abuse free-tier limits, scrape our service, or upload content you don't have the right to share.</p>
          </Section>
          <Section title="Content">
            <p>You retain ownership of your CV, profile summary, and any content you upload. You grant JobHunter a limited license to process this content to deliver the service (matching, tailoring CVs and cover letters, emailing you results).</p>
          </Section>
          <Section title="No employment guarantee">
            <p>JobHunter does not guarantee interviews, offers, or employment. Match scores and tailored documents are AI-generated and provided as-is.</p>
          </Section>
          <Section title="Termination">
            <p>You may delete your account at any time. We may suspend accounts that violate these Terms or abuse the service.</p>
          </Section>
          <p className="text-sm text-muted-foreground italic">JobHunter is newly launched. This is a starter Terms of Service — our full, legally-reviewed Terms are being finalized and will be published here shortly.</p>
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
