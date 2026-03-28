<script setup lang="ts">
import { computed } from "vue";
import type { YSwitchProps } from "../../types/switch";

const props = withDefaults(defineProps<YSwitchProps>(), {
  size: "md",
  variant: "default",
  color: "#2563eb",
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const trackSizeMap: Record<string, string> = {
  xs: "h-4 w-7",
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-[52px]",
  xl: "h-8 w-16",
};

const thumbSizeMap: Record<string, string> = {
  xs: "h-3 w-3",
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

const thumbTranslateMap: Record<string, string> = {
  xs: "translate-x-3.5",
  sm: "translate-x-4",
  md: "translate-x-5",
  lg: "translate-x-6",
  xl: "translate-x-8",
};

const labelSizeMap: Record<string, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const isOn = computed(() => !!props.modelValue);

function toggle() {
  if (!props.disabled && !props.loading) {
    emit("update:modelValue", !props.modelValue);
  }
}
</script>

<template>
  <label
    class="inline-flex cursor-pointer select-none items-center gap-2.5"
    :class="disabled || loading ? 'cursor-not-allowed opacity-50' : ''"
    :style="props.textColor ? { color: props.textColor } : undefined"
  >
    <button
      type="button"
      role="switch"
      :aria-checked="isOn"
      :aria-disabled="disabled || loading"
      class="relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 ring-blue-300/50"
      :class="[
        trackSizeMap[size ?? 'md'],
        isOn ? '' : 'bg-gray-300 dark:bg-gray-600',
      ]"
      :style="isOn ? { backgroundColor: color } : {}"
      @click="toggle"
    >
      <span
        class="inline-block rounded-full bg-white shadow transition-transform duration-200"
        :class="[
          thumbSizeMap[size ?? 'md'],
          isOn ? thumbTranslateMap[size ?? 'md'] : 'translate-x-0.5',
        ]"
      >
        <svg
          v-if="loading"
          class="animate-spin h-full w-full p-0.5 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4z"
          />
        </svg>
      </span>
    </button>
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
