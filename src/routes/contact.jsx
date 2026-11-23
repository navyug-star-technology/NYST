import { useSiteCopy } from "@/hooks/use-site-content";
import { ProjectEnquiryForm } from "@/components/project-enquiry-form";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

function ContactPage() {
  const title = useSiteCopy("contact.title", "Have an idea? Let's build it together.");
  const description = useSiteCopy(
    "contact.description",
    "Share the essentials about your business and project. We’ll use them to understand the digital solution you have in mind.",
  );
  return (
    <main className="site-shell">
      <SiteHeader />
      <div className="inner-page marketing-subpage contact-page">
        <section className="contact-layout">
          <div className="contact-intro">
            <p className="eyebrow">Start a conversation</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <ProjectEnquiryForm
            source="/contact"
            services={[
              "Website Development",
              "Mobile App Development",
              "Software Development",
              "User interface and user experience design",
              "Digital Marketing",
            ]}
          />
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

export default ContactPage;
