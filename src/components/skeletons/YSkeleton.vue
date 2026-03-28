<script setup lang="ts">
import { computed } from "vue";
import type { YSkeletonProps } from "../../types/skeleton";

const props = withDefaults(defineProps<YSkeletonProps>(), {
  variant: "rect",
  animated: true,
  count: 1,
  radius: "md",
});

const radiusMap: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const baseStyle = computed(() => ({
  width: props.width
    ? typeof props.width === "number"
      ? `${props.width}px`
      : props.width
    : undefined,
  height: props.height
    ? typeof props.height === "number"
      ? `${props.height}px`
      : props.height
    : undefined,
}));

const variantClasses = computed(() => {
  switch (props.variant) {
    case "circle":
      return "rounded-full";
    case "line":
      return "h-4 w-full rounded";
    case "text":
      return "h-3 w-3/4 rounded";
    case "avatar":
      return "h-12 w-12 rounded-full";
    case "block":
      return "h-32 w-full rounded-lg";
    default:
      return radiusMap[props.radius ?? "md"];
  }
});
</script>

<template>
  <div
    class="flex flex-col gap-2"
    :style="props.textColor ? { color: props.textColor } : undefined"
  >
    <div
      v-for="i in count ?? 1"
      :key="i"
      class="bg-gray-200 dark:bg-gray-700"
      :class="[variantClasses, animated ? 'animate-pulse' : '']"
      :style="baseStyle"
    />
  </div>
</template>
