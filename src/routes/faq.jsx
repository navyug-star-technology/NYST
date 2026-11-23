import { ArrowRight, ChevronDown, CircleHelp } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useSiteContent, useSiteCopy } from "@/hooks/use-site-content";

const defaultFaqGroups = [
  {
    number: "01",
    title: "Services & project planning",
    questions: [
      {
        question: "What services does NavYug Star Technology offer?",
        answer:
          "The services listed on this site are website development, mobile app development, custom software development, user interface and user experience design, and digital marketing.",
      },
      {
        question: "Can a solution be tailored to my business?",
        answer:
          "Yes. Project scope and the proposed solution are planned around your requirements and business objectives. The exact features are confirmed during project planning.",
      },
      {
        question: "What are the steps in a project?",
        answer:
          "The published process is to discover your goals, plan the scope and solution, design the experience, develop it, test it, and launch it with any support agreed for the project.",
      },
      {
        question: "How much will my project cost, and how long will it take?",
        answer:
          "There are no fixed prices or timelines published here. Cost and timing depend on the project scope and requirements, so those details need to be discussed before they can be confirmed.",
      },
    ],
  },
  {
    number: "02",
    title: "Products & public work",
    questions: [
      {
        question: "Can I see product details or request a demo?",
        answer:
          "You can ask the team about current product features, availability, demos, and licensing. Product details and whether a demo is available are confirmed directly by the team.",
      },
      {
        question: "Where can I see public project examples?",
        answer:
          "There are no public case studies listed on the site right now. Project screenshots and case studies are shared when available for public viewing; concepts are not presented as completed client work.",
      },
    ],
  },
  {
    number: "03",
    title: "Getting in touch",
    questions: [
      {
        question: "Is the contact form currently active?",
        answer:
          "Yes. Project enquiries and questions submitted through the website are saved for our team.",
      },
      {
        question: "Is support included after launch?",
        answer:
          "The published process includes launch and any support agreed for the project. Please confirm the support scope and terms before a project begins.",
      },
    ],
  },
];

function FAQPage() {
  const content = useSiteContent();
  const faqGroups = Array.isArray(content.faq?.groups) ? content.faq.groups : defaultFaqGroups;
  const title = useSiteCopy("faq.title", "Good projects start with clear answers.");
  const description = useSiteCopy(
    "faq.description",
    "Straightforward information about our services, project process, products, and what is currently available to share.",
  );
  return (
    <main className="site-shell">
      <SiteHeader />
      <div className="inner-page marketing-subpage faq-page">
        <section className="faq-hero">
          <div className="faq-hero-copy">
            <p className="eyebrow">
              <CircleHelp aria-hidden="true" />
              Frequently asked questions
            </p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </section>

        <nav className="faq-topic-nav" aria-label="Frequently asked question topics">
          {faqGroups.map(({ number, title }) => (
            <a className="faq-topic-link" href={`#faq-group-${number}`} key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <ArrowRight aria-hidden="true" />
            </a>
          ))}
        </nav>

        <section className="faq-answers" id="faq-answers">
          <div className="faq-answers-heading">
            <p className="eyebrow">Useful details before you begin</p>
            <h2>Questions, answered clearly.</h2>
          </div>
          <div className="faq-groups">
            {faqGroups.map(({ number, title, questions }) => (
              <section className="faq-group" id={`faq-group-${number}`} key={number}>
                <div className="faq-group-heading">
                  <span>{number}</span>
                  <h3>{title}</h3>
                </div>
                <div className="faq-question-list">
                  {questions.map(({ question, answer }) => (
                    <details className="faq-item" key={question}>
                      <summary>
                        <span>{question}</span>
                        <ChevronDown aria-hidden="true" />
                      </summary>
                      <p>{answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="faq-cta">
          <div>
            <p className="eyebrow">Want to explore your options?</p>
            <h2>Start with the services that fit your goals.</h2>
          </div>
          <div className="faq-cta-actions">
            <a href="/services">
              Explore services <ArrowRight aria-hidden="true" />
            </a>
            <a href="/contact" className="faq-contact-link">
              View contact page
            </a>
          </div>
          <p className="faq-form-note">Have a question? Send it directly to our team.</p>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

export default FAQPage;
