import type { PlaygroundQuickConfig } from "./types";

export const radioSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export const radioVariants = [
  "default",
  "filled",
  "ghost",
  "card",
  "pill",
  "brutal",
  "soft",
  "neon",
  "segmented",
] as const;

export const playgroundQuickConfig: PlaygroundQuickConfig = {
  componentId: "YRadio",
  propKey: "variant",
  options: [...radioVariants],
  applyOption(next, option) {
    next.variant = option;
  },
};
