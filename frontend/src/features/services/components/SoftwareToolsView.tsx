"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";
import { ServicePageHeader } from "./ServicePageHeader";
import { softwareToolCategories } from "@/src/features/services/data/softwareToolsData";

function ToolLogo({ slug, label }: { slug: string; label: string }) {
  const logoSources: Record<string, string> = {
    openai: "/assets/logos/tools/openai.svg",
    anthropic: "/assets/logos/tools/claude.png",
    cursor: "/assets/logos/tools/cursor.svg",
    canva: "/assets/logos/tools/canva.svg",
    googlegemini: "/assets/logos/tools/googlegemini.svg",
  };

  if (logoSources[slug]) {
    return (
      <span className={`ds-tool-mark ds-tool-mark--${slug}`}>
        <img src={logoSources[slug]} alt={`${label} logo`} />
      </span>
    );
  }

  return (
    <span className="ds-tool-mark ds-tool-mark--fallback" aria-label={`${label} logo`}>
      <span aria-hidden="true">{label.slice(0, 2).toUpperCase()}</span>
    </span>
  );
}

export function SoftwareToolsView() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-software-reveal]"));
    document.documentElement.classList.add("ds-software-motion-ready");
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ds-services-page ds-software-page">
      <ServicePageHeader backHref="/#services" backLabel="Back to Services" />

      <main>
        <section className="ds-software-hero" data-software-reveal>
          <div className="ds-software-hero-inner">
            <div className="ds-software-hero-copy">
              <span className="ds-service-kicker">Software &amp; AI tools</span>
              <h1>The right tools.<br /><em>Clearer pricing.</em></h1>
              <p className="ds-software-hero-lede">
                Access the software your work depends on, with straightforward plans for AI, design, development, and creative production.
              </p>
              <div className="ds-software-actions">
                <a href="#plans" className="ds-service-primary">Explore plans <ArrowRight size={16} /></a>
                <Link href="/book-a-demo" className="ds-service-secondary">Ask about a plan <ArrowUpRight size={16} /></Link>
              </div>
            </div>

          </div>
        </section>

        <section className="ds-software-intro" data-software-reveal>
          <div>
            <span className="ds-service-section-kicker">Choose your stack</span>
            <h2>Practical access to the tools that move work forward.</h2>
          </div>
          <p>Review the available options below. Prices are shown in PKR and organised by the way teams actually use each tool.</p>
        </section>

        <nav className="ds-software-category-nav" aria-label="Software tool categories" data-software-reveal>
          {softwareToolCategories.map((category) => (
            <a href={`#${category.id}`} key={category.id}>{category.name} <ArrowRight size={14} /></a>
          ))}
        </nav>

        <section className="ds-software-plans" id="plans" aria-label="Software plans">
          {softwareToolCategories.map((category, categoryIndex) => (
            <article className={`ds-software-category ds-software-category--${category.accent}`} id={category.id} key={category.id} data-software-reveal>
              <div className="ds-software-category-heading">
                <div>
                  <span className="ds-software-category-index">0{categoryIndex + 1}</span>
                  <span className="ds-service-section-kicker">{category.eyebrow}</span>
                  <h2>{category.name}</h2>
                </div>
                <p>{category.description}</p>
              </div>

              <div className="ds-software-cards" role="list" aria-label={`${category.name} plans`}>
                {category.plans.map((item) => (
                  <article className="ds-software-card" role="listitem" key={`${item.product}-${item.plan}`}>
                    <div className="ds-software-card-top">
                      <div className="ds-software-logo">
                        <ToolLogo slug={item.logoSlug} label={item.product} />
                      </div>
                      <span className="ds-software-savings">{item.savings}</span>
                    </div>
                    <div className="ds-software-product">
                      <strong>{item.product}</strong>
                      <span>{item.plan}</span>
                    </div>
                    <div className="ds-software-card-pricing">
                      <span className="ds-software-official">{item.officialPrice}</span>
                      <strong className="ds-software-price">{item.price}</strong>
                    </div>
                    <span className="ds-software-card-caption">Available now · PKR</span>
                  </article>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="ds-software-note" data-software-reveal>
          <div>
            <span className="ds-service-section-kicker">Need help choosing?</span>
            <h2>Tell us how your team works.</h2>
          </div>
          <Link href="/book-a-demo" className="ds-service-primary">Talk to a specialist <ArrowUpRight size={16} /></Link>
        </section>

        <p className="ds-software-disclaimer">Prices are approximate PKR comparisons based on plan type and term. Availability, features, taxes, and provider terms may vary. Please confirm the final plan before purchase.</p>
      </main>

      <AgencyFooter />
    </div>
  );
}
