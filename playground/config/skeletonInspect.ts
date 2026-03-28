import type { PlaygroundQuickConfig } from "./types";

export const skeletonVariants = [
  "rect",
  "line",
  "circle",
  "text",
  "avatar",
  "block",
] as const;
export const skeletonRadii = ["none", "sm", "md", "lg", "full"] as const;

export const playgroundQuickConfig: PlaygroundQuickConfig = {
  componentId: "YSkeleton",
  propKey: "variant",
  options: [...skeletonVariants],
  applyOption(next, option) {
    next.variant = option;
  },
};
