const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const homepagePath = path.join(root, 'src', 'index.html');
const projectsDirectory = path.join(root, 'src', 'projects');
const projectsPath = path.join(projectsDirectory, 'index.html');
const projectsOutputDirectory = path.join(root, 'docs', 'projects');
const homepage = fs.readFileSync(homepagePath, 'utf8');

const extract = (start, end) => {
  const startIndex = homepage.indexOf(start);
  const endIndex = homepage.indexOf(end, startIndex);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Unable to extract ${start} ... ${end}`);
  }

  return homepage.slice(startIndex, endIndex + end.length);
};

const cards = [...homepage.matchAll(/<article class="project-case blueprint-reveal">[\s\S]*?<\/article>/g)]
  .map((match) => {
    const markup = match[0];
    const title = markup.match(/<h3>(.*?)<\/h3>/)?.[1];
    return { title, markup };
  });

if (cards.length !== 12) {
  throw new Error(`Expected 12 project cards, found ${cards.length}`);
}

const automationProjects = [
  {
    slug: 'rss-openai-gohighlevel-changelog',
    category: 'automation',
    title: 'AI Changelog Automation',
    type: 'Multilingual Content Automation',
    description: 'A Make.com workflow that monitors RSS content, transforms it with OpenAI, updates GoHighLevel, and routes output into English and Spanish publishing paths automatically.',
    tags: ['Make.com', 'OpenAI', 'GoHighLevel'],
    image: 'https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789877335/Screenshot_2026-09-20_120811_eiglxh.png',
    imageAlt: 'RSS, OpenAI, and GoHighLevel changelog automation workflow',
  },
  {
    slug: 'govcon-reg-ai-webinar-registration',
    category: 'automation',
    title: 'GovCon AI Webinar Registration',
    type: 'AI Webinar Registration Automation',
    description: 'An AI-powered workflow that classifies email registration intent with OpenRouter, routes contacts, registers qualified leads for Zoom webinars, and updates GoHighLevel for CRM follow-up.',
    tags: ['OpenRouter AI', 'Zoom', 'GoHighLevel'],
    image: 'https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789878105/Screenshot_2026-09-20_122109_hgakak.png',
    imageAlt: 'GovCon AI webinar registration automation workflow',
  },
  {
    slug: 'auto-tagging-leads-utm',
    category: 'automation',
    title: 'UTM Lead Tagging Automation',
    type: 'Lead Attribution Automation',
    description: 'Automatically tags GoHighLevel leads by UTM source for accurate attribution, less manual work, and clearer campaign ROI.',
    tags: ['GoHighLevel', 'UTM', 'Lead Attribution'],
    image: 'https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789875297/image_1_tuhh0w.webp',
    imageAlt: 'UTM Lead Tagging Automation workflow',
  },
  {
    slug: 'facebook-dm-struggle',
    category: 'automation',
    title: 'Facebook DM - Struggle',
    type: 'Conversational Automation',
    description: 'Automatically engages Facebook leads in Messenger, qualifies their needs, nurtures interest, and guides them toward a solution without manual follow-up.',
    tags: ['GoHighLevel', 'Facebook', 'Conversation Automation'],
    image: 'https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789876189/image_2_wkdbfu.webp',
    imageAlt: 'Facebook DM - Struggle automation workflow',
  },
  {
    slug: '7-days-ai-marketing',
    category: 'automation',
    title: '7 Days AI Marketing',
    type: 'AI Lead Nurture',
    description: 'A seven-day AI nurture workflow that personalizes responses, handles objections, tracks engagement, and moves qualified leads through the sales pipeline with consistent automated follow-up.',
    tags: ['AI', 'GoHighLevel', 'Lead Nurture'],
    image: 'https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789876470/image_3_ovywlt.webp',
    imageAlt: '7 Days AI Marketing automation workflow overview',
    images: [
      {
        src: 'https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789876470/image_3_ovywlt.webp',
        alt: '7 Days AI Marketing automation workflow overview',
      },
      {
        src: 'https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789876474/image_4_mbax7u.webp',
        alt: '7 Days AI Marketing workflow sequence',
      },
      {
        src: 'https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789876476/image_5_gmhx2g.webp',
        alt: '7 Days AI Marketing follow-up workflow',
      },
    ],
  },
  {
    slug: 'metricool-sheets-integration',
    category: 'automation',
    title: 'Metricool x Sheets Integration',
    type: 'Marketing Data Automation',
    description: 'A Make.com workflow that syncs Instagram analytics from Metricool to organized Google Sheets every 15 minutes, enabling real-time reporting without manual data entry.',
    tags: ['Make.com', 'Metricool', 'Google Sheets'],
    image: 'https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789876948/13650ad2-8a96-4b15-84dd-b4daa2bbb2f8.png',
    imageAlt: 'Metricool and Google Sheets integration workflow',
  },
  {
    slug: 'webinar-registration-automation',
    category: 'automation',
    title: 'Webinar Registration Automation',
    type: 'Webinar & CRM Automation',
    description: 'A GoHighLevel automation that streamlines webinar registration, CRM opportunity management, confirmation emails, and workflow enrollment in one connected process.',
    tags: ['GoHighLevel', 'Webinar', 'CRM'],
    image: 'https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789877057/image_6_zgpyia.webp',
    imageAlt: 'Webinar Registration Automation workflow',
  },
  {
    slug: 'ceo-readiness-quiz',
    category: 'automation',
    title: 'CEO Readiness Quiz Automation',
    type: 'Quiz Segmentation & Email Nurture',
    description: 'An automated GoHighLevel nurture workflow that segments leads into CORE, SCALE, or LEGACY paths based on their quiz score, then delivers a tailored four-email follow-up sequence.',
    tags: ['GoHighLevel', 'Quiz Segmentation', 'Email Nurture'],
    image: 'https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789877175/image_7_f8c5fm.webp',
    imageAlt: 'CEO Readiness Quiz CORE, SCALE, and LEGACY automation workflow',
  },
];

const renderAutomationCard = (project) => {
  const titleMarkup = project.titleLines ? project.titleLines.join('<br>') : project.title;
  const accessibleTitle = project.title.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  const projectImages = project.images?.length
    ? project.images
    : project.image
      ? [{ src: project.image, alt: project.imageAlt }]
      : [];
  const cover = projectImages.length
    ? `<img src="${projectImages[0].src}" alt="${projectImages[0].alt}">`
    : `<span class="automation-cover-placeholder" role="img" aria-label="${project.imageAlt}"><b>Workflow Cover</b><small>Image pending / Phase 2</small></span>`;
  const previewOpen = projectImages.length
    ? `<button class="project-preview automation-image-trigger" type="button" data-gallery="${project.slug}" aria-label="Open ${accessibleTitle} workflow image${projectImages.length > 1 ? ' gallery' : ''}" aria-haspopup="dialog">`
    : `<div class="project-preview" aria-label="${accessibleTitle} workflow image pending">`;
  const previewClose = projectImages.length ? '</button>' : '</div>';

  return `<article class="project-case blueprint-reveal" data-project-slug="${project.slug}" data-project-category="${project.category}">
            <div class="project-copy">
              <div class="project-number"><span>Project</span></div>
              <div class="project-info">
                <h3>${titleMarkup}</h3>
                <span class="project-category">${project.type}</span>
                <p class="project-description">${project.description}</p>
                <div class="project-stack"><span class="project-stack-label">Stack</span><div class="project-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div></div>
              </div>
            </div>
            ${previewOpen}
              <span class="project-preview-label">Workflow Preview</span>
              <div class="project-image-frame project-image-placeholder">${cover}</div>
            ${previewClose}
          </article>`;
};

const automationCards = automationProjects.map((project) => ({
  title: project.title,
  markup: renderAutomationCard(project),
}));
const additionalProjectCards = [
  {
    title: 'XUM CRM Changelog',
    markup: `<article class="project-case blueprint-reveal" data-project-slug="xum-crm-changelog" data-project-category="landing-page">
            <div class="project-copy">
              <div class="project-number"><span>Project</span></div>
              <div class="project-info">
                <h3>XUM CRM Changelog</h3>
                <span class="project-category">Product Changelog / Content Interface</span>
                <p class="project-description">A structured product changelog for XUM CRM that presents improvements, interface updates, and technical releases as the frontend output of an automated content pipeline.</p>
                <div class="project-stack"><span class="project-stack-label">Stack</span><div class="project-tags"><span>Product Changelog</span><span>Content Interface</span><span>Automation Output</span></div></div>
                <a class="project-cta" href="https://updates.xumcrm.com/changelog" target="_blank" rel="noopener noreferrer">View Live Project <span aria-hidden="true">-&gt;</span></a>
              </div>
            </div>
            <a class="project-preview" href="https://updates.xumcrm.com/changelog" target="_blank" rel="noopener noreferrer" aria-label="View XUM CRM Changelog">
              <span class="project-preview-label">Live Preview</span>
              <div class="project-image-frame"><img src="https://res.cloudinary.com/dzkbnsqwo/image/upload/v1789877607/Screenshot_2026-09-20_121314_x5xrtq.png" alt="XUM CRM Changelog page preview"></div>
            </a>
          </article>`,
  },
];
const excludedProjectTitles = new Set(['Workflow Automation']);
const allCards = [
  ...cards.filter((card) => !excludedProjectTitles.has(card.title)),
  ...additionalProjectCards,
  ...automationCards,
];
const cardsByTitle = new Map(allCards.map((card) => [card.title, card.markup]));
const groups = [
  {
    id: 'landing-pages',
    label: '01 / Landing Pages',
    description: 'Campaign, webinar, event, and conversion-focused landing experiences.',
    titles: [
      'Brinc Landing Page for Webinar',
      'Igniting the Spirit of the Book',
      'SynrGEE Black Friday CEO Experience',
      'Aligned Visibility',
      'EmpoweredU Collective',
      'Awaken Landing Page',
      'XUM CRM Changelog',
    ],
  },
  {
    id: 'websites',
    label: '02 / Websites',
    description: 'Complete business, personal brand, service, hospitality, and venue websites.',
    titles: [
      'Priya Khandalkar Website',
      'Sorimar Estrada Website',
      'McCondach Movers & Storage',
      'Eighty Eight Hotel Website',
      'Keri Keri Golf Club Website',
    ],
  },
  {
    id: 'automations-systems',
    label: '03 / Automations & Systems',
    description: 'Connected workflows and operational systems designed to reduce manual work.',
    titles: automationProjects.map((project) => project.title),
  },
];

const groupedTitles = groups.flatMap((group) => group.titles);
const missingTitles = groupedTitles.filter((title) => !cardsByTitle.has(title));
const uncategorizedTitles = allCards.map((card) => card.title).filter((title) => !groupedTitles.includes(title));

if (missingTitles.length || uncategorizedTitles.length) {
  throw new Error(`Project grouping mismatch. Missing: ${missingTitles.join(', ') || 'none'}. Uncategorized: ${uncategorizedTitles.join(', ') || 'none'}.`);
}

const pageStyles = `
    .projects-library {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      padding: 112px 0 120px;
      background:
        radial-gradient(circle at 14% 8%, rgba(255, 115, 0, 0.08), transparent 28%),
        linear-gradient(180deg, #05080a 0%, #071014 48%, #05080a 100%);
    }

    .projects-library::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      background:
        linear-gradient(rgba(122, 178, 205, 0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(122, 178, 205, 0.045) 1px, transparent 1px),
        linear-gradient(rgba(122, 178, 205, 0.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(122, 178, 205, 0.022) 1px, transparent 1px);
      background-size: 96px 96px, 96px 96px, 24px 24px, 24px 24px;
      pointer-events: none;
    }

    .projects-library-shell {
      width: min(calc(100% - 80px), var(--container));
      margin: 0 auto;
    }

    .projects-library-hero {
      display: grid;
      grid-template-columns: minmax(0, 0.92fr) minmax(520px, 1.08fr);
      gap: clamp(44px, 5vw, 76px);
      align-items: center;
      padding: 24px 0 64px;
      border-bottom: 1px solid rgba(122, 178, 205, 0.18);
    }

    .projects-library-copy {
      min-width: 0;
    }

    .projects-library-kicker,
    .project-group-label {
      color: var(--orange);
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
      font-size: 0.74rem;
      font-weight: 900;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .projects-library-kicker {
      margin: 0 0 28px;
    }

    .projects-library-hero h1 {
      max-width: 720px;
      margin: 0;
      color: var(--ink);
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2.8rem, 4.45vw, 4.55rem);
      line-height: 0.98;
      letter-spacing: 0;
    }

    .projects-library-hero h1 span {
      color: var(--orange);
    }

    .projects-library-intro {
      max-width: 630px;
      margin: 28px 0 0;
      color: var(--muted);
      font-size: clamp(1rem, 1.35vw, 1.12rem);
      line-height: 1.75;
    }

    .project-library-panel {
      position: relative;
      min-width: 0;
      min-height: 470px;
      display: grid;
      grid-template-columns: minmax(220px, 0.43fr) minmax(0, 0.57fr);
      overflow: hidden;
      border: 1px solid rgba(122, 178, 205, 0.3);
      background:
        linear-gradient(rgba(122, 178, 205, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(122, 178, 205, 0.04) 1px, transparent 1px),
        rgba(3, 10, 13, 0.62);
      background-size: 24px 24px;
      box-shadow: inset 0 1px rgba(255, 255, 255, 0.025);
    }

    .project-library-panel::before,
    .project-library-panel::after {
      content: "+";
      position: absolute;
      z-index: 3;
      color: rgba(242, 238, 230, 0.82);
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
      font-size: 1.3rem;
      line-height: 1;
    }

    .project-library-panel::before {
      top: -11px;
      left: -8px;
    }

    .project-library-panel::after {
      right: -8px;
      bottom: -11px;
    }

    .project-library-data {
      position: relative;
      z-index: 2;
      min-width: 0;
      display: flex;
      flex-direction: column;
      padding: 30px 30px 26px;
      border-right: 1px solid rgba(122, 178, 205, 0.2);
      background: rgba(2, 8, 11, 0.38);
    }

    .project-library-label,
    .project-library-version,
    .project-library-total span,
    .project-library-breakdown,
    .project-library-quote,
    .project-library-disciplines,
    .project-library-actions,
    .project-library-signoff {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .project-library-label {
      margin: 0 0 22px;
      color: rgba(242, 238, 230, 0.8);
      font-size: 0.68rem;
      font-weight: 800;
    }

    .project-library-total {
      display: grid;
      gap: 12px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(122, 178, 205, 0.28);
    }

    .project-library-total strong {
      color: var(--orange);
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(3.5rem, 5vw, 5rem);
      line-height: 0.9;
      font-weight: 700;
    }

    .project-library-total span {
      color: rgba(242, 238, 230, 0.72);
      font-size: 0.72rem;
      font-weight: 800;
    }

    .project-library-breakdown {
      display: grid;
      gap: 12px;
      margin: 24px 0;
      padding: 0 0 24px;
      border-bottom: 1px solid rgba(122, 178, 205, 0.28);
    }

    .project-library-breakdown div {
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr);
      gap: 10px;
      align-items: baseline;
      color: rgba(242, 238, 230, 0.68);
      font-size: 0.66rem;
      line-height: 1.35;
    }

    .project-library-breakdown strong {
      color: rgba(242, 238, 230, 0.84);
      font-size: 1.18rem;
    }

    .project-library-quote {
      margin: auto 0 0;
      color: rgba(242, 238, 230, 0.72);
      font-size: 0.72rem;
      font-weight: 800;
      line-height: 1.55;
    }

    .project-library-quote::after {
      content: "";
      display: block;
      width: 20px;
      height: 2px;
      margin-top: 16px;
      background: var(--orange);
    }

    .project-library-disciplines {
      margin-top: 18px;
      color: rgba(122, 178, 205, 0.72);
      font-size: 0.58rem;
      line-height: 1.5;
    }

    .project-library-visual {
      position: relative;
      min-width: 0;
      overflow: hidden;
    }

    .project-library-version {
      position: absolute;
      top: 24px;
      right: 24px;
      z-index: 2;
      color: rgba(122, 178, 205, 0.7);
      font-size: 0.6rem;
    }

    .project-library-actions {
      position: absolute;
      top: 68px;
      right: 24px;
      z-index: 2;
      display: grid;
      gap: 7px;
      color: rgba(242, 238, 230, 0.55);
      font-size: 0.58rem;
      line-height: 1;
    }

    .project-library-visual svg {
      position: absolute;
      inset: 42px 0 44px;
      width: 100%;
      height: calc(100% - 86px);
      color: rgba(122, 178, 205, 0.32);
    }

    .project-library-visual svg .system-fill {
      fill: rgba(122, 178, 205, 0.035);
    }

    .project-library-visual svg .system-line {
      fill: none;
      stroke: currentColor;
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .project-library-visual svg .system-line--faint {
      opacity: 0.5;
    }

    .project-library-visual svg .system-node {
      fill: #071014;
      stroke: var(--orange);
      stroke-width: 2;
      vector-effect: non-scaling-stroke;
    }

    .project-library-signoff {
      position: absolute;
      right: 20px;
      bottom: 18px;
      z-index: 2;
      width: min(220px, calc(100% - 40px));
      padding: 12px 14px;
      border-top: 1px solid rgba(122, 178, 205, 0.32);
      border-left: 1px solid rgba(122, 178, 205, 0.18);
      color: rgba(242, 238, 230, 0.6);
      font-size: 0.56rem;
      line-height: 1.55;
    }

    .project-group {
      padding-top: clamp(72px, 8vw, 108px);
    }

    .project-group + .project-group {
      margin-top: clamp(16px, 2vw, 28px);
      padding-top: clamp(62px, 6.5vw, 88px);
    }

    .project-group-header {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 32px;
      margin-bottom: 34px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(122, 178, 205, 0.18);
    }

    .project-group-label {
      margin: 0;
    }

    .project-group-header p:last-child {
      max-width: 500px;
      margin: 0;
      color: var(--muted);
      font-size: 0.9rem;
      line-height: 1.65;
      text-align: right;
    }

    .projects-library .project-category {
      color: rgba(242, 238, 230, 0.88);
      font-size: 0.66rem;
    }

    .projects-library .project-description {
      color: rgba(242, 238, 230, 0.74);
      font-size: 0.9rem;
      line-height: 1.6;
      display: block;
      overflow: visible;
      -webkit-box-orient: initial;
      -webkit-line-clamp: unset;
    }

    #automations-systems .project-info h3 {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;
    }

    .projects-library .project-stack-label {
      color: rgba(122, 178, 205, 0.88);
      font-size: 0.62rem;
    }

    .projects-library .project-tags span {
      color: rgba(242, 238, 230, 0.78);
      font-size: 0.66rem;
      line-height: 1.15;
    }

    .projects-library .project-image-placeholder {
      display: grid;
      place-items: center;
      background:
        linear-gradient(rgba(122, 178, 205, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(122, 178, 205, 0.07) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(255, 115, 0, 0.08), transparent 42%),
        #050e12;
      background-size: 24px 24px, 24px 24px, auto, auto;
    }

    .automation-image-trigger {
      width: 100%;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: zoom-in;
    }

    .automation-lightbox {
      position: fixed;
      inset: 0;
      z-index: 180;
      display: grid;
      place-items: center;
      padding: clamp(18px, 4vw, 56px);
      background: rgba(2, 6, 8, 0.92);
      backdrop-filter: blur(12px);
    }

    .automation-lightbox[hidden] {
      display: none;
    }

    .automation-lightbox-frame {
      position: relative;
      width: min(1180px, 94vw);
      max-height: 88vh;
      padding: clamp(10px, 1.5vw, 18px);
      border: 1px solid rgba(122, 178, 205, 0.32);
      background:
        linear-gradient(rgba(122, 178, 205, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(122, 178, 205, 0.035) 1px, transparent 1px),
        #050e12;
      background-size: 24px 24px;
    }

    .automation-lightbox-frame::before,
    .automation-lightbox-frame::after {
      content: "";
      position: absolute;
      width: 18px;
      height: 18px;
      border-color: var(--orange);
      pointer-events: none;
    }

    .automation-lightbox-frame::before {
      top: -6px;
      left: -6px;
      border-top: 1px solid;
      border-left: 1px solid;
    }

    .automation-lightbox-frame::after {
      right: -6px;
      bottom: -6px;
      border-right: 1px solid;
      border-bottom: 1px solid;
    }

    .automation-lightbox img {
      display: block;
      width: 100%;
      max-height: calc(88vh - 36px);
      object-fit: contain;
      background: #03080a;
    }

    .automation-lightbox-close {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 2;
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255, 115, 0, 0.78);
      background: rgba(3, 8, 10, 0.94);
      color: var(--orange);
      font-size: 1.35rem;
      line-height: 1;
      cursor: pointer;
    }

    .automation-lightbox-close:hover {
      border-color: var(--orange);
      background: rgba(255, 115, 0, 0.1);
    }

    .automation-lightbox-nav {
      position: absolute;
      top: 50%;
      z-index: 2;
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255, 115, 0, 0.78);
      background: rgba(3, 8, 10, 0.94);
      color: var(--orange);
      font-size: 1.25rem;
      line-height: 1;
      transform: translateY(-50%);
      cursor: pointer;
    }

    .automation-lightbox-nav:hover {
      border-color: var(--orange);
      background: rgba(255, 115, 0, 0.1);
    }

    .automation-lightbox-nav[hidden] {
      display: none;
    }

    .automation-lightbox-prev {
      left: 26px;
    }

    .automation-lightbox-next {
      right: 26px;
    }

    .automation-lightbox-counter {
      position: absolute;
      left: 26px;
      bottom: 24px;
      z-index: 2;
      padding: 7px 10px;
      border: 1px solid rgba(122, 178, 205, 0.3);
      background: rgba(3, 8, 10, 0.9);
      color: #8fcaff;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.12em;
    }

    .automation-lightbox-counter[hidden] {
      display: none;
    }

    body.has-automation-lightbox {
      overflow: hidden;
    }

    @media (max-width: 640px) {
      .automation-lightbox-nav {
        width: 38px;
        height: 38px;
      }

      .automation-lightbox-prev {
        left: 18px;
      }

      .automation-lightbox-next {
        right: 18px;
      }

      .automation-lightbox-counter {
        left: 18px;
        bottom: 16px;
      }
    }

    .automation-cover-placeholder {
      position: relative;
      width: min(72%, 360px);
      min-height: 96px;
      display: grid;
      place-content: center;
      gap: 10px;
      padding: 22px;
      border-top: 1px solid rgba(122, 178, 205, 0.38);
      border-bottom: 1px solid rgba(122, 178, 205, 0.2);
      color: rgba(242, 238, 230, 0.76);
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
      text-align: center;
      text-transform: uppercase;
    }

    .automation-cover-placeholder::before,
    .automation-cover-placeholder::after {
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
      border-color: var(--orange);
    }

    .automation-cover-placeholder::before {
      top: -5px;
      left: -5px;
      border-top: 1px solid;
      border-left: 1px solid;
    }

    .automation-cover-placeholder::after {
      right: -5px;
      bottom: -5px;
      border-right: 1px solid;
      border-bottom: 1px solid;
    }

    .automation-cover-placeholder b {
      color: var(--orange);
      font-size: 0.78rem;
      letter-spacing: 0.14em;
    }

    .automation-cover-placeholder small {
      color: rgba(122, 178, 205, 0.72);
      font-size: 0.56rem;
      letter-spacing: 0.12em;
    }

    @media (max-width: 960px) {
      .projects-library-hero {
        grid-template-columns: 1fr;
        gap: 44px;
      }
    }

    @media (max-width: 760px) {
      .projects-library {
        padding: 90px 0 84px;
      }

      .projects-library-shell {
        width: min(calc(100% - 32px), 440px);
      }

      .projects-library-hero {
        gap: 36px;
        padding: 24px 0 54px;
      }

      .projects-library-hero h1 {
        font-size: clamp(2.25rem, 10.5vw, 3.4rem);
      }

      .projects-library-kicker {
        margin-bottom: 22px;
      }

      .projects-library-intro {
        margin-top: 22px;
      }

      .project-library-panel {
        min-height: 0;
        grid-template-columns: 1fr;
      }

      .project-library-data {
        padding: 24px 22px;
        border-right: 0;
        border-bottom: 1px solid rgba(122, 178, 205, 0.2);
      }

      .project-library-breakdown {
        margin-block: 20px;
        padding-bottom: 20px;
      }

      .project-library-quote {
        margin-top: 2px;
      }

      .project-library-visual {
        min-height: 250px;
      }

      .project-library-visual svg {
        inset: 26px 0 42px;
        height: calc(100% - 68px);
      }

      .project-library-actions {
        top: 48px;
        right: 16px;
      }

      .project-library-version {
        top: 16px;
        right: 16px;
      }

      .project-group {
        padding-top: 64px;
      }

      .project-group + .project-group {
        margin-top: 16px;
        padding-top: 52px;
      }

      .project-group-header {
        display: grid;
        gap: 12px;
        margin-bottom: 24px;
      }

      .project-group-header p:last-child {
        max-width: 34ch;
        text-align: left;
      }
    }
`;

let head = extract('<head>', '</head>')
  .replace(
    /<meta name="description" content="[^"]*">/,
    '<meta name="description" content="Explore Emman Sadiang-abay\'s complete portfolio of websites, landing pages, and automation systems.">',
  )
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Projects | Emman Sadiang-abay</title>')
  .replace('</style>', `${pageStyles}  </style>`);

let header = extract('<header class="site-header" data-header>', '</header>')
  .replaceAll('href="#home"', 'href="../#home"')
  .replaceAll('href="#behind-blueprint"', 'href="../#behind-blueprint"')
  .replaceAll('href="#projects"', 'href="./" aria-current="page"')
  .replaceAll('href="#contact"', 'href="../#contact"')
  .replaceAll('href="book-a-call/"', 'href="../book-a-call/"');

let footerAndScripts = homepage.slice(homepage.indexOf('<footer class="blueprint-footer"'))
  .replaceAll('href="#home"', 'href="../#home"')
  .replaceAll('href="#behind-blueprint"', 'href="../#behind-blueprint"')
  .replaceAll('href="#projects"', 'href="./" aria-current="page"')
  .replaceAll('href="#contact"', 'href="../#contact"')
  .replaceAll('href="book-a-call/"', 'href="../book-a-call/"');

const groupMarkup = groups.map((group) => `
      <section class="project-group" id="${group.id}" aria-labelledby="${group.id}-title">
        <header class="project-group-header blueprint-reveal">
          <p class="project-group-label" id="${group.id}-title">${group.label}</p>
          <p>${group.description}</p>
        </header>
        <div class="project-cases" aria-label="${group.label.replace(/^\d+ \/ /, '')} projects">
          ${group.titles.map((title) => cardsByTitle.get(title)).join('\n\n          ')}
        </div>
      </section>`).join('\n');

const formatCount = (count) => String(count).padStart(2, '0');
const landingPageCount = groups.find((group) => group.id === 'landing-pages').titles.length;
const websiteCount = groups.find((group) => group.id === 'websites').titles.length;
const automationCount = groups.find((group) => group.id === 'automations-systems').titles.length;
const automationGalleries = Object.fromEntries(
  automationProjects
    .map((project) => [
      project.slug,
      project.images?.length
        ? project.images
        : project.image
          ? [{ src: project.image, alt: project.imageAlt }]
          : [],
    ])
    .filter(([, images]) => images.length),
);

const output = `<!DOCTYPE html>
<html lang="en">
${head}
<body>
  ${header}

  <main id="projects-page">
    <section class="projects-library" aria-labelledby="projects-library-title">
      <div class="projects-library-shell">
        <header class="projects-library-hero blueprint-reveal">
          <div class="projects-library-copy">
            <p class="projects-library-kicker">Projects / Systems Library</p>
            <h1 id="projects-library-title">Selected work<br>across websites,<br>landing pages,<br>and <span>automation<br>systems.</span></h1>
            <p class="projects-library-intro">A complete collection of digital experiences and operational systems built with clarity, purpose, and measurable outcomes in mind.</p>
          </div>

          <aside class="project-library-panel" aria-label="Project library summary">
            <div class="project-library-data">
              <p class="project-library-label">// Project Library</p>
              <div class="project-library-total">
                <strong>${formatCount(allCards.length)}</strong>
                <span>Total Projects</span>
              </div>
              <div class="project-library-breakdown">
                <div><strong>${formatCount(landingPageCount)}</strong><span>Landing Pages</span></div>
                <div><strong>${formatCount(websiteCount)}</strong><span>Websites</span></div>
                <div><strong>${formatCount(automationCount)}</strong><span>Automations &amp; Systems</span></div>
              </div>
              <p class="project-library-quote">&ldquo;Ideas<br>built into<br>real solutions.&rdquo;</p>
              <p class="project-library-disciplines">Web / Funnels / Automation</p>
            </div>

            <div class="project-library-visual" aria-hidden="true">
              <span class="project-library-version">v1.0</span>
              <span class="project-library-actions">Design<br>Develop<br>Automate<br>Scale</span>
              <svg viewBox="0 0 520 420" role="presentation">
                <circle class="system-fill" cx="272" cy="228" r="126"></circle>
                <circle class="system-line" cx="272" cy="228" r="126"></circle>
                <ellipse class="system-line system-line--faint" cx="272" cy="228" rx="126" ry="46"></ellipse>
                <ellipse class="system-line system-line--faint" cx="272" cy="228" rx="126" ry="82"></ellipse>
                <ellipse class="system-line system-line--faint" cx="272" cy="228" rx="48" ry="126"></ellipse>
                <ellipse class="system-line system-line--faint" cx="272" cy="228" rx="88" ry="126"></ellipse>
                <path class="system-line" d="M68 152C160 88 356 86 464 174"></path>
                <path class="system-line system-line--faint" d="M48 248C150 182 374 194 478 284"></path>
                <path class="system-line" d="M106 342C200 384 388 354 448 250"></path>
                <path class="system-line system-line--faint" d="M146 72C286 114 410 202 442 340"></path>
                <rect class="system-node" x="63" y="147" width="8" height="8"></rect>
                <rect class="system-node" x="141" y="68" width="8" height="8"></rect>
                <rect class="system-node" x="460" y="170" width="8" height="8"></rect>
                <rect class="system-node" x="474" y="280" width="8" height="8"></rect>
                <rect class="system-node" x="102" y="338" width="8" height="8"></rect>
                <rect class="system-node" x="438" y="336" width="8" height="8"></rect>
              </svg>
              <span class="project-library-signoff">Built with intent.<br>Engineered for impact.</span>
            </div>
          </aside>
        </header>
${groupMarkup}
      </div>
    </section>
  </main>

  <div class="automation-lightbox" id="automation-lightbox" role="dialog" aria-modal="true" aria-label="Automation workflow image preview" hidden>
    <div class="automation-lightbox-frame">
      <button class="automation-lightbox-close" type="button" aria-label="Close image preview">&times;</button>
      <button class="automation-lightbox-nav automation-lightbox-prev" type="button" aria-label="Previous workflow image" hidden>&larr;</button>
      <img src="" alt="">
      <button class="automation-lightbox-nav automation-lightbox-next" type="button" aria-label="Next workflow image" hidden>&rarr;</button>
      <span class="automation-lightbox-counter" aria-live="polite" hidden></span>
    </div>
  </div>

  <script>
    (() => {
      const lightbox = document.getElementById('automation-lightbox');
      const lightboxImage = lightbox?.querySelector('img');
      const closeButton = lightbox?.querySelector('.automation-lightbox-close');
      const previousButton = lightbox?.querySelector('.automation-lightbox-prev');
      const nextButton = lightbox?.querySelector('.automation-lightbox-next');
      const counter = lightbox?.querySelector('.automation-lightbox-counter');
      const triggers = document.querySelectorAll('.automation-image-trigger');
      const galleries = ${JSON.stringify(automationGalleries)};
      let activeTrigger = null;
      let activeGallery = [];
      let activeIndex = 0;
      let touchStartX = 0;

      if (!lightbox || !lightboxImage || !closeButton || !previousButton || !nextButton || !counter || !triggers.length) return;

      const renderImage = () => {
        const image = activeGallery[activeIndex];
        if (!image) return;
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || 'Automation workflow image';
        counter.textContent = String(activeIndex + 1).padStart(2, '0') + ' / ' + String(activeGallery.length).padStart(2, '0');
        const hasMultipleImages = activeGallery.length > 1;
        previousButton.hidden = !hasMultipleImages;
        nextButton.hidden = !hasMultipleImages;
        counter.hidden = !hasMultipleImages;
      };

      const showPreviousImage = () => {
        if (activeGallery.length < 2) return;
        activeIndex = (activeIndex - 1 + activeGallery.length) % activeGallery.length;
        renderImage();
      };

      const showNextImage = () => {
        if (activeGallery.length < 2) return;
        activeIndex = (activeIndex + 1) % activeGallery.length;
        renderImage();
      };

      const closeLightbox = () => {
        lightbox.hidden = true;
        document.body.classList.remove('has-automation-lightbox');
        lightboxImage.src = '';
        lightboxImage.alt = '';
        activeGallery = [];
        activeIndex = 0;
        activeTrigger?.focus();
        activeTrigger = null;
      };

      triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const gallery = galleries[trigger.dataset.gallery] || [];
          if (!gallery.length) return;
          activeTrigger = trigger;
          activeGallery = gallery;
          activeIndex = 0;
          renderImage();
          lightbox.hidden = false;
          document.body.classList.add('has-automation-lightbox');
          closeButton.focus();
        });
      });

      closeButton.addEventListener('click', closeLightbox);
      previousButton.addEventListener('click', showPreviousImage);
      nextButton.addEventListener('click', showNextImage);
      lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
      });
      lightboxImage.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
      }, { passive: true });
      lightboxImage.addEventListener('touchend', (event) => {
        const distance = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(distance) < 50) return;
        if (distance > 0) showPreviousImage();
        else showNextImage();
      }, { passive: true });
      document.addEventListener('keydown', (event) => {
        if (lightbox.hidden) return;
        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowLeft') showPreviousImage();
        if (event.key === 'ArrowRight') showNextImage();
      });
    })();
  </script>

  ${footerAndScripts}`;

fs.mkdirSync(projectsDirectory, { recursive: true });
fs.mkdirSync(projectsOutputDirectory, { recursive: true });
fs.writeFileSync(projectsPath, output);
console.log(`Generated ${path.relative(root, projectsPath)} with ${allCards.length} projects.`);
