export type { ComponentSize } from "./common";

export type {
  YButtonPreset,
  YButtonAnimation,
  YButtonEffect,
  YButtonIntensity,
  YButtonProps,
} from "./button";
export type {
  YCardPreset,
  YCardStat,
  YCardTimelineItem,
  YCardNotificationType,
  YCardPriority,
  YCardProps,
} from "./card";
export type {
  YModalSize,
  YModalVariant,
  YModalPosition,
  YModalBackdrop,
  YModalPadding,
  YModalProps,
} from "./modal";
export type {
  YDropdownVariant,
  YDropdownSize,
  YDropdownPlacement,
  YDropdownItem,
  YDropdownProps,
  YDropdownEmits,
} from "./dropdown";
export type {
  YNavbarVariant,
  YNavbarAlign,
  YNavbarLink,
  YNavbarAction,
  YNavbarProps,
  YNavbarEmits,
} from "./navbar";
export type {
  YSidebarVariant,
  YSidebarSize,
  YSidebarBehavior,
  YSidebarCollapsedMode,
  YSidebarItem,
  YSidebarGroup,
  YSidebarProps,
} from "./sidebar";
export type {
  YBadgeVariant,
  YBadgeSize,
  YBadgeColor,
  YBadgeRadius,
  YBadgeProps,
} from "./badge";
export type {
  YInputVariant,
  YInputSize,
  YInputType,
  YInputRadius,
  YInputState,
  YInputProps,
} from "./input";
export type {
  YAlertType,
  YAlertVariant,
  YAlertSize,
  YAlertIntensity,
  YAlertRadius,
  YAlertAction,
  YAlertProps,
} from "./alert";
export type {
  YTooltipPlacement,
  YTooltipVariant,
  YTooltipProps,
} from "./tooltip";
export type {
  YAvatarPreset,
  YAvatarSize,
  YAvatarShape,
  YAvatarStatus,
  YAvatarRing,
  YAvatarProps,
} from "./avatar";
export type YTabsVariant =
  | "underline"
  | "pills"
  | "boxed"
  | "highlight"
  | "brutal"
  | "glass"
  | "neon"
  | "soft"
  | "chip"
  | "retro"
  | "minimal"
  | "floating"
  | "aurora"
  | "terminal"
  | "dot"
  | "folder"
  | "gradient"
  | "outline"
  | "ticker";
export type YTabsAlign = "left" | "center" | "right" | "stretch";
export interface YTabsProps {
  tabs?: string[];
  variant?: YTabsVariant;
  align?: YTabsAlign;
}
export type {
  YCheckboxSize,
  YCheckboxVariant,
  YCheckboxRadius,
  YCheckboxProps,
} from "./checkbox";
export type { YRadioSize, YRadioVariant, YRadioProps } from "./radio";
export type { YSwitchSize, YSwitchVariant, YSwitchProps } from "./switch";
export type {
  YSelectSize,
  YSelectVariant,
  YSelectRadius,
  YSelectOption,
  YSelectProps,
} from "./select";
export type {
  YSpinnerSize,
  YSpinnerVariant,
  YSpinnerSpeed,
  YSpinnerProps,
} from "./spinner";
export type {
  YSkeletonVariant,
  YSkeletonRadius,
  YSkeletonProps,
} from "./skeleton";
export type {
  YTableSize,
  YTableVariant,
  YTableColumn,
  YTableProps,
} from "./table";
export type {
  YToastType,
  YToastVariant,
  YToastPosition,
  YToastRadius,
  YToastProps,
} from "./toast";
export type {
  YAccordionVariant,
  YAccordionRadius,
  YAccordionItem,
  YAccordionProps,
} from "./accordion";
