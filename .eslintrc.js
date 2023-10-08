module.exports = {
  parser: 'babel-eslint',  // Define o parser do ESLint para entender a sintaxe moderna do JavaScript
  extends: [
    'eslint:recommended',  // Usa as recomendações básicas do ESLint
  ],
  env: {
    node: true,  // Define o ambiente como Node.js
    es2021: true,  // Permite a sintaxe ES2021
  },
  parserOptions: {
    ecmaVersion: 2021,  // Define a versão ECMAScript para 2021
    sourceType: 'module',  // Define o tipo de fonte como módulo (permite import/export)
  },
  rules: {
    // Adicione ou substitua regras ESLint aqui
    'no-console': 'warn',  // Aviso para console.log
  },
};
