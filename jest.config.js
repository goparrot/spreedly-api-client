module.exports = {
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    testRegex: ".spec.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    coverageThreshold: {
        global: {
            lines: 100,
            statements: 100,
            functions: 100,
            branches: 80
        }
    },
    collectCoverage: true,
    coverageDirectory: "coverage"
}
