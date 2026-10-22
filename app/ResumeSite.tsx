"use client";

import { useState, type FormEvent } from "react";

type Category = "all" | "web" | "growth" | "operations";
type ContactPath = "resume" | "project";

const projects = [
  {
    id: "01", category: "web" as const, label: "VIBE-CODED WEB APP · PUBLIC REPO",
    title: "MBA Learning OS",
    summary: "A learning workspace that brings schedules, deadlines, course concepts and personal notes into one navigable experience.",
    challenge: "Learning information scattered across calendars, course materials and notes is hard to act on.",
    approach: "Connect a schedule view with a searchable knowledge map while keeping personal material private.",
    execution: "AI-assisted prototyping, information architecture and web product iteration.",
    impact: "A public project you can inspect; usage and outcome metrics are not claimed here.",
    url: "https://github.com/ClarafDu/MBA-Learning-OS",
    preview: "LEARNING / OS",
  },
  {
    id: "02", category: "web" as const, label: "VIBE-CODED WEB APP · PUBLIC REPO",
    title: "English Study Hub",
    summary: "An English-learning hub with level-based paths, exam modules and a personal learning area.",
    challenge: "Learners need a clearer route through level progression and exam preparation.",
    approach: "Organize learning journeys by level and goal, then separate public discovery from private profiles.",
    execution: "AI-assisted web prototyping, learning-flow design and iterative product structure.",
    impact: "A public project you can inspect; learning outcomes are not claimed here.",
    url: "https://github.com/ClarafDu/english-study-hub",
    preview: "STUDY / HUB",
  },
  {
    id: "03", category: "growth" as const, label: "AI PRODUCT GROWTH · ANONYMIZED",
    title: "A discoverable path into an AI product",
    summary: "A product-growth project connecting search intent, educational content and the product experience so people can find value faster.",
    challenge: "Useful product capabilities were difficult to discover and understand.",
    approach: "Map user questions to content, onboarding and product entry points.",
    execution: "Growth strategy, SEO/GEO content structure and cross-functional delivery.",
    impact: "Publishable results are being reviewed; no performance figures are shown here.",
  },
  {
    id: "04", category: "growth" as const, label: "COMMERCIALIZATION · ANONYMIZED",
    title: "From product value to a clearer buying journey",
    summary: "A commercialization project examining how people discover a feature, understand its value and decide whether to pay.",
    challenge: "The route from product use to a purchase decision was fragmented.",
    approach: "Review the user journey, value proposition, activation moments and pricing communication.",
    execution: "Product operations, lifecycle thinking and commercialization planning.",
    impact: "Business impact can be discussed privately after the details are cleared for sharing.",
  },
  {
    id: "05", category: "operations" as const, label: "OPERATING SYSTEM · ANONYMIZED",
    title: "Making an early-stage team easier to run",
    summary: "An operations project translating a fast-moving business into shared priorities, repeatable processes and a practical decision rhythm.",
    challenge: "Work across functions needed a clearer operating cadence.",
    approach: "Align goals, owners, workflow and the information used in weekly decisions.",
    execution: "Zero-to-one operations design, team coordination and execution management.",
    impact: "Specific company details and results remain private.",
  },
];

const expertise = [
  ["01", "AI product growth", "How do people find and adopt a fast-changing product?", "I connect search, content, onboarding and feedback into a useful growth loop."],
  ["02", "Monetization & commercialization", "Where does product value get lost before a buying decision?", "I work across positioning, activation, pricing communication and lifecycle touchpoints."],
  ["03", "Go-to-market & global expansion", "How can a product reach the right audience in a new market?", "I shape launch plans, localized journeys and repeatable content-led acquisition."],
  ["04", "Operations & team leadership", "How does a growing team turn ideas into consistent delivery?", "I build clear priorities, ownership, operating routines and cross-functional momentum."],
];

