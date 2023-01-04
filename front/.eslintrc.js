module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "ignorePatterns": [".eslintrc.js"],
    "rules": {
        // "object-curly-spacing": ["error", "always"],
        "camelcase": ["error"],
        "default-case": ["error"],
        "eqeqeq": ["error", "always"],
        "func-style": ["error", "expression"],
        "no-empty-function": ["error"],
        "prefer-arrow-callback" : ["error"],
        "prefer-const": ["error"],
        "require-await": ["error"],
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "dot-location": ["error", "property"],
        "jsx-quotes": ["error", "prefer-single"],
        "no-multi-spaces": ["error"],
        "react/jsx-uses-react": "error",
        "react/prop-types": "off",
        "react/function-component-definition": [
          "error",
            {
                "namedComponents": "arrow-function",
                "unnamedComponents": "arrow-function"
            }
        ]
    }
};
