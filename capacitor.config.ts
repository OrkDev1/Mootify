import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.davlumbaz.Mootify",
  appName: "Mootify",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    OneSignal:{
      smallIcon: "mood_icon",
    },
    LocalNotifications: {
      smallIcon: "icon",
      iconColor: "#488AFF"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    BackgroundFetch: {
      headlessTask: true
    }
  }
};

export default config;
