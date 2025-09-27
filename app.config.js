export default {
  expo: {
    name: "ツールコストシミュレーター",
    slug: "tool-cost-simulator",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "app.rork.tool-cost-simulator"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "app.rork.tool-cost-simulator"
    },
    web: {
      favicon: "./assets/images/favicon.png",
      bundler: "metro"
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      typedRoutes: true
    }
  }
};