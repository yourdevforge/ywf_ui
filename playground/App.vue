<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { YButton, YCard } from "@/index";
import type { ComponentSize } from "@/types";
import {
  resolveColor,
  resolveColorHex,
  isTailwindColor,
} from "./tailwind-colors";

// ── Component registry (scales to 100+) ──────────────────────────────
interface ComponentEntry {
  id: string;
  label: string;
  icon: string;
}

const components: ComponentEntry[] = [
  { id: "button", label: "YButton", icon: "🔘" },
  { id: "card", label: "YCard", icon: "🃏" },
];

const activeComponent = ref("button");
const navSearch = ref("");

const filteredComponents = computed(() => {
  const q = navSearch.value.toLowerCase();
  if (!q) return components;
  return components.filter(
    (c) => c.label.toLowerCase().includes(q) || c.id.includes(q),
  );
});

// ── Layout state ──────────────────────────────────────────────────────
const navCollapsed = ref(false);
const darkMode = ref(localStorage.getItem("ywf-dark-mode") === "true");
watch(darkMode, (v) => localStorage.setItem("ywf-dark-mode", String(v)));

// ── Shared option lists ──────────────────────────────────────────────
const sizes: ComponentSize[] = ["xs", "sm", "md", "lg", "xl"];
const variants = ["solid", "outline", "ghost"] as const;
const shadowOptions = ["none", "sm", "md", "lg", "xl"] as const;
const roundedOptions = ["none", "sm", "md", "lg", "xl", "full"] as const;
const animationOptions = [
  "none",
  "pulse",
  "bounce",
  "shake",
  "glow",
  "spin",
] as const;
const effectOptions = [
  "none",
  "ripple",
  "scale",
  "lift",
  "neon",
  "glassmorphism",
] as const;
const intensityOptions = ["subtle", "moderate", "strong"] as const;

// ── Button controls ──────────────────────────────────────────────────
const btnSize = ref<ComponentSize>("md");
const btnColor = ref("#3b82f6");
const btnTextColor = ref("#ffffff");
const btnVariant = ref<"solid" | "outline" | "ghost">("solid");
const btnDisabled = ref(false);
const btnLabel = ref("Click Me");
const btnShadow = ref<"none" | "sm" | "md" | "lg" | "xl">("none");
const btnRounded = ref<"none" | "sm" | "md" | "lg" | "xl" | "full">("md");
const btnPadding = ref<ComponentSize>("md");
const btnAnimation = ref<
  "none" | "pulse" | "bounce" | "shake" | "glow" | "spin"
>("none");
const btnEffect = ref<
  "none" | "ripple" | "scale" | "lift" | "neon" | "glassmorphism"
>("none");
const btnIntensity = ref<"subtle" | "moderate" | "strong">("moderate");
const btnEffectIntensity = ref<"subtle" | "moderate" | "strong">("moderate");

// ── Card controls ────────────────────────────────────────────────────
const cardPadding = ref<ComponentSize>("md");
const cardBgColor = ref("#ffffff");
const cardBorderColor = ref("#e5e7eb");
const cardTextColor = ref("#1f2937");
const cardShadow = ref<"none" | "sm" | "md" | "lg" | "xl">("md");
const cardBordered = ref(true);
const cardRounded = ref<"none" | "sm" | "md" | "lg" | "xl" | "full">("lg");

// ── Resolved colors ──────────────────────────────────────────────────
const resolvedBtnColor = computed(() => resolveColor(btnColor.value));
const resolvedBtnTextColor = computed(() => resolveColor(btnTextColor.value));
const resolvedCardBgColor = computed(() => resolveColor(cardBgColor.value));
const resolvedCardBorderColor = computed(() =>
  resolveColor(cardBorderColor.value),
);
const resolvedCardTextColor = computed(() => resolveColor(cardTextColor.value));

const hexBtnColor = computed(() => resolveColorHex(btnColor.value));
const hexBtnTextColor = computed(() => resolveColorHex(btnTextColor.value));
const hexCardBgColor = computed(() => resolveColorHex(cardBgColor.value));
const hexCardBorderColor = computed(() =>
  resolveColorHex(cardBorderColor.value),
);
const hexCardTextColor = computed(() => resolveColorHex(cardTextColor.value));

