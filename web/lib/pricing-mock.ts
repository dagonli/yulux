export type CustomizerOptions = {
  text: string;
  fontCategory: "script" | "sans" | "retro";
  colorId: string;
  backingId: string;
  environmentId: "indoor" | "outdoor";
};

const BASE_PRICE = 89;
const CHAR_PRICE = 12;
const FONT_MULTIPLIERS = { script: 1.2, sans: 1.0, retro: 1.15 };
const BACKING_FEES = { "cut-to-shape": 0, "whole-board": 15, invisible: 25 };
const ENV_MULTIPLIERS = { indoor: 1, outdoor: 1.35 };

export function calculateMockPrice(options: CustomizerOptions): number {
  const charCount = Math.max(options.text.trim().length, 1);
  const fontMult = FONT_MULTIPLIERS[options.fontCategory];
  const backingFee = BACKING_FEES[options.backingId as keyof typeof BACKING_FEES] ?? 0;
  const envMult = ENV_MULTIPLIERS[options.environmentId];
  const raw = (BASE_PRICE + charCount * CHAR_PRICE) * fontMult + backingFee;
  return Math.round(raw * envMult);
}
