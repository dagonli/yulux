export type Technique = {
  slug: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  subhead: string;
  craft: string;
  whyChoose: string;
  faq: { question: string; answer: string }[];
};

export const HUB_META = {
  title: "Custom Channel Letters & Business Signage Solutions | Yulux Signs",
  description:
    "Engineering-grade custom channel letters and logo signs. Front-lit, back-lit, side-lit and more. Get a free 24h quote for your business signage project.",
};

export const HUB_CONTENT = {
  h1: "Custom Channel Letters & Logo Signs",
  subhead:
    "Engineering-grade architectural signage for retail, corporate, and luxury brands. Explore our Craftsmanship Lab and get a free quote within 24 hours.",
};

export const TECHNIQUES: Technique[] = [
  {
    slug: "front-lit",
    label: "Front-Lit",
    metaTitle: "Classic Front-Lit Channel Letters | High-Visibility Signs",
    metaDescription:
      "The most popular choice for retail. Durable stainless steel with vibrant acrylic faces. Engineering-grade quality. Get a 24h quote!",
    keywords: "Front-lit signs, Retail storefront signs, Custom channel letters",
    h1: "Front-Lit Channel Letters: The Gold Standard of Retail Visibility",
    subhead:
      "Classic, vibrant, and impossible to miss. Our front-lit signs combine high-grade acrylic faces with precision-engineered metal returns.",
    craft:
      "Light is directed through a translucent acrylic face, while the metal sides remain opaque, creating a sharp, clean outline.",
    whyChoose: "Maximum legibility, versatile branding, proven durability.",
    faq: [
      {
        question: "What businesses benefit most from front-lit channel letters?",
        answer:
          "Front-lit channel letters are the gold standard for retail storefronts, restaurants, and any business requiring maximum daytime and nighttime visibility from a distance.",
      },
      {
        question: "What materials are used in front-lit signs?",
        answer:
          "Yulux front-lit signs use engineering-grade stainless steel returns with high-transmission acrylic faces and Samsung/Cree LED modules rated for 50,000+ hours.",
      },
    ],
  },
  {
    slug: "back-lit",
    label: "Back-Lit / Halo-Lit",
    metaTitle: "Premium Back-Lit (Halo) Signs | Sophisticated Branding",
    metaDescription:
      "Create a floating, high-end look with soft halo illumination. Engineering-grade 304 stainless steel. Perfect for corporate & luxury brands.",
    keywords: "Back-lit halo signs, Halo lit letters, Luxury business signage",
    h1: "Back-Lit Halo Signs: Sophisticated Elegance for Premium Brands",
    subhead:
      'Create a lasting impression with a soft, ethereal glow. Our back-lit signs offer a "floating" effect that exudes luxury.',
    craft:
      "LEDs are mounted to shine out the back, reflecting off the wall to create a soft halo of light around each letter.",
    whyChoose: "Luxury aesthetic, architectural integration, glare-free.",
    faq: [
      {
        question: "What is a halo-lit sign?",
        answer:
          "A halo-lit (back-lit) sign mounts LEDs behind each letter so light reflects off the wall, creating a soft glow outline around the letterform — ideal for premium corporate and luxury brand environments.",
      },
    ],
  },
  {
    slug: "side-lit",
    label: "Side-Lit",
    metaTitle: "Modern Side-Lit Signs | Architectural Glowing Edges",
    metaDescription:
      "Unique glowing edges for a modern architectural feel. Precision-crafted for creative studios and boutique retail. Request a free mockup!",
    keywords: "Side-lit signs, Architectural signage, Modern glowing letters",
    h1: "Side-Lit Signage: Modern Depth with Architectural Glowing Edges",
    subhead:
      "A unique twist on traditional lighting. Define your brand with glowing edges that add a sophisticated 3D depth.",
    craft:
      "Features an opaque face with translucent acrylic sides, directing light laterally to highlight the letter's form.",
    whyChoose: "Unique silhouette, modern feel, subtle branding.",
    faq: [
      {
        question: "When should I choose side-lit over front-lit?",
        answer:
          "Side-lit signage is ideal for creative studios, boutique retail, and architectural projects where subtle edge illumination and modern depth are preferred over maximum face brightness.",
      },
    ],
  },
  {
    slug: "full-lit",
    label: "Full-Lit",
    metaTitle: "Ultra-Bright Full-Lit Signs | 360° Illumination",
    metaDescription:
      "Maximum visibility with front and side illumination. A bold choice for brands that want to stand out 24/7. Seamless, voluminous glow.",
    keywords: "Full-lit signs, 360 degree illumination, Bright business signs",
    h1: "Full-Lit Channel Letters: 360° of Brilliant Branding",
    subhead:
      "Command attention from every angle. Our full-lit signs combine front and side illumination for a bold, seamless glow.",
    craft:
      "Utilizes high-grade translucent acrylic for both the face and the returns, creating a voluminous, glowing effect.",
    whyChoose: "360° impact, seamless design, maximum visibility.",
    faq: [
      {
        question: "What makes full-lit different from front-lit?",
        answer:
          "Full-lit channel letters illuminate both the face and sides simultaneously, creating 360-degree visibility — the boldest option for brands requiring maximum impact day and night.",
      },
    ],
  },
  {
    slug: "jelly-lit",
    label: "Jelly-Lit",
    metaTitle: "Vibrant Jelly-Lit Signs | Luscious Glow & Texture",
    metaDescription:
      "Unique rounded resin texture with a soft, vibrant glow. Ideal for trendy cafes, bars, and playful branding. Engineering-grade resin.",
    keywords: "Jelly-lit signs, Resin neon signs, Trendy cafe signage",
    h1: "Jelly-Lit Signs: Vibrant Glow with Luscious Texture",
    subhead:
      "Unique rounded resin texture with a soft, vibrant glow — perfect for trendy cafes, bars, and playful branding.",
    craft:
      "Jelly-Lit signs use engineering-grade resin with integrated LED illumination for a rounded, luscious glow effect unlike traditional flat channel letters.",
    whyChoose: "Distinctive texture, playful branding, Instagram-worthy aesthetics.",
    faq: [
      {
        question: "What is a jelly-lit sign?",
        answer:
          "Jelly-lit signs feature a rounded resin construction with integrated LED illumination, creating a soft, vibrant glow with a unique tactile texture — popular in cafes, bars, and creative retail spaces.",
      },
    ],
  },
  {
    slug: "non-lit",
    label: "Non-Lit",
    metaTitle: "Professional Non-Lit Signs | Pure Metal & Texture",
    metaDescription:
      "Focus on material and form. High-quality brushed stainless steel or matte acrylic for a clean, minimalist statement. Zero maintenance.",
    keywords: "Non-illuminated signs, Metal business letters, Minimalist signage",
    h1: "Non-Lit Signs: Pure Material, Pure Impact",
    subhead:
      "Focus on material and form. High-quality brushed stainless steel or matte acrylic for a clean, minimalist statement.",
    craft:
      "Non-Lit signs emphasize premium material craftsmanship — brushed stainless steel, matte acrylic, or powder-coated metal — with zero electrical components and zero maintenance.",
    whyChoose: "Zero maintenance, timeless aesthetics, premium material focus.",
    faq: [
      {
        question: "When are non-lit signs the right choice?",
        answer:
          "Non-lit signs are ideal for minimalist brand identities, interior wayfinding, and environments where material texture and form take precedence over illumination — with zero ongoing maintenance costs.",
      },
    ],
  },
];

export function getTechnique(slug: string): Technique | undefined {
  return TECHNIQUES.find((t) => t.slug === slug);
}

export const TECHNIQUE_SLUGS = TECHNIQUES.map((t) => t.slug);
