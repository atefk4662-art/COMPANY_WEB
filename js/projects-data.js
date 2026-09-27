/**
 * SOLVEXA — CENTRALIZED SELECTED WORK DATA
 * Single source of truth for all projects.
 * Used by: index.html (featured preview), projects.html (full catalog)
 */

const PROJECTS = [
  {
    id: "yoc-travel",
    title: "YOC (Your Only Chance) Youth Travel Platform",
    category: "systems",
    categoryLabel: "AI & Travel Platform • Systems Architecture",
    description: "An AI-powered youth travel booking & exploration platform built for Egyptian tourism. Features AI Vibe trip planning, instant Stripe checkout in EGP/USD, custom itineraries, and community trip suggestions.",
    coverImage: "assets/yoc_hero.jpg",
    tools: ["Business Analysis", "System Design", "Stripe API", "AI Travel Planner", "Agile Management"],
    metrics: [
      { value: "AI-Powered", label: "Vibe Planner" },
      { value: "End-to-End", label: "Booking & Checkout" },
      { value: "Full Prototype", label: "Architecture" }
    ],
    featured: true,
    status: "completed",
    caseStudyUrl: "projects/yoc.html",
    order: 1
  },
  {
    id: "shopeasy",
    title: "ShopEasy Marketing Analytics",
    category: "data",
    categoryLabel: "E-Commerce & Marketing Analytics",
    description: "Conducted an end-to-end data audit on e-commerce customer behavior to diagnose conversion drop-offs. Built an interactive Power BI dashboard suite and customer sentiment pipeline to uncover key retention drivers.",
    coverImage: "assets/shopeasy_cover.jpg",
    tools: ["SQL", "Power BI", "Python", "KPI Architecture", "Sentiment Analysis"],
    metrics: [
      { value: "8.5%", label: "Avg Conversion" },
      { value: "2.98M", label: "Impressions" },
      { value: "357", label: "Reviews Analyzed" }
    ],
    featured: true,
    status: "completed",
    caseStudyUrl: "projects/shopeasy.html",
    order: 2
  },
  {
    id: "lotus-retail",
    title: "Lotus Retail Analytics & BI Dashboard",
    category: "data",
    categoryLabel: "Retail Analytics • Power BI • Star Schema",
    description: "End-to-end retail business intelligence suite analyzing 45.35M EGP across 12,000 orders and 15 stores. Features a star-schema data model and an interactive 4-view Power BI dashboard tracking regional margins, loyalty tiers, and return root causes.",
    coverImage: "assets/lotus_retail_cover.png",
    tools: ["Power BI", "DAX", "Power Query", "Star Schema", "Retail Analytics"],
    metrics: [
      { value: "45.35M", label: "Total Revenue" },
      { value: "92%", label: "Repeat Buyers" },
      { value: "15 Stores", label: "Multi-Store BI" }
    ],
    featured: true,
    status: "completed",
    caseStudyUrl: "projects/lotus-retail.html",
    order: 3
  },
  {
    id: "course-advisor",
    title: "University Course Advisor — Expert System",
    category: "systems",
    categoryLabel: "Expert Systems • Academic Intelligence",
    description: "A rule-based academic advising Expert System evaluating student eligibility, calculating a 100-point multi-attribute weighted match, generating explainable recommendations, and integrating live USD/EGP currency exchange rates.",
    coverImage: "assets/course_advisor_cover.png",
    tools: ["Expert System", "Inference Engine", "Knowledge Base", "REST API", "JavaScript"],
    metrics: [
      { value: "23 Courses", label: "Knowledge Base" },
      { value: "100-Pt", label: "Weighted Model" },
      { value: "Live EGP", label: "Currency API" }
    ],
    featured: true,
    status: "completed",
    caseStudyUrl: "projects/course-advisor.html",
    order: 4
  },
  {
    id: "triple-seven",
    title: "Triple Seven PlayStation & Café POS",
    category: "systems",
    categoryLabel: "Systems & Software Architecture",
    description: "Custom-built PlayStation gaming lounge and café management platform. Features real-time console session timers (Single/Multiplayer rates), integrated F&B ordering, and zero-shrinkage shift drawer audits.",
    coverImage: "assets/triple_seven_cover.jpg",
    tools: ["JavaScript", "PHP", "MySQL", "Tailscale", "System Architecture"],
    metrics: [
      { value: "Live", label: "Station Timers" },
      { value: "Café POS", label: "F&B Billing" },
      { value: "Secured", label: "Tailnet VPN" }
    ],
    featured: true,
    status: "completed",
    caseStudyUrl: "projects/triple-seven.html",
    order: 5
  },
  {
    id: "foush",
    title: "FOUSH Restaurant POS",
    category: "systems",
    categoryLabel: "Systems & Software Architecture",
    description: "Engineered a high-availability Point of Sale (POS) ecosystem with offline-first architecture, real-time kitchen display synchronization, and cloud management for multi-station restaurant operations.",
    coverImage: "assets/foush_real_cover.png",
    tools: ["JavaScript", "Node.js", "Firebase", "PWA", "ESC/POS", "WebSockets"],
    metrics: [
      { value: "100%", label: "Offline-First" },
      { value: "5", label: "Role Portals" },
      { value: "Live", label: "Cloud Sync" }
    ],
    featured: true,
    status: "completed",
    caseStudyUrl: "projects/foush.html",
    order: 6
  },
  {
    id: "customer-behavior",
    title: "Customer Shopping Behavior",
    category: "data",
    categoryLabel: "Data Analytics & SQL",
    description: "Analyzed 3,900+ retail consumer transactions to evaluate demographic purchase trends, repeat buyer behaviors, and subscription uptake. Formulated 5 actionable business strategies to optimize loyalty programs.",
    coverImage: "assets/customer_behavior_cover.jpg",
    tools: ["Python", "Pandas", "PostgreSQL", "SQL", "Power BI"],
    metrics: [
      { value: "3,900", label: "Transactions Analyzed" },
      { value: "5", label: "Strategic Action Plans" }
    ],
    featured: true,
    status: "completed",
    caseStudyUrl: "projects/customer-behavior.html",
    order: 7
  }
];

