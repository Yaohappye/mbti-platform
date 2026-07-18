import {
  defineCloudflareConfig,
  type OpenNextConfig,
} from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  ...defineCloudflareConfig(),
  buildCommand: "node ./scripts/build.mjs",
};

export default config;
