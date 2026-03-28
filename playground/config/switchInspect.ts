import type { PlaygroundQuickConfig } from "./types";

export const switchSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export const switchVariants = ["default", "pill", "slim", "ios"] as const;

export const playgroundQuickConfig: PlaygroundQuickConfig = {
  componentId: "YSwitch",
  propKey: "size",
  options: [...switchSizes],
  applyOption(next, option) {
    next.size = option;
  },
};
