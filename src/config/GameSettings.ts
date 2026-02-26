/**
 * Game Settings for Louie's Food Fling
 * Adaptive layout: canvas matches viewport, uiScale adjusts UI elements
 */

const viewW = window.innerWidth
const viewH = window.innerHeight

// uiScale: at 720x1080 (portrait) = 1.0, at 1920x1080 (landscape) = 1.5
const uiScale = Math.min(viewW, viewH) / 720

export const GameSettings = {
  debug: true,

  canvas: {
    width: viewW,
    height: viewH,
  },

  /** Scale factor for UI elements (fonts, buttons, HUD, padding) */
  uiScale,

  /** Ground Y as a ratio of canvas height */
  groundYRatio: 0.83,
}

export default GameSettings