/**
 * Render a single project card HTML from project data.
 * @param {Object} project - Project data object
 * @param {string} basePath - Base path prefix for assets/links (e.g., "" for root, "../" for subfolders)
 * @returns {string} HTML string
 */
function renderProjectCard(project, basePath = "") {
  const metricsHtml = project.metrics.length > 0
    ? `<div class="card-metrics-strip">
        ${project.metrics.map(m => `
          <div class="metric-pill">
            <span class="m-val">${m.value}</span>
            <span class="m-lbl">${m.label}</span>
          </div>
        `).join("")}
       </div>`
    : "";

  const toolsHtml = project.tools.length > 0
    ? `<div class="card-tools">
        ${project.tools.map(t => `<span class="tool-tag">${t}</span>`).join("")}
       </div>`
    : "";

  const ctaHtml = project.status === "completed" && project.caseStudyUrl
    ? `<a href="${basePath}${project.caseStudyUrl}" class="btn btn-primary" style="width: 100%;">
        View Case Study
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
       </a>`
    : `<span class="btn btn-secondary" style="width: 100%; cursor: default; opacity: 0.6;">Coming Soon</span>`;

  return `
    <article class="project-card" data-category="${project.category}" data-id="${project.id}">
      <div class="grid-cover-wrapper">
        <img src="${basePath}${project.coverImage}" alt="${project.title}" class="grid-cover" loading="lazy">
      </div>
      <div class="grid-content">
        <div class="grid-meta">
          <span class="badge badge-primary">${project.categoryLabel}</span>
        </div>
        <h3 class="grid-title">${project.title}</h3>
        <p class="grid-summary">${project.description}</p>
        ${metricsHtml}
        ${toolsHtml}
        <div class="grid-footer">
          ${ctaHtml}
        </div>
      </div>
    </article>
  `;
}

/**
 * Get projects, merging defaults with any localStorage overrides.
 */
function getProjects() {
  const stored = localStorage.getItem("portfolio_projects");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return PROJECTS;
    }
  }
  return PROJECTS;
}

/**
 * Save projects to localStorage.
 */
function saveProjects(projects) {
  localStorage.setItem("portfolio_projects", JSON.stringify(projects));
}
