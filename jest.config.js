module.exports = {
  // preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  testPathIgnorePatterns: ["<rootDir>/tests/e2e/"],
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
