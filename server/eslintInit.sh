#!/bin/bash
npm install -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node prettier prettier-plugin-solidity
npx install-peerdeps --dev eslint-config-airbnb
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode

if  [ ! -d "./.vscode" ] 
then
  mkdir .vscode
fi

echo '{
  "eslint.validate": [
    "javascript"
  ],
  "eslint.format.enable": true,
  "eslint.run": "onSave",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}' > .vscode/settings.json

echo '{
  "printWidth": 80,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true,
  "arrowParens": "always"
}' > .prettierrc

echo '{
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "airbnb-base",
    "prettier",
    "plugin:node/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "prettier"
  ],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "class-methods-use-this": "off",
    "no-plusplus": "off",
    "no-param-reassign": "warn"
  },
  "globals": {
    "describe": true,
    "it": true,
    "test": true
  }
}' > .eslintrc.json