export default function ResumeSite() {
  const [category, setCategory] = useState<Category>("all");
  const [contactPath, setContactPath] = useState<ContactPath>("resume");
  const [formMessage, setFormMessage] = useState("");
  const visibleProjects = projects.filter((item) => category === "all" || item.category === category);

  const chooseContact = (next: ContactPath) => {
    setContactPath(next);
    setFormMessage("");
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage("This form is a preview. Nothing was sent or saved. Please use the email link above to contact me.");
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header" id="top">
        <a className="brand" href="#top" aria-label="Clara, back to top">CLARA<span>.</span></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a><a href="#expertise">Expertise</a><a href="#about">About</a><a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact" onClick={() => chooseContact("resume")}>Request CV <span aria-hidden="true">↗</span></a>
      </header>

      <main id="main">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow"><span className="eyebrow-line" /> AI × BUSINESS × BUILD</p>
            <h1 id="hero-title">From AI Products<br />to <em>Business Growth.</em></h1>
            <p className="hero-subtitle">AI Growth Strategy <span>|</span> Product Commercialization <span>|</span> Operations Leadership</p>
            <p className="hero-description">I turn complex product and business questions into useful experiences, clearer growth paths and operating systems that move work forward.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore My Work <span aria-hidden="true">↗</span></a>
              <a className="button button-outline" href="#contact" onClick={() => chooseContact("project")}>Discuss a Project</a>
              <a className="text-link" href="#contact" onClick={() => chooseContact("resume")}>Request My Resume <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="hero-art" aria-label="Editorial diagram connecting idea, product and growth">
            <div className="art-top"><span>CLARA / WORK IN PROGRESS</span><span>01—03</span></div>
            <div className="art-stage"><span>01</span><strong>Ideas</strong><small>Find the real problem</small></div>
            <div className="art-stage"><span>02</span><strong>Products</strong><small>Make value visible</small></div>
            <div className="art-stage"><span>03</span><strong>Growth</strong><small>Build the operating loop</small></div>
            <div className="art-bottom">STRATEGY <span>→</span> EXECUTION <span>→</span> LEARNING</div>
          </div>
        </section>

        <section className="work-section section-shell" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-title">Projects before<br /><em>job titles.</em></h2></div>
            <p>Selected work across vibe-coded websites, AI product growth and business operations. Client identities and private results stay off the public site.</p>
          </div>
          <div className="filter-bar" aria-label="Filter projects">
            {([["all", "All projects"], ["web", "Vibe-coded web"], ["growth", "Growth & revenue"], ["operations", "Operations"]] as const).map(([value, label]) =>
              <button key={value} type="button" className={category === value ? "active" : ""} aria-pressed={category === value} onClick={() => setCategory(value)}>{label}</button>
            )}
          </div>
          <div className="work-grid">
            {visibleProjects.map((item) => (
              <article className={`work-card work-card-${item.category}`} key={item.id}>
                <div className="work-card-top"><span>{item.id} / {item.label}</span><span aria-hidden="true">↗</span></div>
                {item.category === "web" && <div className="site-preview" aria-hidden="true"><div className="preview-browser"><i /><i /><i /><span>{item.title}</span></div><div className="preview-copy"><small>{"preview" in item ? item.preview : "WEB PROJECT"}</small><strong>Ideas into<br />impact.</strong><b>VIEW REPOSITORY ↗</b></div></div>}
                <div className="work-card-body">
                  <h3>{item.title}</h3><p>{item.summary}</p>
                  <details><summary>Read project notes <span aria-hidden="true">+</span></summary>
                    <dl>
                      <div><dt>Business challenge</dt><dd>{item.challenge}</dd></div>
                      <div><dt>Strategic approach</dt><dd>{item.approach}</dd></div>
                      <div><dt>Execution</dt><dd>{item.execution}</dd></div>
                      <div><dt>Business impact</dt><dd>{item.impact}</dd></div>
                      <div><dt>Key learning</dt><dd>Make the next decision clearer before adding more activity.</dd></div>
                    </dl>
                  </details>
                  {"url" in item && <a className="card-link" href={item.url} target="_blank" rel="noopener noreferrer">View GitHub repository <span aria-hidden="true">↗</span></a>}
                </div>
              </article>
            ))}
          </div>
          <div className="work-note"><strong>More websites on the way</strong><p>Additional projects will appear when they are ready to share publicly.</p></div>
        </section>

        <section className="expertise-section" id="expertise" aria-labelledby="expertise-title">
          <div className="section-shell">
            <div className="section-heading light"><div><p className="eyebrow">02 / HOW I WORK</p><h2 id="expertise-title">The skills behind<br /><em>the projects.</em></h2></div><p>I work at the intersection of product, growth and execution, with AI-assisted prototyping as a practical way to learn faster.</p></div>
            <div className="expertise-grid">{expertise.map(([number, title, question, answer]) => <article key={number}><span>{number}</span><h3>{title}</h3><strong>{question}</strong><p>{answer}</p></article>)}</div>
            <div className="toolkit"><span>WORKING TOOLKIT</span><p>AI-assisted website prototyping <i>·</i> SEO & GEO thinking <i>·</i> Product analytics <i>·</i> Cross-functional facilitation</p></div>
          </div>
        </section>

        <section className="about-section section-shell" id="about" aria-labelledby="about-title">
          <p className="eyebrow">03 / ABOUT CLARA</p>
          <div className="about-grid"><h2 id="about-title">A builder's mindset.<br /><em>An operator's lens.</em></h2><div><p>My work brings together AI product growth, commercialization and operations. I enjoy turning ambiguous opportunities into something people can use, test and improve.</p><p>This portfolio is intentionally selective. A full employment history, personal details and private documents are shared only in a direct conversation.</p><a className="text-link" href="#contact" onClick={() => chooseContact("resume")}>Request a private CV <span aria-hidden="true">→</span></a></div></div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-shell contact-grid">
            <div className="contact-intro"><p className="eyebrow">04 / START A CONVERSATION</p><h2 id="contact-title">Good work starts<br />with a <em>real question.</em></h2><p>Looking for a growth and operations partner, or want to review my full background? Email me directly.</p><a className="button button-primary" href="mailto:dcao1255@gmail.com?subject=Clara%20%E2%80%94%20Professional%20inquiry">Email Clara ↗</a><p className="public-email">dcao1255@gmail.com</p><div className="privacy-note"><span aria-hidden="true">✳</span><p>My complete CV is private. Requests are reviewed personally; it is never delivered automatically from this website.</p></div></div>
            <div className="contact-panel">
              <div className="contact-tabs" role="tablist" aria-label="Contact purpose"><button type="button" role="tab" aria-selected={contactPath === "resume"} onClick={() => chooseContact("resume")}>Request Resume</button><button type="button" role="tab" aria-selected={contactPath === "project"} onClick={() => chooseContact("project")}>Discuss a Project</button></div>
              <form key={contactPath} onSubmit={handleSubmit}>
                <p className="form-notice">Form preview only — it does not send. To request my CV or discuss a project, use the email link on this page.</p>
                <div className="form-row"><label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label><label>{contactPath === "resume" ? "Company / organization" : "Company"}<input name="company" autoComplete="organization" required maxLength={120} /></label></div>
                <label>{contactPath === "resume" ? "Professional email" : "Email"}<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
                {contactPath === "resume" ? <label>Purpose of request<select name="purpose" required defaultValue=""><option value="" disabled>Select a purpose</option><option value="hiring">Hiring conversation</option><option value="collaboration">Project collaboration</option><option value="other">Other professional reason</option></select></label> : <label>Business challenge<input name="challenge" required minLength={10} maxLength={220} placeholder="What are you trying to solve?" /></label>}
                <label>{contactPath === "resume" ? "Optional message" : "Optional project description"}<textarea name="message" rows={4} maxLength={1000} /></label>
                <button className="button button-primary submit-button" type="submit">Check form status <span aria-hidden="true">↗</span></button>
                {formMessage && <p className="form-status" role="status">{formMessage}</p>}
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell"><a className="brand" href="#top">CLARA<span>.</span></a><p>Product. Growth. Operations. Built with intention.</p><a href="#top">Back to top ↑</a></footer>
    </>
  );
}
