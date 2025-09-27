const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure web compatibility
config.resolver.platforms = ['web', 'native', 'ios', 'android'];

// Add module resolution for web
config.resolver.alias = {
  ...config.resolver.alias,
  '@': __dirname,
};

// Transformer optimizations
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  }),
};

// Web-specific optimizations
if (process.env.EXPO_PLATFORM === 'web') {
  config.transformer.minifierConfig = {
    keep_fnames: true,
    mangle: {
      keep_fnames: true,
    },
  };
  
  // Enable source maps for debugging
  config.serializer = {
    ...config.serializer,
    map: true,
  };
}

module.exports = config;