<script setup lang="ts">
import { computed } from "vue";
import type { YRadioProps } from "../../types/radio";

const props = withDefaults(defineProps<YRadioProps>(), {
  size: "md",
  variant: "default",
  color: "#2563eb",
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: unknown];
}>();

const sizeMap: Record<string, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
};

const dotSizeMap: Record<string, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
};

const labelSizeMap: Record<string, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const isSelected = computed(() => props.modelValue === props.value);

function select() {
  if (!props.disabled) {
    emit("update:modelValue", props.value);
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
        'relative mt-0.5 shrink-0 rounded-full border-2 transition-all duration-150 focus-within:ring-2 ring-blue-300/50',
        isSelected
          ? 'border-transparent'
          : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800',
      ]"
      :style="isSelected ? { backgroundColor: color, borderColor: color } : {}"
      role="radio"
      :aria-checked="isSelected"
      :aria-disabled="disabled"
      tabindex="0"
      @click="select"
      @keydown.space.prevent="select"
    >
      <span
        v-if="isSelected"
        class="absolute inset-0 m-auto rounded-full bg-white"
        :class="dotSizeMap[size ?? 'md']"
      />
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
