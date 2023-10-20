export default {
  testEnvironment: "node",
  testMatch: ["**/test/routes/*.test.js", "**/text/routes/*.test.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
