import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Code2, Layers3, Target } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useSiteContent, useSiteCopy } from "@/hooks/use-site-content";

const principles = [
  {
    icon: Target,
    title: "Business first",
    description:
      "Every project starts with your goals, your users, and the problem you want technology to solve.",
    label: "Start with purpose",
  },
  {
    icon: Layers3,
    title: "Thoughtful by design",
    description:
      "We bring clear user experiences and considered design together, so digital tools feel simple to use.",
    label: "Make it clear",
  },
  {
    icon: Code2,
    title: "Built to adapt",
    description:
      "We create responsive, scalable solutions that can support your business as it changes and grows.",
    label: "Ready for what’s next",
  },
];

const process = [
  {
    number: "01",
    title: "Understand",
    description: "We begin with your goals, users, and definition of success.",
  },
  {
    number: "02",
    title: "Design & build",
    description: "We shape a focused experience and develop it with care.",
  },
  {
    number: "03",
    title: "Launch & grow",
    description: "We prepare for a reliable launch and the next phase of your business.",
  },
];

function AboutPage() {
  const content = useSiteContent();
  const managedPrinciples = Array.isArray(content.about?.principles)
    ? content.about.principles.map((principle, index) => ({
        ...principles[index % principles.length],
        ...principle,
      }))
    : principles;
  const managedProcess = Array.isArray(content.about?.process) ? content.about.process : process;
  const title = useSiteCopy("about.title", "We make technology work for your next idea.");
  const description = useSiteCopy(
    "about.description",
    "From custom websites and mobile apps to business software, we turn ideas into useful digital experiences—built around the people who use them.",
  );
  const principlesTitle = useSiteCopy(
    "about.principlesTitle",
    "Good technology starts with understanding people.",
  );
  const principlesDescription = useSiteCopy(
    "about.principlesDescription",
    "The best solution is more than code. It should make work clearer, feel natural to use, and keep serving your goals after launch.",
  );
  const processTitle = useSiteCopy("about.processTitle", "A clear path from idea to impact.");
  const contactTitle = useSiteCopy("about.contactTitle", "Let's make your next idea useful.");
  const contactDescription = useSiteCopy(
    "about.contactDescription",
    "Tell us what you want to improve or build. We'll help you explore the next step.",
  );
  return (
    <main className="site-shell">
      <SiteHeader />
      <div className="inner-page marketing-subpage about-page">
        <section className="about-hero">
          <div className="about-hero-copy">
            <p className="eyebrow">
              <span className="about-live-dot" aria-hidden="true" />
              About NavYug Star Technology
            </p>
            <h1>{title}</h1>
            <p className="about-hero-lede">{description}</p>
            <div className="about-hero-actions">
              <a className="about-button about-button-primary" href="/contact">
                Let&apos;s talk <ArrowRight aria-hidden="true" />
              </a>
              <a className="about-button about-button-secondary" href="/services">
                Explore our services
              </a>
            </div>
            <div className="about-service-tags" aria-label="What we build">
              <span>Websites</span>
              <span>Mobile apps</span>
              <span>Business software</span>
            </div>
          </div>

          <div className="about-hero-visual">
            <svg
              className="about-blueprint"
              viewBox="0 0 720 580"
              role="img"
              aria-labelledby="about-blueprint-title"
              preserveAspectRatio="xMidYMid slice"
            >
              <title id="about-blueprint-title">Abstract digital product design blueprint</title>
              <defs>
                <pattern id="blueprint-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path
                    d="M 32 0 L 0 0 0 32"
                    fill="none"
                    stroke="rgba(111,180,255,.14)"
                    strokeWidth="1"
                  />
                </pattern>
                <linearGradient id="blueprint-panel" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#10264a" />
                  <stop offset="1" stopColor="#07101d" />
                </linearGradient>
                <linearGradient id="blueprint-accent" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#00d9ff" />
                  <stop offset="1" stopColor="#2563ff" />
                </linearGradient>
                <radialGradient id="blueprint-glow">
                  <stop stopColor="#2563ff" stopOpacity=".4" />
                  <stop offset="1" stopColor="#2563ff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="720" height="580" fill="#07111f" />
              <rect width="720" height="580" fill="url(#blueprint-grid)" opacity=".7" />
              <circle cx="548" cy="170" r="205" fill="url(#blueprint-glow)" />
              <path
                d="M35 452h150l48-48h72m227-285h88l45 45"
                fill="none"
                stroke="#00d9ff"
                strokeOpacity=".36"
                strokeDasharray="4 8"
              />
              <circle cx="305" cy="404" r="4" fill="#9defff" />
              <circle cx="570" cy="119" r="4" fill="#9defff" />

              <g className="about-blueprint-drawing">
                <rect
                  x="64"
                  y="82"
                  width="452"
                  height="330"
                  rx="18"
                  fill="url(#blueprint-panel)"
                  stroke="#4db9ff"
                  strokeOpacity=".72"
                  strokeWidth="1.5"
                />
                <path d="M64 128h452" stroke="#55c8ff" strokeOpacity=".38" />
                <circle cx="91" cy="105" r="4" fill="#ff6f91" />
                <circle cx="107" cy="105" r="4" fill="#ffc857" />
                <circle cx="123" cy="105" r="4" fill="#32e6a1" />
                <text x="452" y="109" fill="#8caecc" fontSize="9" fontFamily="monospace">
                  NAVYUG STAR / DIGITAL STUDIO
                </text>

                <text x="94" y="160" fill="#00d9ff" fontSize="9" fontFamily="monospace">
                  BUSINESS / DIGITAL EXPERIENCE
                </text>
                <path
                  d="M95 185h170M95 201h125"
                  stroke="#e8f4ff"
                  strokeOpacity=".8"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M95 220h145"
                  stroke="#75dcff"
                  strokeOpacity=".9"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M95 244h175M95 257h130"
                  stroke="#8caecc"
                  strokeOpacity=".48"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <rect x="95" y="279" width="92" height="26" rx="13" fill="url(#blueprint-accent)" />
                <path
                  d="M112 292h49"
                  stroke="#fff"
                  strokeOpacity=".9"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <circle
                  cx="388"
                  cy="222"
                  r="74"
                  fill="#0b1c34"
                  stroke="#28bce9"
                  strokeOpacity=".55"
                />
                <circle cx="388" cy="222" r="56" fill="none" stroke="#347cff" strokeOpacity=".72" />
                <ellipse
                  cx="388"
                  cy="222"
                  rx="35"
                  ry="75"
                  fill="none"
                  stroke="#00d9ff"
                  strokeOpacity=".66"
                  transform="rotate(42 388 222)"
                />
                <ellipse
                  cx="388"
                  cy="222"
                  rx="83"
                  ry="29"
                  fill="none"
                  stroke="#54a7ff"
                  strokeOpacity=".54"
                  transform="rotate(-27 388 222)"
                />
                <circle cx="427" cy="191" r="5" fill="#c6f7ff" />
                <circle cx="345" cy="248" r="4" fill="#00d9ff" />

                <rect
                  x="95"
                  y="329"
                  width="116"
                  height="54"
                  rx="8"
                  fill="#091525"
                  stroke="#4db9ff"
                  strokeOpacity=".28"
                />
                <rect
                  x="222"
                  y="329"
                  width="116"
                  height="54"
                  rx="8"
                  fill="#091525"
                  stroke="#4db9ff"
                  strokeOpacity=".28"
                />
                <rect
                  x="349"
                  y="329"
                  width="116"
                  height="54"
                  rx="8"
                  fill="#091525"
                  stroke="#4db9ff"
                  strokeOpacity=".28"
                />
                <path
                  d="M108 347h50m-50 13h78m-65 13h48"
                  stroke="#7ea7cf"
                  strokeOpacity=".6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M235 368l17-10 15 5 18-21 17 10 20-16"
                  fill="none"
                  stroke="url(#blueprint-accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="469"
                  cy="349"
                  r="9"
                  fill="#123d70"
                  stroke="#00d9ff"
                  strokeOpacity=".65"
                />
                <path
                  d="M465 349l3 3 6-7"
                  fill="none"
                  stroke="#c6f7ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              <g className="about-blueprint-device">
                <rect
                  x="478"
                  y="257"
                  width="150"
                  height="250"
                  rx="22"
                  fill="#050d18"
                  stroke="#79dfff"
                  strokeOpacity=".86"
                  strokeWidth="1.5"
                />
                <rect
                  x="491"
                  y="278"
                  width="124"
                  height="204"
                  rx="12"
                  fill="#0b1c34"
                  stroke="#337cff"
                  strokeOpacity=".45"
                />
                <rect x="540" y="266" width="28" height="3" rx="2" fill="#7ea7cf" />
                <text x="504" y="304" fill="#00d9ff" fontSize="8" fontFamily="monospace">
                  MOBILE / 01
                </text>
                <rect
                  x="503"
                  y="318"
                  width="100"
                  height="62"
                  rx="8"
                  fill="url(#blueprint-accent)"
                  opacity=".78"
                />
                <path
                  d="M516 360l19-20 13 10 18-18 25 25"
                  fill="none"
                  stroke="#d7faff"
                  strokeOpacity=".82"
                  strokeWidth="2"
                />
                <path
                  d="M505 398h82m-82 12h64m-64 12h74"
                  stroke="#88a8c9"
                  strokeOpacity=".55"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <rect
                  x="504"
                  y="444"
                  width="99"
                  height="22"
                  rx="11"
                  fill="#123a74"
                  stroke="#358bff"
                  strokeOpacity=".7"
                />
              </g>

              <path
                d="M28 492h128m446-30h87"
                stroke="#42baff"
                strokeOpacity=".46"
                strokeWidth="1.5"
                strokeDasharray="3 7"
              />
            </svg>
            <div className="about-image-note">
              <span className="about-image-note-icon">
                <Layers3 aria-hidden="true" />
              </span>
              <span>
                <strong>Ideas into experiences</strong>
                <small>Designed around your business</small>
              </span>
              <span className="about-image-note-arrow">
                <ArrowRight aria-hidden="true" />
              </span>
            </div>
            <span className="about-image-index">01 / DIGITAL PARTNERSHIP</span>
          </div>
        </section>

        <section className="about-principles">
          <div className="about-section-heading">
            <p className="eyebrow">What guides us</p>
            <h2>{principlesTitle}</h2>
            <p>{principlesDescription}</p>
          </div>
          <div className="about-principles-grid">
            {managedPrinciples.map(({ icon: Icon, title, description, label }, index) => (
              <article className="about-principle-card" key={title}>
                <div className="about-card-topline">
                  <span>0{index + 1}</span>
                  <Icon aria-hidden="true" />
                </div>
                <p className="about-principle-label">{label}</p>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-process">
          <div className="about-section-heading">
            <p className="eyebrow">From first conversation to launch</p>
            <h2>{processTitle}</h2>
          </div>
          <div className="about-process-grid">
            {managedProcess.map(({ number, title, description }) => (
              <article className="about-process-card" key={number}>
                <span className="about-process-number">{number}</span>
                <div className="about-process-line" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-contact-banner">
          <div>
            <p className="eyebrow">Have a goal in mind?</p>
            <h2>{contactTitle}</h2>
            <p>{contactDescription}</p>
          </div>
          <a href="/contact">
            Start a conversation <ArrowRight aria-hidden="true" />
          </a>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About | NavYug Star Technology" },
      {
        name: "description",
        content:
          "Learn about NavYug Star Technology's approach to building business-focused websites, apps, and software.",
      },
    ],
  }),
});
