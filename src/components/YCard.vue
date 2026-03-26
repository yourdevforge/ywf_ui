<script setup lang="ts">
import { computed } from "vue";
import type { YCardProps, ComponentSize } from "@/types";

const props = withDefaults(defineProps<YCardProps>(), {
  padding: "md",
  bgColor: "#ffffff",
  borderColor: "#e5e7eb",
  textColor: undefined,
  shadow: "md",
  bordered: true,
  rounded: "lg",
});

const paddingClasses: Record<ComponentSize, string> = {
  xs: "p-2",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

const shadowClasses: Record<string, string> = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

const roundedClasses: Record<string, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const cardClasses = computed(() => [
  "overflow-hidden",
  paddingClasses[props.padding],
  props.shadow !== false ? (shadowClasses[props.shadow] ?? "") : "",
  props.rounded !== false ? (roundedClasses[props.rounded] ?? "") : "",
]);

const cardStyles = computed(() => ({
  backgroundColor: props.bgColor,
  borderColor: props.bordered ? props.borderColor : "transparent",
  borderWidth: props.bordered ? "1px" : "0",
  borderStyle: "solid",
  color: props.textColor,
}));
</script>

<template>
  <div :class="cardClasses" :style="cardStyles">
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>
