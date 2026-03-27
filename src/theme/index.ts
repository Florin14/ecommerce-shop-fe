import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

/*
 * GRIFO Design System
 *
 * Identity: Electric precision. Warm black + acid lime.
 * Not another purple-and-cyan template.
 *
 * Typography: Space Grotesk (display) + Outfit (body)
 * Space Grotesk: geometric with personality (distinctive g, 1, R)
 * Outfit: geometric sans that reads cleanly at any size
 */

const colors = {
  volt: {
    lime: "#c8ff00",
    limeDim: "#a3cc00",
    limeGlow: "rgba(200, 255, 0, 0.15)",
    limeBorder: "rgba(200, 255, 0, 0.25)",
    bg: "#09090b",
    surface: "#0f0f11",
    card: "#141416",
    elevated: "#1a1a1e",
    hover: "#1f1f24",
    border: "rgba(255, 255, 255, 0.06)",
    borderHover: "rgba(255, 255, 255, 0.12)",
    text: "#fafafa",
    secondary: "#a1a1aa",
    muted: "#52525b",
    ghost: "#27272a",
    // Light mode
    lightBg: "#fafaf9",
    lightSurface: "#ffffff",
    lightCard: "#ffffff",
    lightElevated: "#f4f4f5",
    lightBorder: "rgba(0, 0, 0, 0.06)",
    lightBorderHover: "rgba(0, 0, 0, 0.12)",
    lightMuted: "#a1a1aa",
  },
  brand: {
    50: "#f7ffe0",
    100: "#eeffb3",
    200: "#deff80",
    300: "#d4ff4d",
    400: "#c8ff00",
    500: "#a3cc00",
    600: "#7a9900",
    700: "#526600",
    800: "#293300",
    900: "#141a00",
  },
};

const fonts = {
  heading: `'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif`,
  body: `'Outfit', -apple-system, BlinkMacSystemFont, sans-serif`,
};

const styles = {
  global: (props: { colorMode: string }) => ({
    body: {
      bg: props.colorMode === "dark" ? "volt.bg" : "volt.lightBg",
      color: props.colorMode === "dark" ? "volt.text" : "#09090b",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    "*::selection": {
      bg: "volt.lime",
      color: "volt.bg",
    },
    "::-webkit-scrollbar": {
      width: "6px",
    },
    "::-webkit-scrollbar-track": {
      bg: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      bg: props.colorMode === "dark" ? "volt.ghost" : "blackAlpha.200",
      borderRadius: "full",
    },
  }),
};

const transition = "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)";

const components = {
  Button: {
    baseStyle: {
      fontFamily: "heading",
      fontWeight: "600",
      borderRadius: "full",
      letterSpacing: "-0.01em",
      transition,
    },
    variants: {
      volt: {
        bg: "volt.lime",
        color: "volt.bg",
        fontWeight: "700",
        _hover: {
          bg: "volt.limeDim",
          transform: "translateY(-1px)",
          shadow: "0 0 30px rgba(200, 255, 0, 0.25)",
        },
        _active: { transform: "translateY(0)", bg: "volt.limeDim" },
      },
      primary: (props: { colorMode: string }) => ({
        bg: props.colorMode === "dark" ? "white" : "volt.bg",
        color: props.colorMode === "dark" ? "volt.bg" : "white",
        fontWeight: "600",
        _hover: {
          opacity: 0.85,
          transform: "translateY(-1px)",
        },
        _active: { transform: "translateY(0)" },
      }),
      secondary: (props: { colorMode: string }) => ({
        bg: "transparent",
        color: props.colorMode === "dark" ? "volt.text" : "volt.bg",
        border: "1px solid",
        borderColor: props.colorMode === "dark" ? "volt.border" : "volt.lightBorder",
        _hover: {
          bg: props.colorMode === "dark" ? "volt.hover" : "volt.lightElevated",
          borderColor: props.colorMode === "dark" ? "volt.borderHover" : "volt.lightBorderHover",
        },
      }),
      ghost: (props: { colorMode: string }) => ({
        bg: "transparent",
        _hover: {
          bg: props.colorMode === "dark" ? "whiteAlpha.50" : "blackAlpha.50",
        },
      }),
    },
    defaultProps: {
      variant: "primary",
    },
  },
  Card: {
    baseStyle: (props: { colorMode: string }) => ({
      container: {
        bg: props.colorMode === "dark" ? "volt.card" : "white",
        borderRadius: "2xl",
        shadow: "none",
        border: "1px solid",
        borderColor: props.colorMode === "dark" ? "volt.border" : "volt.lightBorder",
        transition,
        _hover: {
          borderColor: props.colorMode === "dark" ? "volt.borderHover" : "volt.lightBorderHover",
        },
      },
    }),
  },
  Input: {
    variants: {
      filled: (props: { colorMode: string }) => ({
        field: {
          fontFamily: "body",
          bg: props.colorMode === "dark" ? "volt.surface" : "volt.lightElevated",
          borderRadius: "xl",
          border: "1px solid",
          borderColor: "transparent",
          _hover: {
            borderColor: props.colorMode === "dark" ? "volt.borderHover" : "volt.lightBorderHover",
          },
          _focus: {
            borderColor: "volt.lime",
            bg: props.colorMode === "dark" ? "volt.card" : "white",
            shadow: "0 0 0 3px rgba(200, 255, 0, 0.1)",
          },
          transition,
        },
      }),
    },
    defaultProps: {
      variant: "filled",
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: "heading",
      letterSpacing: "-0.035em",
      fontWeight: "700",
    },
  },
  Badge: {
    baseStyle: {
      fontFamily: "heading",
      borderRadius: "full",
      px: 2.5,
      py: 0.5,
      fontWeight: "600",
      fontSize: "xs",
      letterSpacing: "0.01em",
    },
  },
  Menu: {
    baseStyle: (props: { colorMode: string }) => ({
      list: {
        bg: props.colorMode === "dark" ? "volt.elevated" : "white",
        border: "1px solid",
        borderColor: props.colorMode === "dark" ? "volt.border" : "volt.lightBorder",
        borderRadius: "xl",
        shadow: props.colorMode === "dark"
          ? "0 16px 48px -8px rgba(0,0,0,0.6)"
          : "0 16px 48px -8px rgba(0,0,0,0.1)",
        py: 1,
      },
      item: {
        bg: "transparent",
        fontSize: "sm",
        borderRadius: "lg",
        mx: 1,
        _hover: {
          bg: props.colorMode === "dark" ? "whiteAlpha.50" : "blackAlpha.50",
        },
      },
    }),
  },
  Drawer: {
    baseStyle: (props: { colorMode: string }) => ({
      dialog: {
        bg: props.colorMode === "dark" ? "volt.surface" : "white",
      },
      overlay: {
        bg: "blackAlpha.600",
        backdropFilter: "blur(4px)",
      },
    }),
  },
};

export const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components,
  shadows: {
    outline: "0 0 0 3px rgba(200, 255, 0, 0.2)",
    volt: "0 0 30px rgba(200, 255, 0, 0.2)",
    elevated: "0 16px 48px -8px rgba(0, 0, 0, 0.15)",
  },
  radii: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.25rem",
    "3xl": "1.5rem",
    "4xl": "2rem",
    full: "9999px",
  },
});
