const BRAND_HUE = 267;

export const theme = {
  color: {
    canvas: "oklch(0.984 0.005 267)",
    surface: "oklch(0.997 0.002 267)",
    surfaceMuted: "oklch(0.971 0.008 267)",

    text: {
      primary: "oklch(0.25 0.04 267)",
      secondary: "oklch(0.50 0.035 267)",
      tertiary: "oklch(0.61 0.03 267)",
      onAccent: "oklch(0.99 0.005 267)",
    },

    border: "oklch(0.91 0.012 267)",
    borderStrong: "oklch(0.85 0.02 267)",

    accent: {
      solid: "#2323FF",
      hover: "#1A1AD6",
      soft: "oklch(0.94 0.05 267)",
      text: "oklch(0.48 0.24 267)",
    },

    tier: {
      high: {
        soft: "oklch(0.965 0.035 150)",
        text: "oklch(0.47 0.12 150)",
        solid: "oklch(0.62 0.15 150)",
        border: "oklch(0.86 0.06 150)",
      },
      medium: {
        soft: "oklch(0.97 0.05 85)",
        text: "oklch(0.52 0.10 70)",
        solid: "oklch(0.80 0.13 85)",
        border: "oklch(0.88 0.07 85)",
      },
      low: {
        soft: "oklch(0.967 0.03 25)",
        text: "oklch(0.53 0.18 25)",
        solid: "oklch(0.62 0.20 25)",
        border: "oklch(0.89 0.05 25)",
      },
      none: {
        soft: "oklch(0.972 0.006 267)",
        text: "oklch(0.61 0.03 267)",
        solid: "oklch(0.72 0.02 267)",
        border: "oklch(0.90 0.012 267)",
      },
    },
  },

  space: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "48px",
    "4xl": "64px",
  },

  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    xl: "20px",
    pill: "999px",
  },

  shadow: {
    sm: "0 1px 2px oklch(0.25 0.04 267 / 0.06)",
    md: "0 6px 24px -8px oklch(0.25 0.04 267 / 0.12), 0 1px 3px oklch(0.25 0.04 267 / 0.05)",
    lg: "0 18px 48px -16px oklch(0.25 0.04 267 / 0.22)",
  },

  font: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    mono: "'SFMono-Regular', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace",
  },

  hue: BRAND_HUE,
} as const;

export type AppTheme = typeof theme;
