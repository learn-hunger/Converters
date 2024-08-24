import { VitePWAOptions } from "vite-plugin-pwa";

const swConfig: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  includeManifestIcons: true,
  devOptions: {
    enabled: true,
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    //custom scripts to append
    // swDest: 'dist/sw.js',
    importScripts: ["custom-sw.js"],
    //here you wll add the background sync files
    additionalManifestEntries: [
      {
        url: "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.2.67/build/pdf.worker.min.mjs",
        revision: null,
      },
    ],

    //on demand caching
    // runtimeCaching:[{
    //   urlPattern: ({url}) => {
    //     // Match the PDF.js worker script from the CDN
    //     return url.origin === 'https://cdn.jsdelivr.net';
    //   },
    //   handler: 'CacheFirst',  // Serve from cache first, then fetch from network if not found
    //   options: {
    //     cacheName: 'cdn-cache',
    //     expiration: {
    //       maxEntries: 10,
    //       maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
    //     },
    //     cacheableResponse: {
    //       statuses: [0, 200],
    //     },
    //     backgroundSync: {
    //       name: 'sync-assets',  // Unique name for this sync queue
    //       options: {
    //         maxRetentionTime: 24 * 60,  // Retry for up to 24 hours
    //       },
    //     },
    //   },
    // }],
  },
  includeAssets: [
    "fonts/*.ttf",
    "images/*.png",
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.2.67/build/pdf.worker.min.mjs",
  ],
  manifest: false,
};

export { swConfig };
