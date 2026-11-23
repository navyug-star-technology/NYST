import { createFileRoute, redirect } from "@tanstack/react-router";
import { ArrowRight, Check, FileText, Layers3, Search, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const enquiryTopics = [
  {
    icon: Search,
    number: "01",
    title: "Product fit",
    description: "Share the workflow you want to improve and ask about relevant product features.",
  },
  {
    icon: Workflow,
    number: "02",
    title: "Availability & demos",
    description:
      "Check current availability and ask the team whether a product demo can be arranged.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Licensing",
    description: "Discuss licensing options directly with the team before making a decision.",
  },
];

function ProductEnquiryDiagram() {
  return (
    <div
      className="product-enquiry-visual"
      role="img"
      aria-label="Product enquiry flow: share your needs, confirm current product details, and discuss next steps."
    >
      <div className="product-visual-topbar">
        <span className="product-visual-mark">
          <Layers3 aria-hidden="true" />
        </span>
        <span>PRODUCT ENQUIRY / GUIDE</span>
        <span className="product-visual-status">
          <i aria-hidden="true" />
          INFORMATION FIRST
        </span>
      </div>
      <div className="product-visual-content">
        <p className="product-visual-kicker">A CLEAR WAY TO EXPLORE</p>
        <h2>Know what&apos;s available before you decide.</h2>
        <p className="product-visual-description">
          Product details are confirmed with our team, based on your requirements.
        </p>
        <div className="product-enquiry-flow">
          {[
            ["01", "Share your needs"],
            ["02", "Confirm current details"],
            ["03", "Discuss next steps"],
          ].map(([number, title], index) => (
            <div className="product-flow-item" key={number}>
              <span className="product-flow-number">{number}</span>
              <strong>{title}</strong>
              {index < 2 && <span className="product-flow-connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
        <div className="product-topic-tags" aria-hidden="true">
          <span>Features</span>
          <span>Availability</span>
          <span>Demos</span>
          <span>Licensing</span>
        </div>
      </div>
      <div className="product-visual-orbit product-visual-orbit-one" aria-hidden="true" />
      <div className="product-visual-orbit product-visual-orbit-two" aria-hidden="true" />
    </div>
  );
}

function ProductsPage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <div className="inner-page marketing-subpage products-page">
        <section className="products-hero">
          <div className="products-hero-copy">
            <p className="eyebrow">Digital products</p>
            <h1>Explore what fits. Get the facts first.</h1>
            <p className="products-hero-lede">
              Alongside custom development, NavYug Star Technology creates digital products to
              simplify everyday business workflows. Ask our team about current product details,
              availability, demos, or licensing.
            </p>
            <div className="products-hero-actions">
              <Button asChild size="lg">
                <a href="/contact">
                  Ask about products <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <a className="products-secondary-link" href="#product-enquiries">
                What can I ask? <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <p className="products-honesty-note">
              <Check aria-hidden="true" />
              Product features and availability are confirmed by our team.
            </p>
          </div>
          <ProductEnquiryDiagram />
        </section>

        <section id="product-enquiries" className="product-enquiries">
          <div className="product-section-heading">
            <p className="eyebrow">Product enquiries</p>
            <h2>Get answers that match your needs.</h2>
            <p>
              Tell us what you&apos;re looking for. We&apos;ll share the information we can confirm
              about current products and options.
            </p>
          </div>
          <div className="product-enquiry-grid">
            {enquiryTopics.map(({ icon: Icon, number, title, description }) => (
              <article className="product-enquiry-card" key={number}>
                <div className="product-enquiry-card-top">
                  <span>{number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="products-contact-banner">
            <div>
              <p className="eyebrow">Need product details?</p>
              <h2>Tell us what you&apos;re trying to solve.</h2>
              <p>We&apos;ll help you find out whether a current product is a fit.</p>
            </div>
            <a href="/contact">
              Talk to our team <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

export const Route = createFileRoute("/products")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Products | NavYug Star Technology" },
      {
        name: "description",
        content:
          "Ask about current product details, availability, demos, and licensing with NavYug Star Technology.",
      },
    ],
  }),
});
