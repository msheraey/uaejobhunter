import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — JobHunter" },
    { name: "description", content: "How JobHunter handles your personal data, CV, and contact details." },
  ]}),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24 prose-styles">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-8 space-y-6 text-foreground/90 leading-relaxed">
          <p>JobHunter is a UAE-focused, AI-powered job matching service. This Privacy Policy explains how we handle the personal information you share with us, including your name, email, mobile number, profile summary, and uploaded CV.</p>
          <Section title="What we collect">
            <p>Account details (email, mobile, password hash), optional profile information (gender, summary, CV file), your selected target job titles, and usage data such as which jobs you view or apply to.</p>
          </Section>
          <Section title="How we use it">
            <p>Strictly to operate JobHunter: match you to relevant UAE roles, generate tailored CVs and cover letters, send you match digests and product communications, and improve our matching models in aggregate.</p>
          </Section>
          <Section title="What we never do">
            <p>We do not sell your data. We do not share your CV or contact details with employers without an explicit action from you. We do not list specific third-party job boards we ingest from, and we do not pass your identity to those sources.</p>
          </Section>
          <Section title="Security">
            <p>Data is stored on managed cloud infrastructure with row-level access controls so each user can only read and modify their own records.</p>
          </Section>
          <Section title="Your rights">
            <p>You can request access, correction, or deletion of your personal data at any time by contacting us through the in-app feedback widget.</p>
          </Section>
          <p className="text-sm text-muted-foreground italic">JobHunter is newly launched. This is a starter policy — our full, legally-reviewed Privacy Policy is being finalized and will be published here shortly.</p>
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
