export const SITE = {
  name: "Yulux Sign",
  url: "https://yuluxsign.com",
  description:
    "Precision-crafted 3D channel letters & custom LED neon signs for global businesses.",
  email: "hello@yuluxsign.com",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Neon Collection",
    href: "/shop-neon",
    children: [
      { label: "Better Together", href: "/products/better-together-wedding-neon-sign" },
      { label: "Cheers", href: "/products/cheers-neon-bar-sign" },
      { label: "Good Vibes Only", href: "/products/good-vibes-only-neon-sign" },
      { label: "This Must Be The Place", href: "/products/this-must-be-the-place-neon-sign" },
    ],
  },
  {
    label: "Design Your Own Neon",
    children: [
      { label: "Design Your Text Neon", href: "/custom-neon-signs" },
      { label: "Upload Your Logo Neon", href: "/custom-neon-logo" },
    ],
  },
  {
    label: "Business Signs",
    href: "/channel-letters-logos",
    children: [
      { label: "Channel Letters", href: "/channel-letters-logos" },
      { label: "Light Box", href: "/custom-lightbox-signs" },
    ],
  },
  { label: "About us", href: "/about" },
  { label: "The Signage Lab", href: "/signage-lab" },
] as const;

export const FOOTER_LINKS = {
  products: [
    { label: "Better Together", href: "/products/better-together-wedding-neon-sign" },
    { label: "Cheers", href: "/products/cheers-neon-bar-sign" },
    { label: "Good Vibes Only", href: "/products/good-vibes-only-neon-sign" },
    { label: "This Must Be The Place", href: "/products/this-must-be-the-place-neon-sign" },
    { label: "Business Signs", href: "/channel-letters-logos" },
  ],
  resources: [
    { label: "Installation Guide", href: "/signage-lab/installation-guide-custom-business-signs" },
    { label: "304 vs 316 Stainless Steel", href: "/signage-lab/304-vs-316-stainless-steel-outdoor-signs" },
    { label: "Front-Lit vs Back-Lit", href: "/signage-lab/front-lit-vs-back-lit-led-custom-signs" },
    { label: "UL, CE & RoHS Standards", href: "/signage-lab/ul-ce-rohs-custom-neon-led-lights" },
    { label: "Maintenance Guide", href: "/signage-lab/led-sign-repair-maintenance-guide" },
  ],
  company: [
    { label: "About us", href: "/about" },
    { label: "Get a Quote", href: "/get-a-quote" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const MATERIAL_QUALITY = [
  {
    title: "High-Efficiency LED Neon Flex",
    description:
      "We use premium, UV-stabilized flexible LED tubing that ensures a 100% uniform glow without any hot spots. Engineered for longevity, our neon flex is rated for 50,000+ hours of brilliance, remaining cool to the touch even after 24/7 operation.",
    tags: ["Uniform Glow", "UV-Stabilized", "50,000+ Hours Lifespan"],
    alt: "High-efficiency UV-stabilized LED neon flex tubing - Yulux Sign",
  },
  {
    title: "Commercial-Grade Acrylic",
    description:
      "Every sign is mounted on a high-density, 5mm-8mm commercial-grade acrylic backboard. Precision laser-cut for smooth, polished edges, our backboards are available in crystal clear, sleek black, or custom tinted finishes.",
    tags: ["5mm-8mm Thickness", "Laser-Cut Precision", "Multiple Finishes"],
    alt: "5mm commercial-grade clear acrylic backboard for custom signs",
  },
  {
    title: "Certified Power & Safety Systems",
    description:
      "Safety is our priority. All Yulux signs are powered by CE, UL, and RoHS certified 12V transformers. We use reinforced, transparent wiring and high-quality connectors for a discreet look and secure, flicker-free power supply worldwide.",
    tags: ["12V Low Voltage", "CE/UL/RoHS", "Reinforced Wiring"],
    alt: "CE and UL certified 12V power transformer for LED neon signs",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Design & Submit",
    description:
      "Use our intuitive online customizer to design your text in seconds, or upload your business logo via our inquiry form. Tell us your vision, preferred size, and installation environment.",
    highlight: "Intuitive Tools & Easy Uploads",
  },
  {
    step: 2,
    title: "Technical Review & Free Mockup",
    description:
      "Our engineering team reviews every detail. Within 24 hours, you will receive a free professional technical drawing showing exact dimensions, wiring paths, and color rendering for your final approval.",
    highlight: "Free Professional Mockup within 24h",
  },
  {
    step: 3,
    title: "Handcraft & Global Express",
    description:
      "Once approved, our master craftsmen begin the 100% handmade production process. After a rigorous 24-hour light test, your sign is securely packaged and shipped via DHL/FedEx express with full insurance.",
    highlight: "100% Handcrafted & Insured Express Shipping",
  },
] as const;

export const PRODUCT_TEMPLATE = {
  specs: [
    "Safe 12V low voltage — safe to touch, harmless to children and pets",
    "Flexible silicone LED tubing — no fragile glass, no toxic gases",
    "50,000+ hour lifespan with low energy consumption",
    "Completely silent operation — no buzzing noise",
  ],
  whatsInBox: [
    "1 × Premium LED Neon Sign",
    "1 × 12V Power Adapter & Plug",
    "1 × Smart Dimmer Switch",
    "1 × Complete Installation Kit (hanging chain & mounting screws)",
  ],
  installSteps: [
    { step: 1, title: "Unpack", description: "Unbox your neon sign and accessories." },
    { step: 2, title: "Mount", description: "Hang with the included chain or mount with screws (pre-drilled holes included)." },
    { step: 3, title: "Plug & Play", description: "Connect the dimmer and power adapter, then enjoy the glow!" },
  ],
  faq: [
    {
      question: "Can I use this sign outdoors?",
      answer:
        "The default version is indoor-rated. For full outdoor waterproofing, contact our team for a custom quote tailored to your installation environment.",
    },
    {
      question: "Can I adjust the brightness?",
      answer:
        "Yes. Every product includes a free smart dimmer switch for adjustable brightness from soft ambient glow to full party mode.",
    },
    {
      question: "Will the brightness reset when I unplug it?",
      answer:
        "No. The smart dimmer has memory function and retains your preferred brightness setting after power cycles.",
    },
    {
      question: "How long is the lifespan of a Yulux custom LED neon sign?",
      answer:
        "Our custom LED neon signs are engineered for longevity, featuring high-efficiency LEDs with a lifespan of over 50,000 hours. Unlike traditional glass neon, our LED custom signs are shatter-resistant and maintain consistent brightness for years of commercial use.",
    },
    {
      question: "Can you create a custom neon sign from my business logo?",
      answer:
        "Absolutely. As a professional neon sign maker, we specialize in transforming complex business logos into stunning neon art. Simply upload your vector file, and our engineering team will provide a free technical drawing to ensure every detail is captured perfectly.",
    },
    {
      question: "Are Yulux signs energy-efficient and safe for commercial environments?",
      answer:
        "Yes. Our factory-direct LED neon signs consume up to 80% less energy than traditional glass neon. They operate on a low-voltage 12V system, making them cool to the touch and safe for high-traffic areas. All power supplies are CE, UL, and RoHS certified.",
    },
  ],
  crossSell:
    "Didn't find your favorite words? Need a different size, font, or want to light up your own logo?",
  crossSellCta: "Customize Your Own Neon Sign Instantly",
  crossSellHref: "/custom-neon-signs",
} as const;
