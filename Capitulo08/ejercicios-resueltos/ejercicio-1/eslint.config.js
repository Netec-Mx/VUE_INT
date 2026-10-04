import pluginVue from 'eslint-plugin-vue'

export default [
  ...pluginVue.configs['flat/essential'],
  {
    files: ['src/modules/**/*.{js,vue}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{
          group: ['@/modules/*/!(index)*', '@/modules/*/*'],
          message: 'Importa desde el index.js del módulo, no de sus archivos internos.'
        }]
      }]
    }
  },
  {
    // El propio módulo sí puede entrar a sus archivos internos por ruta relativa.
    files: ['src/modules/*/index.js'],
    rules: { 'no-restricted-imports': 'off' }
  }
]
