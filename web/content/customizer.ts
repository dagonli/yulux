export const CUSTOMIZER_META = {
  title: "Custom Neon Signs | Design Online or Upload Your Logo | Yulux Signs",
  description:
    "Create your custom neon sign in seconds with our online designer or upload your business logo for a professional quote. Engineering-grade quality, 24h response, and global shipping.",
};

export const LOGO_META = {
  title: "Custom Neon Logo & Business Neon Sign Quote | Yulux Signs",
  description:
    "Upload your business logo for a professional neon sign quote. Engineering-grade quality, 24h response, and global shipping.",
};

export const CUSTOMIZER_HEADER = {
  h1: "Custom LED Neon Signs | Design Online, Upload Logo & Premium Materials",
  h2: "Whether you want to create a personalized text sign in seconds or transform your brand logo into a glowing masterpiece, our Customization Hub has you covered.",
};

export const NEON_COLORS = [
  { id: "purple", label: "Purple", hex: "#a855f7", class: "neon-glow-purple" },
  { id: "pink", label: "Pink", hex: "#ec4899", class: "neon-glow-pink" },
  { id: "white", label: "Warm White", hex: "#fef3c7", class: "neon-glow-white" },
  { id: "cyan", label: "Cyan", hex: "#22d3ee", class: "neon-glow-cyan" },
  { id: "red", label: "Red", hex: "#ef4444", class: "neon-glow-pink" },
  { id: "green", label: "Green", hex: "#22c55e", class: "neon-glow-cyan" },
  { id: "blue", label: "Blue", hex: "#3b82f6", class: "neon-glow-cyan" },
  { id: "orange", label: "Orange", hex: "#f97316", class: "neon-glow-white" },
  { id: "yellow", label: "Yellow", hex: "#eab308", class: "neon-glow-white" },
  { id: "warm-pink", label: "Warm Pink", hex: "#f472b6", class: "neon-glow-pink" },
  { id: "lavender", label: "Lavender", hex: "#c084fc", class: "neon-glow-purple" },
  { id: "ice-blue", label: "Ice Blue", hex: "#67e8f9", class: "neon-glow-cyan" },
] as const;

export const FONTS = [
  { id: "amsterdam", label: "Amsterdam", family: "'Amsterdam', cursive" },
  { id: "signatica", label: "Signatica", family: "'Signatica', cursive" },
  { id: "sacramento", label: "Sacramento", family: "'Sacramento', cursive" },
  { id: "great-vibes", label: "Great Vibes", family: "'Great Vibes', cursive" },
  { id: "montserrat", label: "Montserrat", family: "'Montserrat', sans-serif" },
  { id: "poppins", label: "Poppins", family: "'Poppins', sans-serif" },
  { id: "oswald", label: "Oswald", family: "'Oswald', sans-serif" },
  { id: "quicksand", label: "Quicksand", family: "'Quicksand', sans-serif" },
  { id: "monoton", label: "Monoton", family: "'Monoton', display" },
  { id: "bungee", label: "Bungee", family: "'Bungee', display" },
  { id: "pacifico", label: "Pacifico", family: "'Pacifico', cursive" },
  { id: "righteous", label: "Righteous", family: "'Righteous', display" },
] as const;

export const PREVIEW_BACKGROUNDS = [
  { id: "black", label: "Pure Black", class: "bg-black" },
  { id: "brick", label: "Brick Wall", class: "bg-[#3d2b2b]" },
  { id: "living", label: "Living Room", class: "bg-[#2d2a26]" },
  { id: "office", label: "Office", class: "bg-[#1a1f2e]" },
] as const;

export const BACKING_OPTIONS = [
  { id: "cut-to-shape", label: "Cut to Shape", description: "Recommended — follows text outline" },
  { id: "whole-board", label: "Whole Board", description: "Rectangular acrylic backing" },
  { id: "invisible", label: "Invisible", description: "Minimal strip backing" },
] as const;

export const ENVIRONMENT_OPTIONS = [
  { id: "indoor", label: "Indoor", multiplier: 1 },
  { id: "outdoor", label: "Outdoor Waterproof", multiplier: 1.35 },
] as const;

export const CUSTOMIZER_SEO_TEXT =
  "Design your own neon sign in minutes! Our advanced neon sign maker allows you to preview fonts, colors, and backing types in real-time, matching your unique space perfectly.";

export const LOGO_FORM_FIELDS = {
  successTitle: "Thank You — We've Received Your Request",
  successMessage:
    "Our senior design team will contact you within 24 hours with a free professional mockup and custom quote.",
};

export const CUSTOM_NEON_FAQ = {
  h2: "Frequently Asked Questions",
  items: [
    {
      question: "What is the typical lead time for a custom project?",
      answer:
        "Our streamlined process ensures production in 3-5 business days. With global express shipping, most clients receive their custom signs within 10-14 days from design approval.",
    },
    {
      question: "Is professional installation required?",
      answer:
        'No. Our signs are designed for "Plug-and-Play" simplicity. Each unit comes with a 1:1 installation template and a complete mounting kit (screws or hanging wires) for effortless setup.',
    },
    {
      question: "Can you provide weatherproofing for outdoor environments?",
      answer:
        'Absolutely. We offer IP67-rated waterproofing for all our neon and channel letter products. Simply specify "Outdoor Use" during customization or in your inquiry.',
    },
    {
      question: "Do you offer bulk discounts for corporate or wholesale orders?",
      answer:
        "Yes. We specialize in B2B partnerships and offer competitive tiered pricing for bulk orders, franchise rollouts, and wholesale distributions.",
    },
  ],
};
