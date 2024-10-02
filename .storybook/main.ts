import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-coverage",
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-mdx-gfm"
  ],
  docs: {},
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  stories: ["../(src|stories)/**/*.mdx", "../(src|stories)/**/*.stories.@(js|jsx|ts|tsx)"],
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    skipCompiler: false,
  },
};

export default config;
