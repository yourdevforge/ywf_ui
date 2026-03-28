import type { PlaygroundQuickConfig } from "./types";

export const spinnerSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export const spinnerVariants = [
  "ring",
  "dots",
  "bars",
  "pulse",
  "bounce",
  "ripple",
  "orbit",
  "clock",
  "morph",
  "wave",
  "grid",
  "spiral",
] as const;
export const spinnerSpeeds = ["slow", "normal", "fast"] as const;

export const playgroundQuickConfig: PlaygroundQuickConfig = {
  componentId: "YSpinner",
  propKey: "variant",
  options: [...spinnerVariants],
  applyOption(next, option) {
    next.variant = option;
  },
};
