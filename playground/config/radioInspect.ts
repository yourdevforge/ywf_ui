import type { PlaygroundQuickConfig } from "./types";

export const radioSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export const radioVariants = ["default", "filled", "ghost"] as const;

export const playgroundQuickConfig: PlaygroundQuickConfig = {
  componentId: "YRadio",
  propKey: "size",
  options: [...radioSizes],
  applyOption(next, option) {
    next.size = option;
  },
};
