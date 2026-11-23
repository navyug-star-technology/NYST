import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Check, Menu, Sparkles, X } from "lucide-react";
import { SiteChatbot } from "@/components/site-chatbot";
import { apiRequest } from "@/lib/api";
import { useSiteContent, useSiteCopy } from "@/hooks/use-site-content";

let visitorPromptShown = false;

function compactNavigationLabel(label) {
  if (typeof label !== "string") return label;
  const normalizedLabel = label.trim().toLowerCase();
  if (normalizedLabel === "faq" || normalizedLabel === "frequently asked questions") return "FAQ";
  if (normalizedLabel === "ask a question") return "Ask";
  return label;
}

const navigationItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "FAQ", to: "/faq" },
  { label: "Ask", to: "/question" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const companyName = useSiteCopy("global.brandName", "NavYug Star");
  const siteContent = useSiteContent();
  const navItems = Array.isArray(siteContent.global?.navigation)
    ? siteContent.global.navigation
    : navigationItems;

  return (
    <>
      <CursorGlow />
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="brand">
            <img className="site-logo" src="/nyst-logo.png" alt="NavYug Star Technology" />
            <span className="brand-mark">
              <Sparkles aria-hidden="true" />
            </span>
            <span>
              <strong>{companyName}</strong>
              <small>Technology</small>
            </span>
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <nav
            id="main-navigation"
            className={menuOpen ? "main-nav is-open" : "main-nav"}
            aria-label="Main navigation"
          >
            {navItems.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={pathname === to ? "is-current" : undefined}
                aria-current={pathname === to ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {compactNavigationLabel(label)}
              </Link>
            ))}
          </nav>
          <Link className="header-cta" to="/contact">
            Start a project <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </header>
    </>
  );
}

function CursorGlow() {
  const glowRef = useRef(null);
  useEffect(() => {
    const move = (event) => {
      if (glowRef.current)
        glowRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}

function VisitorInfoPrompt() {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const showVisitorPrompt = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open && !visitorPromptShown) {
      dialog.showModal();
      visitorPromptShown = true;
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(showVisitorPrompt, 4500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [showVisitorPrompt]);

  function rememberDismissal() {
    formRef.current?.reset();
    setSubmitted(false);
    setError("");
    setSubmitting(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      await apiRequest("/submissions", {
        method: "POST",
        body: JSON.stringify({ ...values, kind: "visitor", source: window.location.pathname }),
      });
      form.reset();
      setSubmitted(true);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="visitor-dialog"
      aria-labelledby="visitor-dialog-title"
      aria-describedby="visitor-dialog-description"
      onClose={rememberDismissal}
    >
      <button
        className="visitor-dialog-close"
        type="button"
        aria-label="Close visitor form"
        onClick={() => dialogRef.current?.close()}
      >
        <X aria-hidden="true" />
      </button>
      {submitted ? (
        <div className="visitor-form-confirmation" role="status">
          <span className="visitor-form-confirmation-icon">
            <Check aria-hidden="true" />
          </span>
          <h2 id="visitor-dialog-title">Message submitted successfully</h2>
          <p id="visitor-dialog-description">Our team will contact you within 24 hours.</p>
          <button
            className="visitor-dialog-submit"
            type="button"
            onClick={() => dialogRef.current?.close()}
          >
            Close
          </button>
        </div>
      ) : (
        <form ref={formRef} className="visitor-dialog-form" onSubmit={handleSubmit}>
          <h2 className="visitor-dialog-eyebrow">
            <Sparkles aria-hidden="true" />A QUICK INTRODUCTION
          </h2>
          <h3 id="visitor-dialog-title">Would you like us to get in touch?</h3>
          <p id="visitor-dialog-description">
            Leave your name and email if you&apos;d like to hear from our team. You can close this
            form at any time.
          </p>
          <label>
            Your name
            <input name="name" autoComplete="name" maxLength="120" required />
          </label>
          <label>
            Email address
            <input name="email" type="email" autoComplete="email" maxLength="254" required />
          </label>
          <p className="visitor-dialog-privacy">
            Your details are handled securely and used only by our team to respond to you.
          </p>
          <div className="visitor-dialog-actions">
            <button className="visitor-dialog-submit" type="submit">
              {submitting ? "Sending..." : "Contact me"}
            </button>
            <button
              className="visitor-dialog-dismiss"
              type="button"
              onClick={() => dialogRef.current?.close()}
            >
              Not now
            </button>
          </div>
          {error && (
            <p className="visitor-form-error" role="alert">
              {error}
            </p>
          )}
        </form>
      )}
    </dialog>
  );
}

export function SiteFooter() {
  const companyName = useSiteCopy("global.companyName", "NavYug Star Technology");
  const footerText = useSiteCopy(
    "global.footerText",
    "Custom websites · Mobile apps · Business software",
  );
  const contactEmail = useSiteCopy("global.contactEmail", "");
  const phone = useSiteCopy("global.phone", "");
  const address = useSiteCopy("global.address", "");
  return (
    <>
      <footer>
        <div className="container footer-inner footer-sections">
          <Link to="/" className="brand">
            <img className="site-logo" src="/nyst-logo.png" alt="NavYug Star Technology" />
            <span className="brand-mark">
              <Sparkles aria-hidden="true" />
            </span>
            <span>
              <strong>{companyName}</strong>
            </span>
          </Link>
          <span>{footerText}</span>
          {address && <span>{address}</span>}
          <span>
            {contactEmail && <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}
            {contactEmail && phone && " · "}
            {phone && <a href={`tel:${phone}`}>{phone}</a>}
            {(contactEmail || phone) && " · "}© {new Date().getFullYear()} {companyName}
          </span>
        </div>
      </footer>
      <SiteChatbot />
      <VisitorInfoPrompt />
    </>
  );
}
