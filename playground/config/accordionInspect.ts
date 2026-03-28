import type { PlaygroundQuickConfig } from "./types";

export const accordionVariants = [
  "default",
  "bordered",
  "filled",
  "flush",
  "card",
  "ghost",
  "brutal",
  "neon",
  "soft",
  "timeline",
] as const;
export const accordionRadii = ["none", "sm", "md", "lg", "xl"] as const;

export const playgroundQuickConfig: PlaygroundQuickConfig = {
  componentId: "YAccordion",
  propKey: "variant",
  options: [...accordionVariants],
  applyOption(next, option) {
    next.variant = option;
  },
};
