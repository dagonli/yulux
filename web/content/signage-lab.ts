export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readTime: string;
  excerpt: string;
  isHowTo?: boolean;
  sections: { heading: string; content: string }[];
};

export const LAB_META = {
  title: "The Signage Lab | Expert Guides for LED Custom Signs & Business Signage",
  description:
    "Your ultimate resource for custom business sign engineering. Explore technical guides on LED neon flex, material science, and installation for premium commercial signs.",
};

export const LAB_HERO = {
  h1: "The Signage Lab",
  subhead:
    "Your ultimate resource for custom business sign engineering. Expert guides on LED custom signs, material science, and installation.",
};

export const LAB_CATEGORIES = [
  { id: "technical", label: "Technical Guides", href: "/signage-lab/installation-guide-custom-business-signs" },
  { id: "material", label: "Material Science", href: "/signage-lab/304-vs-316-stainless-steel-outdoor-signs" },
  { id: "design", label: "Design Inspiration", href: "/signage-lab/front-lit-vs-back-lit-led-custom-signs" },
  { id: "maintenance", label: "Maintenance & Repair", href: "/signage-lab/led-sign-repair-maintenance-guide" },
];

export const LAB_FAQ = [
  {
    question: "What is the difference between LED neon flex and traditional glass neon?",
    answer:
      "LED neon flex uses flexible silicone tubing with embedded LEDs, offering 50,000+ hour lifespan, zero heat, and no toxic gases — unlike fragile glass neon that requires skilled bending and contains mercury vapor.",
  },
  {
    question: "How do I choose between front-lit and back-lit channel letters?",
    answer:
      "Front-lit channel letters maximize visibility and are ideal for retail storefronts. Back-lit (halo) signs create a premium floating effect suited for corporate headquarters and luxury brands seeking architectural elegance.",
  },
  {
    question: "Are Yulux signs UL and CE certified?",
    answer:
      "Yes. All Yulux signs use CE, UL, and RoHS certified 12V power transformers and components, ensuring safe operation worldwide and compliance with commercial installation standards.",
  },
  {
    question: "How long do LED custom signs typically last?",
    answer:
      "Quality LED custom signs rated with Samsung/Cree chips and UV-stabilized neon flex typically last 50,000+ hours — equivalent to 5-7 years of continuous 24/7 operation with proper maintenance.",
  },
];

