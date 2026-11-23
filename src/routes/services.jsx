import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Code2, Laptop, Megaphone, Palette, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useSiteContent, useSiteCopy } from "@/hooks/use-site-content";

const serviceDetails = [
  {
    number: "01",
    title: "Website Development",
    heading: "Websites That Make Your Business Stand Out.",
    description:
      "We design and develop professional websites that represent your brand, showcase your services, and help you connect with customers online.",
    offers: [
      "Business Websites",
      "School & College Websites",
      "E-commerce Websites",
      "Restaurant & Hotel Websites",
      "Portfolio Websites",
      "Custom Website Development",
    ],
    focus:
      "Responsive design, modern user interfaces and experiences, performance optimization, SEO-friendly structure, and scalable architecture.",
    diagram: "website",
  },
  {
    number: "02",
    title: "Mobile App Development",
    heading: "Innovative Mobile Experiences for Your Business.",
    description:
      "We develop mobile applications that help businesses connect with customers, streamline operations, and deliver better digital experiences.",
    offers: [
      "Business Applications",
      "Customer Applications",
      "Educational Applications",
      "Custom Mobile Applications",
      "Application interface and experience design",
    ],
    focus: "Our focus is on usability, performance, and business-oriented functionality.",
    diagram: "mobile",
  },
  {
    number: "03",
    title: "Software Development",
    heading: "Software Built Around Your Business Needs.",
    description:
      "We create custom software solutions that simplify business processes, improve productivity, and help organizations manage operations efficiently.",
    offers: [
      "Business Management Software",
      "School Management Systems",
      "CRM Solutions",
      "Billing & Inventory Systems",
      "Workflow Automation",
      "Custom Software Solutions",
    ],
    focus: "Every solution is designed according to project requirements and business objectives.",
    diagram: "software",
  },
  {
    number: "04",
    title: "User interface and user experience design",
    heading: "Designing Digital Experiences That Feel Effortless.",
    description:
      "We create modern, intuitive, and visually engaging interfaces that make digital products easier to use.",
    offers: [
      "Website interface design",
      "Mobile app interface design",
      "Dashboard Design",
      "User Experience Design",
      "Wireframes & Prototypes",
      "Design System Development",
    ],
    focus: "Our goal is to combine visual quality with usability.",
    diagram: "design",
  },
  {
    number: "05",
    title: "Digital Marketing",
    heading: "Build Your Digital Presence. Reach Your Audience.",
    description:
      "We help businesses strengthen their online presence through strategic digital marketing and creative content.",
    offers: [
      "Social Media Management",
      "Instagram Marketing",
      "Social Media Content Creation",
      "Reels & Creative Content",
      "Meta Advertising Campaigns",
      "Digital Marketing Strategy",
    ],
    focus: "Marketing activities are planned according to your business goals and target audience.",
    diagram: "marketing",
  },
];
const workSteps = [
  ["01", "Discover", "We understand your business, goals, and requirements."],
  ["02", "Plan", "We define project scope, features, timelines, and solution architecture."],
  ["03", "Design", "We create modern interfaces and user experiences."],
  ["04", "Develop", "Our team builds the solution using suitable technologies."],
  ["05", "Test", "We evaluate functionality, usability, and performance."],
  ["06", "Launch", "We deploy the solution and provide agreed support."],
];
const serviceIcons = {
  "Website Development": Laptop,
  "Mobile App Development": Smartphone,
  "Software Development": Code2,
  "User interface and user experience design": Palette,
  "Digital Marketing": Megaphone,
};

const expandServiceTitle = (title) =>
  title === "UI/UX Design" ? "User interface and user experience design" : title;

