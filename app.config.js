module.exports = ({ config }) => {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsDownloadToken:
            process.env.EXPO_PUBLIC_MAPBOX_DOWNLOAD_TOKEN,
          RNMapboxMapsVersion: "11.0.0",
        },
      ],
    ],
  };
};
