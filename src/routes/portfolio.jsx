import { ArrowRight, Code2, Laptop, Megaphone, Palette, Smartphone } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const capabilities = [
  { number: "01", label: "Websites", icon: Laptop },
  { number: "02", label: "Mobile apps", icon: Smartphone },
  { number: "03", label: "Business software", icon: Code2 },
  { number: "04", label: "User interface and user experience design", icon: Palette },
  { number: "05", label: "Digital marketing", icon: Megaphone },
];

function PortfolioCapabilityMap() {
  return (
    <figure className="portfolio-capability-map">
      <div className="portfolio-map-header">
        <span className="portfolio-map-mark" aria-hidden="true">
          N
        </span>
        <span>CAPABILITY MAP / NAVYUG STAR</span>
        <span className="portfolio-map-status">OUR SERVICES</span>
      </div>
      <div className="portfolio-map-content">
        <p className="portfolio-map-kicker">AREAS OF WORK</p>
        <h2>Digital capabilities, not project claims.</h2>
        <ul className="portfolio-capability-list">
          {capabilities.map(({ number, label, icon: Icon }) => (
            <li key={number}>
              <span>{number}</span>
              <Icon aria-hidden="true" />
              <strong>{label}</strong>
              <i aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
      <figcaption>Capabilities shown are services—not client project examples.</figcaption>
    </figure>
  );
}

function PortfolioPage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <div className="inner-page marketing-subpage portfolio-page">
        <section className="portfolio-hero">
          <div className="portfolio-hero-copy">
            <p className="eyebrow">Portfolio</p>
            <h1>Real work. Shared honestly.</h1>
            <p>
              We only share project screenshots and case studies when they&apos;re available for
              public viewing. We won&apos;t present a concept or capability as completed client
              work.
            </p>
            <div className="portfolio-hero-actions">
              <a className="portfolio-primary-link" href="/contact">
                Discuss your project <ArrowRight aria-hidden="true" />
              </a>
              <a className="portfolio-secondary-link" href="/services">
                Explore our services
              </a>
            </div>
            <p className="portfolio-transparency-note">
              No public case studies are listed here yet.
            </p>
          </div>
          <PortfolioCapabilityMap />
        </section>

        <section className="portfolio-contact-panel">
          <div>
            <p className="eyebrow">Have a brief in mind?</p>
            <h2>Tell us what you want to build.</h2>
            <p>
              Share your goals with our team. We&apos;ll discuss relevant capabilities and any
              project work that&apos;s available to share.
            </p>
          </div>
          <a href="/contact">
            Talk to our team <ArrowRight aria-hidden="true" />
          </a>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

export default PortfolioPage;
