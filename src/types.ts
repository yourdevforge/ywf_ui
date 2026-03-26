export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface YButtonProps {
  /** Button size */
  size?: ComponentSize;
  /** Background/accent color — any valid CSS color value */
  color?: string;
  /** Text color — any valid CSS color value */
  textColor?: string;
  /** Button style variant */
  variant?: "solid" | "outline" | "ghost";
  /** Disabled state */
  disabled?: boolean;
  /** Button label text (alternative to default slot) */
  label?: string;
  /** Shadow depth (false to disable) */
  shadow?: false | "sm" | "md" | "lg" | "xl";
  /** Border radius (false to disable) */
  rounded?: false | "sm" | "md" | "lg" | "xl" | "full";
  /** Inner padding size */
  padding?: ComponentSize;
  /** Continuous or hover-triggered animation */
  animation?: false | "pulse" | "bounce" | "shake" | "glow" | "spin";
  /** Visual effect enhancement */
  effect?: false | "ripple" | "scale" | "lift" | "neon" | "glassmorphism";
  /** Animation intensity */
  animationIntensity?: "subtle" | "moderate" | "strong";
  /** Effect intensity */
  effectIntensity?: "subtle" | "moderate" | "strong";
}

export interface YCardProps {
  /** Inner padding size */
  padding?: ComponentSize;
  /** Background color — any valid CSS color value */
  bgColor?: string;
  /** Border color — any valid CSS color value */
  borderColor?: string;
  /** Text color — any valid CSS color value */
  textColor?: string;
  /** Shadow depth (false to disable) */
  shadow?: false | "sm" | "md" | "lg" | "xl";
  /** Show border */
  bordered?: boolean;
  /** Border radius (false to disable) */
  rounded?: false | "sm" | "md" | "lg" | "xl" | "full";
}
