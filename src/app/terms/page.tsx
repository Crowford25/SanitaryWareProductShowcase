import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms that apply to Aurelia Bath consultations, quotes, orders, delivery, returns and warranty.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="3 November 2026"
      intro="These terms cover consultations, quotes and orders placed with Aurelia Bath Sdn Bhd. By booking a consultation or placing an order, you agree to them."
      sections={[
        {
          heading: "Consultations",
          body: (
            <p>
              Consultations are free and carry no obligation to order. The layout, product list and drawings we prepare
              are yours to keep and use.
            </p>
          ),
        },
        {
          heading: "Quotes and prices",
          body: (
            <p>
              Quotes are valid for 30 days and include SST. Prices on this site are starting prices for the base finish
              and may change before you confirm an order.
            </p>
          ),
        },
        {
          heading: "Delivery",
          body: (
            <p>
              Stocked pieces are delivered in about 19 working days within the Klang Valley and Singapore. Made to order
              finishes take about 7 weeks. We confirm a delivery date in writing when you order.
            </p>
          ),
        },
        {
          heading: "Returns and changes",
          body: (
            <p>
              Unused stocked pieces in their original packaging can be returned within 30 days for a full refund. Made to
              order pieces can be changed until production starts, usually 5 working days after you confirm.
            </p>
          ),
        },
        {
          heading: "Warranty",
          body: (
            <p>
              15 years on ceramics and solid surface, 7 years on brassware and cartridges, and 2 years on electronic
              parts. The warranty covers manufacturing defects when pieces are installed to our rough in drawings.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
