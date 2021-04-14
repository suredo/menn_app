export default {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/setupNodeTests.js"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/dist/",
    "/config/",
    "/src/",
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
    ".next",
    "dist",
    "config",
    "coverage",
    "server",
    "src",
  ],
};
