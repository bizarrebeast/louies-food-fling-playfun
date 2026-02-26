import { StartScene } from "./scenes/StartScene"
import { GameScene } from "./scenes/GameScene"
import { ResultsScene } from "./scenes/ResultsScene"
import { initializeRemixSDK } from "./utils/RemixUtils"
import GameSettings from "./config/GameSettings"


// Game configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: GameSettings.canvas.width,
  height: GameSettings.canvas.height,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: document.body,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GameSettings.canvas.width,
    height: GameSettings.canvas.height,
  },
  backgroundColor: "#121212",
  scene: [StartScene, GameScene, ResultsScene],
  physics: {
    default: "arcade",
  },
  fps: {
    target: 60,
  },
  pixelArt: false,
  antialias: true,
  render: {
    preserveDrawingBuffer: true,
  },
  loader: {
    baseURL: './',
  },
}

// Wait for fonts to load before starting the game
async function waitForFonts() {
  try {
    await document.fonts.ready
    console.log('[MAIN] Fonts ready event fired')

    // Explicitly load all game fonts - important for mobile
    const fontPromises = [
      document.fonts.load('400 16px "Slackey"'),
      document.fonts.load('400 16px "Joti One"'),
      document.fonts.load('400 16px "Inter"'),
    ]

    await Promise.all(fontPromises)
    console.log('[MAIN] All game fonts loaded')

    // Extra delay for mobile browsers to fully register fonts
    await new Promise(resolve => setTimeout(resolve, 50))
  } catch (error) {
    console.warn('[MAIN] Font loading warning:', error)
    // Longer fallback delay on error
    await new Promise(resolve => setTimeout(resolve, 300))
  }
}

// Initialize the application
async function initializeApp() {
  // Wait for fonts to load first
  await waitForFonts()

  // Create the game instance
  const game = new Phaser.Game(config)

  // Initialize Play.fun SDK when game is ready
  game.events.once("ready", () => {
    initializeRemixSDK(game)
  })
}

// Start the application
initializeApp().catch((error) => {
  console.error('[MAIN] Failed to initialize app:', error)
})
