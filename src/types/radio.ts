import type { ComponentSize } from "./common";

export type YRadioSize = ComponentSize;
export type YRadioVariant = "default" | "filled" | "ghost";

export interface YRadioProps {
  modelValue?: unknown;
  value?: unknown;
  label?: string;
  description?: string;
  size?: YRadioSize;
  variant?: YRadioVariant;
  color?: string;
  disabled?: boolean;
}
