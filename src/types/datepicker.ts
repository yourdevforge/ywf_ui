export type YDatePickerVariant =
  | "clean"
  | "glass"
  | "dark"
  | "brutalist"
  | "minimal";

export type YDatePickerSize = "sm" | "md" | "lg";

import type { YAnimationPreset } from "./animation";

export interface YDatePickerProps {
  dark?: boolean;
  animation?: YAnimationPreset;
  modelValue?: string | null;
  placeholder?: string;
  variant?: YDatePickerVariant;
  size?: YDatePickerSize;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  inline?: boolean;
  minDate?: string;
  maxDate?: string;
  label?: string;
  hint?: string;
  error?: string;
}
