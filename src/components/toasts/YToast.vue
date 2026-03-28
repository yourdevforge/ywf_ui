<script setup lang="ts">
import { computed } from "vue";
import type { YToastProps } from "../../types/toast";

const props = withDefaults(defineProps<YToastProps>(), {
  type: "info",
  variant: "solid",
  position: "top-right",
  duration: 4000,
  dismissible: true,
  visible: true,
  showIcon: true,
  radius: "md",
});

const emit = defineEmits<{
  dismiss: [];
}>();

const iconPaths: Record<string, string> = {
  success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  warning:
    "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

const solidBgMap: Record<string, string> = {
  success: "#16a34a",
  error: "#dc2626",
  warning: "#d97706",
  info: "#2563eb",
};

const softClasses: Record<string, string> = {
  success:
    "bg-green-50 border border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
  error:
    "bg-red-50 border border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200",
  warning:
    "bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200",
  info: "bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
};

const outlineBorderMap: Record<string, string> = {
  success: "border-green-500",
  error: "border-red-500",
  warning: "border-amber-500",
  info: "border-blue-500",
};

const iconColorMap: Record<string, string> = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-amber-600",
  info: "text-blue-600",
};

const radiusMap: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-2xl",
};

const t = computed(() => props.type ?? "info");
const r = computed(() => radiusMap[props.radius ?? "md"]);

const wrapperClasses = computed(() => {
  const base = `${r.value} p-4 flex items-start gap-3 min-w-[280px] max-w-sm`;
  switch (props.variant) {
    case "soft":
      return `${base} ${softClasses[t.value]} shadow-sm`;
    case "outlined":
      return `${base} border-2 ${outlineBorderMap[t.value]} bg-white dark:bg-gray-900 shadow-sm`;
    case "glass":
      return `${base} backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-white/30 shadow-xl`;
    default:
      return `${base} shadow-lg`;
  }
});

const wrapperStyle = computed(() =>
  props.variant === "solid" ? { backgroundColor: solidBgMap[t.value] } : {},
);
</script>

<template>
  <div
    v-if="visible"
    :class="wrapperClasses"
    :style="wrapperStyle"
    role="alert"
  >
    <svg
      v-if="showIcon"
      class="mt-0.5 h-5 w-5 shrink-0"
      :class="variant === 'solid' ? 'text-white' : iconColorMap[t]"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" :d="iconPaths[t]" />
    </svg>

    <div class="min-w-0 flex-1">
      <p
        v-if="title"
        class="text-sm font-semibold leading-tight"
        :class="variant === 'solid' ? 'text-white' : ''"
      >
        {{ title }}
      </p>
      <p
        v-if="message"
        class="mt-0.5 text-sm"
        :class="variant === 'solid' ? 'text-white/90' : 'opacity-80'"
      >
        {{ message }}
      </p>
    </div>

    <button
      v-if="dismissible"
      type="button"
      class="shrink-0 rounded p-0.5 transition-opacity hover:opacity-70"
      :class="variant === 'solid' ? 'text-white' : 'text-gray-500'"
      @click="emit('dismiss')"
    >
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>
