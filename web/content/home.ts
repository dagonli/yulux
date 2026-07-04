export const HOME_META = {
  title: "Custom LED Neon Signs & 3D Channel Letters | Yulux Signs",
  description:
    "Elevate your brand with precision-crafted 3D channel letters & custom neon signs. Engineering-grade signage solutions for global businesses. 1,000+ real-world projects. Get a free quote!",
  keywords:
    "custom neon signs, 3D channel letters, business logo neon, illuminated signs, custom led signs, light box sign",
  ogImage: "https://www.yuluxsigns.com/images/og-cover.webp",
};

export const HERO = {
  h1: "Elevate Your Brand with Precision-Crafted Illumination",
  subhead:
    "From high-end 3D channel letters to bespoke neon art, Yulux Signs delivers durable, engineering-grade signage solutions for global businesses and creative spaces.",
  ctas: [
    { label: "Design Your Own", href: "/custom-neon-signs", variant: "primary" as const },
    { label: "Get a Free Quote", href: "/get-a-quote", variant: "secondary" as const },
    { label: "Illuminated Signage", href: "/channel-letters-logos", variant: "secondary" as const },
  ],
  trustStrip: "Trusted by 1,000+ businesses worldwide · 10+ Years of Engineering Experience · 2-Year Warranty",
  image: "/images/hero-background.png",
  imageAlt: "Purple back-lit 3D channel letter signage illuminated at night for luxury retail storefront",
};

export const PRODUCT_FINDER = {
  h2: "What Are You Looking For?",
  cards: [
    {
      title: "Custom Neon",
      description:
        "Bring your words to life. Use our online editor to create your personalized neon sign in seconds.",
      cta: "Create Your Own",
      href: "/custom-neon-signs",
      image: "/images/finder-custom-neon.png",
      alt: "Custom neon business logo sign glowing in modern office",
    },
    {
      title: "Neon Collections",
      description:
        "Explore our curated sets of artistic neon decor — from wedding quotes to bar and game-room classics, ready to ship.",
      cta: "Shop Collections",
      href: "/shop-neon",
      image: "/images/finder-neon-collections.png",
      alt: "Better Together pink neon sign for wedding reception decor",
    },
    {
      title: "3D Channel Letters",
      description:
        "High-end architectural signage. Choose from Front-Lit, Back-Lit, or Halo-Lit finishes for maximum storefront visibility.",
      cta: "Explore Craft",
      href: "/channel-letters-logos",
      image: "/images/finder-channel-letters.png",
      alt: "Purple back-lit 3D channel letter sign rendering",
    },
    {
      title: "Lightbox Signs",
      description:
        "Slim, even, all-day illumination for storefronts and exhibitions — the reliable workhorse of commercial signage.",
      cta: "View Light Box Signs",
      href: "/custom-lightbox-signs",
      image: "/images/finder-lightbox.png",
      alt: "Custom LED light box sign mounted above retail storefront entrance",
    },
  ],
};

export const CRAFTSMANSHIP_LAB = {
  h2: "The Craftsmanship Lab",
  subhead:
    "Precision engineering meets artistic illumination. Explore our signature lighting techniques to find the perfect glow for your brand.",
  techniques: [
    {
      id: "front-lit",
      label: "Front-Lit",
      subLabel: "High Visibility",
      definition:
        "Front-Lit letters are illuminated directly from the face, producing a bright, uniform glow that maximizes visibility from a distance — the most common choice for storefront signage.",
      image: "/images/craft-front-lit.png",
      alt: "Front-Lit purple letter Y sample showing direct illumination",
    },
    {
      id: "side-lit",
      label: "Side-Lit",
      subLabel: "Modern Depth",
      definition:
        "Side-Lit letters emit light from the edges only, creating a sleek halo outline around each letter for a refined, modern architectural look.",
      image: "/images/craft-side-lit.png",
      alt: "Side-Lit illuminated lettering for modern business branding",
    },
    {
      id: "back-lit",
      label: "Back-Lit",
      subLabel: "Premium Halo",
      definition:
        "Back-Lit (halo-lit) letters are illuminated from behind, casting a soft glow against the mounting wall — a premium effect favored by upscale brands and hospitality venues.",
      image: "/images/craft-back-lit.png",
      alt: "Premium Back-Lit Halo Effect Signage - Architectural Grade",
    },
    {
      id: "jelly-lit",
      label: "Jelly-Lit",
      subLabel: "Luscious Glow",
      definition:
        "Jelly-Lit signs use a translucent acrylic face that diffuses light evenly across the entire surface, giving letters a soft, glossy, 'jelly-like' finish popular in retail and cafe branding.",
      image: "/images/craft-jelly-lit.png",
      alt: "Jelly-Lit resin neon sign with luscious glow texture",
    },
    {
      id: "full-lit",
      label: "Full-Lit",
      subLabel: "360° Illumination",
      definition:
        "Full-lit signs combine front and side illumination for a bold, seamless glow. High-grade translucent acrylic on both face and returns creates a voluminous, ultra-bright effect from every angle.",
      image: "/images/craft-full-lit.png",
      alt: "Full-Lit purple Y letter showing 360 degree illumination",
    },
    {
      id: "non-lit",
      label: "Non-Lit",
      subLabel: "Pure Texture",
      definition:
        "Non-Lit letters rely purely on material finish and dimensional form rather than illumination, ideal for daytime branding, interior lobby walls, and budget-conscious projects.",
      image: "/images/craft-non-lit.png",
      alt: "Professional non-lit white letter Y with pure texture",
    },
  ],
  cta: { label: "Get a free quote in 24h", href: "/get-a-quote" },
};

