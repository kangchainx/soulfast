// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = config.resolver.sourceExts.filter(ext => ext !== 'mjs');
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Ensure we transpile zustand to handle its import.meta usage
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});
// Whitelist zustand from being ignored by the transformer
// Default is usually excluding all node_modules. We want to exclude all EXCEPT zustand (and standard expo stuff)
// Since we are extending default config, we can likely just rely on pushing to a list if it existed, but usually it's a regex.
// Expo's default regex is complex. Let's try to set it carefully.
// A simpler way: force resolution to CJS via alias if transpilation fails.
// But transpilation is cleaner.


// Force zustand to resolve to its CommonJS entry point to avoid import.meta in ESM build
const path = require('path');
config.resolver.alias = {
  ...config.resolver.alias,
  'zustand': path.resolve(__dirname, 'node_modules/zustand/index.js'),
  'zustand/middleware': path.resolve(__dirname, 'node_modules/zustand/middleware.js'),
};

module.exports = config;
