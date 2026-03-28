import type { PlaygroundQuickConfig } from "./types";

export const checkboxSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export const checkboxVariants = [
  "default",
  "filled",
  "ghost",
  "outlined",
  "soft",
  "brutal",
  "neon",
  "pill",
  "card",
  "toggle",
] as const;
export const checkboxRadii = ["none", "sm", "md", "lg", "full"] as const;

export const playgroundQuickConfig: PlaygroundQuickConfig = {
  componentId: "YCheckbox",
  propKey: "variant",
  options: [...checkboxVariants],
  applyOption(next, option) {
    next.variant = option;
  },
};
