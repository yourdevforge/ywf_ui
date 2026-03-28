import type { ComponentSize } from "./common";

export type YSwitchSize = ComponentSize;
export type YSwitchVariant = "default" | "pill" | "slim" | "ios";

export interface YSwitchProps {
  modelValue?: boolean;
  label?: string;
  description?: string;
  size?: YSwitchSize;
  variant?: YSwitchVariant;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
}