// ── Code snippets ────────────────────────────────────────────────────
const btnSnippet = computed(() => {
  const lines = [
    `<YButton`,
    `  size="${btnSize.value}"`,
    `  color="${hexBtnColor.value}"`,
    `  text-color="${hexBtnTextColor.value}"`,
    `  variant="${btnVariant.value}"`,
    `  padding="${btnPadding.value}"`,
    `  shadow="${btnShadow.value === "none" ? "false" : btnShadow.value}"`,
    `  rounded="${btnRounded.value === "none" ? "false" : btnRounded.value}"`,
  ];
  if (btnAnimation.value !== "none")
    lines.push(`  animation="${btnAnimation.value}"`);
  if (btnEffect.value !== "none") lines.push(`  effect="${btnEffect.value}"`);
  if (btnIntensity.value !== "moderate")
    lines.push(`  intensity="${btnIntensity.value}"`);
  if (btnDisabled.value) lines.push(`  disabled`);
  lines.push(`  label="${btnLabel.value}"`, `/>`);
  return lines.join("\n");
});

const cardSnippet = computed(() => {
  const lines = [
    `<YCard`,
    `  padding="${cardPadding.value}"`,
    `  bg-color="${hexCardBgColor.value}"`,
    `  border-color="${hexCardBorderColor.value}"`,
    `  text-color="${hexCardTextColor.value}"`,
    `  shadow="${cardShadow.value === "none" ? "false" : cardShadow.value}"`,
  ];
  if (!cardBordered.value) lines.push(`  :bordered="false"`);
  lines.push(
    `  rounded="${cardRounded.value === "none" ? "false" : cardRounded.value}"`,
    `>`,
    `  <template #header>`,
    `    <h3>Card Title</h3>`,
    `  </template>`,
    `  Content goes here`,
    `  <template #footer>`,
    `    <YButton size="sm" label="Action" />`,
    `  </template>`,
    `</YCard>`,
  );
  return lines.join("\n");
});
</script>

