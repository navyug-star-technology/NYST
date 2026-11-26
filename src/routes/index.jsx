import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Code2,
  Layers3,
  Laptop,
  Palette,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ProjectEnquiryForm } from "@/components/project-enquiry-form";
import { useSiteContent, useSiteCopy } from "@/hooks/use-site-content";

export default Index;
const services = [
  {
    title: "Website Development",
    description:
      "Responsive, search-ready websites shaped around your customers, content, and business goals.",
    icon: Laptop,
  },
  {
    title: "Mobile App Development",
    description:
      "Useful mobile experiences designed to make everyday customer and team tasks feel effortless.",
    icon: Smartphone,
  },
  {
    title: "Software Development",
    description:
      "Custom business software that brings your operations, workflows, and data into focus.",
    icon: Code2,
  },
  {
    title: "User interface and user experience design",
    description:
      "Clear, considered digital interfaces that help people move confidently from task to outcome.",
    icon: Palette,
  },
];
const benefits = [
  "Custom-Built Solutions",
  "Modern Technology",
  "Business-Focused Development",
  "Scalable Architecture",
  "Responsive Design",
  "Reliable Support",
];
const heroSlides = [
  {
    label: "Digital solutions",
    title: (
      <>
        Built for the next
        <br />
        business move.
      </>
    ),
    detail: "Websites, mobile apps, and software shaped around your goals.",
  },
  {
    label: "Product engineering",
    title: (
      <>
        Ideas into
        <br />
        useful products.
      </>
    ),
    detail: "From first concept to a focused digital experience your users can rely on.",
  },
  {
    label: "Business innovation",
    title: (
      <>
        Technology that
        <br />
        moves you forward.
      </>
    ),
    detail: "Practical systems that simplify work and create room for growth.",
  },
];
function SectionIntro({ eyebrow, title, children }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
function Index() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroMotionPaused, setHeroMotionPaused] = useState(false);
  const content = useSiteContent();
  const managedServices = Array.isArray(content.home?.services)
    ? content.home.services.map((service, index) => ({
        ...services[index % services.length],
        ...service,
      }))
    : services;
  const processSteps = Array.isArray(content.home?.process)
    ? content.home.process
    : [
        ["01", "Understand", "We begin with your goals, users, and definition of success."],
        ["02", "Design & build", "We shape a focused experience and develop it with care."],
        [
          "03",
          "Launch & grow",
          "We prepare for a reliable launch and the next phase of your business.",
        ],
      ].map(([number, title, description]) => ({ number, title, description }));
  const homeBenefits = Array.isArray(content.home?.benefits) ? content.home.benefits : benefits;
  const heroTitle = useSiteCopy(
    "home.title",
    "Transforming Ideas Into Powerful Digital Solutions.",
  );
  const heroDescription = useSiteCopy(
    "home.description",
    "We build modern websites, mobile applications, and intelligent software solutions tailored to your business needs. We also develop innovative digital products designed to simplify business operations.",
  );
  const servicesTitle = useSiteCopy(
    "home.servicesTitle",
    "Technology Solutions Designed Around Your Business.",
  );
  const processTitle = useSiteCopy("home.processTitle", "A clear process from idea to launch.");
  const homeEyebrow = useSiteCopy("home.eyebrow", "DIGITAL INNOVATION & TECHNOLOGY");
  const servicesDescription = useSiteCopy(
    "home.servicesDescription",
    "We combine thoughtful design with practical technology to create digital tools your customers and team can rely on.",
  );
  const productTitle = useSiteCopy("home.productTitle", "Powerful Products. Simplified Business.");
  const productDescription = useSiteCopy(
    "home.productDescription",
    "Alongside custom development, NavYug Star Technology creates software products for demo, licensing, and purchase where available.",
  );
  const productCardTitle = useSiteCopy(
    "home.productCardTitle",
    "Find the right product for your workflow.",
  );
  const productCardDescription = useSiteCopy(
    "home.productCardDescription",
    "Product availability, features, demos, and licensing options are confirmed directly by our team—so you receive accurate, current information.",
  );
  const portfolioTitle = useSiteCopy("home.portfolioTitle", "Projects That Reflect Our Expertise.");
  const portfolioDescription = useSiteCopy(
    "home.portfolioDescription",
    "Project screenshots and case studies are shared when they are available for public viewing. We do not present concepts as client work.",
  );
  const portfolioStatusTitle = useSiteCopy(
    "home.portfolioStatusTitle",
    "Looking for relevant experience?",
  );
  const portfolioStatusDescription = useSiteCopy(
    "home.portfolioStatusDescription",
    "Tell us about your industry and project goals. We’ll discuss the work and capabilities most relevant to your brief.",
  );
  const whyTitle = useSiteCopy("home.whyTitle", "A capable partner, from idea to impact.");
  const whyDescription = useSiteCopy(
    "home.whyDescription",
    "We focus on the details that help a digital investment remain useful long after launch.",
  );
  const contactTitle = useSiteCopy("home.contactTitle", "Have an Idea? Let's Build It Together.");
  const contactDescription = useSiteCopy(
    "home.contactDescription",
    "Share the essentials below. Our team will get back to you about your project.",
  );
  const slide = heroSlides[activeSlide];
  useEffect(() => {
    if (heroMotionPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [heroMotionPaused]);
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) setHeroMotionPaused(true);
    const pauseForReducedMotion = (event) => {
      if (event.matches) setHeroMotionPaused(true);
    };
    motionPreference.addEventListener("change", pauseForReducedMotion);
    return () => motionPreference.removeEventListener("change", pauseForReducedMotion);
  }, []);
  return (
    <main className="site-shell">
      <SiteHeader />
      <section id="home" className={`hero-section${heroMotionPaused ? " motion-paused" : ""}`}>
        <div className="hero-grid-dots" aria-hidden="true">
          <span className="hero-grid-dot hero-grid-dot--horizontal" />
          <span className="hero-grid-dot hero-grid-dot--horizontal" />
          <span className="hero-grid-dot hero-grid-dot--horizontal" />
          <span className="hero-grid-dot hero-grid-dot--horizontal" />
          <span className="hero-grid-dot hero-grid-dot--horizontal" />
          <span className="hero-grid-dot hero-grid-dot--horizontal" />
          <span className="hero-grid-dot hero-grid-dot--down" />
          <span className="hero-grid-dot hero-grid-dot--down" />
          <span className="hero-grid-dot hero-grid-dot--up" />
          <span className="hero-grid-dot hero-grid-dot--up" />
        </div>
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-copy">
            <h1>
              <span className="eyebrow hero-heading-eyebrow">
                <span aria-hidden="true" /> {homeEyebrow}
              </span>
              <span className="sr-only">NavYug Star Technology</span>
              <span>{heroTitle}</span>
            </h1>
            <p className="hero-lede">{heroDescription}</p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <Link to="/contact">
                  Start Your Project <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <span className="actions-separator">or</span>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">
                  Explore Our Services <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="hero-points">
              <span>
                <Check aria-hidden="true" /> Custom Digital Solutions
              </span>
              <span>
                <Check aria-hidden="true" /> Modern Technology
              </span>
              <span>
                <Check aria-hidden="true" /> Business-Focused Innovation
              </span>
            </div>
          </div>
          <div
            className="hero-visual"
            role="group"
            aria-label="Featured digital solutions carousel"
          >
            <div className="ai-core" aria-hidden="true">
              <div className="ai-core-ring ai-core-ring-one" />
              <div className="ai-core-ring ai-core-ring-two" />
              <div className="ai-core-ring ai-core-ring-three" />
              <div className="ai-core-sphere">
                <span />
                <span />
                <span />
                <span />
              </div>
              <i className="ai-node ai-node-one" />
              <i className="ai-node ai-node-two" />
              <i className="ai-node ai-node-three" />
              <i className="ai-node ai-node-four" />
            </div>
            <div className="visual-panel">
              <h2 className="visual-panel-label">{slide.label}</h2>
              <p key={activeSlide} className="slide-copy">
                {slide.title}
              </p>
              <p key={`detail-${activeSlide}`}>{slide.detail}</p>
              <div
                className="slide-controls"
                role="group"
                aria-label="Choose a featured slide"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  minHeight: "22px",
                  marginTop: "18px",
                }}
              >
                {heroSlides.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    className={index === activeSlide ? "is-active" : ""}
                    style={{
                      width: index === activeSlide ? "42px" : "30px",
                      height: "3px",
                      minWidth: index === activeSlide ? "42px" : "30px",
                      padding: 0,
                      border: 0,
                      borderRadius: "0",
                      background: index === activeSlide ? "#2563ff" : "#ffffff",
                      boxShadow: index === activeSlide ? "0 0 12px #2563ff" : "none",
                      cursor: "pointer",
                      transition: "all .25s ease",
                    }}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show ${item.label} slide`}
                    aria-pressed={index === activeSlide}
                  />
                ))}
              </div>
            </div>
            <div className="visual-badge">
              <Code2 aria-hidden="true" />
              <span>
                Design
                <br />+ Build
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="section section-silver">
        <div className="container">
          <SectionIntro eyebrow="What we do" title={servicesTitle}>
            {servicesDescription}
          </SectionIntro>
          <div className="service-grid">
            {managedServices.map(({ title, description, icon: Icon }, index) => {
              const serviceTitle =
                title === "UI/UX Design" ? "User interface and user experience design" : title;
              return (
                <article className="service-card" key={title}>
                  <div className="card-top">
                    <span className="service-number">0{index + 1}</span>
                    <span className="service-icon">
                      <Icon aria-hidden="true" />
                    </span>
                  </div>
                  <h3>{serviceTitle}</h3>
                  <p>{description}</p>
                  <Link to="/contact" className="text-link">
                    Discuss {serviceTitle} <ChevronRight aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section id="products" className="section products-section">
        <div className="container products-layout">
          <SectionIntro eyebrow="Our products" title={productTitle}>
            {productDescription}
          </SectionIntro>
          <section className="product-card" aria-labelledby="product-enquiry-title">
            <div className="product-card-glow" aria-hidden="true" />
            <Layers3 className="product-symbol" aria-hidden="true" />
            <h3 id="product-enquiry-title" className="product-label">
              Product enquiries
            </h3>
            <h4>{productCardTitle}</h4>
            <p>{productCardDescription}</p>
            <div className="product-actions">
              <Link to="/contact">
                Request a demo <ArrowRight aria-hidden="true" />
              </Link>
              <span className="actions-separator">or</span>
              <Link to="/contact" className="muted-action">
                Discuss licensing
              </Link>
            </div>
          </section>
        </div>
      </section>
      <section id="portfolio" className="section">
        <div className="container portfolio-layout">
          <SectionIntro eyebrow="Selected work" title={portfolioTitle}>
            {portfolioDescription}
          </SectionIntro>
          <div className="portfolio-state">
            <div
              className="portfolio-preview"
              role="img"
              aria-label="Abstract NavYug Star business intelligence dashboard preview"
            >
              <div className="preview-window-bar">
                <i />
                <i />
                <i />
                <span>navyug / product-preview</span>
              </div>
              <div className="preview-workspace">
                <aside>
                  <b aria-hidden="true">N</b>
                  <i />
                  <i />
                  <i />
                  <i />
                </aside>
                <div className="preview-dashboard">
                  <span className="preview-kicker">BUSINESS INTELLIGENCE</span>
                  <h3>Digital workspace</h3>
                  <div className="preview-chart">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="preview-cards">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="portfolio-status-label">
                <span className="status-dot" /> Portfolio information
              </p>
              <h3>{portfolioStatusTitle}</h3>
              <p>{portfolioStatusDescription}</p>
              <Link to="/contact" className="text-link">
                Talk to our team <ChevronRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="section section-navy">
        <div className="container why-layout">
          <SectionIntro eyebrow="Why NavYug" title={whyTitle}>
            {whyDescription}
          </SectionIntro>
          <div className="benefit-list">
            {homeBenefits.map((benefit, index) => (
              <div key={benefit}>
                <span>0{index + 1}</span>
                <strong>{benefit}</strong>
                <Check aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section process-section">
        <div className="container">
          <SectionIntro eyebrow="Our process" title={processTitle} />
          <div className="process-grid">
            {processSteps.map(({ number, title, description }) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="section contact-section">
        <div className="container contact-layout">
          <div>
            <p className="eyebrow">Start a conversation</p>
            <h2>{contactTitle}</h2>
            <p>{contactDescription}</p>
          </div>
          <ProjectEnquiryForm source="/" services={services.map(({ title }) => title)} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
