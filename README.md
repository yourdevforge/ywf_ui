# YWF UI

A customizable Vue 3 component library built with Tailwind CSS 4 and TypeScript.

## Development

```bash
# Install dependencies
pnpm install

# Run the playground (dev server on port 3000)
pnpm dev

# Build the library
pnpm build

# Type-check
pnpm typecheck
```

## Usage in a Nuxt 4 App

### 1. Install

```bash
# From a local path (during development)
pnpm add ../ywf_ui

# Or after publishing
pnpm add ywf-ui
```

### 2. Create a Nuxt Plugin

Create `plugins/ywf-ui.ts` in your Nuxt app:

```ts
import { YwfUIPlugin } from "ywf-ui";
import "ywf-ui/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vApp.use(YwfUIPlugin);
});
```

This registers all components globally and imports the required CSS.

### 3. Use Components

```vue
<template>
  <YButton color="#ef4444" size="lg" label="Delete" />

  <YCard bg-color="#1e293b" text-color="#f8fafc" padding="lg" shadow="xl">
    <template #header>
      <h3>Card Title</h3>
    </template>
    Content goes here
    <template #footer>
      <YButton size="sm" label="Save" />
    </template>
  </YCard>
</template>
```

### Alternative: Import Components Individually

Instead of the global plugin, import only what you need:

```vue
<script setup lang="ts">
import { YButton, YCard } from "ywf-ui";
import "ywf-ui/style.css"; // import once globally in your app entry
</script>
```

## Components

### YButton

| Prop        | Type                                   | Default     | Description                             |
| ----------- | -------------------------------------- | ----------- | --------------------------------------- |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`      | Button size                             |
| `color`     | `string`                               | `'#3b82f6'` | Background/accent color (any CSS color) |
| `textColor` | `string`                               | `'#ffffff'` | Text color (any CSS color)              |
| `variant`   | `'solid' \| 'outline' \| 'ghost'`      | `'solid'`   | Visual style variant                    |
| `disabled`  | `boolean`                              | `false`     | Disabled state                          |
| `label`     | `string`                               | —           | Button text (alternative to slot)       |

**Slots:** `default`

**Events:** `click`

### YCard

| Prop          | Type                                              | Default     | Description                      |
| ------------- | ------------------------------------------------- | ----------- | -------------------------------- |
| `padding`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`            | `'md'`      | Inner padding size               |
| `bgColor`     | `string`                                          | `'#ffffff'` | Background color (any CSS color) |
| `borderColor` | `string`                                          | `'#e5e7eb'` | Border color (any CSS color)     |
| `textColor`   | `string`                                          | —           | Text color (any CSS color)       |
| `shadow`      | `false \| 'sm' \| 'md' \| 'lg' \| 'xl'`           | `'md'`      | Shadow depth                     |
| `bordered`    | `boolean`                                         | `true`      | Show border                      |
| `rounded`     | `false \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'`      | Border radius                    |

**Slots:** `header`, `default`, `footer`

## Project Structure

```
src/
├── index.ts              Main entry — exports all components
├── plugin.ts             Vue plugin for global registration
├── types.ts              Shared TypeScript types
└── components/
    ├── YButton.vue       Button component
    └── YCard.vue         Card component
playground/
├── index.html            Dev server entry
├── vite.config.ts        Playground Vite config
├── main.ts               Playground app entry
├── style.css             Playground Tailwind entry
└── App.vue               Interactive component showcase
```
