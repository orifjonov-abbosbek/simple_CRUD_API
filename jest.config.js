module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-extended/all"],
  testPathIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/?(*.)+(test).js"],
  moduleFileExtensions: ["js", "json"],
  restoreMocks: true,
  resetMocks: true,
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  testTimeout: 30000,
};
