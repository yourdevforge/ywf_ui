import colors from "tailwindcss/colors";

/**
 * Flat map built dynamically from `tailwindcss/colors`.
 * Keys: "blue-500", "gray-700", "black", "white", etc.
 * Values: the CSS color strings Tailwind ships (oklch in v4, hex for black/white).
 */
export const tailwindColors: Record<string, string> = {};

const skip = new Set(["inherit", "current", "transparent"]);

for (const [name, value] of Object.entries(colors)) {
  if (skip.has(name)) continue;
  if (typeof value === "string") {
    tailwindColors[name] = value; // black → "#000", white → "#fff"
  } else if (typeof value === "object" && value !== null) {
    for (const [shade, cssValue] of Object.entries(value)) {
      tailwindColors[`${name}-${shade}`] = cssValue as string;
    }
  }
}

/**
 * oklch → hex conversion using the standard oklab → linear-sRGB → sRGB pipeline.
 * No DOM needed — pure math, works everywhere.
 */
function oklchToHex(L: number, C: number, H: number): string {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  // oklab → LMS (cube roots)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  // LMS → linear sRGB
  const lr = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const lg = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const lb = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  // linear sRGB → sRGB gamma
  const gamma = (x: number) =>
    x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;

  const clamp = (x: number) =>
    Math.max(0, Math.min(255, Math.round(gamma(x) * 255)));

  const r = clamp(lr);
  const g = clamp(lg);
  const bl = clamp(lb);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bl.toString(16).padStart(2, "0")}`;
}

/** Parse an oklch(...) CSS string and convert to hex. */
function parseOklch(css: string): string | null {
  // Matches: oklch(37.3% 0.013 256.9) or oklch(0.373 0.013 256.9)
  const m = css.match(
    /oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*[\d.]+%?\s*)?\)/,
  );
  if (!m) return null;
  let L = parseFloat(m[1]);
  if (m[2] === "%") L /= 100; // 37.3% → 0.373
  const C = parseFloat(m[3]);
  const H = parseFloat(m[4]);
  return oklchToHex(L, C, H);
}

/**
 * Convert a CSS color string to #rrggbb hex.
 * Handles oklch (via math), rgb/hsl/named colors (via DOM), and hex pass-through.
 */
let _probe: HTMLDivElement | null = null;
function toHex(cssColor: string): string {
  // Try oklch first (Tailwind v4 format) — pure math, no DOM needed
  const fromOklch = parseOklch(cssColor);
  if (fromOklch) return fromOklch;

  // For other formats (rgb, hsl, named colors), use getComputedStyle
  if (!_probe) {
    _probe = document.createElement("div");
    _probe.style.display = "none";
    document.body.appendChild(_probe);
  }
  _probe.style.color = "";
  _probe.style.color = cssColor;
  const computed = getComputedStyle(_probe).color;

  // getComputedStyle returns rgb(...) for non-oklch colors
  const m = computed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) {
    const [, r, g, b] = m.map(Number);
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }
  return "#000000";
}

/**
 * Expand 3-digit hex (#abc) to 6-digit (#aabbcc).
 * <input type="color"> requires exactly #rrggbb.
 */
function expandHex(hex: string): string {
  if (/^#[0-9a-f]{3}$/i.test(hex)) {
    const [, r, g, b] = hex;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return hex;
}

/**
 * Resolve a color input — returns the Tailwind CSS value if the input
 * matches a known Tailwind color name, otherwise returns the raw input.
 */
export function resolveColor(input: string): string {
  const key = input.trim().toLowerCase();
  return tailwindColors[key] ?? input;
}

/**
 * Same as resolveColor but always returns a hex string (#rrggbb).
 * Useful for <input type="color"> which only accepts hex.
 */
export function resolveColorHex(input: string): string {
  const resolved = resolveColor(input);
  if (/^#[0-9a-f]{6}$/i.test(resolved)) return resolved;
  if (/^#[0-9a-f]{3}$/i.test(resolved)) return expandHex(resolved);
  return toHex(resolved);
}

/** Check whether the input is a recognised Tailwind color name. */
export function isTailwindColor(input: string): boolean {
  return input.trim().toLowerCase() in tailwindColors;
}
