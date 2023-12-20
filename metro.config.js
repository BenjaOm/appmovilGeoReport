const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  // Agregar la extensión de archivo 'geojson' a la lista de extensiones de activos
  const assetExts = [...defaultConfig.resolver.assetExts, 'geojson'];

  // Asegúrate de mantener las extensiones de archivo predeterminadas para sourceExts
  const sourceExts = [...defaultConfig.resolver.sourceExts];

  // Devolver la configuración personalizada extendiendo la configuración predeterminada
  return {
    ...defaultConfig,
    transformer: {
      ...defaultConfig.transformer,
      getTransformOptions: async () => ({
        transform: {
          ...defaultConfig.transformer.transform,
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      ...defaultConfig.resolver,
      assetExts,
      sourceExts,
    },
  };
})();
