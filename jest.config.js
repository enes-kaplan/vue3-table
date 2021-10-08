module.exports = {
  // preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