function ServiceDiagram({ type }) {
  return (
    <svg
      className={`service-diagram service-diagram-${type}`}
      viewBox="0 0 440 320"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`diagram-accent-${type}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#00d9ff" />
          <stop offset="1" stopColor="#2563ff" />
        </linearGradient>
        <linearGradient id={`diagram-panel-${type}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#10264a" />
          <stop offset="1" stopColor="#07101d" />
        </linearGradient>
        <pattern id={`diagram-grid-${type}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#62cfff" strokeOpacity=".12" />
        </pattern>
      </defs>
      <rect width="440" height="320" rx="18" fill={`url(#diagram-panel-${type})`} />
      <rect width="440" height="320" rx="18" fill={`url(#diagram-grid-${type})`} />
      {type === "website" && (
        <g>
          <rect x="48" y="46" width="344" height="228" rx="12" fill="#07101d" stroke="#2e5b8d" />
          <path d="M48 80h344" stroke="#2e5b8d" />
          <circle cx="68" cy="63" r="4" fill="#00d9ff" />
          <circle cx="83" cy="63" r="4" fill="#37649b" />
          <rect x="102" y="57" width="84" height="11" rx="5" fill="#18375e" />
          <rect x="72" y="101" width="116" height="10" rx="5" fill="#00d9ff" opacity=".8" />
          <rect x="72" y="122" width="155" height="7" rx="3" fill="#58799f" />
          <rect x="72" y="137" width="126" height="7" rx="3" fill="#375675" />
          <rect
            x="72"
            y="163"
            width="72"
            height="25"
            rx="7"
            fill={`url(#diagram-accent-${type})`}
          />
          <rect x="255" y="98" width="108" height="94" rx="10" fill="#10284a" stroke="#285b8c" />
          <path
            d="m272 166 22-25 17 13 27-34 12 9"
            fill="none"
            stroke="#00d9ff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="72" y="211" width="82" height="42" rx="7" fill="#0d1d34" stroke="#21466e" />
          <rect x="166" y="211" width="82" height="42" rx="7" fill="#0d1d34" stroke="#21466e" />
          <rect x="260" y="211" width="103" height="42" rx="7" fill="#0d1d34" stroke="#21466e" />
          <path
            d="M86 227h48M86 239h34M180 227h48M180 239h34M274 227h65M274 239h45"
            stroke="#4a7197"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      )}
      {type === "mobile" && (
        <g>
          <rect
            x="148"
            y="26"
            width="144"
            height="268"
            rx="24"
            fill="#050b15"
            stroke="#45b9ff"
            strokeWidth="2"
          />
          <rect x="158" y="48" width="124" height="226" rx="15" fill="#0c1c34" />
          <rect x="198" y="36" width="44" height="4" rx="2" fill="#54769b" />
          <circle cx="220" cy="258" r="5" fill="#2460c7" />
          <circle cx="181" cy="74" r="12" fill="#12396b" stroke="#00d9ff" />
          <rect x="201" y="69" width="60" height="6" rx="3" fill="#b9ddf7" />
          <rect x="201" y="80" width="40" height="5" rx="3" fill="#567494" />
          <rect x="173" y="103" width="94" height="59" rx="9" fill="#102c50" />
          <path
            d="m184 146 16-18 15 9 23-25 18 13"
            fill="none"
            stroke="#00d9ff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="173" y="174" width="43" height="40" rx="7" fill="#102441" stroke="#214b74" />
          <rect x="224" y="174" width="43" height="40" rx="7" fill="#102441" stroke="#214b74" />
          <rect x="181" y="184" width="26" height="5" rx="2" fill="#587c9e" />
          <rect x="181" y="196" width="18" height="9" rx="4" fill="#00d9ff" />
          <rect x="232" y="184" width="26" height="5" rx="2" fill="#587c9e" />
          <rect x="232" y="196" width="18" height="9" rx="4" fill="#2563ff" />
          <rect x="173" y="225" width="94" height="10" rx="5" fill="#17375e" />
        </g>
      )}
      {type === "software" && (
        <g>
          <rect x="141" y="37" width="158" height="54" rx="10" fill="#10294a" stroke="#00d9ff" />
          <rect x="160" y="54" width="24" height="20" rx="5" fill="#173f76" />
          <path d="M166 64h12M172 58v12" stroke="#00d9ff" strokeWidth="2" />
          <path d="M193 59h84M193 70h58" stroke="#7ea2c3" strokeWidth="5" strokeLinecap="round" />
          <path
            d="M220 92v26M220 118H104v24M220 118h116v24M104 118v24M336 118v24M220 118v24"
            fill="none"
            stroke="#2c6e9a"
            strokeWidth="2"
            strokeDasharray="5 6"
          />
          {[
            [46, 143, "Orders"],
            [162, 143, "Inventory"],
            [278, 143, "Customers"],
          ].map(([x, y, label]) => (
            <g key={label}>
              <rect x={x} y={y} width="116" height="59" rx="9" fill="#0c1d34" stroke="#28547d" />
              <circle cx={x + 20} cy={y + 22} r="7" fill="#00d9ff" opacity=".75" />
              <path
                d={`M${x + 37} ${y + 19}h55M${x + 14} ${y + 41}h78`}
                stroke="#5f82a0"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <text x={x + 14} y={y + 55} fill="#b7cde2" fontSize="9" fontFamily="sans-serif">
                {label}
              </text>
            </g>
          ))}
          <path
            d="M104 204v24h232v-24"
            fill="none"
            stroke="#2c6e9a"
            strokeWidth="2"
            strokeDasharray="5 6"
          />
          <rect x="91" y="230" width="258" height="48" rx="9" fill="#0c1d34" stroke="#28547d" />
          <path
            d="M115 247h88M115 260h51M227 247h97M227 260h64"
            stroke="#547b9d"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="330" cy="254" r="6" fill="#00d9ff" />
        </g>
      )}
      {type === "design" && (
        <g>
          <path d="M105 160h93M242 160h93" stroke="#2a83bd" strokeWidth="2" strokeDasharray="5 6" />
          <circle cx="220" cy="160" r="48" fill="#0b1a31" stroke="#2563ff" strokeWidth="2" />
          <circle cx="220" cy="160" r="30" fill="#102a4b" stroke="#00d9ff" />
          <circle cx="220" cy="160" r="9" fill={`url(#diagram-accent-${type})`} />
          <rect x="35" y="74" width="104" height="174" rx="10" fill="#07101d" stroke="#3b719b" />
          <rect x="47" y="89" width="80" height="46" rx="6" fill="#123867" />
          <path d="m55 122 18-21 13 12 16-14 17 17" fill="none" stroke="#00d9ff" strokeWidth="2" />
          <path
            d="M49 151h68M49 163h51M49 184h34M49 196h68M49 208h44"
            stroke="#4c7090"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <rect x="301" y="74" width="104" height="174" rx="10" fill="#07101d" stroke="#3b719b" />
          <rect x="313" y="88" width="80" height="15" rx="5" fill="#173a64" />
          <circle cx="335" cy="130" r="11" fill="#154278" stroke="#00d9ff" />
          <path
            d="M355 126h29M355 136h21M314 159h78M314 171h58M314 195h35M314 207h78M314 219h52"
            stroke="#4c7090"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text x="60" y="270" fill="#82a7c7" fontSize="9" fontFamily="monospace">
            WIREFRAME
          </text>
          <text x="326" y="270" fill="#82a7c7" fontSize="9" fontFamily="monospace">
            PROTOTYPE
          </text>
        </g>
      )}
      {type === "marketing" && (
        <g>
          <path d="M61 79h112l-18 52H79z" fill="#12315a" stroke="#00d9ff" />
          <path d="M79 143h76l-14 44H93z" fill="#12315a" stroke="#3989da" />
          <path d="M95 199h44l-9 37h-26z" fill="#12315a" stroke="#2563ff" />
          <path d="M110 247h14v22h-14z" fill="#2563ff" />
          <path
            d="M173 105h31M155 165h49M139 218h65"
            stroke="#4285b9"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <rect x="213" y="61" width="181" height="206" rx="12" fill="#081426" stroke="#2c5b88" />
          <text x="232" y="86" fill="#9fc6e5" fontSize="10" fontFamily="monospace">
            CAMPAIGN REACH
          </text>
          <path d="M231 221h145M231 188h145M231 155h145M231 122h145" stroke="#1b3554" />
          <path
            d="M231 225 262 194l27 10 29-46 28 13 30-45"
            fill="none"
            stroke="#00d9ff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="376" cy="126" r="5" fill="#00d9ff" />
          <rect x="232" y="237" width="51" height="14" rx="7" fill="#12396b" />
          <rect x="289" y="237" width="39" height="14" rx="7" fill="#153052" />
          <rect x="334" y="237" width="42" height="14" rx="7" fill="#153052" />
          <circle cx="117" cy="105" r="4" fill="#dffaff" />
          <circle cx="117" cy="165" r="4" fill="#dffaff" />
          <circle cx="117" cy="218" r="4" fill="#dffaff" />
        </g>
      )}
    </svg>
  );
}

function ServicesPage() {
  const content = useSiteContent();
  const managedServices = (
    Array.isArray(content.services?.items)
      ? content.services.items.map((service, index) => ({
          ...serviceDetails[index % serviceDetails.length],
          ...service,
        }))
      : serviceDetails
  ).map((service) => ({ ...service, title: expandServiceTitle(service.title) }));
  const managedWorkSteps = Array.isArray(content.services?.workSteps)
    ? content.services.workSteps
    : workSteps.map(([number, title, description]) => ({ number, title, description }));
  const title = useSiteCopy(
    "services.title",
    "Digital solutions built around what your business needs.",
  );
  const description = useSiteCopy(
    "services.description",
    "At NavYug Star Technology, we transform business ideas into powerful digital solutions. From custom websites and mobile applications to intelligent software systems, we help businesses build, grow, and succeed in the digital world.",
  );
  const supportingDescription = useSiteCopy(
    "services.supportingDescription",
    "Whether you are a startup, educational institution, or established business, our solutions are designed around your unique requirements.",
  );
  const listTitle = useSiteCopy("services.listTitle", "One team. Five ways to move forward.");
  const listDescription = useSiteCopy(
    "services.listDescription",
    "Find the right starting point. Each service can stand alone or work together as one connected solution.",
  );
  const workTitle = useSiteCopy("services.workTitle", "From Idea to Digital Solution.");
  const ctaTitle = useSiteCopy("services.ctaTitle", "Ready to Build Something Powerful?");
  const ctaDescription = useSiteCopy(
    "services.ctaDescription",
    "Let's turn your ideas into innovative digital solutions.",
  );
  const ctaDetails = useSiteCopy(
    "services.ctaDetails",
    "Whether you need a website, mobile application, or custom software, NavYug Star Technology is ready to understand your requirements and help you move forward.",
  );
  return (
    <main className="site-shell">
      <SiteHeader />
      <div className="inner-page services-page">
        <section className="inner-page-hero">
          <div className="service-hero-copy">
            <p className="eyebrow">Our services</p>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{supportingDescription}</p>
            <div className="service-page-actions">
              <Button asChild size="lg">
                <a href="/#contact">
                  Start Your Project <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#service-list">
                  Explore Our Services <ArrowRight />
                </a>
              </Button>
            </div>
            <div className="service-highlights">
              <span>
                <Check /> Custom Development
              </span>
              <span>
                <Check /> Modern Technology
              </span>
              <span>
                <Check /> Business-Focused Solutions
              </span>
            </div>
          </div>
          <div className="service-hero-visual service-blueprint" aria-hidden="true">
            <div className="blueprint-top">
              <span>N</span>
              <strong>Digital service blueprint</strong>
              <i>● LIVE</i>
            </div>
            <div className="blueprint-body">
              <div className="blueprint-sidebar">
                <b>01</b>
                <b>02</b>
                <b>03</b>
                <b>04</b>
              </div>
              <div className="blueprint-main">
                <small>PROJECT DELIVERY / 2026</small>
                <h3>
                  Build something
                  <br />
                  <em>meaningful.</em>
                </h3>
                <div className="blueprint-progress">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="blueprint-labels">
                  <span>Discover</span>
                  <span>Design</span>
                  <span>Develop</span>
                  <span>Launch</span>
                </div>
                <div className="blueprint-service-grid">
                  <i>
                    <Laptop /> Websites
                  </i>
                  <i>
                    <Smartphone /> Mobile apps
                  </i>
                  <i>
                    <Code2 /> Software
                  </i>
                  <i>
                    <Megaphone /> Marketing
                  </i>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="service-list" className="service-page-next">
          <p className="eyebrow">How we can help</p>
          <div className="service-section-heading">
            <h2>{listTitle}</h2>
            <p>{listDescription}</p>
          </div>
          <nav className="service-picker" aria-label="Explore a service">
            {managedServices.map(({ number, title }) => {
              const Icon = serviceIcons[title] || Laptop;
              return (
                <a className="service-picker-link" href={`#service-${number}`} key={title}>
                  <span>{number}</span>
                  <Icon aria-hidden="true" />
                  <strong>{title}</strong>
                  <ArrowRight aria-hidden="true" />
                </a>
              );
            })}
          </nav>
          <div className="service-detail-list">
            {managedServices.map(
              ({ number, title, heading, description, offers, focus, diagram }) => {
                const Icon = serviceIcons[title] || Laptop;
                return (
                  <article className="service-detail-card" id={`service-${number}`} key={title}>
                    <div className="service-diagram-wrap">
                      <ServiceDiagram type={diagram} />
                      <span className="service-diagram-caption">
                        {number} / {title}
                      </span>
                    </div>
                    <div>
                      <span className="service-detail-number">{number}</span>
                      <span className="service-detail-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <p className="service-detail-label">{title}</p>
                      <h3>{heading}</h3>
                      <p>{description}</p>
                      <strong className="offer-heading">What We Offer</strong>
                      <ul>
                        {offers.map((offer) => (
                          <li key={offer}>{offer}</li>
                        ))}
                      </ul>
                      <p className="service-focus">
                        <strong>Our Focus:</strong> {focus}
                      </p>
                      <a href="/#contact">
                        Explore {title} <ArrowRight aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </section>
        <section className="work-process">
          <p className="eyebrow">How we work</p>
          <h2>{workTitle}</h2>
          <div className="work-process-grid">
            {managedWorkSteps.map(({ number, title, description }) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="service-cta-section">
          <p className="eyebrow">Let&apos;s build together</p>
          <h2>{ctaTitle}</h2>
          <p>{ctaDescription}</p>
          <p>{ctaDetails}</p>
          <div className="service-page-actions">
            <Button asChild size="lg">
              <a href="/#contact">
                Start Your Project <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/#contact">
                Contact Our Team <ArrowRight />
              </a>
            </Button>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services | NavYug Star Technology" },
      { name: "description", content: "Digital services by NavYug Star Technology." },
    ],
  }),
});
