export type YToastType = "success" | "error" | "warning" | "info";
export type YToastVariant = "solid" | "soft" | "outlined" | "glass";
export type YToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
export type YToastRadius = "none" | "sm" | "md" | "lg" | "full";

export interface YToastProps {
  message?: string;
  title?: string;
  type?: YToastType;
  variant?: YToastVariant;
  position?: YToastPosition;
  duration?: number;
  dismissible?: boolean;
  visible?: boolean;
  icon?: string;
  radius?: YToastRadius;
  showIcon?: boolean;
}
