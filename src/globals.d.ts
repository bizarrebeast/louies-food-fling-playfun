/**
 * Global type declarations for externally loaded libraries
 */

// Phaser is loaded globally via CDN
declare const Phaser: typeof import("phaser");

// Play.fun SDK is loaded globally via CDN
declare const OpenGameSDK: any;

declare global {
  interface Window {
    OpenGameSDK?: any;
  }
}

export {};
