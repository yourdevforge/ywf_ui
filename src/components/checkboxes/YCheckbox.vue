<script setup lang="ts">
import { computed } from "vue";
import type { YCheckboxProps } from "../../types/checkbox";

const props = withDefaults(defineProps<YCheckboxProps>(), {
  size: "md",
  variant: "default",
  radius: "md",
  color: "#2563eb",
  disabled: false,
  indeterminate: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const sizeMap: Record<string, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
};

const labelSizeMap: Record<string, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const radiusMap: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded",
  lg: "rounded-lg",
  full: "rounded-full",
};

const isChecked = computed(() => !!props.modelValue);

function toggle() {
  if (!props.disabled) {
    emit("update:modelValue", !props.modelValue);
  }
}
</script>

<template>
  <label
    class="inline-flex cursor-pointer select-none items-start gap-2.5"
    :class="disabled ? 'cursor-not-allowed opacity-50' : ''"
  >
    <span
      :class="[
        sizeMap[size ?? 'md'],
        radiusMap[radius ?? 'md'],
        'relative mt-0.5 shrink-0 border-2 transition-all duration-150 focus-within:ring-2 ring-blue-300/50',
        isChecked || indeterminate
          ? 'border-transparent'
          : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800',
      ]"
      :style="
        isChecked || indeterminate
          ? { backgroundColor: color, borderColor: color }
          : {}
      "
      role="checkbox"
      :aria-checked="indeterminate ? 'mixed' : isChecked"
      :aria-disabled="disabled"
      tabindex="0"
      @click="toggle"
      @keydown.space.prevent="toggle"
    >
      <svg
        v-if="isChecked && !indeterminate"
        class="absolute inset-0 h-full w-full p-0.5 text-white"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M3 8l3.5 3.5L13 5"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-else-if="indeterminate"
        class="absolute inset-0 h-full w-full p-0.5 text-white"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M3 8h10"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
        />
      </svg>
    </span>
    <span v-if="label || description" class="flex flex-col">
      <span
        v-if="label"
        class="font-medium leading-tight text-gray-800 dark:text-gray-200"
        :class="labelSizeMap[size ?? 'md']"
        >{{ label }}</span
      >
      <span
        v-if="description"
        class="mt-0.5 text-xs leading-snug text-gray-500 dark:text-gray-400"
        >{{ description }}</span
      >
    </span>
  </label>
</template>
