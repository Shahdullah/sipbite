/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#261A14',
    tint: '#B9472F',

    // Core surfaces
    background: '#FFF8F2',
    foreground: '#261A14',

    // Cards / elevated surfaces
    card: '#FFFFFF',
    cardForeground: '#261A14',

    // Primary action color (buttons, links, active states)
    primary: '#B9472F',
    primaryForeground: '#FFF8F2',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#F4E6D8',
    secondaryForeground: '#6E321F',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#F2E7DD',
    mutedForeground: '#806C60',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#F3B562',
    accentForeground: '#4D2A16',

    // Destructive actions (delete, error states)
    destructive: '#C94335',
    destructiveForeground: '#FFFFFF',

    // Borders and input outlines
    border: '#E8D9CC',
    input: '#E8D9CC',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 18,
};

export default colors;
