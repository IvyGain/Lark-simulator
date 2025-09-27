module.exports = function (api) {
  api.cache(true);
  
  const plugins = [];
  
  // Always add import.meta transform for better compatibility
  plugins.push([
    'babel-plugin-transform-define',
    {
      'import.meta.env': 'process.env',
      'import.meta.hot': 'false',
      'import.meta.url': '"/"',
      'import.meta': '{}',
    },
  ]);
  
  // Add additional web-specific plugins
  if (process.env.EXPO_PLATFORM === 'web') {
    plugins.push('@babel/plugin-transform-optional-chaining');
    plugins.push('@babel/plugin-transform-nullish-coalescing-operator');
  }
  
  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};