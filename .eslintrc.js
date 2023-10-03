module.exports = {
  parser: '@typescript-eslint/parser', // Define o parser do ESLint para TypeScript
  extends: [
    'eslint:recommended', // Usa as recomendações básicas do ESLint
    'plugin:@typescript-eslint/recommended', // Usa as recomendações do plugin @typescript-eslint
  ],
  plugins: ['@typescript-eslint'], // Define o plugin do ESLint para TypeScript
  env: {
    node: true, // Define o ambiente como Node.js
    es2021: true, // Permite a sintaxe ES2021
  },
  parserOptions: {
    ecmaVersion: 2021, // Define a versão ECMAScript para 2021
    sourceType: 'module', // Define o tipo de fonte como módulo (permite import/export)
  },
  rules: {
    // Adicione ou substitua regras ESLint aqui
    'no-console': 'warn', // Aviso para console.log
    '@typescript-eslint/no-var-requires': 'off', // Desativa a regra no-var-requires
  },
};
