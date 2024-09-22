module.exports = {
  testEnvironment: "jsdom", // Ensures the correct environment for testing React components
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use babel-jest to transpile JavaScript/TypeScript
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Support for JavaScript and TypeScript extensions
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Jest setup file for RTL or other configurations
  transformIgnorePatterns: ["/node_modules/", "/.next/"], // Ignore node_modules and .next directory
};