export const INSPIRATION_GALLERY = {
  h2: "Signs in the Wild: Inspiration Gallery",
  subhead:
    "See how our custom signage transforms spaces across industries — from retail storefronts to wedding receptions.",
  categories: [
    { id: "retail", label: "Retail & Shopfronts" },
    { id: "corporate", label: "Corporate Branding" },
    { id: "events", label: "Events & Weddings" },
    { id: "hospitality", label: "Hospitality" },
  ],
  items: [
    { id: "retail-1", category: "retail", alt: "Custom front-lit channel letters for luxury retail storefront", href: "/channel-letters-logos", image: "/images/image3.png" },
    { id: "retail-2", category: "retail", alt: "Illuminated lightbox sign for boutique retail shop", href: "/custom-lightbox-signs", image: "/images/image5.png" },
    { id: "corporate-1", category: "corporate", alt: "Backlit company logo sign mounted in modern office reception", href: "/channel-letters-logos", image: "/images/image1.png" },
    { id: "corporate-2", category: "corporate", alt: "Custom business logo neon for modern office branding", href: "/custom-neon-logo", image: "/images/image4.png" },
    { id: "events-1", category: "events", alt: "Pink neon Better Together sign displayed at wedding reception table", href: "/products/better-together-wedding-neon-sign", image: "/images/image2.png" },
    { id: "events-2", category: "events", alt: "Good Vibes Only neon sign for wedding reception decor", href: "/products/good-vibes-only-neon-sign", image: "/images/image2.png" },
    { id: "hospitality-1", category: "hospitality", alt: "Custom neon bar sign glowing above restaurant counter at night", href: "/products/cheers-neon-bar-sign", image: "/images/image6.png" },
    { id: "hospitality-2", category: "hospitality", alt: "Side-lit channel letters for boutique hotel entrance", href: "/channel-letters-logos", image: "/images/image5.png" },
  ],
  viewAll: { label: "View All Projects", href: "/gallery" },
};