<template>
  <div
    class="flex h-screen overflow-hidden transition-colors duration-200"
    :class="darkMode ? 'bg-gray-900' : 'bg-gray-50'"
  >
    <!-- ═══ LEFT NAV ═══ -->
    <nav
      class="flex shrink-0 flex-col border-r transition-all duration-200"
      :class="[
        navCollapsed ? 'w-14' : 'w-56',
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white',
      ]"
    >
      <!-- Nav header -->
      <div
        class="flex h-14 items-center border-b px-3"
        :class="darkMode ? 'border-gray-700' : 'border-gray-200'"
      >
        <button
          class="p-1.5 rounded-md cursor-pointer transition-colors"
          :class="
            darkMode
              ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          "
          title="Toggle navigation"
          @click="navCollapsed = !navCollapsed"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span
          v-if="!navCollapsed"
          class="ml-2 text-sm font-bold truncate"
          :class="darkMode ? 'text-gray-100' : 'text-gray-900'"
        >
          YWF UI
        </span>
      </div>

      <!-- Search (expanded only) -->
      <div v-if="!navCollapsed" class="px-2 pt-2">
        <input
          v-model="navSearch"
          type="text"
          placeholder="Search…"
          class="w-full rounded-md border px-2.5 py-1.5 text-xs"
          :class="
            darkMode
              ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500'
              : 'border-gray-200 placeholder:text-gray-400'
          "
        />
      </div>

      <!-- Component list -->
      <ul class="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        <li v-for="comp in filteredComponents" :key="comp.id">
          <button
            class="flex w-full items-center rounded-md px-2.5 py-2 text-sm cursor-pointer transition-colors"
            :class="[
              activeComponent === comp.id
                ? darkMode
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'bg-blue-50 text-blue-700'
                : darkMode
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              navCollapsed ? 'justify-center' : '',
            ]"
            :title="comp.label"
            @click="activeComponent = comp.id"
          >
            <span class="text-base">{{ comp.icon }}</span>
            <span v-if="!navCollapsed" class="ml-2.5 truncate font-medium">
              {{ comp.label }}
            </span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- ═══ CENTER PREVIEW ═══ -->
    <main class="flex flex-1 flex-col overflow-hidden">
      <!-- Top bar -->
      <header
        class="flex h-14 shrink-0 items-center justify-between border-b px-6"
        :class="darkMode ? 'border-gray-700' : 'border-gray-200'"
      >
        <h2
          class="text-lg font-semibold"
          :class="darkMode ? 'text-gray-100' : 'text-gray-900'"
        >
          {{
            components.find((c) => c.id === activeComponent)?.label ??
            "Component"
          }}
        </h2>
        <div class="flex items-center gap-2">
          <!-- Dark mode toggle -->
          <button
            class="p-2 rounded-md cursor-pointer text-lg transition-colors"
            :class="
              darkMode
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            "
            :title="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="darkMode = !darkMode"
          >
            {{ darkMode ? "☀️" : "🌙" }}
          </button>
        </div>
      </header>

      <!-- Preview content -->
      <div class="flex-1 overflow-y-auto p-8">
        <!-- ── Button Preview ── -->
        <div v-if="activeComponent === 'button'" class="space-y-8">
          <div
            class="flex items-center justify-center rounded-xl border border-dashed p-16 transition-colors duration-200"
            :class="
              darkMode
                ? 'border-gray-600 bg-gray-800'
                : 'border-gray-300 bg-white'
            "
          >
            <YButton
              :size="btnSize"
              :color="resolvedBtnColor"
              :text-color="resolvedBtnTextColor"
              :variant="btnVariant"
              :disabled="btnDisabled"
              :label="btnLabel"
              :shadow="btnShadow === 'none' ? false : btnShadow"
              :rounded="btnRounded === 'none' ? false : btnRounded"
              :padding="btnPadding"
              :animation="btnAnimation === 'none' ? false : btnAnimation"
              :animation-intensity="btnIntensity"
              :effect="btnEffect === 'none' ? false : btnEffect"
              :effect-intensity="btnEffectIntensity"
            />
          </div>

          <div
            class="rounded-lg bg-gray-900 p-4 border"
            :class="darkMode ? 'border-gray-600' : 'border-transparent'"
          >
            <pre
              class="text-sm text-green-400 whitespace-pre-wrap"
            ><code>{{ btnSnippet }}</code></pre>
          </div>
        </div>

        <!-- ── Card Preview ── -->
        <div v-if="activeComponent === 'card'" class="space-y-8">
          <div
            class="flex items-center justify-center rounded-xl border border-dashed p-16 transition-colors duration-200"
            :class="
              darkMode
                ? 'border-gray-600 bg-gray-800'
                : 'border-gray-300 bg-white'
            "
          >
            <div class="w-full max-w-md">
              <YCard
                :padding="cardPadding"
                :bg-color="resolvedCardBgColor"
                :border-color="resolvedCardBorderColor"
                :text-color="resolvedCardTextColor"
                :shadow="cardShadow === 'none' ? false : cardShadow"
                :bordered="cardBordered"
                :rounded="cardRounded === 'none' ? false : cardRounded"
              >
                <template #header>
                  <h3 class="text-lg font-semibold">Card Title</h3>
                </template>
                <p>
                  This is the card body content. Adjust the controls on the
                  right to customise.
                </p>
                <template #footer>
                  <YButton size="sm" color="#3b82f6" label="Action" />
                </template>
              </YCard>
            </div>
          </div>

          <div
            class="rounded-lg bg-gray-900 p-4 border"
            :class="darkMode ? 'border-gray-600' : 'border-transparent'"
          >
            <pre
              class="text-sm text-green-400 whitespace-pre-wrap"
            ><code>{{ cardSnippet }}</code></pre>
          </div>
        </div>
      </div>
    </main>

    <!-- ═══ RIGHT PROPS PANEL ═══ -->
    <aside
      class="w-80 shrink-0 overflow-y-auto border-l p-5 space-y-5 transition-colors duration-200"
      :class="
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      "
    >
      <h3
        class="text-xs font-semibold uppercase tracking-wider"
        :class="darkMode ? 'text-gray-500' : 'text-gray-400'"
      >
        Props
      </h3>

      <!-- ── Button Props ── -->
      <div v-if="activeComponent === 'button'" class="space-y-4">
        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Label</label
          >
          <input
            v-model="btnLabel"
            type="text"
            class="w-full rounded-md border px-3 py-1.5 text-sm"
            :class="
              darkMode
                ? 'bg-gray-700 border-gray-600 text-gray-100'
                : 'border-gray-300'
            "
          />
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Size</label
          >
          <div class="flex gap-1">
            <button
              v-for="s in sizes"
              :key="s"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                btnSize === s
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="btnSize = s"
            >
              {{ s }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Variant</label
          >
          <div class="flex gap-1">
            <button
              v-for="v in variants"
              :key="v"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                btnVariant === v
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="btnVariant = v"
            >
              {{ v }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Padding</label
          >
          <div class="flex gap-1">
            <button
              v-for="s in sizes"
              :key="s"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                btnPadding === s
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="btnPadding = s"
            >
              {{ s }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Shadow</label
          >
          <div class="flex flex-wrap gap-1">
            <button
              v-for="s in shadowOptions"
              :key="s"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                btnShadow === s
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="btnShadow = s"
            >
              {{ s }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Rounded</label
          >
          <div class="flex flex-wrap gap-1">
            <button
              v-for="r in roundedOptions"
              :key="r"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                btnRounded === r
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="btnRounded = r"
            >
              {{ r }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Color</label
          >
          <div class="flex items-center gap-2">
            <input
              type="color"
              :value="hexBtnColor"
              class="h-8 w-8 cursor-pointer rounded"
              @input="btnColor = ($event.target as HTMLInputElement).value"
            />
            <input
              v-model="btnColor"
              type="text"
              placeholder="#3b82f6 or blue-500"
              class="flex-1 rounded-md border px-3 py-1.5 text-sm font-mono"
              :class="
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                  : 'border-gray-300'
              "
            />
          </div>
          <p
            v-if="isTailwindColor(btnColor)"
            class="mt-1 text-xs"
            :class="darkMode ? 'text-gray-500' : 'text-gray-400'"
          >
            → {{ hexBtnColor }}
          </p>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Text Color</label
          >
          <div class="flex items-center gap-2">
            <input
              type="color"
              :value="hexBtnTextColor"
              class="h-8 w-8 cursor-pointer rounded"
              @input="btnTextColor = ($event.target as HTMLInputElement).value"
            />
            <input
              v-model="btnTextColor"
              type="text"
              placeholder="#ffffff or white"
              class="flex-1 rounded-md border px-3 py-1.5 text-sm font-mono"
              :class="
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                  : 'border-gray-300'
              "
            />
          </div>
          <p
            v-if="isTailwindColor(btnTextColor)"
            class="mt-1 text-xs"
            :class="darkMode ? 'text-gray-500' : 'text-gray-400'"
          >
            → {{ hexBtnTextColor }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <input
            v-model="btnDisabled"
            type="checkbox"
            id="btn-disabled"
            class="cursor-pointer"
          />
          <label
            for="btn-disabled"
            class="text-sm cursor-pointer"
            :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
            >Disabled</label
          >
        </div>

        <!-- Divider -->
        <hr
          class="border-t"
          :class="darkMode ? 'border-gray-700' : 'border-gray-200'"
        />
        <h4
          class="text-xs font-semibold uppercase tracking-wider"
          :class="darkMode ? 'text-gray-500' : 'text-gray-400'"
        >
          Animations &amp; Effects
        </h4>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Animation</label
          >
          <div class="flex flex-wrap gap-1">
            <button
              v-for="a in animationOptions"
              :key="a"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                btnAnimation === a
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="btnAnimation = a"
            >
              {{ a }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Animation Intensity</label
          >
          <div class="flex gap-1">
            <button
              v-for="i in intensityOptions"
              :key="i"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                btnIntensity === i
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="btnIntensity = i"
            >
              {{ i }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Effect</label
          >
          <div class="flex flex-wrap gap-1">
            <button
              v-for="e in effectOptions"
              :key="e"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                btnEffect === e
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="btnEffect = e"
            >
              {{ e }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Effect Intensity</label
          >
          <div class="flex gap-1">
            <button
              v-for="i in intensityOptions"
              :key="i"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                btnEffectIntensity === i
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="btnEffectIntensity = i"
            >
              {{ i }}
            </button>
          </div>
        </div>
      </div>

      <!-- ── Card Props ── -->
      <div v-if="activeComponent === 'card'" class="space-y-4">
        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Padding</label
          >
          <div class="flex gap-1">
            <button
              v-for="s in sizes"
              :key="s"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                cardPadding === s
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="cardPadding = s"
            >
              {{ s }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Shadow</label
          >
          <div class="flex flex-wrap gap-1">
            <button
              v-for="s in shadowOptions"
              :key="s"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                cardShadow === s
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="cardShadow = s"
            >
              {{ s }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Rounded</label
          >
          <div class="flex flex-wrap gap-1">
            <button
              v-for="r in roundedOptions"
              :key="r"
              class="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
              :class="
                cardRounded === r
                  ? 'bg-blue-600 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              @click="cardRounded = r"
            >
              {{ r }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Background Color</label
          >
          <div class="flex items-center gap-2">
            <input
              type="color"
              :value="hexCardBgColor"
              class="h-8 w-8 cursor-pointer rounded"
              @input="cardBgColor = ($event.target as HTMLInputElement).value"
            />
            <input
              v-model="cardBgColor"
              type="text"
              placeholder="#ffffff or white"
              class="flex-1 rounded-md border px-3 py-1.5 text-sm font-mono"
              :class="
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                  : 'border-gray-300'
              "
            />
          </div>
          <p
            v-if="isTailwindColor(cardBgColor)"
            class="mt-1 text-xs"
            :class="darkMode ? 'text-gray-500' : 'text-gray-400'"
          >
            → {{ hexCardBgColor }}
          </p>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Border Color</label
          >
          <div class="flex items-center gap-2">
            <input
              type="color"
              :value="hexCardBorderColor"
              class="h-8 w-8 cursor-pointer rounded"
              @input="
                cardBorderColor = ($event.target as HTMLInputElement).value
              "
            />
            <input
              v-model="cardBorderColor"
              type="text"
              placeholder="#e5e7eb or gray-200"
              class="flex-1 rounded-md border px-3 py-1.5 text-sm font-mono"
              :class="
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                  : 'border-gray-300'
              "
            />
          </div>
          <p
            v-if="isTailwindColor(cardBorderColor)"
            class="mt-1 text-xs"
            :class="darkMode ? 'text-gray-500' : 'text-gray-400'"
          >
            → {{ hexCardBorderColor }}
          </p>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-1"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >Text Color</label
          >
          <div class="flex items-center gap-2">
            <input
              type="color"
              :value="hexCardTextColor"
              class="h-8 w-8 cursor-pointer rounded"
              @input="cardTextColor = ($event.target as HTMLInputElement).value"
            />
            <input
              v-model="cardTextColor"
              type="text"
              placeholder="#1f2937 or gray-800"
              class="flex-1 rounded-md border px-3 py-1.5 text-sm font-mono"
              :class="
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                  : 'border-gray-300'
              "
            />
          </div>
          <p
            v-if="isTailwindColor(cardTextColor)"
            class="mt-1 text-xs"
            :class="darkMode ? 'text-gray-500' : 'text-gray-400'"
          >
            → {{ hexCardTextColor }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <input
            v-model="cardBordered"
            type="checkbox"
            id="card-bordered"
            class="cursor-pointer"
          />
          <label
            for="card-bordered"
            class="text-sm cursor-pointer"
            :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
            >Bordered</label
          >
        </div>
      </div>
    </aside>
  </div>
</template>
