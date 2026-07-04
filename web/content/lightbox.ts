export const LIGHTBOX_META = {
  title: "Bespoke Lightbox & Custom Glowing Signage Systems | Yulux Signs",
  description:
    "Engineering-grade, fully customized architectural lightboxes & premium glowing storefront signage. 100% tailored to your brand specifications. Get a free 24h custom quote.",
};

export const LIGHTBOX_HERO = {
  h1: "Fully Customized Lightbox & Premium Glowing Signage",
  h4: "No templates. No standard sizes. Every single lightbox is custom-engineered from scratch to precisely replicate your architectural vision and brand identity.",
  cta: "Request 1:1 Engineering Design & Quote (Free within 24h)",
};

export const LIGHTBOX_CAPABILITIES = [
  {
    title: "Unlimited Architectural Shapes",
    description:
      "From ultra-sleek circular projecting lightboxes to custom-contoured, irregular geometric silhouettes. Our high-precision laser-cutting CNC systems can bring any complex logo silhouette to life with millimeter accuracy.",
  },
  {
    title: "Avant-Garde Material Palette",
    description:
      "We don't just use plastic. Match your architectural facade with premium marine-grade 304/316 stainless steel, copper-plated luxury finishes, heavy-duty structural aluminum, or hand-distressed vintage Corten rust steel.",
  },
  {
    title: "Advanced Illumination Aesthetics",
    description:
      "Go beyond simple backlighting. We engineer dual-emission lighting (front & halo lit), animated scrolling LEDs, intelligent smart-dimming, and edge-lit acrylic systems that deliver perfectly uniform, glare-free luminescence.",
  },
];

export const LIGHTBOX_FAQ = [
  {
    question: "We have strict corporate branding guidelines. Can you match custom colors and dual-layer graphics?",
    answer:
      "Absolutely. We use certified Pantone/RAL color-matching for all metal framework powder-coating. For the illuminated graphic face, we apply industrial dual-layer UV printing on high-diffusion acrylic or utilize premium translucent architectural vinyl films to ensure your corporate palette remains flawless and vibrant, day and night.",
  },
  {
    question: "Since your lightboxes are 100% custom, how do we handle graphics replacement in the future?",
    answer:
      "We engineer long-term versatility into every sign. Our custom lightboxes feature engineered slide-out panels or hidden mechanical snap-frames. If your branding changes, we can ship you a new precision-cut acrylic face that inserts into your existing heavy-duty framework in under 5 minutes — no professional tools required.",
  },
  {
    question: "How do you ensure a completely custom-shaped lightbox survives extreme outdoor weather?",
    answer:
      "Every custom structure undergoes digital wind-load simulation. We utilize internally reinforced structural framing, integrated internal water-drainage tracks, and fully potted IP67 waterproof MeanWell power drivers. Whether it's coastal high-salinity air or gale-force winds, our lightboxes are built to endure.",
  },
];

export const LIGHTBOX_FORM_FIELDS = [
  { id: "projectType", label: "Project Type", type: "select", options: ["Commercial Retail", "Corporate HQ", "Hotel & F&B", "Outdoor Engineering"], required: true },
  { id: "shape", label: "Custom Shape Requirement", type: "text", placeholder: "e.g., Circular, irregular geometric, 3D curved, or dynamic ultra-thin...", required: true },
  { id: "dimensions", label: "Dimensions / Spatial Limits", type: "text", placeholder: "Tell us your estimated size or wall space available...", required: true },
  { id: "artwork", label: "Upload Your Vector Artwork/Inspiration", type: "file", required: false },
  { id: "name", label: "Full Name", type: "text", required: true },
  { id: "email", label: "Email Address", type: "email", required: true },
  { id: "company", label: "Company Name", type: "text", required: false },
  { id: "country", label: "Country/Region", type: "text", required: true },
];
