<script setup lang="ts">
import { computed } from "vue";
import type { YButtonProps, ComponentSize } from "@/types";

const props = withDefaults(defineProps<YButtonProps>(), {
  size: "md",
  color: "#3b82f6",
  textColor: "#ffffff",
  variant: "solid",
  disabled: false,
  shadow: false,
  rounded: "md",
  padding: "md",
  animation: false,
  effect: false,
  animationIntensity: "moderate",
  effectIntensity: "moderate",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const textSizeClasses: Record<ComponentSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const paddingClasses: Record<ComponentSize, string> = {
  xs: "px-2 py-1",
  sm: "px-3 py-1.5",
  md: "px-4 py-2",
  lg: "px-5 py-2.5",
  xl: "px-6 py-3",
};

const roundedClasses: Record<string, string> = {
  false: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const shadowClasses: Record<string, string> = {
  false: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

const animationClasses: Record<string, string> = {
  false: "",
  pulse: "y-btn-pulse",
  bounce: "y-btn-bounce",
  shake: "y-btn-shake",
  glow: "y-btn-glow",
  spin: "y-btn-spin",
};

const effectClasses: Record<string, string> = {
  false: "",
  ripple: "y-btn-ripple",
  scale: "y-btn-scale",
  lift: "y-btn-lift",
  neon: "y-btn-neon",
  glassmorphism: "y-btn-glass",
};

const animIntensityVars: Record<string, Record<string, string>> = {
  subtle: {
    "--y-anim-speed": "1.4",
    "--y-pulse-min": "0.8",
    "--y-bounce-y": "8%",
    "--y-shake-x": "1.5px",
    "--y-glow-spread-lo": "8px",
    "--y-glow-spread-hi": "18px",
    "--y-glow-mix-lo": "25%",
    "--y-glow-mix-hi": "40%",
  },
  moderate: {
    "--y-anim-speed": "1",
    "--y-pulse-min": "0.6",
    "--y-bounce-y": "15%",
    "--y-shake-x": "3px",
    "--y-glow-spread-lo": "15px",
    "--y-glow-spread-hi": "35px",
    "--y-glow-mix-lo": "40%",
    "--y-glow-mix-hi": "60%",
  },
  strong: {
    "--y-anim-speed": "0.7",
    "--y-pulse-min": "0.35",
    "--y-bounce-y": "25%",
    "--y-shake-x": "6px",
    "--y-glow-spread-lo": "25px",
    "--y-glow-spread-hi": "55px",
    "--y-glow-mix-lo": "55%",
    "--y-glow-mix-hi": "80%",
  },
};

const effectIntensityVars: Record<string, Record<string, string>> = {
  subtle: {
    "--y-scale-factor": "1.03",
    "--y-lift-y": "1.5px",
    "--y-lift-shadow-1": "0 4px 12px -3px rgba(0,0,0,0.12)",
    "--y-lift-shadow-2": "0 3px 6px -4px rgba(0,0,0,0.1)",
    "--y-neon-spread-1": "3px",
    "--y-neon-spread-2": "10px",
    "--y-neon-mix": "30%",
    "--y-neon-hover-1": "5px",
    "--y-neon-hover-2": "18px",
    "--y-neon-hover-3": "35px",
    "--y-neon-hover-mix-2": "40%",
    "--y-neon-hover-mix-3": "18%",
    "--y-glass-bg": "15%",
    "--y-glass-border": "25%",
    "--y-glass-blur": "8px",
    "--y-ripple-scale": "2",
    "--y-ripple-opacity": "0.2",
  },
  moderate: {
    "--y-scale-factor": "1.07",
    "--y-lift-y": "3px",
    "--y-lift-shadow-1": "0 10px 25px -5px rgba(0,0,0,0.2)",
    "--y-lift-shadow-2": "0 8px 10px -6px rgba(0,0,0,0.15)",
    "--y-neon-spread-1": "5px",
    "--y-neon-spread-2": "20px",
    "--y-neon-mix": "50%",
    "--y-neon-hover-1": "10px",
    "--y-neon-hover-2": "30px",
    "--y-neon-hover-3": "60px",
    "--y-neon-hover-mix-2": "60%",
    "--y-neon-hover-mix-3": "30%",
    "--y-glass-bg": "25%",
    "--y-glass-border": "40%",
    "--y-glass-blur": "12px",
    "--y-ripple-scale": "2.5",
    "--y-ripple-opacity": "0.3",
  },
  strong: {
    "--y-scale-factor": "1.14",
    "--y-lift-y": "6px",
    "--y-lift-shadow-1": "0 18px 40px -8px rgba(0,0,0,0.3)",
    "--y-lift-shadow-2": "0 12px 18px -8px rgba(0,0,0,0.2)",
    "--y-neon-spread-1": "8px",
    "--y-neon-spread-2": "35px",
    "--y-neon-mix": "70%",
    "--y-neon-hover-1": "16px",
    "--y-neon-hover-2": "50px",
    "--y-neon-hover-3": "90px",
    "--y-neon-hover-mix-2": "80%",
    "--y-neon-hover-mix-3": "45%",
    "--y-glass-bg": "35%",
    "--y-glass-border": "55%",
    "--y-glass-blur": "18px",
    "--y-ripple-scale": "3.5",
    "--y-ripple-opacity": "0.45",
  },
};

const colorStyles = computed(() => {
  const styles: Record<string, string> = {
    "--y-btn-focus-ring": props.color,
    "--y-btn-color": props.color,
    ...animIntensityVars[props.animationIntensity],
    ...effectIntensityVars[props.effectIntensity],
  };

  switch (props.variant) {
    case "outline":
      styles.color = props.color;
      styles.borderColor = props.color;
      styles.backgroundColor = "transparent";
      break;
    case "ghost":
      styles.color = props.color;
      styles.borderColor = "transparent";
      styles.backgroundColor = "transparent";
      break;
    default:
      styles.backgroundColor = props.color;
      styles.color = props.textColor;
      styles.borderColor = props.color;
  }

  return styles;
});

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    if (props.effect === "ripple") {
      createRipple(event);
    }
    emit("click", event);
  }
}

function createRipple(event: MouseEvent) {
  const btn = event.currentTarget as HTMLElement;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const rippleOpacity =
    getComputedStyle(btn).getPropertyValue("--y-ripple-opacity").trim() ||
    "0.3";
  const ripple = document.createElement("span");
  ripple.style.cssText = `
    position: absolute; border-radius: 50%; pointer-events: none;
    width: ${size}px; height: ${size}px;
    left: ${x}px; top: ${y}px;
    background: currentColor; opacity: ${rippleOpacity};
    transform: scale(0); animation: y-ripple-expand 0.5s ease-out forwards;
  `;
  btn.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}
</script>

<template>
  <button
    :class="[
      'y-button',
      'inline-flex items-center justify-center font-medium border',
      'transition-all duration-150 cursor-pointer',
      'disabled:opacity-50 disabled:pointer-events-none',
      textSizeClasses[size],
      paddingClasses[padding],
      roundedClasses[String(rounded)],
      shadowClasses[String(shadow)],
      animationClasses[String(animation)],
      effectClasses[String(effect)],
    ]"
    :style="colorStyles"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped>
.y-button {
  position: relative;
  overflow: hidden;
}

.y-button:not(:disabled):hover {
  filter: brightness(0.92);
}

.y-button:not(:disabled):active {
  filter: brightness(0.85);
}

.y-button:focus-visible {
  outline: 2px solid var(--y-btn-focus-ring);
  outline-offset: 2px;
}

/* ── Animations ── */
.y-btn-pulse {
  animation: y-pulse calc(2s * var(--y-anim-speed, 1))
    cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.y-btn-bounce {
  animation: y-bounce calc(1s * var(--y-anim-speed, 1)) infinite;
}

.y-btn-shake:hover {
  animation: y-shake calc(0.4s * var(--y-anim-speed, 1)) ease-in-out;
}

.y-btn-glow {
  animation: y-glow calc(2s * var(--y-anim-speed, 1)) ease-in-out infinite;
}

.y-btn-spin:hover {
  animation: y-spin calc(0.6s * var(--y-anim-speed, 1)) ease-in-out;
}

/* ── Effects ── */
.y-btn-scale:hover {
  transform: scale(var(--y-scale-factor, 1.07));
}

.y-btn-lift:hover {
  transform: translateY(calc(-1 * var(--y-lift-y, 3px)));
  box-shadow:
    var(--y-lift-shadow-1, 0 10px 25px -5px rgba(0, 0, 0, 0.2)),
    var(--y-lift-shadow-2, 0 8px 10px -6px rgba(0, 0, 0, 0.15));
}

.y-btn-neon {
  box-shadow:
    0 0 var(--y-neon-spread-1, 5px) var(--y-btn-color),
    0 0 var(--y-neon-spread-2, 20px)
      color-mix(in srgb, var(--y-btn-color) var(--y-neon-mix, 50%), transparent);
}

.y-btn-neon:hover {
  box-shadow:
    0 0 var(--y-neon-hover-1, 10px) var(--y-btn-color),
    0 0 var(--y-neon-hover-2, 30px)
      color-mix(
        in srgb,
        var(--y-btn-color) var(--y-neon-hover-mix-2, 60%),
        transparent
      ),
    0 0 var(--y-neon-hover-3, 60px)
      color-mix(
        in srgb,
        var(--y-btn-color) var(--y-neon-hover-mix-3, 30%),
        transparent
      );
}

.y-btn-glass {
  backdrop-filter: blur(var(--y-glass-blur, 12px));
  background: color-mix(
    in srgb,
    var(--y-btn-color) var(--y-glass-bg, 25%),
    transparent
  ) !important;
  border: 1px solid
    color-mix(
      in srgb,
      var(--y-btn-color) var(--y-glass-border, 40%),
      transparent
    ) !important;
}

/* ── Keyframes ── */
@keyframes y-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: var(--y-pulse-min, 0.6);
  }
}

@keyframes y-bounce {
  0%,
  100% {
    transform: translateY(calc(-1 * var(--y-bounce-y, 15%)));
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes y-shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(calc(-1 * var(--y-shake-x, 3px)));
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(var(--y-shake-x, 3px));
  }
}

@keyframes y-glow {
  0%,
  100% {
    box-shadow:
      0 0 5px var(--y-btn-color),
      0 0 var(--y-glow-spread-lo, 15px)
        color-mix(
          in srgb,
          var(--y-btn-color) var(--y-glow-mix-lo, 40%),
          transparent
        );
  }
  50% {
    box-shadow:
      0 0 15px var(--y-btn-color),
      0 0 var(--y-glow-spread-hi, 35px)
        color-mix(
          in srgb,
          var(--y-btn-color) var(--y-glow-mix-hi, 60%),
          transparent
        );
  }
}

@keyframes y-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes y-ripple-expand {
  to {
    transform: scale(var(--y-ripple-scale, 2.5));
    opacity: 0;
  }
}
</style>
