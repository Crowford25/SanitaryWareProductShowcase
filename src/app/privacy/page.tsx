import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Aurelia Bath collects, uses and protects the details you share when you book a consultation.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="3 November 2026"
      intro="This policy explains what we collect when you request a consultation, why we need it, and the choices you have. We handle personal data in line with the Personal Data Protection Act 2010 of Malaysia and the PDPA of Singapore."
      sections={[
        {
          heading: "What we collect",
          body: (
            <p>
              Your name, email address, phone number, the type of project, where you would like to meet, and anything you
              choose to tell us about the room.
            </p>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <>
              <p>We use your details to arrange and prepare for your consultation, send your plan and quote, and follow up on an order.</p>
              <p>We do not sell your details or share them with advertisers.</p>
            </>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <p>
              Only the people who help us deliver your project: our showroom and service team, and, with your permission,
              the contractor or designer you name.
            </p>
          ),
        },
        {
          heading: "Cookies",
          body: <p>This site does not set advertising or tracking cookies.</p>,
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              We keep consultation requests for 24 months, and order records for 7 years to meet tax and warranty
              obligations.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You can ask to see, correct or delete your details at any time by emailing{" "}
              <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
                {site.email}
              </a>
              . We reply within 7 working days.
            </p>
          ),
        },
      ]}
    />
  );
}
