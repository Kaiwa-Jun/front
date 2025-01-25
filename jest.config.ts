/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  // 任意の階層にある *.test.* や *.spec.* を対象
  testMatch: ["**/?(*.)+(test|spec).[tj]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
