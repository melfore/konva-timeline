import type { UserConfig } from "@commitlint/types";

const configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  ignores: [(message) => message.startsWith("chore(release)")],
};

export default configuration;
