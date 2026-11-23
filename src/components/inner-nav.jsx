import { ArrowUpRight, Sparkles } from "lucide-react";

export function InnerNav() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="/" className="brand">
          <span className="brand-mark">
            <Sparkles aria-hidden="true" />
          </span>
          <span>
            <strong>NavYug Star</strong>
            <small>Technology</small>
          </span>
        </a>
        <nav className="inner-nav-links" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <a className="header-cta" href="/contact">
          Get a Quote <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
