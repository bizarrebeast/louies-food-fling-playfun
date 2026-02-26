// Play.fun SDK integration

let playfunSDK: any = null

export function isRemixEnvironment(): boolean {
  return true
}

export function getDevEnvironmentInfo(): null {
  return null
}

export async function initPlayFunSDK(): Promise<void> {
  try {
    playfunSDK = new (window as any).OpenGameSDK({
      gameId: '70417ed2-0ba2-49e5-bc7c-7a28b7c0c0ec',
      ui: { usePointsWidget: true },
    })
    await playfunSDK.init()
    console.log('[PlayFun] SDK initialized')
  } catch (e) {
    console.warn('[PlayFun] SDK init failed:', e)
  }
}

export function reportGameOver(score: number): void {
  if (playfunSDK) {
    try {
      playfunSDK.addPoints(score)
      playfunSDK.savePoints()
      console.log('[PlayFun] Score reported:', score)
    } catch (e) {
      console.warn('[PlayFun] Score report failed:', e)
    }
  }
}

// Keep the same export name so main.ts import doesn't need changes
export function initializeRemixSDK(game: Phaser.Game): void {
  game.canvas.setAttribute("tabindex", "-1")
  initPlayFunSDK()
}

export function initializeDevelopment(): void {
  // No-op for play.fun
}