export const ARTICLES: Article[] = [
  {
    slug: "installation-guide-custom-business-signs",
    title: "The Ultimate Installation Guide for Custom Business Signs & Channel Letters",
    metaTitle: "How to Install Custom Business Signs | Channel Letter Mounting Guide",
    metaDescription:
      "Learn the professional way to install lighted signs and channel letters. Our engineering guide covers wiring and mounting for high-end commercial business signs.",
    category: "Technical Guides",
    readTime: "12 min read",
    excerpt: "Professional installation techniques for custom business signs and channel letters.",
    isHowTo: true,
    sections: [
      {
        heading: "Pre-Installation Checklist",
        content:
          "Before installing any custom business sign, verify electrical capacity (dedicated 120V/240V circuit as required), wall material (concrete, brick, ACM panel, or stud wall), and local permit requirements. Document all measurements and mark drill points using a laser level for precision alignment.",
      },
      {
        heading: "How to Install Custom Channel Letters",
        content:
          "Custom channel letters typically mount via stud mount (individual letter studs into wall), raceway mount (shared electrical raceway behind letters), or flush mount (letters sit directly on wall surface). Each method requires specific wiring paths — stud mount offers the cleanest look while raceway mount simplifies electrical access for maintenance.",
      },
      {
        heading: "Front-Lit Channel Letters Installation",
        content:
          "Front-lit channel letters require precise face alignment to ensure even illumination. Mount the letter returns first, route low-voltage wiring through the raceway or stud channels, connect to the certified 12V transformer, and perform a 24-hour burn-in test before final sealant application.",
      },
      {
        heading: "Mounting Methods Compared",
        content:
          "Flush mount provides the most architectural integration but requires the most precise wall preparation. Raceway mount is the industry standard for commercial installations — easier maintenance access with a slightly visible raceway. Stud mount creates a floating effect ideal for back-lit halo signs.",
      },
      {
        heading: "Common Installation Mistakes & How to Avoid Them",
        content:
          "The most common errors include insufficient electrical capacity, improper waterproofing at penetration points, and misaligned letter spacing. Always use a template for letter placement, apply silicone sealant at all wall penetrations for outdoor installations, and verify transformer load calculations before energizing.",
      },
    ],
  },
  {
    slug: "304-vs-316-stainless-steel-outdoor-signs",
    title: "304 vs. 316 Stainless Steel: The Best Choice for Custom Outdoor Business Signs",
    metaTitle: "304 vs 316 Stainless Steel for Custom Outdoor Business Signs | Yulux",
    metaDescription:
      "Ensure your custom outdoor business signs never rust. Compare 304 vs 316 stainless steel for maximum durability in coastal and urban environments.",
    category: "Material Science",
    readTime: "10 min read",
    excerpt: "Compare stainless steel grades for maximum outdoor signage durability.",
    sections: [
      {
        heading: "Understanding Stainless Steel Grades",
        content:
          "304 stainless steel contains 18% chromium and 8% nickel, providing excellent corrosion resistance for most urban and inland environments. 316 stainless steel adds 2-3% molybdenum, dramatically improving resistance to chloride corrosion — critical for coastal, marine, and de-icing salt environments.",
      },
      {
        heading: "When to Choose 304 Stainless Steel",
        content:
          "304 stainless steel is the cost-effective choice for inland custom outdoor business signs in urban environments, corporate campuses, and retail locations more than 10 miles from saltwater. It offers decades of corrosion resistance with proper maintenance in these conditions.",
      },
      {
        heading: "When 316 Is Essential",
        content:
          "For coastal properties, marina signage, pool-adjacent installations, and regions with heavy road salt application, 316 stainless steel is the engineering-grade standard. The molybdenum content prevents pitting corrosion that would destroy 304 signs within 3-5 years in these environments.",
      },
      {
        heading: "Maintenance for Longevity",
        content:
          "Both grades benefit from annual cleaning with mild detergent and water to remove environmental deposits. Avoid abrasive cleaners that can damage the passive oxide layer. Yulux applies additional clear-coat protection on all outdoor channel letter returns for extended lifespan.",
      },
    ],
  },
  {
    slug: "front-lit-vs-back-lit-led-custom-signs",
    title: "Front-Lit vs. Back-Lit: Choosing the Best LED Custom Signs for Your Brand",
    metaTitle: "Front-Lit vs Back-Lit LED Custom Signs | Choosing the Right Glow",
    metaDescription:
      "Comparing front-lit and halo-lit LED custom signs? Discover which lighting style maximizes visibility for your business logo and neon sign art.",
    category: "Design Inspiration",
    readTime: "8 min read",
    excerpt: "Compare front-lit and back-lit LED custom signs for your brand identity.",
    sections: [
      {
        heading: "Front-Lit LED Custom Signs",
        content:
          "Front-lit LED custom signs direct illumination through the letter face, creating maximum brightness and legibility. This is the preferred choice for retail storefronts, restaurants, and any application where the sign must compete with ambient light and be readable from 100+ feet.",
      },
      {
        heading: "Back-Lit (Halo) LED Custom Signs",
        content:
          "Back-lit LED custom signs create a soft halo effect around each letter, producing an elegant, architectural glow. Ideal for corporate headquarters, luxury retail, and hospitality brands where sophistication outweighs maximum brightness.",
      },
      {
        heading: "Neon Sign Art Applications",
        content:
          "For neon sign art and decorative applications, flexible LED neon flex offers creative freedom with script fonts and organic shapes. Custom neon LED lights in this category prioritize aesthetic expression over architectural illumination standards.",
      },
      {
        heading: "Making the Right Choice",
        content:
          "Consider your viewing distance, ambient light conditions, brand positioning, and local sign codes. Yulux engineers provide free consultation to recommend the optimal lighting style for your specific application and budget.",
      },
    ],
  },
  {
    slug: "ul-ce-rohs-custom-neon-led-lights",
    title: "UL, CE, and RoHS: Safety Standards for Custom Neon LED Lights",
    metaTitle: "Safety Standards for Custom Neon LED Lights | UL & CE Certified",
    metaDescription:
      "Why certified power supplies matter for custom neon led lights. Learn about UL, CE, and RoHS compliance to ensure your led light signs are safe and reliable.",
    category: "Technical Guides",
    readTime: "9 min read",
    excerpt: "Understanding UL, CE, and RoHS compliance for LED signage safety.",
    sections: [
      {
        heading: "Why Certification Matters",
        content:
          "Uncertified LED power supplies pose fire and electrical shock risks in commercial installations. UL (Underwriters Laboratories), CE (Conformité Européenne), and RoHS (Restriction of Hazardous Substances) certifications verify that custom neon LED lights meet rigorous safety and environmental standards.",
      },
      {
        heading: "UL Certification Explained",
        content:
          "UL-listed transformers and LED drivers have been tested for fire safety, electrical insulation, and thermal performance. Many municipalities require UL-listed components for commercial sign permits — using uncertified parts can void insurance coverage.",
      },
      {
        heading: "CE and RoHS for Global Markets",
        content:
          "CE marking indicates compliance with European safety directives, essential for EU installations. RoHS restricts hazardous substances (lead, mercury, cadmium) in electronic components — ensuring your led light signs are environmentally responsible and safe for indoor environments.",
      },
      {
        heading: "Yulux Certification Standards",
        content:
          "Every Yulux sign ships with CE, UL, and RoHS certified 12V transformers. We maintain documentation for all certifications, supporting permit applications and commercial insurance requirements worldwide.",
      },
    ],
  },
  {
    slug: "led-sign-repair-maintenance-guide",
    title: "Maintenance & Repair: How to Fix and Clean Your LED Sign for Longevity",
    metaTitle: "LED Sign Repair & Maintenance Guide | Extend Your Sign's Life",
    metaDescription:
      "Looking for neon light sign repair tips? Learn how to maintain your led sign, clean neon fonts, and ensure a 50,000-hour lifespan with our expert guide.",
    category: "Maintenance & Repair",
    readTime: "11 min read",
    excerpt: "Expert tips for LED sign repair, cleaning, and long-term maintenance.",
    sections: [
      {
        heading: "Routine Cleaning for LED Signs",
        content:
          "Clean your LED sign monthly with a soft, lint-free cloth and mild soap solution. Avoid ammonia-based cleaners that can yellow acrylic faces and degrade silicone neon flex tubing. For outdoor signs, increase cleaning frequency to bi-weekly in dusty or coastal environments.",
      },
      {
        heading: "Neon Light Sign Repair Basics",
        content:
          "If sections of your neon light sign stop illuminating, first check the power connection and transformer LED indicator. Loose wiring at connection points is the most common cause — carefully inspect junction points before assuming LED failure. Never attempt repairs on energized circuits.",
      },
      {
        heading: "Fixing Neon Fonts and Sections",
        content:
          "Individual neon font sections can often be replaced without replacing the entire sign. Document the failed section location and contact Yulux support with your order number for compatible replacement modules. DIY soldering on silicone neon flex requires specialized equipment.",
      },
      {
        heading: "Extending Your 50,000-Hour Lifespan",
        content:
          "Use the included dimmer to reduce brightness during off-peak hours — operating at 70% brightness can extend LED lifespan by 40%+. Ensure adequate ventilation around transformers, protect outdoor signs from direct water spray, and schedule annual professional inspections for commercial installations.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);
