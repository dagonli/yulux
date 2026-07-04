export type ProductVariant = {
  color: "Warm White" | "Pink";
  images: string[];
};

export type Product = {
  slug: string;
  name: string;
  title: string;
  hook: string;
  bullets: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  price: number;
  scene: string;
  colors: string[];
  image: string;
  alt: string;
  variants: ProductVariant[];
  relatedHref?: string;
  relatedLabel?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "better-together-wedding-neon-sign",
    name: "Better Together",
    title: "Better Together LED Neon Sign - Premium Wedding Neon Sign & Romantic Room Decor Wall Light",
    hook:
      'Make your special day unforgettable. The "Better Together" neon sign creates a magical, romantic glow perfect for weddings, engagement parties, and a lifetime of bedroom bliss.',
    bullets: [
      "The Ultimate Wedding Icon: Elevate your wedding backdrop with the classic statement piece that pairs beautifully with florals and greenery.",
      "Romantic Home Keepsake: Transition this gorgeous light from your wedding venue straight into your master bedroom for a permanent romantic reminder.",
      "Adjustable Radiance: Features a free smart dimmer to adjust brightness from a soft, intimate glow to vibrant party lighting.",
      "Safe & Durable: Powered by low voltage 12V LED technology, remaining completely cool to the touch with zero noise or risk of breakage.",
    ],
    metaTitle: "Better Together Wedding Neon Sign | Yulux Signs",
    metaDescription:
      'Shop our "Better Together" neon sign. Perfect for weddings, engagement parties & home decor. Premium LED, 2-year warranty, free global shipping. Order now!',
    keywords: "wedding neon sign, wedding quotes, led wedding signs, wedding signage, personalized neon",
    price: 189,
    scene: "Wedding / Engagement",
    colors: ["Warm White", "Pink"],
    image: "/images/products/better-together-white-main.png",
    alt: "Better Together LED Neon Sign - Pink Glow on White Brick Wall",
    variants: [
      {
        color: "Warm White",
        images: [
          "/images/products/better-together-white-main.png",
          "/images/products/better-together-white-wedding.png",
          "/images/products/better-together-white-bedroom.png",
          "/images/products/better-together-white-day-night.png",
        ],
      },
      {
        color: "Pink",
        images: [
          "/images/products/better-together-pink-main.png",
          "/images/products/better-together-pink-wedding.png",
          "/images/products/better-together-pink-bedroom.png",
          "/images/products/better-together-pink-day-night.png",
        ],
      },
    ],
    relatedHref: "/products/good-vibes-only-neon-sign",
    relatedLabel: "Wedding Neon Signs Collection",
  },
  {
    slug: "good-vibes-only-neon-sign",
    name: "Good Vibes Only",
    title: "Good Vibes Only Neon Sign - Dimmable LED Neon Lights for Bedroom, Aesthetic Room Decor & Studio",
    hook:
      'Manifest positivity every day! The "Good Vibes Only" neon sign instantly transforms any dark or dull corner into a vibrant, mood-boosting sanctuary.',
    bullets: [
      "Instant Room Transformation: The perfect aesthetic addition to level up your bedroom, living room, dorm, or workspace.",
      "Premium Silicon LED: Crafted with high-grade flexible silicone LED strips and a crystal-clear acrylic backplate for a sleek, modern look.",
      "Energy Efficient & Quiet: Enjoy 50,000+ hours of bright, energy-saving light with zero buzzing or overheating — perfect as a nightlight.",
      "Ready Out of the Box: Pre-drilled holes and complete hanging hardware make installation on any wall quick and effortless.",
    ],
    metaTitle: "Good Vibes Only Neon Sign | Yulux Signs",
    metaDescription:
      'Brighten your space with a "Good Vibes Only" neon sign. Ideal for bedrooms, studios & gifts. Dimmable LED, safe & durable. Get yours with free shipping!',
    keywords: "good vibes only neon sign, neon signs for bedroom, neon lights for bedroom, led neon sign, aesthetic room decor",
    price: 169,
    scene: "Bedroom / Studio",
    colors: ["Warm White", "Pink"],
    image: "/images/products/good-vibes-white-main.png",
    alt: "Good Vibes Only neon sign showing high-quality silicone tubing in bedroom",
    variants: [
      {
        color: "Warm White",
        images: [
          "/images/products/good-vibes-white-main.png",
          "/images/products/good-vibes-white-bedroom.png",
          "/images/products/good-vibes-white-studio.png",
          "/images/products/good-vibes-white-day-night.png",
        ],
      },
      {
        color: "Pink",
        images: [
          "/images/products/good-vibes-pink-main.png",
          "/images/products/good-vibes-pink-bedroom.png",
          "/images/products/good-vibes-pink-studio.png",
          "/images/products/good-vibes-pink-day-night.png",
        ],
      },
    ],
    relatedHref: "/products/this-must-be-the-place-neon-sign",
    relatedLabel: "Bedroom Neon Collection",
  },
  {
    slug: "this-must-be-the-place-neon-sign",
    name: "This Must Be The Place",
    title: "This Must Be The Place Neon Sign - Aesthetic LED Neon Signs for Home Decor & Living Room Wall Art",
    hook:
      "Welcome home to comfort. This timeless statement piece radiates a warm, welcoming energy, making it the ultimate centerpiece for your living room, hallway, or entryway.",
    bullets: [
      "The Ultimate Cozy Vibe: Adds an inviting, cozy, and high-end aesthetic to your home that will have all your guests asking where you got it.",
      "Perfect Housewarming Gift: An exceptional and trendy gift for friends or family moving into a new apartment or renovating their home.",
      "Crystal Clear Acrylic Backing: Cut-to-shape transparent acrylic backing blends seamlessly into any wall color or wallpaper.",
      "Smart Dimming Control: Easily lower the brightness for a cozy movie night or turn it up to full power to brighten the entire room.",
    ],
    metaTitle: "This Must Be The Place Neon Sign | Yulux Signs",
    metaDescription:
      'Elevate your home with "This Must Be The Place" neon sign. A timeless statement piece for living rooms & entryways. Premium quality LED neon. Shop today!',
    keywords: "neon signs for home, custom neon signs for home decor, living room wall decor, aesthetic neon light",
    price: 179,
    scene: "Living Room / Entryway",
    colors: ["Warm White", "Pink"],
    image: "/images/products/this-must-be-white-main.png",
    alt: "This Must Be The Place neon sign in living room wall decor setting",
    variants: [
      {
        color: "Warm White",
        images: [
          "/images/products/this-must-be-white-main.png",
          "/images/products/this-must-be-white-living-room.png",
          "/images/products/this-must-be-white-day-night.png",
        ],
      },
      {
        color: "Pink",
        images: [
          "/images/products/this-must-be-pink-main.png",
          "/images/products/this-must-be-pink-living-room.png",
          "/images/products/this-must-be-pink-day-night.png",
        ],
      },
    ],
    relatedHref: "/products/good-vibes-only-neon-sign",
    relatedLabel: "Home Decor Neon Collection",
  },
  {
    slug: "cheers-neon-bar-sign",
    name: "Cheers!",
    title: "Cheers! LED Neon Bar Sign - Vivid Neon Lights for Home Bar, Kitchen, Party Decor & Man Cave",
    hook:
      'It\'s always happy hour somewhere! Light up your home bar, man cave, or kitchen with the vibrant "Cheers!" neon sign and kick off the party in style.',
    bullets: [
      "Elevate Your Entertainment: Bring the authentic, high-energy commercial bar vibe right into your private home bar, dining area, or man cave.",
      "Compact & High Impact: Designed with a sleek, one-word punchy layout that fits perfectly into small spaces while delivering maximum brightness.",
      "100% Safe LED Technology: No fragile glass, no toxic gases, and no heat — making it safe to leave turned on all night next to your drinks.",
      "Plug and Play: Comes with a global 12V power adapter and hanging chain so you can start the happy hour celebrations immediately.",
    ],
    metaTitle: "Cheers! Neon Bar Sign | Yulux Signs",
    metaDescription:
      'Get the party started with a "Cheers!" neon sign. Perfect for home bars, kitchens & man caves. High-impact, energy-efficient LED neon. Fast global delivery.',
    keywords: "bar signs, bar sign, neon bar signs, neon bar sign, custom home bar sign",
    price: 149,
    scene: "Home Bar / Man Cave",
    colors: ["Warm White", "Pink"],
    image: "/images/products/cheers-white-main.png",
    alt: "Cheers LED neon bar sign for home bar and kitchen party decor",
    variants: [
      {
        color: "Warm White",
        images: [
          "/images/products/cheers-white-main.png",
          "/images/products/cheers-white-bar.png",
          "/images/products/cheers-white-day-night.png",
        ],
      },
      {
        color: "Pink",
        images: [
          "/images/products/cheers-pink-main.png",
          "/images/products/cheers-pink-bar.png",
          "/images/products/cheers-pink-day-night.png",
        ],
      },
    ],
    relatedHref: "/custom-neon-signs",
    relatedLabel: "Custom Bar Signs",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const PRODUCT_SLUGS = PRODUCTS.map((p) => p.slug);
