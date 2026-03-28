import type { ComponentSize } from "./common";

export type YCheckboxSize = ComponentSize;
export type YCheckboxVariant = "default" | "filled" | "ghost" | "outlined";
export type YCheckboxRadius = "none" | "sm" | "md" | "lg" | "full";

export interface YCheckboxProps {
  modelValue?: boolean;
  label?: string;
  description?: string;
  size?: YCheckboxSize;
  variant?: YCheckboxVariant;
  radius?: YCheckboxRadius;
  color?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}
