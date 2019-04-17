module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
      "no-unused-vars": [
        1,
        {
          "argsIgnorePattern": "res|next|^err"
        }
      ],
      "arrow-body-style": [
        2,
        "as-needed"
      ],
      "no-param-reassign": [
        2,
        {
          "props": false
        }
      ],
      "import": 0,
      "max-len": 0,
      "no-console": 0,
      "func-names": 0,
      "comma-dangle": 0,
      "consistent-return": 0,
      "indent": ["error", 4],
      "import/extensions": 0,
      "react/display-name": 1,
      "no-underscore-dangle": 0,
      "react/no-unused-state": 0,
      "react/forbid-prop-types": 0,
      "react/react-in-jsx-scope": 0,
      "jsx-ally/accessible-emoji": 0,
      "react/jsx-indent": ["error", 4],
      "react/no-unescpaed-entities": 0,
      "space-before-function-paren": 0,
      "import/prefer-default-export": 0,
      "react/jsx-indent-props": ["error", 4],
      "react/jsx-one-expression-per-line": 0,
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [
            ".js",
            ".jsx"
          ]
        }
      ],
      "radix": 0,
      "no-shadow": [
        2,
        {
          "hoist": "all",
          "allow": [
            "resolve",
            "reject",
            "done",
            "next",
            "err",
            "error"
          ]
        }
      ],
      "quotes": [
        2,
        "single",
        {
          "avoidEscape": true,
          "allowTemplateLiterals": true
        }
      ],
      "jsx-a11y/href-no-hash": "off",
      "jsx-a11y/anchor-is-valid": [
        "warn",
        {
          "aspects": [
            "invalidHref"
          ]
        }
      ]
    },
};