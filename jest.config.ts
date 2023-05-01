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
  modulePaths: ["<rootDir>/src/"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, "d.ts"],
  testTimeout: 15000,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
