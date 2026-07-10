import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.ssawa.app",
  appName: "싸와!",
  webDir: "dist",
  bundledWebRuntime: false,
  server: {
    url: "https://ssawa.co.kr/app",
    cleartext: false,
  },
};

export default config;
