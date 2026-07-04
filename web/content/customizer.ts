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

export const FONT_CATEGORIES = {
  script: ["Pacifico", "Dancing Script", "Great Vibes"],
  sans: ["Montserrat", "Roboto", "Bebas Neue"],
  retro: ["Press Start 2P", "Bungee", "Righteous"],
} as const;

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