export const REAL_WORLD_PROJECTS = {
  h2: "Real-World Projects: Our Global Footprint",
  subhead: "From factory floor to global storefront — authentic craftsmanship, delivered worldwide.",
  projects: [
    {
      slug: "blue-cafe-logo-sign",
      name: "Blue Cafe Logo Sign",
      craft: "Back-lit Stainless Steel Channel Letters",
      location: "Manchester, United Kingdom",
      caption: "Recent project: Custom neon sign for a boutique cafe in Manchester.",
      description: "Precision-engineered back-lit stainless steel signage, creating a sleek halo glow that amplifies brand presence for this boutique Manchester cafe.",
      href: "/channel-letters-logos",
      image: "/images/image1.png",
      alt: "Back-lit stainless steel channel letter logo sign, Blue Cafe, Manchester UK",
    },
    {
      slug: "riverside-boutique-hotel",
      name: "Riverside Boutique Hotel Sign",
      craft: "Front-Lit 3D Acrylic Letters",
      location: "Austin, Texas, USA",
      caption: "Recent project: Front-lit channel letters for a boutique hotel in Austin.",
      description: "Bold front-lit 3D acrylic channel letters delivering maximum daytime and nighttime visibility for this upscale Austin hospitality brand.",
      href: "/channel-letters-logos",
      image: "/images/image3.png",
      alt: "Front-lit 3D acrylic channel letters for boutique hotel, Austin Texas",
    },
    {
      slug: "hayes-wedding-better-together",
      name: "Hayes Family Wedding 'Better Together'",
      craft: "Custom Pink LED Neon Flex",
      location: "Sydney, Australia",
      caption: "Recent project: Custom neon sign for a wedding in Sydney.",
      description: "Romantic bespoke pink LED neon flex sign, hand-crafted to create the perfect warm glow for an unforgettable Sydney wedding backdrop.",
      href: "/products/better-together-wedding-neon-sign",
      image: "/images/image2.png",
      alt: "Better Together pink LED neon wedding sign, Sydney Australia",
    },
    {
      slug: "downtown-bar-cheers",
      name: "Downtown Bar 'Cheers!'",
      craft: "Custom LED Neon Bar Sign",
      location: "Berlin, Germany",
      caption: "Recent project: Neon bar sign for a home bar in Berlin.",
      description: "High-impact LED neon bar sign with vivid color saturation, engineered to elevate the atmosphere of this private Berlin entertainment space.",
      href: "/products/cheers-neon-bar-sign",
      image: "/images/image6.png",
      alt: "Cheers LED neon bar sign for home bar, Berlin Germany",
    },
    {
      slug: "tech-startup-office",
      name: "Tech Startup Office Logo",
      craft: "Custom Business Logo Neon",
      location: "San Francisco, USA",
      caption: "Recent project: Business logo neon for a tech startup office.",
      description: "Custom-shaped logo neon translating complex brand geometry into a clean, authoritative illuminated statement for a leading San Francisco tech firm.",
      href: "/custom-neon-logo",
      image: "/images/image4.png",
      alt: "Custom business logo neon sign for tech startup office, San Francisco",
    },
    {
      slug: "luxury-retail-lightbox",
      name: "Luxury Retail Lightbox",
      craft: "Custom Illuminated Lightbox",
      location: "London, United Kingdom",
      caption: "Recent project: Custom lightbox sign for luxury retail storefront.",
      description: "Slim-profile LED lightbox delivering flawless, even illumination across this London luxury retailer's storefront — all day, every day.",
      href: "/custom-lightbox-signs",
      image: "/images/image5.png",
      alt: "Custom illuminated lightbox for luxury retail storefront, London UK",
    },
  ],
  viewAll: { label: "View All Projects", href: "/gallery" },
};

export const HOME_TRUST = {
  h2: "Why Global Brands Choose Yulux Signs",
  seoText:
    "As a leading provider of custom LED neon signs and 3D channel letters, Yulux Signs combines architectural-grade engineering with artistic design. Whether you need a business logo neon or large-scale outdoor signage, our team ensures every project meets the highest standards of durability and brilliance.",
};

export const HOME_FAQ = {
  h2: "Frequently Asked Questions",
  items: [
    {
      question: "How long is the production and shipping time?",
      answer:
        "Production typically takes 7-10 business days. We use premium express shipping (DHL/FedEx), which takes another 3-5 days to reach most global locations.",
    },
    {
      question: "Can you replicate my complex business logo exactly?",
      answer:
        "Absolutely. Our engineering team specializes in translating complex brand identities into 3D channel letters or neon art while maintaining 100% brand consistency.",
    },
    {
      question: "Is the installation process complicated for these signs?",
      answer:
        "While professional installation is recommended for large-scale signage, we streamline the process for your team or contractors. Every order includes a 1:1 full-scale mounting template, a heavy-duty architectural mounting kit, and a detailed wiring diagram. Our engineering team also provides remote technical support to ensure a precise and secure architectural integration.",
    },
    {
      question: "What happens if my sign arrives damaged?",
      answer:
        "Every order ships fully insured. If your sign arrives damaged, contact our team within 48 hours with photos and we will arrange a free replacement or repair at no extra cost.",
    },
    {
      question: "Do you offer custom sizing for different spaces?",
      answer:
        "Yes. Every sign is made to order. Simply share your space dimensions during the quote process, and our team will recommend the optimal size for maximum visual impact.",
    },
  ],
};

export const FINAL_CTA = {
  h2: "Ready to Illuminate Your Brand?",
  subhead: "Join hundreds of businesses worldwide. Get your free technical drawing and quote today.",
  cta: { label: "Request a Custom Quote", href: "/get-a-quote" },
};
