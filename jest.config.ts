import nextJest from "next/jest";
import { defaults } from "jest-config";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.js"],
  modulePaths: ["<rootDir>/src/", "<rootDir>/.jest"],
  moduleNameMapper: {
    "^styled-components":
      "<rootDir>/node_modules/styled-components/dist/styled-components.browser.cjs.js",
  },
  testEnvironment: "node",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "d.ts"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
